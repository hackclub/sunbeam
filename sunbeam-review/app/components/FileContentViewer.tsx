"use client";

import { useEffect, useState } from "react";
import type { GithubFailureReason } from "@/app/lib/github";

type FileResult =
  | { path: string; gitRef: string | null; kind: "text"; content: string; truncated: boolean }
  | { path: string; gitRef: string | null; kind: "binary" }
  | { path: string; gitRef: string | null; kind: "error"; reason: GithubFailureReason };

const FILE_ERROR_MESSAGES: Record<GithubFailureReason, string> = {
  "not-a-github-url": "couldn't load file",
  "repo-not-found": "file not found",
  "rate-limited-or-forbidden": "rate limited",
  "empty-repo": "couldn't load file",
  "file-too-large": "file is too large to preview here — open it on GitHub instead",
  "unknown-error": "couldn't load file",
};

export default function FileContentViewer({
  codeUrl,
  gitRef,
  selectedPath,
}: {
  codeUrl: string | null;
  gitRef: string | null;
  selectedPath: string | null;
}) {
  const [result, setResult] = useState<FileResult | null>(null);

  useEffect(() => {
    if (!selectedPath) return;
    let cancelled = false;

    const refParam = gitRef ? `&ref=${encodeURIComponent(gitRef)}` : "";
    fetch(`/api/repo-file?codeUrl=${encodeURIComponent(codeUrl ?? "")}&path=${encodeURIComponent(selectedPath)}${refParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok && data.kind === "text") {
          setResult({ path: selectedPath, gitRef, kind: "text", content: data.content, truncated: data.truncated });
        } else if (data.ok && data.kind === "binary") {
          setResult({ path: selectedPath, gitRef, kind: "binary" });
        } else {
          setResult({ path: selectedPath, gitRef, kind: "error", reason: data.reason ?? "unknown-error" });
        }
      })
      .catch(() => {
        if (!cancelled) setResult({ path: selectedPath, gitRef, kind: "error", reason: "unknown-error" });
      });

    return () => {
      cancelled = true;
    };
  }, [codeUrl, gitRef, selectedPath]);

  // "Loading" is derived by comparing the last-fetched result's path+ref against the current
  // selection, rather than an extra bit of state set synchronously at the top of the effect.
  const isLoading = selectedPath !== null && (result?.path !== selectedPath || result?.gitRef !== gitRef);

  return (
    <div className="h-full flex flex-col gap-2">
      <h2 className="text-xs font-medium text-neutral-500 shrink-0">
        github/code{gitRef && <span className="font-normal text-neutral-400"> @ {gitRef.slice(0, 7)}</span>}
      </h2>
      <div className="flex-1 min-h-0 overflow-auto rounded border border-neutral-200 bg-neutral-50 p-3">
        {!selectedPath && <p className="text-sm text-neutral-400">select a file from the sidebar to view its contents</p>}
        {selectedPath && (
          <>
            <p className="mb-2 truncate font-mono text-xs text-neutral-500" title={selectedPath}>
              {selectedPath}
            </p>
            {isLoading && <p className="text-sm text-neutral-400">loading…</p>}
            {!isLoading && result?.kind === "binary" && <p className="text-sm text-neutral-400">binary file, can&apos;t preview</p>}
            {!isLoading && result?.kind === "error" && <p className="text-sm text-neutral-400">{FILE_ERROR_MESSAGES[result.reason]}</p>}
            {!isLoading && result?.kind === "text" && (
              <>
                <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">{result.content}</pre>
                {result.truncated && <p className="mt-2 text-xs text-neutral-400">file truncated for preview</p>}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
