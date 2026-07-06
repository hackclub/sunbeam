import { requireAdmin } from "@/app/lib/admin-auth";

export async function PATCH(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

	const { id, status, approved_as_poc, approved_city } = await request.json();

	if (!id || !["Approved", "Rejected", "unreviewed", "needs_follow_up"].includes(status)) {
		return Response.json({ error: "invalid request" }, { status: 400 });
	}

	const fields: Record<string, unknown> = { "approve_as_org": status.toLowerCase() };
	if (typeof approved_as_poc === "boolean") {
		fields.approved_as_poc = approved_as_poc;
	}
	if (typeof approved_city === "string") {
		fields.approved_city = approved_city;
	}

	const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}/${id}`;

	const res = await fetch(url, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ fields }),
	});

	if (!res.ok) {
		const err = await res.text();
		console.error("[update-status] Airtable error:", err);
		return Response.json({ error: "Failed to update status" }, { status: 500 });
	}

	return Response.json({ ok: true });
}
