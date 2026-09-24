import { getCertificateById } from "../../lib/certificates";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Missing record ID parameter" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  let certificate;
  try {
    certificate = await getCertificateById(id);
  } catch (err) {
    console.error("[get-certificate-details] Airtable error:", err);
    return Response.json(
      { error: "Failed to fetch certificate details" },
      { status: 502, headers: CORS_HEADERS }
    );
  }

  if (!certificate) {
    return Response.json(
      { error: "certificate not found" },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  return Response.json(
    {
      firstName: certificate.firstName,
      lastName: certificate.lastName,
      event: certificate.eventSlug,
    },
    { headers: CORS_HEADERS }
  );
}
