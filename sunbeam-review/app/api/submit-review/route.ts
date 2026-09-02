import { createSubmissionsForGroup } from "@/app/lib/airtable";
import { getUsername } from "@/app/lib/session";

export async function POST(request: Request) {
  const username = await getUsername();
  if (!username) return Response.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const { groupKey, technicalFeatures, overrideHoursSpent, additionalJustification, alternateTrackingMethod } =
    body ?? {};

  if (typeof groupKey !== "string" || groupKey.length === 0) {
    return Response.json({ error: "groupKey is required" }, { status: 400 });
  }
  if (typeof technicalFeatures !== "string" || technicalFeatures.trim().length === 0) {
    return Response.json({ error: "technicalFeatures is required" }, { status: 400 });
  }
  const hours = Number(overrideHoursSpent);
  if (!Number.isFinite(hours) || hours < 0) {
    return Response.json({ error: "overrideHoursSpent must be a non-negative number" }, { status: 400 });
  }

  const reviewerFields: Record<string, unknown> = {
    "Optional - Override Hours Spent": hours,
    "Justification - Specific Technical Features": technicalFeatures.trim(),
  };
  if (typeof additionalJustification === "string" && additionalJustification.trim().length > 0) {
    reviewerFields["Justification - Additional Justification"] = additionalJustification.trim();
  }
  if (typeof alternateTrackingMethod === "string" && alternateTrackingMethod.trim().length > 0) {
    reviewerFields["Justification - Alternate Tracking Method"] = alternateTrackingMethod.trim();
  }

  try {
    // Re-fetches every group member server-side (never trusts a client-submitted member list)
    // and creates one submission per teammate who doesn't already have one.
    const { created, alreadyReviewed, droppedFields } = await createSubmissionsForGroup(
      groupKey,
      reviewerFields,
      username
    );
    return Response.json({ ok: true, created, alreadyReviewed, droppedFields });
  } catch (err) {
    console.error("[submit-review] Airtable error:", err);
    return Response.json({ error: "Failed to save review" }, { status: 500 });
  }
}
