import { requireAdmin } from "@/app/lib/admin-auth";

export async function PATCH(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

	const { id, status, approved_as_poc, approved_city, approved_latitude, approved_longitude } = await request.json();

	if (!id || !["approved", "rejected", "unreviewed", "needs_follow_up"].includes(status)) {
		return Response.json({ error: "invalid request" }, { status: 400 });
	}

	const fields: Record<string, unknown> = { "approve_as_org": status};
	if (typeof approved_as_poc === "boolean") {
		fields.approved_as_poc = approved_as_poc;
	}
	if (typeof approved_city === "string") {
		fields.approved_city = approved_city;
	}
	const hasGeo =
		typeof approved_latitude === "number" && Number.isFinite(approved_latitude) &&
		Math.abs(approved_latitude) <= 90 &&
		typeof approved_longitude === "number" && Number.isFinite(approved_longitude) &&
		Math.abs(approved_longitude) <= 180;
	if (hasGeo) {
		fields.approved_latitude = approved_latitude;
		fields.approved_longitude = approved_longitude;
	}

	const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}/${id}`;

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
		// The base may not have the lat/lng columns yet — save the rest anyway.
		if (err.includes("UNKNOWN_FIELD_NAME")) {
			console.warn("[update-status] approved_latitude/approved_longitude missing in Airtable — add Number fields to the org signup table to store geocodes. Retrying without them.");
			delete fields.approved_latitude;
			delete fields.approved_longitude;
			geoSaved = false;
			res = await patchFields(fields);
		} else {
			console.error("[update-status] Airtable error:", err);
			return Response.json({ error: "Failed to update status" }, { status: 500 });
		}
	}

	if (!res.ok) {
		const err = await res.text();
		console.error("[update-status] Airtable error:", err);
		return Response.json({ error: "Failed to update status" }, { status: 500 });
	}

	return Response.json({ ok: true, geoSaved });
}
