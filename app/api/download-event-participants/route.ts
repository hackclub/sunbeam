import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";
import { fetchEventAttendees } from "@/app/lib/event-attendees";

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
    const { individuals } = await fetchEventAttendees(targetId, "participant");

    const participants = individuals.map((r) => {
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
