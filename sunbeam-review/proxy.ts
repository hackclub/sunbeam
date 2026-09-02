import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, verifySessionCookieValue } from "@/app/lib/auth";

// The gate for the entire site: every request needs a session cookie signed by the login route,
// which itself checks the submitted username/password against the Reviewers table in Airtable.
export function proxy(request: NextRequest) {
  const cookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const username = verifySessionCookieValue(cookie);

  if (username) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  // Everything except the login page/API itself (or it'd redirect-loop) and static assets.
  matcher: ["/((?!login|api/login|_next/static|_next/image|favicon.ico).*)"],
};
