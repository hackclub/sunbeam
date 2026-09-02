import "server-only";
import { acquireLock, isLockedByOther, releaseLock } from "@/app/lib/project-locks";

export type AirtableRecord = { id: string; fields: Record<string, unknown> };

const BASE_ID = process.env.SUNBEAM_EVENT_AIRTABLE_BASE_ID;
const PROJECTS_TABLE_ID = process.env.SUNBEAM_EVENT_PROJECTS_TABLE_ID;
const SUBMISSIONS_TABLE_ID = process.env.SUNBEAM_EVENT_YSWS_SUBMISSIONS_TABLE_ID;
const REVIEWERS_TABLE_ID = process.env.SUNBEAM_EVENT_REVIEWERS_TABLE_ID;

function airtableHeaders(extra?: Record<string, string>) {
  return {
    Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
    ...extra,
  };
}

function escapeFormulaString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

// Server-side filtered fetch — use this instead of fetchAllAirtableRecords whenever only a
// subset of a table is needed, so credentials never even leave Airtable's filtering, let alone
// come back to be compared client-side.
export async function fetchAirtableRecordsByFormula(tableId: string, formula: string) {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ filterByFormula: formula });
    if (offset) params.set("offset", offset);
    const url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}?${params}`;

    const res = await fetch(url, { headers: airtableHeaders(), cache: "no-store" });
    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    records.push(...(data.records ?? []));
    offset = data.offset;
  } while (offset);

  return records;
}

// A simple record check against the Reviewers table — no account creation, no password
// hashing, just an exact match. The Password field lives in Airtable in plaintext; treat this
// as appropriate only for a low-stakes internal tool, not a general auth system.
export async function findReviewerByCredentials(username: string, password: string): Promise<boolean> {
  if (!REVIEWERS_TABLE_ID) throw new Error("Missing SUNBEAM_EVENT_REVIEWERS_TABLE_ID env var");

  const formula = `AND({Username} = "${escapeFormulaString(username)}", {Password} = "${escapeFormulaString(password)}")`;
  const matches = await fetchAirtableRecordsByFormula(REVIEWERS_TABLE_ID, formula);
  return matches.length > 0;
}

export async function fetchAllAirtableRecords(tableId: string) {
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    if (offset) params.set("offset", offset);
    const url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}${params.size ? `?${params}` : ""}`;

    const res = await fetch(url, { headers: airtableHeaders(), cache: "no-store" });
    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    records.push(...(data.records ?? []));
    offset = data.offset;
  } while (offset);

  return records;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function normalizeEmail(email: unknown): string | null {
  if (typeof email !== "string") return null;
  const trimmed = email.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : null;
}

// Table 1 has one row per PERSON, not per project — teammates who worked together each submit
// their own row with the same Code URL. Group by a normalized Code URL so the reviewer sees one
// project once, and reviewing it produces a submission for every teammate at once, instead of
// making them review the same repo/demo N times. A record with no Code URL can't be matched to
// anyone else's, so it gets its own singleton group keyed by its own record id.
function normalizeCodeUrl(url: string | null): string | null {
  if (!url) return null;
  return url.trim().toLowerCase().replace(/\.git$/, "").replace(/\/+$/, "");
}

function groupKeyFor(record: AirtableRecord): string {
  const normalized = normalizeCodeUrl(asString(record.fields["Code URL"]));
  return normalized ? `url:${normalized}` : `solo:${record.id}`;
}

export type ProjectGroup = { groupKey: string; members: AirtableRecord[] };

export type ProjectMemberDTO = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  optionalOverrideHoursSpent: number | null;
};

export type ProjectDTO = {
  groupKey: string;
  members: ProjectMemberDTO[];
  codeUrl: string | null;
  playableUrl: string | null;
  description: string | null;
  eventSlug: string | null;
  screenshotUrl: string | null;
};

// Shapes a project group into the plain object the client components consume, so raw Airtable
// field names/attachment shapes never leak past the server boundary. Shared fields (code/demo
// URL, description, event) are taken from the first member — teammates on the same project are
// expected to share these, so any divergence is a data-quality issue, not something to resolve
// here.
export function toProjectGroupDTO(group: ProjectGroup): ProjectDTO {
  const [first] = group.members;
  const f = first.fields;
  const screenshot = Array.isArray(f["Screenshot"]) ? f["Screenshot"][0] : null;

  return {
    groupKey: group.groupKey,
    members: group.members.map((m) => ({
      id: m.id,
      firstName: asString(m.fields["First Name"]),
      lastName: asString(m.fields["Last Name"]),
      email: asString(m.fields["Email"]),
      optionalOverrideHoursSpent:
        typeof m.fields["Optional - Override Hours Spent"] === "number"
          ? (m.fields["Optional - Override Hours Spent"] as number)
          : null,
    })),
    codeUrl: asString(f["Code URL"]),
    playableUrl: asString(f["Playable URL"]),
    description: asString(f["Description"]),
    eventSlug: asString(f["Event Slug"]),
    screenshotUrl:
      screenshot && typeof screenshot === "object" && "url" in screenshot
        ? String((screenshot as { url: unknown }).url)
        : null,
  };
}

