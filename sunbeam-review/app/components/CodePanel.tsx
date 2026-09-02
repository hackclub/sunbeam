import FileContentViewer from "@/app/components/FileContentViewer";

// The file tree lives in the commits sidebar now — this panel just shows whichever file is
// currently selected there, filling the full column.
export default function CodePanel({
  codeUrl,
  gitRef,
  selectedPath,
}: {
  codeUrl: string | null;
  gitRef: string | null;
  selectedPath: string | null;
}) {
  return <FileContentViewer codeUrl={codeUrl} gitRef={gitRef} selectedPath={selectedPath} />;
}
