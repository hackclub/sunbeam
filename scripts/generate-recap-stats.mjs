#!/usr/bin/env node
// Snapshots the numbers shown on the Sunbeam recap (the homepage, app/page.tsx) into
// app/lib/recap-stats.json. Sunbeam is over, so the page reads this frozen
// snapshot instead of paging through ~5k Airtable records on every request —
// re-run this if the underlying data gets cleaned up and the page should
// reflect it.
//
// Definitions (kept in line with the starboard/admin dashboards):
//   - attendees  -> participants linked from event_info.in_person_attendance,
//                   excluding disqualified signups.
//   - signups    -> participant individual_signups, excluding disqualified,
//                   de-duped by email across events.
//   - projects   -> distinct Code URLs among the "Sunbeam Event" base's
//                   Table 1 rows with status "in_unified" (approved); hours
//                   are those rows' (deflated) Optional - Override Hours Spent.
//   - cities     -> events with any recorded attendance or approved project
//                   (Burlington and Tampa have projects but no attendance
//                   recorded; Jeju and Portland have neither).
//   - organizers -> approved _organizer_signups linked as an organizer of an
//                   event that happened.
//   - volunteers -> approved, non-disqualified volunteer signups whose
//                   ref_event organizer belongs to an event that happened.
//   - country    -> per event, the most common country among its attendees
//                   (falling back to its signups), since event_info has no
//                   country field.
//
// Env vars required (already in .env):
//   AIRTABLE_PAT     - must have access to both the Sunbeam base and the
//                      Sunbeam Event base.
//   AIRTABLE_BASE_ID - Sunbeam base.
//
// Usage:
//   node scripts/generate-recap-stats.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";

loadDotEnv();

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const SUNBEAM_BASE_ID = process.env.AIRTABLE_BASE_ID;
const EVENT_INFO_TABLE_ID = process.env.AIRTABLE_EVENT_INFO_ID ?? "tblEgTJvK7JtAkKaQ";
const INDIVIDUAL_SIGNUP_TABLE_ID = process.env.AIRTABLE_ATTENDEE_TABLE_ID ?? "tbliEjhuDtwd6gDP4";
const ORGANIZER_TABLE_ID = "tblUjUFpbmtE4qjuJ";
const NPS_TABLE_ID = "tblBBUz9LQBppxUcL";
const NPS_ORGS_TABLE_ID = "tblKXZ6pfgzUA5hmv";

const SUNBEAM_EVENT_BASE_ID = "appBRYXoqFEnDdZwh";
const TABLE_1_ID = "tbl4HNRVNby7SeqDi";

// Same as scripts/generate-certificates.mjs: Table 1 Event Slugs that aren't a
// plain slugification of event_info.City.
const EVENT_SLUG_OVERRIDES = { nyc: "new-york-city" };

const EVENT_DATE = new Date("2026-08-29T00:00:00Z");
const OUTPUT_PATH = new URL("../app/lib/recap-stats.json", import.meta.url);

// Self-reported spellings that should count as the same country.
const COUNTRY_ALIASES = {
  usa: "United States",
  us: "United States",
  "u.s.": "United States",
  "u.s.a.": "United States",
  "united states of america": "United States",
  america: "United States",
  uk: "United Kingdom",
  england: "United Kingdom",
  scotland: "United Kingdom",
  uae: "United Arab Emirates",
  "u.a.e": "United Arab Emirates",
  nz: "New Zealand",
};

// Free-text "how did you hear about Sunbeam?" answers, bucketed (some answers are in
// Spanish/Indonesian, e.g. "por una amiga", "melalui teman"). First match wins.
const HEARD_ABOUT_BUCKETS = [
  ["School", /scho+l|teacher|class|college|collage|universit|principal|counsel/i],
  ["Instagram", /insta|instgram|\big\b|reel/i],
  ["Friends & family", /friend|amig|compañer|teman|sister|brother|sibling|cousin|mom|mum|mother|dad|father|parent|\bfam|peer|word of mouth/i],
  ["Hack Club", /hack ?club|slack|athena|newsletter|e-?mail/i],
  ["Other social media", /tiktok|linked ?in|wh?at.?s ?app|wechat|facebook|social|youtube|discord|twitter|snapchat|reddit|threads/i],
];

if (!AIRTABLE_PAT || !SUNBEAM_BASE_ID) {
  console.error("Missing AIRTABLE_PAT / AIRTABLE_BASE_ID.");
  process.exit(1);
}

function loadDotEnv() {
  const path = new URL("../.env", import.meta.url);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (match && !(match[1] in process.env)) process.env[match[1]] = match[2];
  }
}

