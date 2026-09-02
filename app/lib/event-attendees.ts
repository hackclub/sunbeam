import "server-only";
import { fetchAirtableRecordById, fetchAirtableRecordsByFormula, fetchAirtableRecordsByIds } from "@/app/lib/airtable";

export type AirtableRecord = { id: string; fields: Record<string, unknown> };

// Fetches only the individual_signup rows for one event (scoped server-side via
// filterByFormula) instead of paginating through the entire attendee table and filtering
// client-side — the attendee table has thousands of rows across every event.
//
// individual_signup.event_info is the direct link, but an external Airtable automation
// populates it from ref_event -> _organizer_signup.event_info and has occasionally dropped
// records — fall back to ref_event pointing at one of this event's organizer/poc ids for any
// row where the direct link is still empty.
export async function fetchEventAttendees(targetId: string, type: "participant" | "volunteer") {
  const eventRecord = await fetchAirtableRecordById(process.env.AIRTABLE_EVENT_INFO_ID!, targetId);
  const orgIds = eventRecord
    ? [
        ...((eventRecord.fields.organizer as string[] | undefined) ?? []),
        ...((eventRecord.fields.poc as string[] | undefined) ?? []),
      ]
    : [];

  const matchClauses = [
    `FIND("${targetId}", ARRAYJOIN({event_info}))`,
    ...orgIds.map((id) => `FIND("${id}", ARRAYJOIN({ref_event}))`),
  ];
  const formula = `AND({type} = "${type}", NOT({disqualified}), OR(${matchClauses.join(",")}))`;

  const individuals = await fetchAirtableRecordsByFormula(process.env.AIRTABLE_ATTENDEE_TABLE_ID!, formula);
  return { individuals, orgIds };
}

// Resolves just the organizer/poc records for the given event's organizer ids (e.g. to get
// their emails), instead of the whole organizer signup table.
export async function fetchEventOrgRecords(orgIds: string[]): Promise<AirtableRecord[]> {
  return fetchAirtableRecordsByIds(process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID!, orgIds);
}
