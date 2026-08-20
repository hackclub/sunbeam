import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

function csvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedId = searchParams.get("id");

  let targetId: string;
  let citySlug = "";

  // Same admin/organizer split as GET /api/get-event-participants — admins can download
  // participants for any event by id, organizers/POCs can only ever download their own.
  if (requestedId) {
    const denied = await requireAdmin();
    if (denied) return denied;
    targetId = requestedId;
  } else {
    const role = await getOrganizerRole();
    if (!role.ok) return role.response;
    if (!role.roles.includes("nda-signed")) {
      return Response.json(
        { error: "You need to sign the NDA before you can download participant details" },
        { status: 403 }
      );
    }
    const [ownId] = role.eventInfoIds;
    if (!ownId) {
      return Response.json({ error: "No event to download" }, { status: 404 });
    }
    targetId = ownId;
    citySlug = slugify(role.city);
  }

  try {
    const [individuals, orgRecords] = await Promise.all([
      fetchAllAirtableRecords(process.env.AIRTABLE_ATTENDEE_TABLE_ID!),
      fetchAllAirtableRecords(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!),
    ]);

    // individual_signup.event_info is the direct link, but an external Airtable automation
    // populates it from ref_event -> _organizer_signup.event_info and has occasionally dropped
    // records — fall back to that path for any row where the direct link is still empty.
    const eventByOrgId = new Map(
      orgRecords.map((r) => [r.id, (r.fields.event_info as string[] | undefined)?.[0] ?? null])
    );

    const participants = individuals
      .filter((r) => (r.fields.type as string | undefined) === "participant")
      .filter((r) => !r.fields.disqualified)
      .filter((r) => {
        const directEventIds = (r.fields.event_info as string[] | undefined) ?? [];
        if (directEventIds.includes(targetId)) return true;
        const refEventIds = (r.fields.ref_event as string[] | undefined) ?? [];
        return refEventIds.some((orgId) => eventByOrgId.get(orgId) === targetId);
      })
      .map((r) => {
        const preferred = r.fields.preferred_name as string | undefined;
        const first = r.fields.first_name as string | undefined;
        const email = r.fields.email as string | undefined;
        return { firstName: preferred || first || "", email: email ?? "" };
      });

    const rows = [
      "Preferred First Name,Email",
      ...participants.map((p) => `${csvField(p.firstName)},${csvField(p.email)}`),
    ];
    const csv = rows.join("\n") + "\n";
    const filename = citySlug ? `sunbeam-${citySlug}-participants.csv` : "sunbeam-participants.csv";

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("[download-event-participants] Airtable error:", err);
    return Response.json({ error: "Failed to fetch participants" }, { status: 500 });
  }
}
