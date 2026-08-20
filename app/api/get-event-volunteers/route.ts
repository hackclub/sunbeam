import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

type Volunteer = {
  id: string;
  name: string | null;
  email: string | null;
  city: string | null;
  country: string | null;
  status: string;
};

function toVolunteer(id: string, fields: Record<string, unknown>): Volunteer {
  const preferred = fields.preferred_name as string | undefined;
  const first = fields.first_name as string | undefined;
  const last = fields.last_name as string | undefined;
  const name = preferred || [first, last].filter(Boolean).join(" ") || null;

  return {
    id,
    name,
    email: (fields.email as string | undefined) ?? null,
    city: (fields.city as string | undefined) ?? null,
    country: (fields.country as string | undefined) ?? null,
    status: (fields.approve_as_volunteer as string | undefined) ?? "unreviewed",
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedId = searchParams.get("id");

  let targetId: string;

  // Admin path: admins can view volunteers for any event — same split as
  // GET /api/get-event-participants.
  if (requestedId) {
    const denied = await requireAdmin();
    if (denied) return denied;
    targetId = requestedId;
  } else {
    const role = await getOrganizerRole();
    if (!role.ok) return role.response;
    if (!role.roles.includes("nda-signed")) {
      return Response.json(
        { error: "You need to sign the NDA before you can view volunteer details" },
        { status: 403 }
      );
    }
    const [ownId] = role.eventInfoIds;
    if (!ownId) {
      return Response.json({ error: "No event to view" }, { status: 404 });
    }
    targetId = ownId;
  }

  try {
    const [individuals, orgRecords] = await Promise.all([
      fetchAllAirtableRecords(process.env.AIRTABLE_ATTENDEE_TABLE_ID!),
      fetchAllAirtableRecords(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!),
    ]);

    // Same event_info / ref_event fallback as get-event-participants — an external Airtable
    // automation populates event_info from ref_event -> _organizer_signup.event_info and has
    // occasionally dropped records.
    const eventByOrgId = new Map(
      orgRecords.map((r) => [r.id, (r.fields.event_info as string[] | undefined)?.[0] ?? null])
    );

    const volunteers = individuals
      .filter((r) => (r.fields.type as string | undefined) === "volunteer")
      .filter((r) => !r.fields.disqualified)
      .filter((r) => {
        const directEventIds = (r.fields.event_info as string[] | undefined) ?? [];
        if (directEventIds.includes(targetId)) return true;
        const refEventIds = (r.fields.ref_event as string[] | undefined) ?? [];
        return refEventIds.some((orgId) => eventByOrgId.get(orgId) === targetId);
      })
      .map((r) => toVolunteer(r.id, r.fields));

    return Response.json({ volunteers });
  } catch (err) {
    console.error("[get-event-volunteers] Airtable error:", err);
    return Response.json({ error: "Failed to fetch volunteers" }, { status: 500 });
  }
}
