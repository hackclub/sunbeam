import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";

type Sponsor = { name: string; logo: string };

function isValidSponsors(value: unknown): value is Sponsor[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof (item as Sponsor).name === "string" &&
        typeof (item as Sponsor).logo === "string"
    )
  );
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { sponsors, id: requestedId } = body as { sponsors: unknown; id?: string };

  if (!isValidSponsors(sponsors)) {
    return Response.json({ error: "Invalid sponsors" }, { status: 400 });
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
      body: JSON.stringify({ fields: { sponsors: JSON.stringify(sponsors) } }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[update-event-sponsors] Airtable error:", err);
      return Response.json({ error: "Failed to update sponsors" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[update-event-sponsors] error:", err);
    return Response.json({ error: "Failed to update sponsors" }, { status: 500 });
  }
}