function normalize(s) {
  return (s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function slugify(s) {
  return normalize(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function normalizeCountry(raw) {
  const key = normalize(raw);
  if (!key) return null;
  if (COUNTRY_ALIASES[key]) return COUNTRY_ALIASES[key];
  return key.replace(/\b\w/g, (c) => c.toUpperCase());
}

// Teams submit the same repo once per member, so projects are counted by repo.
function normalizeCodeUrl(raw) {
  return normalize(raw)
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\.git$/, "")
    .replace(/\/+$/, "");
}

function mostCommon(values) {
  const counts = new Map();
  for (const v of values) if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

function ageOnEventDay(dateOfBirth) {
  const dob = new Date(`${dateOfBirth}T00:00:00Z`);
  if (Number.isNaN(dob.getTime())) return null;
  const age = EVENT_DATE.getUTCFullYear() - dob.getUTCFullYear();
  const hadBirthday =
    EVENT_DATE.getUTCMonth() > dob.getUTCMonth() ||
    (EVENT_DATE.getUTCMonth() === dob.getUTCMonth() && EVENT_DATE.getUTCDate() >= dob.getUTCDate());
  return hadBirthday ? age : age - 1;
}

// Feedback-form answers are free text ("Yes!!", "yess", "nope"); anything that
// isn't clearly a yes or a no is left out of the percentage.
function yesOrNo(answer) {
  const a = normalize(answer);
  if (/^\W*(y[aeu]+[sph]*|yup|yep|yas+|of ?course|ofc|definitely|absolutely|sure|totally)\b/.test(a)) return "yes";
  if (/^\W*(no+|nope|nah|not really|not yet)\b/.test(a)) return "no";
  return null;
}

function pct(part, whole) {
  return whole ? Math.round((part / whole) * 100) : 0;
}

async function fetchAllAirtableRecords(baseId, tableId, fields) {
  const records = [];
  let offset;
  do {
    const params = new URLSearchParams();
    if (offset) params.set("offset", offset);
    for (const f of fields ?? []) params.append("fields[]", f);
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}${params.size ? `?${params}` : ""}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${AIRTABLE_PAT}` } });
    if (!res.ok) throw new Error(`Airtable GET ${baseId}/${tableId}: ${res.status} ${await res.text()}`);
    const data = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);
  return records;
}

async function main() {
  console.log("Fetching Airtable records...");
  const [events, signups, organizers, nps, npsOrgs, submissions] = await Promise.all([
    fetchAllAirtableRecords(SUNBEAM_BASE_ID, EVENT_INFO_TABLE_ID, [
      "City",
      "in_person_attendance",
      "signups",
      "organizer",
      "poc",
    ]),
    fetchAllAirtableRecords(SUNBEAM_BASE_ID, INDIVIDUAL_SIGNUP_TABLE_ID, [
      "type",
      "disqualified",
      "email",
      "country",
      "date_of_birth",
      "how_they_heard_abt",
      "approve_as_volunteer",
      "ref_event",
    ]),
    fetchAllAirtableRecords(SUNBEAM_BASE_ID, ORGANIZER_TABLE_ID, ["approve_as_org", "event_info", "approved_latitude", "approved_longitude"]),
    fetchAllAirtableRecords(SUNBEAM_BASE_ID, NPS_TABLE_ID, [
      "nps",
      "did_you_make_a_friend",
      "make_something_youre_proud_of",
    ]),
    fetchAllAirtableRecords(SUNBEAM_BASE_ID, NPS_ORGS_TABLE_ID, ["nps"]),
    fetchAllAirtableRecords(SUNBEAM_EVENT_BASE_ID, TABLE_1_ID, [
      "Code URL",
      "status",
      "Event Slug",
      "Optional - Override Hours Spent",
    ]),
  ]);
  console.log(
    `  ${events.length} events, ${signups.length} signups, ${organizers.length} organizer apps, ` +
      `${nps.length} + ${npsOrgs.length} feedback responses, ${submissions.length} project submissions`
  );

  const signupById = new Map(signups.map((r) => [r.id, r.fields]));
  const organizerById = new Map(organizers.map((r) => [r.id, r.fields]));
  const isParticipant = (f) => f?.type === "participant" && !f.disqualified;

  // ── projects, grouped by event slug ──
  const approved = submissions.filter((r) => r.fields.status === "in_unified");
  const projectUrlsBySlug = new Map();
  for (const { fields } of approved) {
    const rawSlug = normalize(fields["Event Slug"]);
    const slug = EVENT_SLUG_OVERRIDES[rawSlug] ?? rawSlug;
    const url = normalizeCodeUrl(fields["Code URL"]);
    if (!slug || !url) continue;
    if (!projectUrlsBySlug.has(slug)) projectUrlsBySlug.set(slug, new Set());
    projectUrlsBySlug.get(slug).add(url);
  }
  const allProjectUrls = new Set(approved.map((r) => normalizeCodeUrl(r.fields["Code URL"])).filter(Boolean));
  const hours = approved.reduce((sum, r) => sum + (Number(r.fields["Optional - Override Hours Spent"]) || 0), 0);

  // ── per-event attendance ──
  const attendeeIds = new Set();
  const cities = [];
  const heldEventIds = new Set();
  for (const { id, fields } of events) {
    const attendees = (fields.in_person_attendance ?? []).filter((rid) => isParticipant(signupById.get(rid)));
    const projects = projectUrlsBySlug.get(slugify(fields.City))?.size ?? 0;
    if (attendees.length === 0 && projects === 0) continue;

    heldEventIds.add(id);
    attendees.forEach((rid) => attendeeIds.add(rid));
    const country =
      mostCommon(attendees.map((rid) => normalizeCountry(signupById.get(rid)?.country))) ??
      mostCommon((fields.signups ?? []).map((rid) => normalizeCountry(signupById.get(rid)?.country)));
    // Map pin: the POC's approved coordinates, falling back to any organizer's.
    const pin = [...(fields.poc ?? []), ...(fields.organizer ?? [])]
      .map((rid) => organizerById.get(rid))
      .find((o) => typeof o?.approved_latitude === "number" && typeof o?.approved_longitude === "number");
    cities.push({
      city: fields.City,
      slug: slugify(fields.City),
      country,
      attendees: attendees.length,
      projects,
      lat: pin?.approved_latitude ?? null,
      lng: pin?.approved_longitude ?? null,
    });
  }
  cities.sort((a, b) => b.attendees - a.attendees || b.projects - a.projects || a.city.localeCompare(b.city));

  const unmatchedSlugs = [...projectUrlsBySlug.keys()].filter(
    (slug) => !events.some((e) => slugify(e.fields.City) === slug)
  );
  if (unmatchedSlugs.length) console.warn(`  ! project slugs with no event_info match: ${unmatchedSlugs.join(", ")}`);

  // ── ages ──
  const ageCounts = new Map();
  for (const rid of attendeeIds) {
    const age = ageOnEventDay(signupById.get(rid)?.date_of_birth);
    if (age !== null && age >= 13 && age <= 18) ageCounts.set(age, (ageCounts.get(age) ?? 0) + 1);
  }
  const ages = [13, 14, 15, 16, 17, 18].map((age) => ({ age, count: ageCounts.get(age) ?? 0 }));

  // ── signups + how they heard ──
  const participantSignups = signups.filter((r) => isParticipant(r.fields));
  const signupEmails = new Set(participantSignups.map((r) => normalize(r.fields.email) || r.id));
  const heardCounts = new Map();
  for (const { fields } of participantSignups) {
    const answer = normalize(fields.how_they_heard_abt);
    if (answer.replace(/\W/g, "").length < 2) continue;
    const bucket = HEARD_ABOUT_BUCKETS.find(([, re]) => re.test(answer))?.[0] ?? "Other";
    heardCounts.set(bucket, (heardCounts.get(bucket) ?? 0) + 1);
  }
  const heardAbout = [...heardCounts.entries()]
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => (a.source === "Other") - (b.source === "Other") || b.count - a.count);

  // ── organizers + volunteers ──
  const organizerIds = new Set();
  for (const { id, fields } of events) {
    if (!heldEventIds.has(id)) continue;
    for (const oid of fields.organizer ?? []) {
      if (organizerById.get(oid)?.approve_as_org === "approved") organizerIds.add(oid);
    }
  }
  const volunteers = signups.filter(({ fields }) => {
    if (fields.type !== "volunteer" || fields.disqualified || fields.approve_as_volunteer !== "approved") return false;
    const eventId = organizerById.get(fields.ref_event?.[0])?.event_info?.[0];
    return heldEventIds.has(eventId);
  });

  // ── feedback ──
  const scores = nps.map((r) => Number(r.fields.nps)).filter((n) => Number.isFinite(n));
  const orgScores = npsOrgs.map((r) => Number(r.fields.nps)).filter((n) => Number.isFinite(n));
  const tally = (field) => {
    const answers = nps.map((r) => yesOrNo(r.fields[field])).filter(Boolean);
    return pct(answers.filter((a) => a === "yes").length, answers.length);
  };
  const average = (xs) => Math.round((xs.reduce((a, b) => a + b, 0) / (xs.length || 1)) * 10) / 10;

  const stats = {
    generatedAt: new Date().toISOString(),
    eventDate: "2026-08-29",
    totals: {
      attendees: attendeeIds.size,
      signups: signupEmails.size,
      cities: cities.length,
      countries: new Set(cities.map((c) => c.country).filter(Boolean)).size,
      organizers: organizerIds.size,
      volunteers: volunteers.length,
      projects: allProjectUrls.size,
      shippers: approved.length,
      hours: Math.round(hours),
    },
    feedback: {
      responses: scores.length,
      averageScore: average(scores),
      npsScore: pct(scores.filter((n) => n >= 9).length, scores.length) - pct(scores.filter((n) => n <= 6).length, scores.length),
      madeFriendPct: tally("did_you_make_a_friend"),
      proudPct: tally("make_something_youre_proud_of"),
      organizerResponses: orgScores.length,
      organizerAverageScore: average(orgScores),
    },
    ages,
    heardAbout,
    cities,
  };

  writeFileSync(OUTPUT_PATH, `${JSON.stringify(stats, null, 2)}\n`);
  console.log(`\nWrote ${OUTPUT_PATH.pathname}`);
  console.log(JSON.stringify({ totals: stats.totals, feedback: stats.feedback }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
