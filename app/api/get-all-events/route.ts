import { requireAdmin } from "@/app/lib/admin-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

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
    const [events, orgRecords] = await Promise.all([
      fetchAllAirtableRecords(process.env.AIRTABLE_EVENT_INFO_ID!),
      fetchAllAirtableRecords(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!),
    ]);

    const orgById = new Map(orgRecords.map((r) => [r.id, r.fields as OrgFields]));

    const records = events.map((event) => {
      const fields = event.fields as {
        City?: string;
        organizer?: string[];
        poc?: string[];
        venue?: string;
        signups_count?: number;
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
        signupsCount: fields.signups_count ?? 0,
      };
    });

    return Response.json({ records });
  } catch (err) {
    console.error("[get-all-events] Airtable error:", err);
    return Response.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
