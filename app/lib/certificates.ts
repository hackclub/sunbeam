import "server-only";
import { cache } from "react";
import { fetchAllAirtableRecords } from "./airtable";

export type Certificate = {
  id: string;
  firstName: string;
  lastName: string;
  eventSlug: string;
  eventName: string;
};

// Certificate ids are base62 (see scripts/generate-certificates.mjs). Anything outside this
// charset is rejected before it reaches Airtable, since the id is interpolated into a
// filterByFormula string — a quote in the id would otherwise let a caller rewrite the formula.
const CERTIFICATE_ID_PATTERN = /^[0-9A-Za-z-]{1,64}$/;

// Table 1 event slugs that aren't a plain slugification of event_info.City — mirrors
// EVENT_SLUG_OVERRIDES in scripts/generate-certificates.mjs.
const EVENT_SLUG_OVERRIDES: Record<string, string> = { nyc: "New York City" };

function slugify(s: string) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function titleCaseSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

// Resolves an event_slug to its event_info.City display name, falling back to a title-cased
// slug if the event can't be found (or event_info can't be read) so the certificate still renders.
async function eventNameForSlug(slug: string) {
  if (EVENT_SLUG_OVERRIDES[slug]) return EVENT_SLUG_OVERRIDES[slug];
  try {
    const events = await fetchAllAirtableRecords(process.env.AIRTABLE_EVENT_INFO_ID!);
    const match = events.find((r) => {
      const city = (r.fields as { City?: string }).City;
      return city && slugify(city) === slug;
    });
    const city = (match?.fields as { City?: string } | undefined)?.City;
    if (city) return city;
  } catch (err) {
    console.error(`[certificates] failed to read event_info for slug "${slug}":`, err);
  }
  return titleCaseSlug(slug);
}

// Looks the certificate up directly in Airtable by its public `id` field (not the Airtable
// record id). Deliberately not served from the disk cache in ./airtable, because certificate
// ids can be regenerated in Airtable and a stale disk copy would 404 the new ones. Wrapped in
// cache() so the page and generateMetadata share one lookup per request. Returns null if not found.
export const getCertificateById = cache(async (id: string): Promise<Certificate | null> => {
  if (!CERTIFICATE_ID_PATTERN.test(id)) return null;

  const params = new URLSearchParams({ filterByFormula: `{id} = "${id}"`, maxRecords: "1" });
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_CERTIFICATE_TABLE_ID}?${params}`,
    {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
      next: { revalidate: 300 },
    }
  );
  if (!res.ok) throw new Error(`Airtable certificates lookup failed: ${res.status} ${await res.text()}`);

  const data = await res.json();
  const record = data.records?.[0];
  if (!record) return null;

  const fields = record.fields as { first_name?: string; last_name?: string; event_slug?: string };
  const eventSlug = (fields.event_slug ?? "").trim().toLowerCase();

  return {
    id,
    firstName: (fields.first_name ?? "").trim(),
    lastName: (fields.last_name ?? "").trim(),
    eventSlug,
    eventName: eventSlug ? await eventNameForSlug(eventSlug) : "",
  };
});
