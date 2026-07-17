import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

type AirtableRecord = { id: string; fields: Record<string, unknown> };
type OrgFields = {
  email?: string;
  slug?: string;
  preferred_name?: string;
  first_name?: string;
  country?: string;
  expected_attendee_count?: number;
};

function toPerson(id: string, orgById: Map<string, OrgFields>) {
  const fields = orgById.get(id);
  if (!fields?.email) return null;
  return { email: fields.email, name: fields.preferred_name || fields.first_name || null };
}

function buildEventPayload(
  record: AirtableRecord | null,
  orgRecords: AirtableRecord[],
  city: string | null,
  roles: string[]
) {
  const orgById = new Map(orgRecords.map((r) => [r.id, r.fields as OrgFields]));
  const organizerIds = (record?.fields.organizer as string[] | undefined) ?? [];
  const pocIds = (record?.fields.poc as string[] | undefined) ?? [];

  const organizers = organizerIds.map((id) => toPerson(id, orgById)).filter(Boolean);
  const pocs = pocIds.map((id) => toPerson(id, orgById)).filter(Boolean);
  const slug = organizerIds.map((id) => orgById.get(id)?.slug).find(Boolean) ?? null;
  const country = organizerIds.map((id) => orgById.get(id)?.country).find(Boolean) ?? null;

  // Each organizer enters their own estimate; take the highest as the event's expected turnout.
  const expectedAttendeeCounts = organizerIds
    .map((id) => orgById.get(id)?.expected_attendee_count)
    .filter((n): n is number => typeof n === "number");
  const expectedAttendees = expectedAttendeeCounts.length ? Math.max(...expectedAttendeeCounts) : null;

  const signupsCount = (record?.fields.signups_count as number | undefined) ?? 0;
  const venueConfirmed = Boolean((record?.fields.venue as string | undefined)?.trim());

  return {
    city: city ?? (record?.fields.City as string | undefined) ?? null,
    country,
    roles,
    record,
    organizers,
    pocs,
    slug,
    expectedAttendees,
    signupsCount,
    venueConfirmed,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedId = searchParams.get("id");

  // Admin path: viewing an arbitrary city's event by record id, gated by admin auth only.
  // The `id` param is ignored for non-admins so an organizer/POC can never view another city's
  // event by guessing/changing it — their own request below always resolves to their own city.
  if (requestedId) {
    const denied = await requireAdmin();
    if (denied) return denied;

    try {
      const [events, orgRecords] = await Promise.all([
        fetchAllAirtableRecords(process.env.AIRTABLE_EVENT_INFO_ID!),
        fetchAllAirtableRecords(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!),
      ]);
      const record = events.find((e) => e.id === requestedId) ?? null;

      return Response.json(buildEventPayload(record, orgRecords, null, ["admin"]));
    } catch (err) {
      console.error("[get-my-event] Airtable error:", err);
      return Response.json({ error: "Failed to fetch event" }, { status: 500 });
    }
  }

  const role = await getOrganizerRole();
  if (!role.ok) return role.response;

  try {
    const [events, orgRecords] = await Promise.all([
      fetchAllAirtableRecords(process.env.AIRTABLE_EVENT_INFO_ID!),
      fetchAllAirtableRecords(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!),
    ]);
    const record = events.find((e) => role.eventInfoIds.includes(e.id)) ?? null;

    return Response.json(buildEventPayload(record, orgRecords, role.city, role.roles));
  } catch (err) {
    console.error("[get-my-event] Airtable error:", err);
    return Response.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}
