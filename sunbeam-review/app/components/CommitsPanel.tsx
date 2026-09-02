"use client";

import { useEffect, useState } from "react";
import type { Commit, GithubFailureReason } from "@/app/lib/github";
import type { ProjectDTO } from "@/app/lib/airtable";
import FileTree from "@/app/components/FileTree";

type State =
  | { status: "loading" }
  | { status: "ok"; commits: Commit[] }
  | { status: "empty"; reason: GithubFailureReason };

const EMPTY_MESSAGES: Record<GithubFailureReason, string> = {
  "not-a-github-url": "no commit data available (code URL isn't a github.com repo)",
  "repo-not-found": "no commit data available (repo not found)",
  "rate-limited-or-forbidden": "no commit data available (rate limited)",
  "empty-repo": "no commit data available (repo has no commits)",
  "file-too-large": "no commit data available",
  "unknown-error": "no commit data available",
};

// Callers remount this component (via a `key` on project id) when the project changes, so state
// naturally resets to "loading" without an imperative reset inside the effect.
export default function CommitsPanel({
  project,
  selectedFilePath,
  onSelectFile,
  selectedRef,
  onSelectRef,
}: {
  project: ProjectDTO;
  selectedFilePath: string | null;
  onSelectFile: (path: string) => void;
  selectedRef: string | null;
  onSelectRef: (sha: string | null) => void;
}) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/commits?codeUrl=${encodeURIComponent(project.codeUrl ?? "")}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok) setState({ status: "ok", commits: data.commits });
        else setState({ status: "empty", reason: data.reason ?? "unknown-error" });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "empty", reason: "unknown-error" });
      });

    return () => {
      cancelled = true;
    };
  }, [project.codeUrl]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-medium text-neutral-500">commits</h2>
          {selectedRef && (
            <button
              type="button"
              onClick={() => onSelectRef(null)}
              className="text-xs text-neutral-500 underline hover:text-neutral-700"
            >
              reset to latest
            </button>
          )}
        </div>
        {state.status === "loading" && <p className="text-sm text-neutral-400">loading…</p>}
        {state.status === "empty" && <p className="text-sm text-neutral-400">{EMPTY_MESSAGES[state.reason]}</p>}
        {state.status === "ok" && (
          <ul className="space-y-1">
            {state.commits.map((commit) => (
              <li key={commit.sha}>
                {/* A div (not a button) so the nested GitHub link stays valid HTML — buttons
                    can't contain interactive descendants like anchors. */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectRef(commit.sha)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectRef(commit.sha);
                    }
                  }}
                  title="browse the repo as it was at this commit"
                  className={`cursor-pointer rounded p-1.5 text-sm hover:bg-neutral-100 ${
                    selectedRef === commit.sha ? "bg-neutral-100" : ""
                  }`}
                >
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-xs text-neutral-500 hover:underline"
                  >
                    {commit.sha.slice(0, 7)}
                  </a>
                  <p className="line-clamp-2">{commit.message}</p>
                  <p className="text-xs text-neutral-400">{commit.author}</p>
                </div>
              </li>
            ))}
            {state.commits.length === 0 && <p className="text-sm text-neutral-400">no commits found</p>}
          </ul>
        )}
      </div>

      <div className="pt-4 border-t">
        <FileTree codeUrl={project.codeUrl} gitRef={selectedRef} selectedPath={selectedFilePath} onSelectFile={onSelectFile} />
      </div>

      <div className="pt-4 border-t flex flex-col gap-3">
        {project.codeUrl ? (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block w-fit rounded-full border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-50"
          >
            open repository ↗
          </a>
        ) : (
          <p className="text-xs text-neutral-400">no code URL provided</p>
        )}
        {project.description && (
          <div>
            <h3 className="text-xs font-medium text-neutral-500 mb-1">description</h3>
            <p className="text-xs whitespace-pre-wrap text-neutral-600">{project.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
