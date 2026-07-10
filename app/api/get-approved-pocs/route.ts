type AirtableRecord = {
  fields: {
    preferred_name?: string;
    first_name?: string;
    approved_city?: string;
    slug?: string;
    approved_latitude?: number;
    approved_longitude?: number;
  };
};

export async function GET() {
  const baseUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}`;

  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({
      filterByFormula: `AND({approved_as_poc}, {approve_as_org} = "approved")`,
    });
    for (const field of ["preferred_name", "first_name", "approved_city", "slug", "approved_latitude", "approved_longitude"]) {
      params.append("fields[]", field);
    }
    if (offset) params.set("offset", offset);

    const res = await fetch(`${baseUrl}?${params}`, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[get-approved-pocs] Airtable error:", err);
      return Response.json({ error: "Failed to fetch POCs" }, { status: 502 });
    }

    const data = await res.json();
    records.push(...(data.records ?? []));
    offset = data.offset;
  } while (offset);

  const pocs = records
    .map((r) => ({
      preferred_name: r.fields.preferred_name ?? null,
      city_name: r.fields.approved_city ?? null,
      city_slug: r.fields.slug ?? null,
      latitude: r.fields.approved_latitude,
      longitude: r.fields.approved_longitude,
      first_name: r.fields.first_name ?? null,
    }))
    .filter((p) => typeof p.latitude === "number" && typeof p.longitude === "number");

  return Response.json({ pocs });
}
