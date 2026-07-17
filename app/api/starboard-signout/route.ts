import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const forwardedHost = request.headers.get("x-forwarded-host");
	const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
	const base = forwardedHost
		? `${forwardedProto}://${forwardedHost}`
		: request.nextUrl.origin;

	const clientId = process.env.HCA_CLIENT_ID ?? "";
	const redirectUri = `${base}/api/starboard-callback`;
	const scopes = "openid profile email name";
	const authUrl =
		`https://auth.hackclub.com/oauth/authorize` +
		`?client_id=${encodeURIComponent(clientId)}` +
		`&redirect_uri=${encodeURIComponent(redirectUri)}` +
		`&response_type=code` +
		`&scope=${encodeURIComponent(scopes)}`;

	const response = NextResponse.redirect(authUrl);
	response.cookies.set("hca_admin_token", "", { path: "/", maxAge: 0 });
	return response;
}
