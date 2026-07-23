# individual_signup → event_info sync

These are Airtable Automation "Run a script" scripts, not part of the Next.js
app — they run inside the Sunbeam base's Automations, not this repo. They live
here for version control and review.

## Why

`individual_signup.event_info` should mirror the `event_info` link on the
`_organizer_signup` record each signup's `ref_event` points to. The prior
automation dropped records intermittently (root cause unconfirmed since its
script wasn't in source control, but consistent with the same
filtered-view-lookup bug that caused the 2026-07-16 event_info duplication —
see the automation's history in the base for its actual script). These
scripts look records up by id directly instead of scanning a view, so a
record can't be silently skipped because a view doesn't happen to contain it.

## Files

- `sync-individual-signup-event.js` — per-record sync. Wire up as the script
  step of an Automation triggered "When a record matches conditions" (or
  "When record updated" watching `ref_event`) on `individual_signup`, scoped
  to records where `ref_event` is not empty. Map an input variable named
  `recordId` to the trigger's Airtable record ID.
- `backfill-individual-signup-events.js` — full-table reconciliation. Run it
  by hand from Airtable's Scripting app whenever you suspect drift, or wire
  it to its own scheduled Automation (e.g. hourly) as a safety net.

## Applying a change

Paste the updated file's contents into the corresponding script step in the
Airtable Automation editor — the Airtable API can't push Automation scripts,
so this has to be done by hand in the UI.
