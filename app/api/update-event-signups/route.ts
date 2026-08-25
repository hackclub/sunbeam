import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { signupsOff, id: requestedId } = body as { signupsOff?: unknown; id?: string };

  if (typeof signupsOff !== "boolean") {
    return Response.json({ error: "Invalid signupsOff" }, { status: 400 });
  }

  let targetId: string;

  // Admin path: toggling an arbitrary city's event by event_info record id, gated by admin auth —
  // same split as GET /api/get-my-event and PATCH /api/update-event-venue. `signups_off` actually
  // lives on the event's point-of-contact record in _organizer_signup, so resolve that first.
  if (requestedId) {
    const denied = await requireAdmin();
    if (denied) return denied;

    const events = await fetchAllAirtableRecords(process.env.AIRTABLE_EVENT_INFO_ID!);
    const event = events.find((e) => e.id === requestedId);
    if (!event) {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }

    const pocIds = (event.fields.poc as string[] | undefined) ?? [];
    const organizerIds = (event.fields.organizer as string[] | undefined) ?? [];
    const [target] = pocIds.length ? pocIds : organizerIds;
    if (!target) {
      return Response.json({ error: "Event has no organizer to update" }, { status: 404 });
    }
    targetId = target;
  } else {
    const role = await getOrganizerRole();
    if (!role.ok) return role.response;
    if (!role.roles.some((r) => r.startsWith("person of contact"))) {
      return Response.json({ error: "Only the point of contact can toggle signups" }, { status: 403 });
    }
    targetId = role.recordId;
  }

  try {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}/${targetId}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: { signups_off: signupsOff } }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[update-event-signups] Airtable error:", err);
      return Response.json({ error: "Failed to update signups" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[update-event-signups] error:", err);
    return Response.json({ error: "Failed to update signups" }, { status: 500 });
  }
}
