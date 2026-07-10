"use client";

import DocsSidebar from "./DocsSidebar"
import DocsMobileNavbar from "./DocsMobileNavbar"

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
      <DocsMobileNavbar />
      <div className="flex flex-1 overflow-y-auto flex-col h-full min-h-0 items-center">
        <div
          className="flex flex-1 flex-col mb-33 sm:mb-46 lg:mb-0 outfit"
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
        </div>
      </div>
    </div>
  );
}