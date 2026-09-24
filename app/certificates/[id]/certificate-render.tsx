import "server-only";
import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { Certificate } from "../../lib/certificates";

// Everything the 3D certificate needs is drawn here, at the template's native 1999x1545
// (11in x 8.5in), so every layer lines up pixel-for-pixel on the model:
//   - art:            the printed certificate (base color texture, download, link preview)
//   - metalRoughness: glTF-packed shine map — G = roughness, B = metallic
//   - iridescence:    R = how strongly each pixel shows holographic rainbow foil
export const CERTIFICATE_WIDTH = 1999;
export const CERTIFICATE_HEIGHT = 1545;

// The name is drawn in gold so it reads as gold foil once it's metallic: a metal reflects in
// its own base color, so a blue name would come out as dark blue chrome.
const NAME_COLOR = "#b8912f";
const EVENT_LINE_COLOR = "#2a4a86";

// Shine per region. Paper stays satin; the template's blue ink (border, logos, title) becomes
// holographic blue foil; the name becomes polished gold foil. Clearcoat over the whole card
// is set on the material in CertificateViewer.
const PAPER = { roughness: 0.55, metallic: 0, iridescence: 0 };
const TEMPLATE_FOIL = { roughness: 0.22, metallic: 0.85, iridescence: 1 };
const NAME_FOIL = { roughness: 0.12, metallic: 1, iridescence: 0.25 };

const ASSET_DIR = path.join(process.cwd(), "public", "certificate");

// Long names get a smaller font so they stay inside the certificate's inner border.
function nameFontSize(name: string) {
  if (name.length > 32) return 84;
  if (name.length > 22) return 108;
  return 136;
}

export function fullNameOf(certificate: Certificate) {
  return [certificate.firstName, certificate.lastName].filter(Boolean).join(" ");
}

// Bump when the certificate's layout or wording changes in code, so cached images refresh.
const DESIGN_VERSION = 2;

// A short stamp that changes whenever anything drawn into this certificate's images changes:
// the design (DESIGN_VERSION), the name/event, or the template/font files. Every image URL carries it (?v=), so the art and
// shine maps are always fetched as a matching set — otherwise a cached art layer can pair with
// a freshly fetched shine map and the foil no longer lines up with the letters.
export async function renderVersion(certificate: Certificate) {
  const files = ["certificate_template.png", "serifFont.otf", "cursive.ttf", "cursive.otf"];
  const mtimes = await Promise.all(
    files.map((file) => fs.stat(path.join(ASSET_DIR, file)).then((s) => s.mtimeMs, () => 0))
  );
  return createHash("sha1")
    .update([DESIGN_VERSION, fullNameOf(certificate), certificate.eventName, ...mtimes].join("|"))
    .digest("hex")
    .slice(0, 10);
}

type CertificateFont = { name: string; data: ArrayBuffer; weight: 400; style: "normal" };
let cachedFonts: CertificateFont[] | null = null;

async function readFont(file: string) {
  const buf = await fs.readFile(path.join(ASSET_DIR, file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

// ImageResponse only reads ttf/otf/woff. The name uses cursive.ttf/.otf, falling back to the
// serif face if neither exists. Fonts are cached for the life of the server process, but only
// once the cursive face has been found, so dropping it in later takes effect without a restart.
async function loadFonts() {
  if (cachedFonts) return cachedFonts;

  const serif = await readFont("serifFont.otf");
  let cursive: ArrayBuffer | null = null;
  for (const file of ["cursive.ttf", "cursive.otf"]) {
    try {
      cursive = await readFont(file);
      break;
    } catch {}
  }

  const fonts: CertificateFont[] = [
    { name: "CertificateSerif", data: serif, weight: 400, style: "normal" },
    { name: "CertificateCursive", data: cursive ?? serif, weight: 400, style: "normal" },
  ];
  if (cursive) cachedFonts = fonts;
  return fonts;
}

let templateDataUriPromise: Promise<string> | null = null;
function templateDataUri() {
  templateDataUriPromise ??= fs
    .readFile(path.join(ASSET_DIR, "certificate_template.png"))
    .then((buf) => `data:image/png;base64,${buf.toString("base64")}`);
  return templateDataUriPromise;
}

type RenderOptions = {
  // "art" draws the full certificate; "name-mask" draws only the name, white on black, so it
  // can be turned into the name's region in the shine maps.
  variant: "art" | "name-mask";
  // Output width in px; everything scales from the 1999px template (used by the link preview).
  width?: number;
};

// Positions are the same percentages the template was designed around: the blank band between
// "The following award is presented to" (~46%) and the signature (~73%).
async function renderCertificateElement(certificate: Certificate, { variant, width = CERTIFICATE_WIDTH }: RenderOptions) {
  const s = width / CERTIFICATE_WIDTH;
  const height = Math.round(CERTIFICATE_HEIGHT * s);
  const fullName = fullNameOf(certificate);
  const isMask = variant === "name-mask";

  return (
    // Satori stringifies every style value, so an explicit `undefined` crashes it — omit the key instead.
    <div style={{ display: "flex", position: "relative", width, height, ...(isMask ? { background: "#000" } : {}) }}>
      {!isMask && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={await templateDataUri()} width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }} alt="" />
      )}
      <div
        style={{
          position: "absolute",
          left: 240 * s,
          width: 1519 * s,
          top: 772 * s,
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "CertificateCursive",
          fontSize: nameFontSize(fullName) * s,
          lineHeight: 1,
          color: isMask ? "#fff" : NAME_COLOR,
        }}
      >
        {fullName}
      </div>
      {!isMask && certificate.eventName && (
        <div
          style={{
            position: "absolute",
            left: 340 * s,
            width: 1319 * s,
            top: 985 * s,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "CertificateSerif",
            fontSize: 38 * s,
            lineHeight: 1.35,
            color: EVENT_LINE_COLOR,
          }}
        >
          {`Awarded for attending Sunbeam ${certificate.eventName}, on August 29th 2026, and shipping a completed project in under 12 hours.`}
        </div>
      )}
    </div>
  );
}

