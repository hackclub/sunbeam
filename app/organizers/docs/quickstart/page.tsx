import DocsSidebar from "../../../../components/DocsSidebar"
import MobileNavbar from "../../../../components/MobileNavbar"
import GuideContent from "../../../apply/GuideContent"

export default function DocsQuickstart() {
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
      <div className="max-lg:hidden flex-1 h-screen overflow-y-auto">
        <GuideContent />
      </div>
      {/* mobile content */}
      <div className="lg:hidden"><GuideContent /></div>
      <MobileNavbar />
    </div>
  );
}

