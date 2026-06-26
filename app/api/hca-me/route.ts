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
	console.log("[hca-me] /api/v1/me response:", JSON.stringify(user));
	return NextResponse.json(user);
}
