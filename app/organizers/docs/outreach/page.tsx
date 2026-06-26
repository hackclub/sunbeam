import DocsSidebar from "../../../../components/DocsSidebar"

export default function DocsOutreach() {
  return (
    <div
      className="flex min-h-screen lg:overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/sand.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DocsSidebar />
      {/* desktop content */}
      <div className="max-lg:hidden">
        <div className="flex flex-1 flex-col h-full"></div>
      </div>
      {/* mobile content */}
      <div className="lg:hidden">outreach</div>
    </div>
  );
}
