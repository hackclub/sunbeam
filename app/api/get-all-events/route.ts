import { requireAdmin } from "@/app/lib/admin-auth";
import { fetchAllAirtableRecords, fetchAirtableRecordsByIds } from "@/app/lib/airtable";

type OrgFields = {
  email?: string;
  preferred_name?: string;
  first_name?: string;
  country?: string;
};

function toPerson(id: string, orgById: Map<string, OrgFields>) {
  const fields = orgById.get(id);
  if (!fields?.email) return null;
  return { email: fields.email, name: fields.preferred_name || fields.first_name || null };
}

export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const [events, individuals] = await Promise.all([
      fetchAllAirtableRecords(process.env.AIRTABLE_EVENT_INFO_ID!),
      fetchAllAirtableRecords(process.env.AIRTABLE_ATTENDEE_TABLE_ID!),
    ]);

    // Only resolve the organizer/poc records actually linked from event_info, instead of
    // pulling the entire (much larger) organizer signup table. This still covers the
    // ref_event fallback below: an organizer's event_info is the reciprocal of
    // event_info.organizer, so any organizer with an event is in this set.
    const linkedOrgIds = events.flatMap((event) => {
      const fields = event.fields as { organizer?: string[]; poc?: string[] };
      return [...(fields.organizer ?? []), ...(fields.poc ?? [])];
    });
    const orgRecords = await fetchAirtableRecordsByIds(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!, linkedOrgIds);

    const orgById = new Map(orgRecords.map((r) => [r.id, r.fields as OrgFields]));

    // Same event_info / ref_event fallback as get-event-participants — an external Airtable
    // automation populates event_info from ref_event -> _organizer_signup.event_info and has
    // occasionally dropped records.
    const eventByOrgId = new Map(
      orgRecords.map((r) => [r.id, (r.fields.event_info as string[] | undefined)?.[0] ?? null])
    );

    // signups_count is a raw Airtable rollup that includes disqualified rows and "organizer"-type
    // entries — count real signups (participants/volunteers/referral-only, not disqualified) ourselves.
    const countableIndividuals = individuals.filter((r) => {
      const type = r.fields.type as string | undefined;
      return type !== "organizer" && !r.fields.disqualified;
    });

    function countSignups(eventId: string): number {
      return countableIndividuals.filter((r) => {
        const directEventIds = (r.fields.event_info as string[] | undefined) ?? [];
        if (directEventIds.includes(eventId)) return true;
        const refEventIds = (r.fields.ref_event as string[] | undefined) ?? [];
        return refEventIds.some((orgId) => eventByOrgId.get(orgId) === eventId);
      }).length;
    }

    const records = events.map((event) => {
      const fields = event.fields as {
        City?: string;
        organizer?: string[];
        poc?: string[];
        venue?: string;
      };

      const organizerIds = fields.organizer ?? [];
      const pocIds = fields.poc ?? [];
      const organizers = organizerIds.map((id) => toPerson(id, orgById)).filter(Boolean);
      const pocs = pocIds.map((id) => toPerson(id, orgById)).filter(Boolean);
      const country = organizerIds.map((id) => orgById.get(id)?.country).find(Boolean) ?? null;

      return {
        id: event.id,
        city: fields.City ?? null,
        country,
        organizers,
        pocs,
        venueConfirmed: Boolean(fields.venue?.trim()),
        signupsCount: countSignups(event.id),
      };
    });

    return Response.json({ records });
  } catch (err) {
    console.error("[get-all-events] Airtable error:", err);
    return Response.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
