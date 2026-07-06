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

      <div className="flex flex-col flex-1 gap-4 p-4 pb-48 lg:pb-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* slack */}
          <div className="w-full lg:w-1/2 flex flex-col lg:min-h-0">
            <br />
            <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto boardwalk lg:p-6 flex flex-col">
              <h1 className="shrink-0 text-3xl 2xl:text-5xl galindo text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-dark">
                1. Slack
              </h1>
              <p className="text-blue-dark outfit lg:text-lg 2xl:text-2xl text-pretty leading-relaxed">
                For any general questions please use the slack channels! <br />
                <a href="https://app.slack.com/client/E09V59WQY1E/C0BERFQND0U" target="_blank" className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 hover:bg-blue-bright/25 hover:outline-2 hover:m-2 duration-200 rounded-xl text-nowrap">#sunbeam-organizers</a>{" "}
                and
                <a href="https://app.slack.com/client/E09V59WQY1E/C0BEJF0K8G5" target="_blank" className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 hover:bg-blue-bright/25 hover:outline-2 hover:m-2 duration-200 rounded-xl text-nowrap">#sunbeam-help</a>{" "}
                <br />
              </p>
              <p className="outfit lg:text-lg 2xl:text-2xl text-pretty leading-relaxed">
                Expected Response Time: 24h on workdays <br />
              </p>
              <p className="text-pink-dark outfit lg:text-lg 2xl:text-2xl text-pretty leading-relaxed">
                This should be your first place to go if you have any questions!
              </p>
            </div>
          </div>

          {/* email */}
          <div className="w-full lg:w-1/2 flex flex-col lg:min-h-0">
            <br />
            <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto boardwalk lg:p-6 flex flex-col">
              <h1 className="shrink-0 text-3xl 2xl:text-5xl galindo text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-dark">
                2. Email
              </h1>
              <p className="text-blue-dark outfit lg:text-lg 2xl:text-2xl text-pretty leading-relaxed">
                For questions that need more context or need to be private email us! <br />
                <span className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 rounded-xl text-nowrap">sunbeam@hackclub.com</span>
              </p>
              <p className="outfit lg:text-lg 2xl:text-2xl text-pretty leading-relaxed">
                Expected Response Time: 48h on workdays <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
