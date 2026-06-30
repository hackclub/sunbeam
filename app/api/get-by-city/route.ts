export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json(
      { error: "Missing city parameter" },
      { status: 400 }
    );
  }

  const escapedCity = city.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const params = new URLSearchParams({
    filterByFormula: `{city} = "${escapedCity}"`,
  });

  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_EVENT_TABLE_ID}?${params}`;
  //const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_ORG_SIGNUP_TABLE_ID}?`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[get-by-city] Airtable error:", err);
    return Response.json({ error: "Failed to fetch events" }, { status: res.status });
  }

  const data = await res.json();

  return Response.json({ records: data.records });
}