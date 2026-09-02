"use client";

import { useRef, useState } from "react";
import type { ProjectDTO } from "@/app/lib/airtable";
import CommitsPanel from "@/app/components/CommitsPanel";
import CodePanel from "@/app/components/CodePanel";
import DemoPanel from "@/app/components/DemoPanel";
import ReviewForm from "@/app/components/ReviewForm";

// Percentages (must sum to 100) for commits / code / demo / info, matching the wireframe's
// proportions. Resizing a divider trades width between its two neighbors, so the total is
// always 100% regardless of window width.
const DEFAULT_WIDTHS = [18, 30, 30, 22];
const MIN_PERCENT = 10;

function ColumnDivider({ onPointerDown }: { onPointerDown: (e: React.PointerEvent) => void }) {
  return (
    <div
      onPointerDown={onPointerDown}
      className="group w-3 shrink-0 cursor-col-resize flex justify-center"
    >
      <div className="w-px h-full bg-neutral-200 group-hover:bg-neutral-400" />
    </div>
  );
}

export default function ReviewQueue({ initialProject }: { initialProject: ProjectDTO | null }) {
  const [project, setProject] = useState(initialProject);
  const [loadingNext, setLoadingNext] = useState(false);
  const [widths, setWidths] = useState(DEFAULT_WIDTHS);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [selectedRef, setSelectedRef] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  async function loadProject(url: string) {
    setLoadingNext(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProject(data.project ?? null);
      setSelectedFilePath(null);
      setSelectedRef(null);
    } finally {
      setLoadingNext(false);
    }
  }

  function advance() {
    return loadProject("/api/next-project");
  }

  function skip() {
    if (!project) return Promise.resolve();
    return loadProject(`/api/skip-project?excludeGroupKey=${encodeURIComponent(project.groupKey)}`);
  }

  function startDrag(index: number) {
    return (e: React.PointerEvent) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const startX = e.clientX;
      const startLeft = widths[index];
      const startRight = widths[index + 1];
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      function handleMove(ev: PointerEvent) {
        const deltaPercent = ((ev.clientX - startX) / container!.clientWidth) * 100;
        let left = startLeft + deltaPercent;
        let right = startRight - deltaPercent;
        if (left < MIN_PERCENT) {
          right -= MIN_PERCENT - left;
          left = MIN_PERCENT;
        }
        if (right < MIN_PERCENT) {
          left -= MIN_PERCENT - right;
          right = MIN_PERCENT;
        }
        setWidths((prev) => {
          const next = [...prev];
          next[index] = left;
          next[index + 1] = right;
          return next;
        });
      }

      function handleUp() {
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
      }

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    };
  }

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-center py-4 text-2xl font-semibold shrink-0">#sunbeam review</h1>

      {loadingNext && (
        <div className="flex-1 flex items-center justify-center text-neutral-400">loading next project…</div>
      )}

      {!loadingNext && !project && (
        <div className="flex-1 flex items-center justify-center text-neutral-500">
          no more projects to review 🎉
        </div>
      )}

      {!loadingNext && project && (
        <div ref={containerRef} className="flex flex-1 min-h-0 border-t">
          <aside
            key={`commits-${project.groupKey}`}
            style={{ flex: `0 0 ${widths[0]}%` }}
            className="min-w-0 overflow-y-auto p-4"
          >
            <CommitsPanel
              project={project}
              selectedFilePath={selectedFilePath}
              onSelectFile={setSelectedFilePath}
              selectedRef={selectedRef}
              onSelectRef={setSelectedRef}
            />
          </aside>
          <ColumnDivider onPointerDown={startDrag(0)} />

          <section
            key={`code-${project.groupKey}`}
            style={{ flex: `0 0 ${widths[1]}%` }}
            className="min-w-0 overflow-y-auto p-4"
          >
            <CodePanel codeUrl={project.codeUrl} gitRef={selectedRef} selectedPath={selectedFilePath} />
          </section>
          <ColumnDivider onPointerDown={startDrag(1)} />

          <section
            key={`demo-${project.groupKey}`}
            style={{ flex: `0 0 ${widths[2]}%` }}
            className="min-w-0 overflow-y-auto p-4"
          >
            <DemoPanel playableUrl={project.playableUrl} />
          </section>
          <ColumnDivider onPointerDown={startDrag(2)} />

          <aside
            key={`info-${project.groupKey}`}
            style={{ flex: `0 0 ${widths[3]}%` }}
            className="min-w-0 overflow-y-auto p-4"
          >
            <ReviewForm project={project} onSubmitted={advance} onSkip={skip} />
          </aside>
        </div>
      )}
    </div>
  );
}