export async function renderCertificateResponse(certificate: Certificate, options: RenderOptions) {
  const width = options.width ?? CERTIFICATE_WIDTH;
  return new ImageResponse(await renderCertificateElement(certificate, options), {
    width,
    height: Math.round(CERTIFICATE_HEIGHT * (width / CERTIFICATE_WIDTH)),
    fonts: await loadFonts(),
  });
}

let backgroundDataUriPromise: Promise<string> | null = null;

// The template's watercolor with all of its artwork blurred away, as a soft backdrop for the back.
function backgroundDataUri() {
  backgroundDataUriPromise ??= sharp(path.join(ASSET_DIR, "certificate_template.png"))
    .blur(160)
    .modulate({ brightness: 1.05 })
    .png()
    .toBuffer()
    .then((buf) => `data:image/png;base64,${buf.toString("base64")}`);
  return backgroundDataUriPromise;
}

// Placeholder design for the back of the 3D certificate: branding plus the certificate ID and
// link, drawn per certificate at the same 1999x1545 as the front. Swap this out for the real
// back design when it exists.
export async function renderBack(certificate: Certificate) {
  const W = CERTIFICATE_WIDTH;
  const H = CERTIFICATE_HEIGHT;
  const res = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: W,
          height: H,
          position: "relative",
          fontFamily: "CertificateSerif",
          color: EVENT_LINE_COLOR,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={await backgroundDataUri()} width={W} height={H} style={{ position: "absolute", top: 0, left: 0 }} alt="" />
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            width: W - 120,
            height: H - 120,
            display: "flex",
            border: `6px solid ${EVENT_LINE_COLOR}`,
            borderRadius: 8,
          }}
        />
        <div style={{ display: "flex", fontSize: 150, lineHeight: 1 }}>Sunbeam</div>
        <div style={{ display: "flex", fontSize: 56, marginTop: 24 }}>Hack Club Athena</div>
        <div style={{ display: "flex", width: 420, height: 4, background: NAME_COLOR, marginTop: 70, marginBottom: 70 }} />
        <div style={{ display: "flex", fontSize: 40 }}>{`Certificate ID ${certificate.id}`}</div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 18, opacity: 0.8 }}>
          {`sunbeam.hackclub.com/certificates/${certificate.id}`}
        </div>
      </div>
    ),
    { width: W, height: H, fonts: await loadFonts() }
  );
  return sharp(Buffer.from(await res.arrayBuffer())).webp({ quality: 90 }).toBuffer();
}

async function renderCertificatePng(certificate: Certificate, variant: RenderOptions["variant"]) {
  const res = await renderCertificateResponse(certificate, { variant });
  return Buffer.from(await res.arrayBuffer());
}

export async function renderArt(certificate: Certificate, format: "png" | "webp" | "pdf") {
  const png = await renderCertificatePng(certificate, "art");
  if (format === "png") return png;
  if (format === "webp") return sharp(png).webp({ quality: 92 }).toBuffer();
  const jpeg = await sharp(png).jpeg({ quality: 95, chromaSubsampling: "4:4:4" }).toBuffer();
  return certificatePdf(jpeg, `${fullNameOf(certificate)}'s Sunbeam certificate`);
}

