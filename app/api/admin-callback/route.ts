import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get("code");
	const error = request.nextUrl.searchParams.get("error");
	const adminUrl = new URL("/admin", request.url);
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
	const redirectUri = `${baseUrl}/api/admin-callback`;

	if (error || !code) {
		return NextResponse.redirect(adminUrl);
	}

	const tokenRes = await fetch("https://auth.hackclub.com/oauth/token", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			client_id: process.env.HCA_CLIENT_ID,
			client_secret: process.env.HCA_CLIENT_SECRET,
			redirect_uri: redirectUri,
			code,
			grant_type: "authorization_code",
		}),
	});

	if (!tokenRes.ok) {
		return NextResponse.redirect(adminUrl);
	}

	const { access_token } = await tokenRes.json();

	const response = NextResponse.redirect(adminUrl);
	response.cookies.set("hca_admin_token", access_token, {
		path: "/",
		maxAge: 60 * 60 * 8, // 8 hours for admin
		httpOnly: true,
		sameSite: "lax",
	});

	return response;
}
