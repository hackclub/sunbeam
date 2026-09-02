"use client";

import { useEffect, useState } from "react";
import type { FileTreeNode, GithubFailureReason } from "@/app/lib/github";

type TreeState =
  | { status: "loading" }
  | { status: "ok"; tree: FileTreeNode[]; truncated: boolean }
  | { status: "empty"; reason: GithubFailureReason };

const TREE_EMPTY_MESSAGES: Record<GithubFailureReason, string> = {
  "not-a-github-url": "no files available (code URL isn't a github.com repo)",
  "repo-not-found": "no files available (repo not found)",
  "rate-limited-or-forbidden": "no files available (rate limited)",
  "empty-repo": "repo has no files",
  "file-too-large": "no files available",
  "unknown-error": "no files available",
};

function FileTreeNodes({
  nodes,
  depth,
  expanded,
  onToggle,
  selectedPath,
  onSelectFile,
}: {
  nodes: FileTreeNode[];
  depth: number;
  expanded: Set<string>;
  onToggle: (path: string) => void;
  selectedPath: string | null;
  onSelectFile: (path: string) => void;
}) {
  // Cap how far indentation can grow — in a narrow sidebar box, uncapped per-level indent
  // eats all the width by 4-5 levels deep and leaves no room for the name itself.
  const indent = `${Math.min(depth, 5) * 8 + 2}px`;

  return (
    <>
      {nodes.map((node) =>
        node.type === "file" ? (
          <button
            key={node.path}
            type="button"
            onClick={() => onSelectFile(node.path)}
            title={node.path}
            style={{ paddingLeft: indent }}
            className={`block w-full rounded px-1 py-0.5 text-left text-xs leading-snug break-words hover:bg-neutral-100 ${
              selectedPath === node.path ? "bg-neutral-100 font-medium" : ""
            }`}
          >
            {node.name}
          </button>
        ) : (
          <div key={node.path}>
            <button
              type="button"
              onClick={() => onToggle(node.path)}
              style={{ paddingLeft: indent }}
              className="block w-full rounded px-1 py-0.5 text-left text-xs leading-snug break-words font-medium hover:bg-neutral-100"
            >
              {expanded.has(node.path) ? "▾" : "▸"} {node.name}/
            </button>
            {expanded.has(node.path) && node.children && (
              <FileTreeNodes
                nodes={node.children}
                depth={depth + 1}
                expanded={expanded}
                onToggle={onToggle}
                selectedPath={selectedPath}
                onSelectFile={onSelectFile}
              />
            )}
          </div>
        )
      )}
    </>
  );
}

// Callers remount this component (via a `key` on project id, further up the tree) when the
// project changes, so state naturally resets instead of needing an imperative reset effect.
export default function FileTree({
  codeUrl,
  gitRef,
  selectedPath,
  onSelectFile,
}: {
  codeUrl: string | null;
  gitRef: string | null;
  selectedPath: string | null;
  onSelectFile: (path: string) => void;
}) {
  const [treeState, setTreeState] = useState<TreeState>({ status: "loading" });
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    const refParam = gitRef ? `&ref=${encodeURIComponent(gitRef)}` : "";
    fetch(`/api/repo-tree?codeUrl=${encodeURIComponent(codeUrl ?? "")}${refParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok) setTreeState({ status: "ok", tree: data.tree, truncated: data.truncated });
        else setTreeState({ status: "empty", reason: data.reason ?? "unknown-error" });
      })
      .catch(() => {
        if (!cancelled) setTreeState({ status: "empty", reason: "unknown-error" });
      });

    return () => {
      cancelled = true;
    };
  }, [codeUrl, gitRef]);

  function toggle(path: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  return (
    <div>
      <h2 className="text-xs font-medium text-neutral-500 mb-2">
        files{gitRef && <span className="font-normal text-neutral-400"> @ {gitRef.slice(0, 7)}</span>}
      </h2>
      {treeState.status === "loading" && <p className="text-sm text-neutral-400">loading files…</p>}
      {treeState.status === "empty" && <p className="text-sm text-neutral-400">{TREE_EMPTY_MESSAGES[treeState.reason]}</p>}
      {treeState.status === "ok" && (
        <>
          <div className="max-h-64 overflow-y-auto rounded border border-neutral-200 p-1">
            <FileTreeNodes
              nodes={treeState.tree}
              depth={0}
              expanded={expanded}
              onToggle={toggle}
              selectedPath={selectedPath}
              onSelectFile={onSelectFile}
            />
          </div>
          {treeState.truncated && <p className="mt-1 text-xs text-neutral-400">repo is large — showing a partial file list</p>}
        </>
      )}
    </div>
  );
}
