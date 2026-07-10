import { requireAdmin } from "@/app/lib/admin-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const records = await fetchAllAirtableRecords(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!);
    return Response.json({ records });
  } catch (err) {
    console.error("[get-all-apps] Airtable error:", err);
    return Response.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}