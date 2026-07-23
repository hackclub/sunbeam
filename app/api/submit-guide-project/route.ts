export async function POST(request: Request) {
	const body = await request.json();

	const fields: Record<string, unknown> = {
		Title: body.project_name || "",
		Description: body.project_description || "",
		"Playable URL": body.project_link || "",
		"First Name": body.first_name || "",
		"Last Name": body.last_name || "",
		Email: body.email || "",
		"Address (Line 1)": body.address_line1 || "",
		"Address (Line 2)": body.address_line2 || "",
		City: body.city || "",
		"State / Province": body.state_province || "",
		"ZIP / Postal Code": body.zip_postal_code || "",
		Country: body.country || "",
	};

	if (body.github_repo) {
		fields["Code URL"] = body.github_repo;
	}

	if (body.screenshot_url) {
		fields.Screenshot = [{ url: body.screenshot_url }];
	}

	if (body.birthday) {
		fields.Birthday = body.birthday;
	}

	if (body.override_hours_spent !== "" && body.override_hours_spent != null) {
		const hours = Number(body.override_hours_spent);
		if (Number.isFinite(hours))
			fields["Optional - Override Hours Spent"] = hours;
	}

	const tableName = "YSWS Project Submission";
	const baseId = process.env.SUNRISE_AIRTABLE_BASE_ID;
	const airtablePat = process.env.SUNRISE_AIRTABLE_PAT;

	if (!baseId || !airtablePat) {
		console.error(
			"[submit-guide-project] Sunrise Airtable configuration is missing",
		);
		return Response.json(
			{ error: "Project submissions are not configured yet" },
			{ status: 500 },
		);
	}

	const res = await fetch(
		`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${airtablePat}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ fields }),
		},
	);

	if (!res.ok) {
		const err = await res.text();
		console.error("[submit-guide-project] Airtable error:", err);
		return Response.json(
			{ error: "Failed to submit project" },
			{ status: 500 },
		);
	}

	return Response.json({ ok: true });
}
