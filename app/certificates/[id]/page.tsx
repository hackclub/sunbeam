import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCertificateById } from "../../lib/certificates";
import { fullNameOf, renderVersion } from "./certificate-render";
import CertificateViewer from "./CertificateViewer";
import { aboveCard, belowCard } from "./certificate-layout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const certificate = await getCertificateById(id);
  if (!certificate) return { title: "Certificate not found | Sunbeam" };

  const fullName = fullNameOf(certificate);
  const title = `${fullName}'s Sunbeam Certificate`;
  const description = `${fullName} was awarded for attending Sunbeam ${certificate.eventName} on August 29th 2026 and shipping a completed project in under 12 hours.`;
  return {
    // Makes the preview image URL (from ./opengraph-image.tsx) absolute on the real domain;
    // without it Next falls back to the host it's running on, e.g. localhost.
    metadataBase: new URL("https://sunbeam.hackclub.com"),
    title,
    description,
    // Link previews (Slack, iMessage, Discord…) read these rather than `description`. This
    // replaces the root layout's openGraph block wholesale; the preview image still comes from
    // ./opengraph-image.tsx.
    openGraph: {
      title,
      description,
      url: `https://sunbeam.hackclub.com/certificates/${encodeURIComponent(id)}`,
      siteName: "Sunbeam",
      type: "website",
    },
    // Ids are unguessable on purpose; keep individual certificates out of search results.
    robots: { index: false, follow: false },
  };
}

// City pages live at /[city], which turns hyphens back into spaces and matches event_info's
// city name case-insensitively (see app/[city]/page.tsx), e.g. "New York City" -> /new-york-city.
function cityPagePath(city: string) {
  return `/${encodeURIComponent(city.trim().toLowerCase().replace(/\s+/g, "-"))}`;
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await getCertificateById(id);

  if (!certificate) {
    notFound();
  }

  const fullName = fullNameOf(certificate);
  const version = await renderVersion(certificate);
  const imageUrl = `/certificates/${encodeURIComponent(id)}/image?v=${version}&layer=art`;

  return (
    // The viewer fills the whole screen so the card has room to spin without clipping; the
    // header and buttons float over it, anchored just above and below the resting card.
    <main className="relative flex min-h-screen flex-col gap-6 bg-[#082249] py-6 md:block md:p-0">
      {/* One block anchored just above the card: logo + links on the left, the certificate's
          title and blurb on the right (stacked and centered on small screens). The container is
          pointer-events-none so dragging over it still spins the card; links opt back in. */}
      <header
        className="pointer-events-none z-10 flex justify-center px-4 md:absolute md:inset-x-0 md:bottom-[var(--card-anchor)]"
        style={aboveCard("1.25rem")}
      >
        <div className="flex w-full max-w-5xl flex-col items-center gap-4 md:flex-row md:items-center md:gap-8">
          <nav className="pointer-events-auto flex shrink-0 flex-col items-center gap-2 md:items-start">
            <Link href="/" aria-label="Sunbeam homepage">
              {/* The logo file has ~3% empty space on its left; the negative margin lines its visible edge up with the links. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/imgs/logo.svg" alt="Sunbeam" width={1180} height={424} className="h-auto w-28 md:-ml-1.5 md:w-40" />
            </Link>
            <ul className="outfit flex flex-col items-center gap-1 text-xs md:items-start md:text-sm">
              <li>
                <Link href="/" className="text-white/60 transition-colors hover:text-white">
                  &larr; Go to Sunbeam&apos;s homepage
                </Link>
              </li>
              {certificate.eventName && (
                <li>
                  <Link href={cityPagePath(certificate.eventName)} className="text-white/60 transition-colors hover:text-white">
                    &larr; Go to Sunbeam {certificate.eventName}&apos;s homepage
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-2 text-center md:items-start md:border-l md:border-white/15 md:pl-8 md:text-left">
            <h1 className="galindo text-[#72BFDA] text-2xl md:text-4xl">{fullName}&apos;s official certificate</h1>
            <p className="outfit text-sm md:text-base text-white/70">
              {`A digital certificate validating that ${fullName} attended Sunbeam ${certificate.eventName} on August 29th. Issued by Hack Club's Athena program and only available from `}
              <a href="https://sunbeam.hackclub.com" className="pointer-events-auto underline decoration-white/40 hover:text-white">
                sunbeam.hackclub.com
              </a>
              .
            </p>
            {/* The id in the link is the certificate's own id (the Airtable lookup matched on it). */}
            <p className="flex flex-wrap justify-center gap-x-2 font-mono text-xs text-white/50 md:justify-start">
              <span>
                Certificate ID: <span className="pointer-events-auto select-all text-white/80">{certificate.id}</span>
              </span>
              <span className="hidden md:inline">·</span>
              <span className="pointer-events-auto select-all break-all">sunbeam.hackclub.com/certificates/{certificate.id}</span>
            </p>
          </div>
        </div>
      </header>

      <CertificateViewer id={id} fullName={fullName} version={version} />

      <div
        className="flex flex-wrap justify-center gap-3 px-4 md:absolute md:inset-x-0 md:top-[var(--card-anchor)]"
        style={belowCard("2.75rem")}
      >
        <a
          href={`${imageUrl}&format=png&download=1`}
          className="bg-[#72BFDA] text-[#082249] galindo px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Download PNG
        </a>
        <a
          href={`${imageUrl}&format=webp&download=1`}
          className="border-2 border-[#72BFDA] text-[#72BFDA] galindo px-6 py-2.5 rounded-full hover:bg-[#72BFDA]/10 transition-colors"
        >
          Download WebP
        </a>
        <a
          href={`${imageUrl}&format=pdf&download=1`}
          className="border-2 border-[#72BFDA] text-[#72BFDA] galindo px-6 py-2.5 rounded-full hover:bg-[#72BFDA]/10 transition-colors"
        >
          Download PDF
        </a>
      </div>
    </main>
  );
}