function requireQueueTableIds() {
  if (!PROJECTS_TABLE_ID || !SUBMISSIONS_TABLE_ID) {
    throw new Error(
      "Missing SUNBEAM_EVENT_PROJECTS_TABLE_ID / SUNBEAM_EVENT_YSWS_SUBMISSIONS_TABLE_ID env vars"
    );
  }
}

async function getReviewedEmails(): Promise<Set<string>> {
  const submissions = await fetchAllAirtableRecords(SUBMISSIONS_TABLE_ID!);
  return new Set(
    submissions.map((r) => normalizeEmail(r.fields["Email"])).filter((e): e is string => e !== null)
  );
}

async function getAllProjectGroups(): Promise<ProjectGroup[]> {
  requireQueueTableIds();
  const allProjects = await fetchAllAirtableRecords(PROJECTS_TABLE_ID!);

  const groups = new Map<string, AirtableRecord[]>();
  for (const record of allProjects) {
    const key = groupKeyFor(record);
    const members = groups.get(key);
    if (members) members.push(record);
    else groups.set(key, [record]);
  }

  return Array.from(groups.entries()).map(([groupKey, members]) => ({ groupKey, members }));
}

// A member is "accounted for" if they already have a YSWS Project Submission record (matched by
// email — there's no explicit link field between the two tables) or if they have no email at
// all, in which case they can never be matched and are excluded rather than blocking/looping the
// whole group forever.
function memberIsAccountedFor(member: AirtableRecord, reviewedEmails: Set<string>): boolean {
  const email = normalizeEmail(member.fields["Email"]);
  if (!email) {
    console.warn(`[airtable] Table 1 record ${member.id} has no email — can't be matched as reviewed, excluding.`);
    return true;
  }
  return reviewedEmails.has(email);
}

// A project group is unreviewed until every one of its members has been accounted for — so a
// group with 3 teammates stays in the queue until all 3 have a submission record, but a retry
// after a partial submit (see createSubmissionsForGroup) only needs to fill in the gaps.
function isGroupUnreviewed(group: ProjectGroup, reviewedEmails: Set<string>): boolean {
  return !group.members.every((m) => memberIsAccountedFor(m, reviewedEmails));
}

// `username` both filters out projects another reviewer currently has open and, once a project
// is picked, claims it for this reviewer — so two reviewers loading the queue at the same
// moment don't get handed the same project. See app/lib/project-locks.ts.
export async function getNextUnreviewedProject(username: string): Promise<ProjectGroup | null> {
  const reviewedEmails = await getReviewedEmails();
  const groups = await getAllProjectGroups();
  const group =
    groups.find((g) => isGroupUnreviewed(g, reviewedEmails) && !isLockedByOther(g.groupKey, username)) ?? null;
  if (group) acquireLock(group.groupKey, username);
  return group;
}

// For the "skip" action — picks a random unreviewed project group (other than `excludeGroupKey`,
// the one currently on screen) so skipping doesn't just show the same deterministic "first"
// group again. Falls back to including `excludeGroupKey` if it's the only one left.
export async function getRandomUnreviewedProject(
  username: string,
  excludeGroupKey?: string
): Promise<ProjectGroup | null> {
  const reviewedEmails = await getReviewedEmails();
  const groups = await getAllProjectGroups();
  const unreviewed = groups.filter(
    (g) => isGroupUnreviewed(g, reviewedEmails) && !isLockedByOther(g.groupKey, username)
  );

  const candidates = excludeGroupKey ? unreviewed.filter((g) => g.groupKey !== excludeGroupKey) : unreviewed;
  const pool = candidates.length > 0 ? candidates : unreviewed;
  if (pool.length === 0) return null;

  const group = pool[Math.floor(Math.random() * pool.length)];
  acquireLock(group.groupKey, username);
  return group;
}

// Re-fetches every member of a group server-side by key, rather than trusting a client-submitted
// member list, so submit-review can't be tricked into writing tampered/stale data.
export async function fetchProjectGroupByKey(groupKey: string): Promise<AirtableRecord[]> {
  requireQueueTableIds();
  const allProjects = await fetchAllAirtableRecords(PROJECTS_TABLE_ID!);
  return allProjects.filter((record) => groupKeyFor(record) === groupKey);
}

