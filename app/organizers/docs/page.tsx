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
        backgroundImage: "url('/imgs/sand.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DocsSidebar />
      {/* desktop content */}
      <div className="max-lg:hidden flex items-center justify-center h-screen text-center px-[5%]" style={{ fontSize: "20px", fontWeight: 400, color: "#2E599C", lineHeight: 1.6 }}>
        <div className="flex flex-1 flex-col h-full">


          <p style={{ fontSize: "2.33vw", fontWeight: 400, color: "#2E599C", lineHeight: 1.6, marginLeft: "3vw", paddingTop: "20%", textAlign: "center"}}>
            Click on one of the resources on the <br/>right to view the documents. 
          </p>


        </div>
      </div>

      {/* mobile content */}
      <div className="lg:hidden flex items-center justify-center h-screen text-center px-[5%]" style={{ fontSize: "20px", fontWeight: 400, color: "#2E599C", lineHeight: 1.6 }}>
        <p>Please view this tab on a computer to see every document.</p>
      </div>
      <MobileNavbar />
    </div>
  );
}
