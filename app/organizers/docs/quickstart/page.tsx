import DocsSidebar from "../../../../components/DocsSidebar"
import MobileNavbar from "../../../../components/MobileNavbar"
import GuideContent from "../../../ultimateguide/GuideContent"

export default function DocsQuickstart() {
  return (
    <div
      className="flex min-h-screen lg:overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/sand.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{position: "fixed", zIndex: 100}}>
        <DocsSidebar />
        <MobileNavbar />
      </div>

      <div className="lg:ml-[15vw]">
        <GuideContent />
      </div>
    </div>
  );
}

