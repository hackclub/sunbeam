import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const base = forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : request.nextUrl.origin;
  const organizers = new URL("/organizers", base);

  if (error || !code) {
    return NextResponse.redirect(organizers);
  }

  const redirectUri = `${base}/api/organizer-callback`;

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
    const err = await tokenRes.text();
    console.error("[hca-callback] token exchange failed:", tokenRes.status, err);
    console.error("[hca-callback] redirect_uri used:", redirectUri);
    return NextResponse.redirect(organizers);
  }

  const { access_token } = await tokenRes.json();
  const response = NextResponse.redirect(organizers);

  response.cookies.set("hca_token", access_token, {
    path: "/",
    maxAge: 60 * 60 * 8,
    httpOnly: true,
    sameSite: "lax",
  });

  return response;
}
