import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get("code");
	const error = request.nextUrl.searchParams.get("error");
	const step3 = new URL("/apply/step3", request.url);

	if (error || !code) {
		return NextResponse.redirect(step3);
	}

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
	const redirectUri = `${baseUrl}/api/hca-callback`;

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
		return NextResponse.redirect(step3);
	}

	const { access_token } = await tokenRes.json();

	const response = NextResponse.redirect(step3);
	response.cookies.set("hca_token", access_token, {
		path: "/",
		maxAge: 60 * 60 * 8,
		httpOnly: true,
		sameSite: "lax",
	});

	return response;
}
