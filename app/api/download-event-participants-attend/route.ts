import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";
import { fetchAllAirtableRecords } from "@/app/lib/airtable";

// Matches the header row Attend's bulk participant importer expects
// (participant_import_template.csv). Columns Airtable doesn't track
// (Slack ID, T-Shirt Size, emergency contact, travel, Groups, ...) are left blank.
const CSV_COLUMNS = [
  "Email",
  "First Name",
  "Last Name",
  "Preferred Name",
  "Slack ID",
  "Pronouns",
  "Gender",
  "Phone Number",
  "Birthday",
  "Address Line 1",
  "Address Line 2",
  "City",
  "State",
  "ZIP Code",
  "Country",
  "T-Shirt Size",
  "Parent First Name",
  "Parent Last Name",
  "Parent Email",
  "Parent Phone",
  "Emergency Contact First Name",
  "Emergency Contact Last Name",
  "Emergency Contact Email",
  "Emergency Contact Phone",
  "Emergency Contact Relationship",
  "Do you have any dietary requirements we need to know about?",
  "Do you have any special requirements e.g. medication, or disabilities that we need to be aware of?",
  "How are you getting to Prototype?",
  "Starting Address",
  "How many flights are on your itinerary for your journey to SFO / SJO / OAK?",
  "Flight 1 Departing Airport",
  "Flight 1 Arriving Airport",
  "Flight 1 Airline Code",
  "Flight 1 Flight Number",
  "Flight 1 Departing Date",
  "Flight 2 Departing Airport",
  "Flight 2 Arriving Airport",
  "Flight 2 Airline Code",
  "Flight 2 Flight Number",
  "Flight 2 Departing Date",
  "Flight 3 Departing Airport",
  "Flight 3 Arriving Airport",
  "Flight 3 Airline Code",
  "Flight 3 Flight Number",
  "Flight 3 Departing Date",
  "Final Departure Airport",
  "Final Airline Code",
  "Final Flight Number",
  "Flight Departure Date",
  "Last Leg Departing Airport",
  "Last Leg Arriving Airport",
  "Last Leg Airline Code",
  "Last Leg Flight Number",
  "Last Leg Departing Date",
  "Groups",
];

function csvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Airtable's parent_name field is a single free-text name — split on the first
// space as a best-effort First/Last guess. When only one word was ever collected
// (no surname on file), Attend's importer rejects the row for a blank "Legal Last
// Name" — fall back to the participant's own last name (the common case for a
// parent) rather than leaving it blank.
function splitParentName(fullName: string | undefined, participantLastName: string | undefined) {
  const trimmed = (fullName ?? "").trim();
  if (!trimmed) return { first: "", last: "" };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) {
    return { first: trimmed, last: (participantLastName ?? "").trim() };
  }
  return { first: trimmed.slice(0, idx), last: trimmed.slice(idx + 1) };
}

function toRow(fields: Record<string, unknown>): Record<string, string> {
  const lastName = (fields.last_name as string | undefined) ?? "";
  const { first: parentFirst, last: parentLast } = splitParentName(
    fields.parent_name as string | undefined,
    lastName
  );

  return {
    Email: (fields.email as string | undefined) ?? "",
    "First Name": (fields.first_name as string | undefined) ?? "",
    "Last Name": lastName,
    "Preferred Name": (fields.preferred_name as string | undefined) ?? "",
    Pronouns: ((fields.pronouns as string[] | undefined) ?? []).join("/"),
    "Phone Number": (fields.phone_number as string | undefined) ?? "",
    Birthday: (fields.date_of_birth as string | undefined) ?? "",
    "Address Line 1": (fields.address_1 as string | undefined) ?? "",
    "Address Line 2": (fields.address_2 as string | undefined) ?? "",
    City: (fields.city as string | undefined) ?? "",
    State: (fields.state_region as string | undefined) ?? "",
    "ZIP Code": (fields.postcode as string | undefined) ?? "",
    Country: (fields.country as string | undefined) ?? "",
    "Parent First Name": parentFirst,
    "Parent Last Name": parentLast,
    "Parent Email": (fields.parent_email as string | undefined) ?? "",
  };
}

function toCsv(rows: Record<string, string>[]): string {
  const lines = [CSV_COLUMNS.map(csvField).join(",")];
  for (const row of rows) {
    lines.push(CSV_COLUMNS.map((col) => csvField(row[col] ?? "")).join(","));
  }
  return lines.join("\n") + "\n";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedId = searchParams.get("id");

  let targetId: string;
  let citySlug = "";

  // Same admin/organizer split as GET /api/download-event-participants — admins can
  // download participants for any event by id, organizers/POCs can only ever download
  // their own.
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

    // Organizers of this event who also separately filled out the participant signup
    // form (same email) shouldn't be invited to their own event as an attendee.
    const organizerEmails = new Set(
      orgRecords
        .filter((r) => eventByOrgId.get(r.id) === targetId)
        .map((r) => (r.fields.email as string | undefined)?.toLowerCase())
        .filter((email): email is string => Boolean(email))
    );

    const rows = individuals
      .filter((r) => (r.fields.type as string | undefined) === "participant")
      .filter((r) => !r.fields.disqualified)
      .filter((r) => {
        const directEventIds = (r.fields.event_info as string[] | undefined) ?? [];
        if (directEventIds.includes(targetId)) return true;
        const refEventIds = (r.fields.ref_event as string[] | undefined) ?? [];
        return refEventIds.some((orgId) => eventByOrgId.get(orgId) === targetId);
      })
      .filter((r) => {
        const email = (r.fields.email as string | undefined)?.trim();
        return Boolean(email) && !organizerEmails.has(email!.toLowerCase());
      })
      .map((r) => toRow(r.fields));

    const csv = toCsv(rows);
    const filename = citySlug ? `sunbeam-${citySlug}-attend-import.csv` : "sunbeam-attend-import.csv";

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("[download-event-participants-attend] Airtable error:", err);
    return Response.json({ error: "Failed to fetch participants" }, { status: 500 });
  }
}
