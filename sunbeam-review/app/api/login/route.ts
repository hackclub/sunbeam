import { NextResponse } from "next/server";
import { findReviewerByCredentials } from "@/app/lib/airtable";
import { AUTH_COOKIE_NAME, createSessionCookieValue } from "@/app/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ error: "username and password are required" }, { status: 400 });
  }

  let found: boolean;
  try {
    found = await findReviewerByCredentials(username, password);
  } catch (err) {
    console.error("[login] Airtable error:", err);
    return NextResponse.json({ error: "login failed, try again" }, { status: 500 });
  }

  if (!found) {
    return NextResponse.json({ error: "incorrect username or password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: createSessionCookieValue(username),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return response;
}