// One review produces one YSWS Project Submission record per teammate, so each person still has
// their own record — but skips any member who already has one, so retrying after a partial
// submit (e.g. a crash midway) fills in only the gaps instead of creating duplicates.
export async function createSubmissionsForGroup(
  groupKey: string,
  reviewerFields: Record<string, unknown>,
  username: string
): Promise<{ created: string[]; alreadyReviewed: string[]; droppedFields: string[] }> {
  const [members, reviewedEmails] = await Promise.all([fetchProjectGroupByKey(groupKey), getReviewedEmails()]);
  if (members.length === 0) throw new Error(`No Table 1 records found for group "${groupKey}"`);

  const created: string[] = [];
  const alreadyReviewed: string[] = [];
  const droppedFieldsSet = new Set<string>();

  for (const member of members) {
    const email = normalizeEmail(member.fields["Email"]);
    if (email && reviewedEmails.has(email)) {
      alreadyReviewed.push(member.id);
      continue;
    }

    const fields = { ...buildPassthroughFields(member.fields), ...reviewerFields };
    const { record, droppedFields } = await createYswsSubmission(fields);
    created.push(record.id);
    droppedFields.forEach((f) => droppedFieldsSet.add(f));
  }

  releaseLock(groupKey, username);
  return { created, alreadyReviewed, droppedFields: Array.from(droppedFieldsSet) };
}

type ScreenshotAttachment = { url: string };

function passthroughScreenshot(fields: Record<string, unknown>): ScreenshotAttachment[] | undefined {
  const screenshot = fields["Screenshot"];
  if (!Array.isArray(screenshot) || screenshot.length === 0) return undefined;
  return screenshot
    .map((attachment) => (attachment && typeof attachment === "object" && "url" in attachment ? { url: String((attachment as { url: unknown }).url) } : null))
    .filter((a): a is ScreenshotAttachment => a !== null);
}

// Fields on Table 1 that get copied verbatim onto the new YSWS Project Submission record.
export function buildPassthroughFields(sourceFields: Record<string, unknown>): Record<string, unknown> {
  const passthrough: Record<string, unknown> = {};

  const copy = (fromKey: string, toKey = fromKey) => {
    const value = sourceFields[fromKey];
    if (value !== undefined && value !== null && value !== "") passthrough[toKey] = value;
  };

  copy("Code URL");
  copy("Playable URL");
  copy("First Name");
  copy("Last Name");
  copy("Email");
  copy("Description");
  copy("Address (Line 1)");
  copy("Address (Line 2)");
  copy("City");
  copy("State / Province");
  copy("Country");
  copy("ZIP / Postal Code");
  copy("Birthday");

  const screenshot = passthroughScreenshot(sourceFields);
  if (screenshot) passthrough["Screenshot"] = screenshot;

  return passthrough;
}

// Explicit allowlist of writable fields on "YSWS Project Submission" — never spread an
// arbitrary object here. In particular this must never include "Automation - Unified
// Justification", which is a read-only formula field and will fail the write.
const WRITABLE_FIELDS = new Set([
  "Code URL",
  "Playable URL",
  "First Name",
  "Last Name",
  "Email",
  "Description",
  "Screenshot",
  "Address (Line 1)",
  "Address (Line 2)",
  "City",
  "State / Province",
  "Country",
  "ZIP / Postal Code",
  "Birthday",
  "Optional - Override Hours Spent",
  "Optional - Override Hours Spent Justification",
  "Justification - Specific Technical Features",
  "Justification - Additional Justification",
  "Justification - Alternate Tracking Method",
]);

export async function createYswsSubmission(fields: Record<string, unknown>) {
  if (!SUBMISSIONS_TABLE_ID) {
    throw new Error("Missing SUNBEAM_EVENT_YSWS_SUBMISSIONS_TABLE_ID env var");
  }

  const payload: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (WRITABLE_FIELDS.has(key)) payload[key] = value;
  }

  const url = `https://api.airtable.com/v0/${BASE_ID}/${SUBMISSIONS_TABLE_ID}`;

  async function post(body: Record<string, unknown>) {
    return fetch(url, {
      method: "POST",
      headers: airtableHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ fields: body, typecast: true }),
    });
  }

  let res = await post(payload);
  let droppedFields: string[] = [];

  // If a field name doesn't match Airtable's schema exactly, strip it and retry once rather
  // than failing the whole submission — mirrors app/api/update-status/route.ts's pattern.
  if (!res.ok) {
    const err = await res.text();
    const match = err.match(/Unknown field name: "([^"]+)"/);
    if (match) {
      const badField = match[1];
      console.warn(`[airtable] Unknown field "${badField}" on YSWS Project Submission — retrying without it.`);
      delete payload[badField];
      droppedFields = [badField];
      res = await post(payload);
    } else {
      throw new Error(err);
    }
  }

  if (!res.ok) throw new Error(await res.text());

  const data = (await res.json()) as AirtableRecord;
  return { record: data, droppedFields };
}
