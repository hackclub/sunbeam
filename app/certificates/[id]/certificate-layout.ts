// Where the certificate sits at rest inside the full-screen viewer, as a % of the viewer's
// height (centered). The header and buttons are anchored to these edges so the whole page reads
// as one group in the middle, while the viewer itself stays full-screen so the card can spin
// without clipping. Matches CAMERA_RADIUS_LANDSCAPE in CertificateViewer — change them together.
export const CARD_HEIGHT_PERCENT = 60;

const CARD_EDGE_PERCENT = 50 - CARD_HEIGHT_PERCENT / 2;

// These set a --card-anchor CSS variable rather than positioning directly, so the anchoring can
// be switched on per breakpoint: pair aboveCard with `md:absolute md:bottom-[var(--card-anchor)]`
// and belowCard with `md:absolute md:top-[var(--card-anchor)]`. Below md (portrait phones) there's
// no spare room around the card, so the page falls back to a normal top-to-bottom layout.
// Both are for elements inside a container the same height as the viewer.
export const aboveCard = (gap: string) =>
  ({ "--card-anchor": `calc(${100 - CARD_EDGE_PERCENT}% + ${gap})` }) as React.CSSProperties;
export const belowCard = (gap: string) =>
  ({ "--card-anchor": `calc(${100 - CARD_EDGE_PERCENT}% + ${gap})` }) as React.CSSProperties;
