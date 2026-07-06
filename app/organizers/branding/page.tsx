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
      <MobileNavbar />

      <div className="flex flex-col lg:flex-row gap-4 lg:justify-center flex-1 p-4 pb-48 lg:pb-4">
        {/* assets */}
        <div className="w-full lg:w-2/5 flex flex-col duration-200 hover:scale-102 lg:min-h-0">
          <div className="glassbox-clear lg:p-6 lg:max-h-48 lg:flex-1 lg:min-h-0 flex justify-items-center rounded-t-2xl">
            <img
              src="/imgs/ray1.webp"
              alt=""
              className="mx-auto lg:p-3 max-h-32 lg:max-h-48 object-contain"
            />
          </div>
          <div className="glassbox-white flex flex-col p-6 rounded-b-2xl text-center shrink-0">
            <a
              href="https://www.figma.com/design/9h75Cd5EZO12cvuwsPUfSC/Sunbeam-Assets?node-id=0-1&t=XgXWtlFAIKuTMWWi-1"
              className="galindo text-xl 2xl:text-3xl text-orange-dark underline hover:decoration-wavy"
            >
              Asset Guide Link
            </a>
          </div>
        </div>

        {/* insta templates */}
        <div className="w-full lg:w-2/5 flex flex-col duration-200 hover:scale-102 lg:min-h-0">
          <div className="glassbox-clear lg:p-6 lg:max-h-48 lg:flex-1 lg:min-h-0 flex justify-items-center rounded-t-2xl">
            <img
              src="/imgs/shark1.webp"
              alt=""
              className="mx-auto lg:p-3 max-h-32 lg:max-h-48 object-contain"
            />
          </div>
          <div className="glassbox-white flex flex-col p-6 rounded-b-2xl text-center shrink-0">
            <a
              href="placeholder"
              className="galindo text-xl 2xl:text-3xl text-orange-dark underline hover:decoration-wavy"
            >
              Instragram Post Templates Link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
