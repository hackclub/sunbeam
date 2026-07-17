type ScheduleItem = { time: string; event: string };
type Sponsor = { name: string; logo: string };

function parseJsonArray<T>(value: unknown): T[] {
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json(
      { error: "Missing city parameter" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const escapedCity = city.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const params = new URLSearchParams({
    filterByFormula: `LOWER({city}) = LOWER("${escapedCity}")`,
  });

  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_EVENT_TABLE_ID}?${params}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[get-city-details] Airtable error:", err);
    return Response.json(
      { error: "Failed to fetch city details" },
      { status: 502, headers: CORS_HEADERS }
    );
  }

  const data = await res.json();
  const record = data.records?.[0];

  if (!record) {
    return Response.json(
      { error: "City not found" },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  const schedule = parseJsonArray<ScheduleItem>(record.fields.schedule);
  const sponsors = parseJsonArray<Sponsor>(record.fields.sponsors);

  return Response.json(
    { city: record.fields.City ?? city, schedule, sponsors },
    { headers: CORS_HEADERS }
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
