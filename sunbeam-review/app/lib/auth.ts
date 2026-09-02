import { createHmac, timingSafeEqual } from "crypto";

// Shared between proxy.ts (the site-wide gate) and the login route, so the cookie name can't
// drift between the two.
export const AUTH_COOKIE_NAME = "sunbeam_review_auth";

// The Airtable record check only happens once, at login. After that, the proxy validates
// requests locally via this signature — checking Airtable on every page load would be slow and
// needlessly hammer the API.
function sign(username: string): string {
  const secret = process.env.AUTH_SESSION_SECRET ?? "";
  return createHmac("sha256", secret).update(username).digest("hex");
}

export function createSessionCookieValue(username: string): string {
  return `${username}.${sign(username)}`;
}

export function verifySessionCookieValue(value: string | undefined): string | null {
  if (!value) return null;

  const dotIndex = value.lastIndexOf(".");
  if (dotIndex === -1) return null;

  const username = value.slice(0, dotIndex);
  const signature = value.slice(dotIndex + 1);
  const expected = sign(username);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  return username;
}
