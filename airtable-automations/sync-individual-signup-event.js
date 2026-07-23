/* eslint-disable */
// Airtable Automation script — "Run a script" action.
// Trigger: individual_signup record created OR updated (watch the ref_event field).
// Input variable: recordId -> Record ID from the trigger.
//
// Copies event_info from the linked _organizer_signup record (via ref_event)
// onto the individual_signup record. Safe to re-run: no-ops if already in sync.
//
// Replaces a prior automation that used a filtered-view lookup and silently
// dropped records when the view didn't contain the target row. This version
// looks the organizer record up directly by id instead of scanning a view.

const INDIVIDUAL_SIGNUP_TABLE_ID = "tbliEjhuDtwd6gDP4";
const ORGANIZER_SIGNUP_TABLE_ID = "tblUjUFpbmtE4qjuJ";

const { recordId } = input.config();

const individualSignupTable = base.getTable(INDIVIDUAL_SIGNUP_TABLE_ID);
const organizerSignupTable = base.getTable(ORGANIZER_SIGNUP_TABLE_ID);

const signup = await individualSignupTable.selectRecordAsync(recordId, {
    fields: ["ref_event", "event_info"],
});

if (!signup) {
    console.log(`individual_signup record ${recordId} not found (may have been deleted since trigger fired).`);
} else {
    const refEvent = signup.getCellValue("ref_event");

    if (!refEvent || refEvent.length === 0) {
        console.log("No ref_event set on this signup yet; nothing to sync.");
    } else {
        const organizerRecordId = refEvent[0].id;
        const organizer = await organizerSignupTable.selectRecordAsync(organizerRecordId, {
            fields: ["event_info"],
        });

        if (!organizer) {
            console.log(`Referenced organizer_signup record ${organizerRecordId} not found.`);
        } else {
            const eventInfo = organizer.getCellValue("event_info");

            if (!eventInfo || eventInfo.length === 0) {
                console.log(`Organizer ${organizerRecordId} has no event_info linked yet; nothing to sync.`);
            } else {
                const currentIds = (signup.getCellValue("event_info") || []).map((r) => r.id).sort();
                const nextIds = eventInfo.map((r) => r.id).sort();
                const inSync =
                    currentIds.length === nextIds.length && currentIds.every((id, i) => id === nextIds[i]);

                if (inSync) {
                    console.log("event_info already in sync; no update needed.");
                } else {
                    await individualSignupTable.updateRecordAsync(recordId, { event_info: eventInfo });
                    console.log(`Synced event_info -> ${nextIds.join(", ")}`);
                }
            }
        }
    }
}
