export function eventDisplayName(slug: string | null): string {
  if (!slug) return "sunbeam event";
  return `sunbeam ${slug.split("-").join(" ")}`;
}

export function composeJustification(params: {
  eventName: string;
  submitterName: string;
  hours: number | string;
  technicalFeatures: string;
}): string {
  const { eventName, submitterName, hours, technicalFeatures } = params;
  return `a ${eventName} event made by ${submitterName || "the submitter"}, who coded for ${hours || "?"} hours. technical features: ${technicalFeatures || "*insert technical features above*"}`;
}


export function composeAlternateJustification(params: {
  eventName: string;
  submitterName: string;
  hours: number | string;
}): string {
  const { eventName, submitterName, hours } = params;
return `coded in person at sunbeam ${eventName} on 8/29/26`;
}