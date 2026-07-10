import "server-only";

export async function fetchAllAirtableRecords(tableId: string) {
  const records: { id: string; fields: Record<string, unknown> }[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    if (offset) params.set("offset", offset);
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableId}${params.size ? `?${params}` : ""}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    records.push(...(data.records ?? []));
    offset = data.offset;
  } while (offset);

  return records;
}

export async function getRecordsByCity(city: string) {
  const escapedCity = city.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const params = new URLSearchParams({
    filterByFormula: `{city} = "${escapedCity}"`,
  });

  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Cities?${params}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) throw new Error(await res.text());

  const data = await res.json();
  return data.records;
}