import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { venue, id: requestedId } = body as { venue: unknown; id?: string };

  if (typeof venue !== "string") {
    return Response.json({ error: "Invalid venue" }, { status: 400 });
  }

  let targetId: string;

  // Admin path: updating an arbitrary city's event by record id, gated by admin auth only —
  // same split as GET /api/get-my-event.
  if (requestedId) {
    const denied = await requireAdmin();
    if (denied) return denied;
    targetId = requestedId;
  } else {
    const role = await getOrganizerRole();
    if (!role.ok) return role.response;
    if (!role.roles.some((r) => r.startsWith("person of contact"))) {
      return Response.json({ error: "Only the point of contact can set the venue" }, { status: 403 });
    }
    const [ownId] = role.eventInfoIds;
    if (!ownId) {
      return Response.json({ error: "No event to update" }, { status: 404 });
    }
    targetId = ownId;
  }

  try {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_EVENT_INFO_ID}/${targetId}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: { venue } }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[update-event-venue] Airtable error:", err);
      return Response.json({ error: "Failed to update venue" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[update-event-venue] error:", err);
    return Response.json({ error: "Failed to update venue" }, { status: 500 });
  }
}
