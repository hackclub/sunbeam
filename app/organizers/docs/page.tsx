"use client";

import MobileNavbar from "../../../components/MobileNavbar";
// import Link from "next/link";
// import { useState } from "react";
import DocsSidebar from "../../../components/DocsSidebar"

export default function OrganizerDocs() {
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
      <div className="lg:hidden">hi</div>
      <MobileNavbar />
    </div>
  );
}
