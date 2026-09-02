"use client";

import { useEffect, useRef, useState } from "react";

// onError doesn't reliably fire when a host blocks framing via X-Frame-Options/CSP — a load
// event does fire either way, so we fall back to a link if load never happens in time. Callers
// remount this component (via a `key` on project id) when the project changes, so state resets.
export default function DemoPanel({ playableUrl }: { playableUrl: string | null }) {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!playableUrl) return;

    timeoutRef.current = setTimeout(() => setTimedOut(true), 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [playableUrl]);

  return (
    <div className="h-full flex flex-col gap-2">
      <h2 className="text-xs font-medium text-neutral-500">
        {playableUrl ? (
          <a href={playableUrl} target="_blank" rel="noreferrer" className="hover:underline">
            demo ↗
          </a>
        ) : (
          "demo"
        )}
      </h2>
      {!playableUrl && <p className="text-sm text-neutral-400">no playable URL provided</p>}
      {playableUrl && (
        <>
          {(!loaded && timedOut) && (
            <a href={playableUrl} target="_blank" rel="noreferrer" className="text-sm underline">
              open demo in new tab ↗ (embed unavailable)
            </a>
          )}
          <iframe
            key={playableUrl}
            src={playableUrl}
            title="demo"
            className="w-full flex-1 border rounded"
            onLoad={() => {
              setLoaded(true);
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
          />
        </>
      )}
    </div>
  );
}
