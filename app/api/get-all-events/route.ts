import { requireAdmin } from "@/app/lib/admin-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const records = await fetchAllAirtableRecords(process.env.AIRTABLE_EVENT_INFO_ID!);
    return Response.json({ records });
  } catch (err) {
    console.error("[get-all-events] Airtable error:", err);
    return Response.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
