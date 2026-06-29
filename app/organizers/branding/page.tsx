"use client";

import DesktopSidebar from "../../../components/DesktopSidebar";
import MobileNavbar from "../../../components/MobileNavbar";

export default function OrganizerDocs() {
  return (
    <div
      className="flex min-h-screen lg:overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/sand.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DesktopSidebar />
      {/* desktop content */}
      <div className="max-lg:hidden">
        <div className="flex flex-1 flex-col h-full"></div>
      </div>
      {/* mobile content */}
      <div className="lg:hidden">hi</div>
      <MobileNavbar />
    </div>
  );
}
