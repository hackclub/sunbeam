import DocsSidebar from "../../../../components/DocsSidebar"
import MobileNavbar from "../../../../components/MobileNavbar"
import GuideContent from "../../../ultimateguide/GuideContent"

export default function DocsQuickstart() {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/sand.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DocsSidebar />

      {/* desktop content */}
      <div className="max-lg:hidden flex-1 overflow-y-auto">
        <GuideContent />
      </div>
      {/* mobile content */}
      <div className="lg:hidden flex-1 overflow-y-auto pb-48">
        <GuideContent />
      </div>

      <MobileNavbar />
    </div>
  );
}

