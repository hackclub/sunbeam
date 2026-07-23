/* eslint-disable */
// Airtable script — run manually from the Scripting app, or on a schedule via
// its own Automation ("Run a script" with no trigger-record input), to catch
// any individual_signup records the per-record sync automation missed.
//
// Scans the FULL tables (not a filtered view) so it can't miss records the
// way the old automation did, then updates every individual_signup record
// whose event_info doesn't match its linked organizer's event_info.

const INDIVIDUAL_SIGNUP_TABLE_ID = "tbliEjhuDtwd6gDP4";
const ORGANIZER_SIGNUP_TABLE_ID = "tblUjUFpbmtE4qjuJ";

const individualSignupTable = base.getTable(INDIVIDUAL_SIGNUP_TABLE_ID);
const organizerSignupTable = base.getTable(ORGANIZER_SIGNUP_TABLE_ID);

const signups = await individualSignupTable.selectRecordsAsync({ fields: ["ref_event", "event_info"] });
const organizers = await organizerSignupTable.selectRecordsAsync({ fields: ["event_info"] });

const organizerEventInfoById = new Map();
for (const organizer of organizers.records) {
    organizerEventInfoById.set(organizer.id, organizer.getCellValue("event_info") || []);
}

const updates = [];
for (const signup of signups.records) {
    const refEvent = signup.getCellValue("ref_event");
    if (!refEvent || refEvent.length === 0) continue;

    const eventInfo = organizerEventInfoById.get(refEvent[0].id);
    if (!eventInfo || eventInfo.length === 0) continue;

    const currentIds = (signup.getCellValue("event_info") || []).map((r) => r.id).sort();
    const nextIds = eventInfo.map((r) => r.id).sort();
    const inSync = currentIds.length === nextIds.length && currentIds.every((id, i) => id === nextIds[i]);
    if (inSync) continue;

    updates.push({ id: signup.id, fields: { event_info: eventInfo } });
}

console.log(`${updates.length} of ${signups.records.length} individual_signup record(s) need syncing.`);

while (updates.length > 0) {
    await individualSignupTable.updateRecordsAsync(updates.slice(0, 50));
    updates.splice(0, 50);
}

console.log("Backfill complete.");
