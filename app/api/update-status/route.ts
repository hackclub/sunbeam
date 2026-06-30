export async function PATCH(request: Request) {
	const { id, status } = await request.json();

	if (!id || !["Approved", "Rejected", "unreviewed", "needs_follow_up"].includes(status)) {
		return Response.json({ error: "invalid request" }, { status: 400 });
	}

	const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}/${id}`;

	const res = await fetch(url, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ fields: { "approve_as_org": status.toLowerCase() } }),
	});

	if (!res.ok) {
		const err = await res.text();
		console.log(err)
		return Response.json({ error: err }, { status: 500 });
	}

	return Response.json({ ok: true });
}
