import DocsSidebar from "../../../../components/DocsSidebar"

export default function DocsVenue() {
  return (
    <div
      className="flex min-h-screen lg:overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/sand.webp')",
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
      <div className="lg:hidden">venue</div>
    </div>
  );
}
