import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";

type ScheduleItem = { time: string; event: string };

function isValidSchedule(value: unknown): value is ScheduleItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof (item as ScheduleItem).time === "string" &&
        typeof (item as ScheduleItem).event === "string"
    )
  );
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { schedule, id: requestedId } = body as { schedule: unknown; id?: string };

  if (!isValidSchedule(schedule)) {
    return Response.json({ error: "Invalid schedule" }, { status: 400 });
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
      body: JSON.stringify({ fields: { schedule: JSON.stringify(schedule) } }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[update-event-schedule] Airtable error:", err);
      return Response.json({ error: "Failed to update schedule" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[update-event-schedule] error:", err);
    return Response.json({ error: "Failed to update schedule" }, { status: 500 });
  }
}
