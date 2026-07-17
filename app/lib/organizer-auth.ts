import "server-only";
import { cookies } from "next/headers";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

export type OrganizerRole =
  | { ok: true; email: string; city: string; roles: string[]; eventInfoIds: string[] }
  | { ok: false; response: Response };

export async function getOrganizerRole(): Promise<OrganizerRole> {
  const cookieStore = await cookies();
  const token = cookieStore.get("hca_token")?.value;
  if (!token) {
    return { ok: false, response: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const meRes = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) {
    return { ok: false, response: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const user = await meRes.json();
  const email: string = user.identity?.primary_email?.toLowerCase() ?? "";
  if (!email) {
    return { ok: false, response: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const records = await fetchAllAirtableRecords(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!);
  const match = records.find((r) => {
    const fields = r.fields as { email?: string; approve_as_org?: string };
    return fields.approve_as_org === "approved" && fields.email?.toLowerCase() === email;
  });

  if (!match) {
    return { ok: false, response: Response.json({ error: "Forbidden" }, { status: 403 }) };
  }

  const fields = match.fields as {
    approved_city?: string;
    approved_as_poc?: boolean;
    event_info?: string[];
  };

  const city = fields.approved_city ?? "";
  if (!city) {
    return { ok: false, response: Response.json({ error: "No approved city on file" }, { status: 403 }) };
  }

  const roles = [`organizer: ${city}`];
  if (fields.approved_as_poc) {
    roles.push(`person of contact: ${city}`);
  }

  return { ok: true, email, city, roles, eventInfoIds: fields.event_info ?? [] };
}

async function getApprovedOrganizerEmails(): Promise<string[]> {
  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.records ?? [])
    .filter((r: { fields: { approve_as_org?: string } }) => r.fields.approve_as_org === "approved")
    .map((r: { fields: { email?: string } }) => r.fields.email?.toLowerCase())
    .filter(Boolean);
}

export async function requireOrganizer(): Promise<Response | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("hca_token")?.value;
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

  const organizerEmails = await getApprovedOrganizerEmails();
  if (!organizerEmails.includes(email)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