// PDF text strings as UTF-16BE hex, so accented and non-Latin names survive.
function pdfTextString(text: string) {
  let hex = "FEFF";
  for (let i = 0; i < text.length; i++) hex += text.charCodeAt(i).toString(16).padStart(4, "0");
  return `<${hex}>`;
}

// A one-page PDF with the certificate filling a US Letter landscape page (11in x 8.5in = 792 x
// 612pt, the template's exact proportions), written by hand: it's only one embedded JPEG, so a
// PDF library isn't worth the dependency.
function certificatePdf(jpeg: Buffer, title: string) {
  const PAGE_W = 792;
  const PAGE_H = 612;
  const content = `q ${PAGE_W} 0 0 ${PAGE_H} 0 0 cm /Certificate Do Q`;
  const objects: (string | Buffer)[][] = [
    ["<< /Type /Catalog /Pages 2 0 R >>"],
    ["<< /Type /Pages /Kids [3 0 R] /Count 1 >>"],
    [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /XObject << /Certificate 4 0 R >> >> /Contents 5 0 R >>`],
    [
      `<< /Type /XObject /Subtype /Image /Width ${CERTIFICATE_WIDTH} /Height ${CERTIFICATE_HEIGHT} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,
      jpeg,
      "\nendstream",
    ],
    [`<< /Length ${content.length} >>\nstream\n${content}\nendstream`],
    [`<< /Title ${pdfTextString(title)} /Producer (Sunbeam) >>`],
  ];

  const chunks: Buffer[] = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "latin1")];
  let length = chunks[0].length;
  const offsets: number[] = [];
  const push = (part: string | Buffer) => {
    const buf = typeof part === "string" ? Buffer.from(part, "latin1") : part;
    chunks.push(buf);
    length += buf.length;
  };
  objects.forEach((parts, i) => {
    offsets.push(length);
    push(`${i + 1} 0 obj\n`);
    parts.forEach(push);
    push("\nendobj\n");
  });

  const xrefOffset = length;
  push(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`);
  for (const offset of offsets) push(`${String(offset).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
  return Buffer.concat(chunks);
}

async function greyscalePixels(input: Buffer | string) {
  return sharp(input).greyscale().raw().toBuffer();
}

let templateFoilMaskPromise: Promise<Buffer> | null = null;

// One byte per pixel: how much of each template pixel is the blue "ink" (border, logos,
// title, "Hack Club Athena Team"). Ink is darker and much bluer than red; the pale paper,
// grey body text, and black signature all fail that test. Computed once per server process.
function templateFoilMask() {
  templateFoilMaskPromise ??= (async () => {
    const { data, info } = await sharp(path.join(ASSET_DIR, "certificate_template.png"))
      .raw()
      .toBuffer({ resolveWithObject: true });
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const mask = Buffer.alloc(info.width * info.height);
    for (let p = 0; p < mask.length; p++) {
      const i = p * info.channels;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      mask[p] = Math.round(255 * clamp((b - r - 50) / 40) * clamp((175 - luminance) / 40));
    }
    return mask;
  })();
  return templateFoilMaskPromise;
}

async function regionMasks(certificate: Certificate) {
  const [template, name] = await Promise.all([
    templateFoilMask(),
    renderCertificatePng(certificate, "name-mask").then(greyscalePixels),
  ]);
  return { template, name };
}

// Blends paper -> template foil -> name foil for one property, weighted by each region's mask.
function blend(key: keyof typeof PAPER, templateWeight: number, nameWeight: number) {
  const withTemplate = PAPER[key] + (TEMPLATE_FOIL[key] - PAPER[key]) * templateWeight;
  return withTemplate + (NAME_FOIL[key] - withTemplate) * nameWeight;
}

export async function renderMetalRoughness(certificate: Certificate) {
  const { template, name } = await regionMasks(certificate);
  const out = Buffer.alloc(template.length * 3);
  for (let p = 0; p < template.length; p++) {
    const t = template[p] / 255, n = name[p] / 255;
    out[p * 3 + 1] = Math.round(255 * blend("roughness", t, n));
    out[p * 3 + 2] = Math.round(255 * blend("metallic", t, n));
  }
  return sharp(out, { raw: { width: CERTIFICATE_WIDTH, height: CERTIFICATE_HEIGHT, channels: 3 } }).png().toBuffer();
}

export async function renderIridescence(certificate: Certificate) {
  const { template, name } = await regionMasks(certificate);
  const out = Buffer.alloc(template.length * 3);
  for (let p = 0; p < template.length; p++) {
    out[p * 3] = Math.round(255 * blend("iridescence", template[p] / 255, name[p] / 255));
  }
  return sharp(out, { raw: { width: CERTIFICATE_WIDTH, height: CERTIFICATE_HEIGHT, channels: 3 } }).png().toBuffer();
}
