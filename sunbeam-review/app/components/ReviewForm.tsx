"use client";

import { useState } from "react";
import type { ProjectDTO } from "@/app/lib/airtable";
import { composeJustification, eventDisplayName, composeAlternateJustification } from "@/app/lib/format";

// The parent remounts this component (via a `key` on project groupKey) whenever the queue
// advances, so state naturally resets per project without an imperative reset effect.
export default function ReviewForm({
  project,
  onSubmitted,
  onSkip,
}: {
  project: ProjectDTO;
  onSubmitted: () => void;
  onSkip: () => Promise<void>;
}) {
  const eventName = eventDisplayName(project.eventSlug);
  const memberNames = project.members.map((m) => [m.firstName, m.lastName].filter(Boolean).join(" ")).filter(Boolean);
  const submitterName = memberNames.join(", ");

  const [hours, setHours] = useState(String(project.members[0]?.optionalOverrideHoursSpent ?? ""));
  const [technicalFeatures, setTechnicalFeatures] = useState("");
  const [justificationOverride, setJustificationOverride] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The justification is derived from the other fields as a starting point; once the reviewer
  // edits it directly, their edit wins instead of being overwritten on every keystroke elsewhere.
  const justification =
    justificationOverride ?? composeJustification({ eventName, submitterName, hours, technicalFeatures });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!technicalFeatures.trim()) {
      setError("technical features is required");
      return;
    }
    const hoursNumber = Number(hours);
    if (!Number.isFinite(hoursNumber) || hoursNumber < 0) {
      setError("hours must be a non-negative number");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupKey: project.groupKey,
          technicalFeatures,
          overrideHoursSpent: hoursNumber,
          additionalJustification: justification,
          alternateTrackingMethod: composeAlternateJustification({ eventName, submitterName, hours: hoursNumber }),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "failed to submit review");
      }
      onSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSkip() {
    setSkipping(true);
    try {
      await onSkip();
    } finally {
      setSkipping(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-medium text-neutral-500">info</h2>
        <button
          type="button"
          onClick={handleSkip}
          disabled={skipping || submitting}
          title="not reviewing this one — jump to a random unreviewed project instead"
          className="text-xs text-neutral-500 underline hover:text-neutral-700 disabled:opacity-50"
        >
          {skipping ? "skipping…" : "skip → random project"}
        </button>
      </div>

      {project.members.length > 1 && (
        <p className="text-xs text-neutral-500">
          team ({project.members.length}): {memberNames.join(", ") || "unnamed"} — submitting this review creates a
          record for each of them.
        </p>
      )}

      <div>
        <label className="block text-sm mb-1">
          {eventName} hours:
          <input
            type="number"
            min={0}
            step="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="ml-2 w-20 rounded border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900"
          />
        </label>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <label className="text-sm mb-1" htmlFor="technical-features">
          technical features:
        </label>
        <textarea
          id="technical-features"
          value={technicalFeatures}
          onChange={(e) => setTechnicalFeatures(e.target.value)}
          className="flex-1 min-h-24 rounded border border-neutral-300 bg-white p-2 text-sm text-neutral-900"
          placeholder="what did they build, technically?"
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <label className="text-sm mb-1" htmlFor="justification">
          justification
        </label>
        <textarea
          id="justification"
          value={justification}
          onChange={(e) => setJustificationOverride(e.target.value)}
          className="flex-1 min-h-32 rounded border border-neutral-300 bg-white p-2 text-sm text-neutral-900"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting || skipping}
        className="rounded-full bg-black text-white px-4 py-2 text-sm disabled:opacity-50"
      >
        {submitting ? "submitting…" : "confirm & submit"}
      </button>
    </form>
  );
}
