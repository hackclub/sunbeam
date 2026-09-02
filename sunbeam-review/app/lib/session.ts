import "server-only";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, verifySessionCookieValue } from "@/app/lib/auth";

// proxy.ts already guarantees every request past it has a valid session cookie, so this should
// never return null in practice — but the type stays honest about the cookie being absent.
export async function getUsername(): Promise<string | null> {
  const store = await cookies();
  return verifySessionCookieValue(store.get(AUTH_COOKIE_NAME)?.value);
}
