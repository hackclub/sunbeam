import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const token = request.cookies.get("hca_token")?.value;
	if (!token) {
		return NextResponse.json({ error: "no token" }, { status: 401 });
	}

	const meRes = await fetch("https://auth.hackclub.com/api/v1/me", {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!meRes.ok) {
		return NextResponse.json({ error: "upstream error" }, { status: meRes.status });
	}

	const user = await meRes.json();
	const id = user.identity ?? {};
	const addr = Array.isArray(id.addresses) ? id.addresses[0] : {};
	return NextResponse.json({
		identity: {
			id: id.id,
			primary_email: id.primary_email,
			first_name: id.first_name,
			last_name: id.last_name,
			preferred_name: id.preferred_name,
			slack_id: id.slack_id,
			phone_number: id.phone_number,
			birthday: id.birthday,
			date_of_birth: id.date_of_birth,
			approved_city: id.approved_city,
			addresses: addr ? [{ line_1: addr.line_1, line_2: addr.line_2, city: addr.city, state: addr.state, postal_code: addr.postal_code, country: addr.country }] : [],
		},
	});
}
