import "server-only";
import { cookies } from "next/headers";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

export async function getAdminEmails(): Promise<string[]> {
  const records = await fetchAllAirtableRecords(process.env.AIRTABLE_ADMIN_TABLE_ID!).catch(() => []);
  return records
    .map((r) => (r.fields as { email?: string }).email?.toLowerCase())
    .filter(Boolean) as string[];
}

export async function requireAdmin(): Promise<Response | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("hca_admin_token")?.value;
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const meRes = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await meRes.json();
  const email: string = user.identity?.primary_email?.toLowerCase() ?? "";
  if (!email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminEmails = await getAdminEmails();
  if (!adminEmails.includes(email)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
