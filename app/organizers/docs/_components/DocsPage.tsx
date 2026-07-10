import DocsSidebar from "../../../../components/DocsSidebar"
import MobileNavbar from "../../../../components/MobileNavbar"

export default function DocsPage({children}: {children: React.ReactNode}) {
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
      <MobileNavbar />
      <div className="flex flex-1 overflow-y-auto flex-col h-full min-h-0 items-center">
        <div
          className="flex flex-1 flex-col"
          style={{
            fontSize: "max(min(1vw, 10px), 8px)",
            width: "100%",
            maxWidth: "1000px",
            padding: "max(1em, 12px)",
            backgroundColor: "rgb(250,240,212)",
            backgroundImage: "url('/imgs/sand4.webp')",
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat-y",
          }}
        >
          {children}
          <div className="h-33 sm:h-46 lg:h-0 shrink-0" />
        </div>
      </div>
    </div>
  );
}