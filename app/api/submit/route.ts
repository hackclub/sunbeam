export async function POST(request: Request) {
	const body = await request.json();

	const fields: Record<string, unknown> = {
		email: body.email || "",
		first_name: body.first_name || "",
		last_name: body.last_name || "",
		preferred_name: body.preferred_name || "",
		phone_number: body.phone_number || "",
		address_line_1: body.address_line_1 || "",
		address_line_2: body.address_line_2 || "",
		city: body.city || "",
		state_province: body.state_province || "",
		postal_code: body.postal_code || "",
		country: body.country || "",
		pronouns: body.pronouns || "",
		hca_identity: body.hca_identity || "",
		slack_id: body.slack_id || "",
		date_of_birth: body.date_of_birth || "",
		host_city: body.host_city || "",
		expected_attendee_count: body.expected_attendee_count || "",
		different_to_home_address: body.different_to_home_address === true,
		github_repo: body.github_repo || "",
		playable_link: body.playable_link || "",
		project_information: body.project_information || "",
		github_user: body.github_user || "",
		attended_or_organized_hackathon: body.attended_or_organized_hackathon === true,
		which_hackathons: body.which_hackathons || "",
		comfortable_with_poc: body.comfortable_with_poc === true,
	};

	const res = await fetch(
		`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}`,
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

