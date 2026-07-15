"use client";

import DesktopSidebar from "../../../components/DesktopSidebar";
import MobileNavbar from "../../../components/MobileNavbar";

export default function OrganizerDocs() {
  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: "url('/imgs/sand.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex flex-col flex-1 gap-4 p-4 pb-48 lg:pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* slack */}
          <div className="w-full flex flex-col lg:min-h-0">
            <br />
            <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto boardwalk p-4 lg:p-10 2xl:p-14 flex flex-col">
              <h1 className="shrink-0 text-4xl 2xl:text-6xl galindo text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-dark">
                1. Slack
              </h1>
              <p className="text-blue-dark outfit lg:text-xl 2xl:text-3xl text-pretty leading-relaxed">
                For any general questions please use the slack channels! <br />
                <a href="https://app.slack.com/client/E09V59WQY1E/C0BERFQND0U" target="_blank" className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 hover:bg-blue-bright/25 hover:outline-2 hover:m-2 duration-200 rounded-xl text-nowrap">#sunbeam-organizers</a>{" "}
                and
                <a href="https://app.slack.com/client/E09V59WQY1E/C0BEJF0K8G5" target="_blank" className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 hover:bg-blue-bright/25 hover:outline-2 hover:m-2 duration-200 rounded-xl text-nowrap">#sunbeam-help</a>{" "}
                <br />
              </p>
              <p className="outfit lg:text-xl 2xl:text-3xl text-pretty leading-relaxed">
                <br/>Expected Response Time: 24h on workdays <br /> <br/>
              </p>
              <p className="text-pink-dark outfit lg:text-lg 2xl:text-2xl text-pretty leading-relaxed">
                This should be your first place to go if you have any questions!
              </p>
            </div>
          </div>

          {/* email */}
          <div className="w-full flex flex-col lg:min-h-0">
            <br />
            <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto boardwalk p-4 lg:p-10 2xl:p-14 flex flex-col">
              <h1 className="shrink-0 text-4xl 2xl:text-6xl galindo text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-dark">
                2. Email
              </h1>
              <p className="text-blue-dark outfit lg:text-xl 2xl:text-3xl text-pretty leading-relaxed">
                For questions that need more context or need to be private email us! <br />
                <span className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 rounded-xl text-nowrap">sunbeam@hackclub.com</span>
              </p>
              <p className="outfit lg:text-xl 2xl:text-3xl text-pretty leading-relaxed">
                <br/>Expected Response Time: 48h on workdays <br />
              </p>
            </div>
          </div>

          {/* calll */}
          <div className="w-full flex flex-col lg:min-h-0">
            <br />
            <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto boardwalk p-4 lg:p-10 2xl:p-14 flex flex-col">
              <h1 className="shrink-0 text-4xl 2xl:text-6xl galindo text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-dark">
                3. Call
              </h1>
              <p className="text-blue-dark outfit lg:text-xl 2xl:text-3xl text-pretty leading-relaxed">
                Should be for questions where an email does not suffice. <br/> This is a 15-30 min call where we can go over anything one-on-one. <br />
              </p>
              <p className="outfit lg:text-xl 2xl:text-3xl text-pretty leading-relaxed">
                <br/>Reserve a call 
                <a href="https://calendar.app.google/VtY1PiKRwYvZGY196" target="_blank" className="galindo text-xl 2xl:text-3xl text-orange-dark underline hover:decoration-wavy"
                > HERE!</a>{" "}
                 <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
