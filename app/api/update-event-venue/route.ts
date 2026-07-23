import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { venue, latitude, longitude, id: requestedId } = body as {
    venue: unknown;
    latitude?: unknown;
    longitude?: unknown;
    id?: string;
  };

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

  const hasGeo =
    typeof latitude === "number" && Number.isFinite(latitude) && Math.abs(latitude) <= 90 &&
    typeof longitude === "number" && Number.isFinite(longitude) && Math.abs(longitude) <= 180;

  const fields: Record<string, unknown> = { venue };
  if (hasGeo) {
    fields.venue_latitude = latitude;
    fields.venue_longitude = longitude;
  }

  try {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_EVENT_INFO_ID}/${targetId}`;

    async function patchFields(body: Record<string, unknown>) {
      return fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: body }),
      });
    }

    let res = await patchFields(fields);
    let geoSaved = hasGeo;

    if (!res.ok && hasGeo) {
      const err = await res.text();
      // The base may not have the venue_latitude/venue_longitude columns yet — save the venue anyway.
      if (err.includes("UNKNOWN_FIELD_NAME")) {
        console.warn("[update-event-venue] venue_latitude/venue_longitude missing in Airtable — add Number fields to the event_info table to store venue coordinates. Retrying without them.");
        delete fields.venue_latitude;
        delete fields.venue_longitude;
        geoSaved = false;
        res = await patchFields(fields);
      } else {
        console.error("[update-event-venue] Airtable error:", err);
        return Response.json({ error: "Failed to update venue" }, { status: 500 });
      }
    }

    if (!res.ok) {
      const err = await res.text();
      console.error("[update-event-venue] Airtable error:", err);
      return Response.json({ error: "Failed to update venue" }, { status: 500 });
    }

    return Response.json({ ok: true, geoSaved });
  } catch (err) {
    console.error("[update-event-venue] error:", err);
    return Response.json({ error: "Failed to update venue" }, { status: 500 });
  }
}
