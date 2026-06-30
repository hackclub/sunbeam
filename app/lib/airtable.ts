import "server-only";

export async function getRecordsByCity(city: string) {
  const escapedCity = city.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const params = new URLSearchParams({
    filterByFormula: `{city} = "${escapedCity}"`,
  });

  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Cities?${params}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
      },
    }
  );

  if (!res.ok) throw new Error(await res.text());

  const data = await res.json();
  return data.records;
}