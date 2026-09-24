import { ImageResponse } from "next/og";
import { getCertificateById } from "../../lib/certificates";
import { CERTIFICATE_HEIGHT, CERTIFICATE_WIDTH, renderCertificateResponse } from "./certificate-render";

export const alt = "Sunbeam certificate of achievement";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link previews are ~1.91:1 but the certificate is 11x8.5in, so it's centered on the site's
// navy instead of being cropped.
const CERTIFICATE_PREVIEW_HEIGHT = 570;
const CERTIFICATE_PREVIEW_WIDTH = Math.round(CERTIFICATE_WIDTH * (CERTIFICATE_PREVIEW_HEIGHT / CERTIFICATE_HEIGHT));

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certificate = await getCertificateById(id);

  if (!certificate) {
    return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#082249" }} />, size);
  }

  const art = await renderCertificateResponse(certificate, { variant: "art", width: CERTIFICATE_PREVIEW_WIDTH });
  const artUri = `data:image/png;base64,${Buffer.from(await art.arrayBuffer()).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#082249" }}>
        <img src={artUri} width={CERTIFICATE_PREVIEW_WIDTH} height={CERTIFICATE_PREVIEW_HEIGHT} alt="" />
      </div>
    ),
    size
  );
}
