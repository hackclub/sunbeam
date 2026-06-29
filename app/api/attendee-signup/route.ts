export async function POST(request: Request) {
	const body = await request.json();

	const fields: Record<string, unknown> = {
		email: body.email || "",
		first_name: body.first_name || "",
		last_name: body.last_name || "",
		preferred_name: body.preferred_name || "",
		phone_number: body.phone_number || "",
		pronouns: body.pronouns || "",
		date_of_birth: body.date_of_birth || "",
		city: body.host_city || "",
	};

	const res = await fetch(
		`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ATTENDEE_TABLE_ID}`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ fields }),
		}
	);

	if (!res.ok) {
		const err = await res.text();
        console.log(err)
		return Response.json({ error: err }, { status: 500 });
	}

	return Response.json({ ok: true });
}
