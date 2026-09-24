import { getCertificateById } from "../../../lib/certificates";
import { fullNameOf, renderArt, renderBack, renderIridescence, renderMetalRoughness } from "../certificate-render";

// GET /certificates/[id]/image
//   ?layer=art (default) | metal-roughness | iridescence | back
//   ?format=webp (default) | png | pdf    (art only; shine maps are always lossless PNG)
//   ?download=1                           (art only; sends it as a file to save)
const LAYERS = ["art", "metal-roughness", "iridescence", "back"] as const;
type Layer = (typeof LAYERS)[number];

// Certificates effectively never change once issued, but a name typo could still get fixed
// in Airtable, so browsers recheck hourly and the CDN daily. Not cached in development, so
// template/font changes show up on reload.
const CACHE_CONTROL =
  process.env.NODE_ENV === "production"
    ? "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
    : "no-store";

export async function GET(request: Request, ctx: RouteContext<"/certificates/[id]/image">) {
  const { id } = await ctx.params;
  const { searchParams } = new URL(request.url);

  const layer = (searchParams.get("layer") ?? "art") as Layer;
  if (!LAYERS.includes(layer)) {
    return new Response(`Unknown layer; expected one of ${LAYERS.join(", ")}`, { status: 400 });
  }
  const requestedFormat = searchParams.get("format");
  const format = requestedFormat === "png" || requestedFormat === "pdf" ? requestedFormat : "webp";

  let certificate;
  try {
    certificate = await getCertificateById(id);
  } catch (err) {
    console.error("[certificate image] Airtable error:", err);
    return new Response("Failed to fetch certificate", { status: 502 });
  }
  if (!certificate) return new Response("Certificate not found", { status: 404 });

  let body: Buffer;
  let contentType: string;
  if (layer === "metal-roughness") {
    body = await renderMetalRoughness(certificate);
    contentType = "image/png";
  } else if (layer === "back") {
    body = await renderBack(certificate);
    contentType = "image/webp";
  } else if (layer === "iridescence") {
    body = await renderIridescence(certificate);
    contentType = "image/png";
  } else {
    body = await renderArt(certificate, format);
    contentType = format === "pdf" ? "application/pdf" : `image/${format}`;
  }

  const headers: Record<string, string> = { "Content-Type": contentType, "Cache-Control": CACHE_CONTROL };
  if (layer === "art" && searchParams.has("download")) {
    const fileName = `${fullNameOf(certificate) || "sunbeam"} Sunbeam certificate.${format}`;
    // filename= is an ASCII fallback; filename*= keeps accented/non-Latin names intact.
    const asciiFileName = fileName.normalize("NFKD").replace(/[^\w .-]/g, "");
    headers["Content-Disposition"] = `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
  }

  return new Response(new Uint8Array(body), { headers });
}
