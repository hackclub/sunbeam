import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

type Participant = {
  name: string | null;
  email: string | null;
  city: string | null;
  country: string | null;
  phoneNumber: string | null;
  howHeard: string | null;
  laptopConfirmed: boolean;
};

function toParticipant(fields: Record<string, unknown>): Participant {
  const preferred = fields.preferred_name as string | undefined;
  const first = fields.first_name as string | undefined;
  const last = fields.last_name as string | undefined;
  const name = preferred || [first, last].filter(Boolean).join(" ") || null;

  return {
    name,
    email: (fields.email as string | undefined) ?? null,
    city: (fields.city as string | undefined) ?? null,
    country: (fields.country as string | undefined) ?? null,
    phoneNumber: (fields.phone_number as string | undefined) ?? null,
    howHeard: (fields.how_they_heard_abt as string | undefined) ?? null,
    laptopConfirmed: Boolean(fields.laptop_confirmed),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedId = searchParams.get("id");

  let targetId: string;

  // Admin path: admins can view participants for any event, NDA status notwithstanding —
  // same split as GET /api/get-my-event and PATCH /api/update-event-venue.
  if (requestedId) {
    const denied = await requireAdmin();
    if (denied) return denied;
    targetId = requestedId;
  } else {
    const role = await getOrganizerRole();
    if (!role.ok) return role.response;
    if (!role.roles.includes("nda-signed")) {
      return Response.json(
        { error: "You need to sign the NDA before you can view participant details" },
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

    // individual_signup.event_info is the direct link, but an external Airtable automation
    // populates it from ref_event -> _organizer_signup.event_info and has occasionally dropped
    // records — fall back to that path for any row where the direct link is still empty.
    const eventByOrgId = new Map(
      orgRecords.map((r) => [r.id, (r.fields.event_info as string[] | undefined)?.[0] ?? null])
    );

    const participants = individuals
      .filter((r) => (r.fields.type as string | undefined) === "participant")
      .filter((r) => {
        const directEventIds = (r.fields.event_info as string[] | undefined) ?? [];
        if (directEventIds.includes(targetId)) return true;
        const refEventIds = (r.fields.ref_event as string[] | undefined) ?? [];
        return refEventIds.some((orgId) => eventByOrgId.get(orgId) === targetId);
      })
      .map((r) => toParticipant(r.fields));

    return Response.json({ participants });
  } catch (err) {
    console.error("[get-event-participants] Airtable error:", err);
    return Response.json({ error: "Failed to fetch participants" }, { status: 500 });
  }
}
