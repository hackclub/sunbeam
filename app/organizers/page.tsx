"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useState } from "react";

export function DesktopSidebar() {
  const [sidebarClosed, setSidebarClosed] = useState(false);

  return (
    <div
      className={
        sidebarClosed
          ? "max-lg:hidden w-1/12 transition-all duration-500 ease-in-out"
          : "max-lg:hidden w-1/3 h-screen flex flex-col lg:px-4 2xl:px-9 lg:py-8 2xl:py-12 gap-8 2xl:gap-10 transition-all duration-500 ease-in-out"
      }
      style={{
        backgroundImage: "url('/imgs/sidebar-water-desktop.png')",
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
    >
      <div
        className={
          sidebarClosed
            ? "opacity-0 hidden"
            : "opacity-100 transition-all duration-500 ease-in-out flex flex-col gap-8 2xl:gap-10"
        }
      >
        <Link href="/">
          <img
            src="/imgs/logo_orgportal.png"
            className="w-3/4 hover:scale-105 duration-200"
          ></img>
        </Link>
        <SidebarItem href="/organizers" text="Home" />
        <SidebarItem href="/organizers/docs" text="Docs" />
        <SidebarItem href="/organizers/resources" text="More Resources" />
        <SidebarItem
          href="/organizers/branding"
          text="Branding & Social Media"
        />
        <SidebarItem href="/organizers/contact-hq" text="Contact HQ" />
      </div>
      <button
        onClick={() => setSidebarClosed(!sidebarClosed)}
        className={
          sidebarClosed
            ? "absolute bottom-12 w-1/5 transition-all duration-500 ease-in-out focus:outline-none"
            : "absolute focus:outline-none bottom-12 w-5/16 transition-all duration-500 ease-in-out"
        }
      >
        <img
          src={sidebarClosed ? "/imgs/ray_open.png" : "/imgs/ray_back.png"}
          alt=""
          className="w-5/8 -m-6 hover:translate-x-5 duration-200"
        ></img>
      </button>
    </div>
  );
}

export function MobileNavbar() {
  return (
    <div>
      <nav
        className="fixed pt-24 bottom-0 left-0 right-0 lg:hidden z-50"
        style={{
          backgroundImage: "url('/imgs/sidebar-water-mobile.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="flex items-center justify-around py-3 px-4">
          <Link href="/organizers/docs">
            <img
              src="/imgs/mobile-icon-docs.png"
              alt="Docs"
              className="h-12 hover:scale-110 duration-200"
            />
          </Link>
          <Link href="/organizers/resources">
            <img
              src="/imgs/mobile-icon-resources.png"
              alt="More Resources"
              className="h-12 hover:scale-110 duration-200"
            />
          </Link>
          <Link href="/organizers">
            <img
              src="/imgs/mobile-icon-logo.png"
              alt="Home"
              className="h-20 -mt-4 hover:scale-110 duration-200"
            />
          </Link>
          <Link href="/organizers/branding">
            <img
              src="/imgs/mobile-icon-branding.png"
              alt="Branding & Social Media"
              className="h-12 hover:scale-110 duration-200"
            />
          </Link>
          <Link href="/organizers/contact-hq">
            <img
              src="/imgs/mobile-icon-contact.png"
              alt="Contact HQ"
              className="h-12 hover:scale-110 duration-200"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default function Organizers() {
  const daysUntilEvent = dayjs("2026-08-29").diff(dayjs(), "day");
  const checkInCallDates = ["2026-07-07T09:00:00", "2026-07-14T09:00:00"];
  const soonestCheckIn = checkInCallDates
    .filter((d) => dayjs(d).isAfter(dayjs()))
    .reduce((a: string, b: string) => (dayjs(a).isBefore(dayjs(b)) ? a : b));
  const daysUntilNextCheckIn = dayjs(soonestCheckIn).diff(dayjs(), "day");
  const soonestCheckInMonth = dayjs(soonestCheckIn).format("MM");
  const soonestCheckInDay = dayjs(soonestCheckIn).format("DD");
  const soonestCheckInTime = dayjs(soonestCheckIn).format("h:mm A");

  return (
    <div
      className="flex min-h-screen lg:overflow-hidden"
      style={{
        backgroundImage: "url('/imgs/sand.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DesktopSidebar />

      {/* ── DESKTOP homepage — hidden on mobile ── */}
      <div className="max-lg:hidden h-screen lg:p-9 flex-1 justify-center align-middle">
        <h1 className="lg:text-5xl galindo text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-dark">
          Welcome, Sunbeamer!
        </h1>
        <div>
          {/* 2 boxes row */}
          <div className="flex justify-between">
            {/* event countdown */}
            <div className="glassbox-white w-1/2 lg:p-12 lg:m-6 lg:rounded-2xl text-center duration-200 hover:scale-102">
              <h1 className="galindo lg:text-[112px] text-blue-bright">
                {daysUntilEvent}
              </h1>
              <h3 className="galindo text-[32px] -mt-10 text-pink-dark">
                days until the event!!!
              </h3>
            </div>
            {/* check-in call countdown */}
            <div className="glassbox-white w-1/2 lg:p-12 lg:m-6 lg:rounded-2xl text-center duration-200 hover:scale-102">
              <h1 className="galindo lg:text-[112px] text-pink-dark">
                {daysUntilNextCheckIn}
              </h1>
              <h3 className="galindo text-[32px] -mt-10 text-orange-dark leading-9">
                days until the next check-in call
              </h3>
            </div>
          </div>
          {/* 2 boxes row */}
          <div className="flex">
            {/* weekly to-do */}
            <div className="w-1/2 lg:mx-6">
              <h3 className="galindo lg:text-3xl lg:m-6 text-blue-bright">
                Week X To-Do
              </h3>
              <div className="h-[60vh] boardwalk lg:p-6 lg:mx-6 flex flex-col">
                <p className="text-blue-dark outfit lg:text-2xl text-pretty lg:leading-9">
                  <strong>1.</strong> Sign up to be an organizer in your city!
                  (wait for approval - you&apos;ll receive an email from us
                  soon)
                  <br /> <strong>2.</strong> once approved, join
                  <a
                    href="https://hackclub.enterprise.slack.com/archives/C0BCUSTJQTG"
                    target="_blank"
                    className="p-1 px-2 m-1 bg-blue-bright/20  outline-blue-dark/65 hover:bg-blue-bright/25 hover:outline-2 hover:m-2 duration-200 rounded-xl text-nowrap "
                  >
                    #sunbeam-organizers
                  </a>{" "}
                  on Slack!
                  <br /> <strong>3.</strong> share feedback on our ULTIMATE
                  ORGANIZER GUIDE
                  <br /> <strong>4.</strong> join the very first check in call
                  [date]
                </p>
                <a
                  href="placeholder"
                  className="text-blue-dark outfit lg:text-2xl text-pretty font-bold mt-30"
                >
                  Click here to see the full 9-week plan &#8680;
                </a>
              </div>
            </div>
            {/* check-in call link */}
            <div className="w-1/2 lg:m-6 duration-200 hover:scale-102">
              <div className="glassbox-clear lg:p-6 h-1/2 flex justify-items-center rounded-t-2xl ">
                <img
                  src="/imgs/ray1.png"
                  alt=""
                  className="mx-auto lg:p-3"
                ></img>
              </div>
              <div className="glassbox-white flex flex-col p-8 rounded-b-2xl text-center">
                <a
                  href="placeholder"
                  className="galindo lg:text-3xl text-orange-dark underline hover:decoration-wavy"
                >
                  Check-in Call Link
                </a>
                <h3 className="text-pink-dark outfit lg:text-lg">
                  meeting platform (zoom?)
                </h3>
                <h3 className="text-pink-dark outfit lg:text-lg">
                  {soonestCheckInTime} EST - {soonestCheckInMonth}/
                  {soonestCheckInDay}
                </h3>
                <h3 className="text-blue-bright outfit lg:text-lg">
                  more details &#8680;
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE homepage — hidden on desktop ── */}
      <div className="lg:hidden w-full flex flex-col gap-4 overflow-y-auto pb-47 px-8 pt-6">
        <h1 className="mt-2 text-3xl galindo text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-dark">
          Welcome, Sunbeamer!
        </h1>

        {/* weekly to-do */}
        <div className="flex flex-col gap-2">
          <h3 className="galindo text-2xl my-3 text-blue-bright">
            Week X To-Do
          </h3>
          <div className="boardwalk-mobile p-4 flex flex-col rounded-lg">
            <p className="text-blue-dark outfit text-base text-pretty">
              <strong>1.</strong> Sign up to be an organizer in your city! (wait
              for approval - you&apos;ll receive an email from us soon)
              <br /> <strong>2.</strong> once approved, join
              <a
                href="https://hackclub.enterprise.slack.com/archives/C0BCUSTJQTG"
                target="_blank"
                className="p-1 px-2 m-1 bg-blue-bright/20 outline-blue-dark/65 hover:bg-blue-bright/25 hover:outline-2 hover:m-2 duration-200 rounded-xl text-nowrap"
              >
                #sunbeam-organizers
              </a>{" "}
              on Slack!
              <br /> <strong>3.</strong> share feedback on our ULTIMATE
              ORGANIZER GUIDE
              <br /> <strong>4.</strong> join the very first check in call
              [date]
            </p>
            <a
              href="placeholder"
              className="text-blue-dark outfit text-base text-pretty font-bold mt-6"
            >
              Click here to see the full 9-week plan &#8680;
            </a>
          </div>
        </div>

        {/* event countdown */}
        <div className="glassbox-white outline-2 outline-blue-dark/10 mx-0 my-3 p-6 rounded-2xl text-center duration-200">
          <h1 className="galindo text-[80px] text-blue-bright">
            {daysUntilEvent}
          </h1>
          <h3 className="galindo text-[24px] -mt-6 text-pink-dark">
            days until the event!!!
          </h3>
        </div>

        {/* check-in countdown */}
        <div className="glassbox-white outline-2 outline-blue-dark/10 mx-0 my-3 p-6 rounded-2xl text-center duration-200">
          <h1 className="galindo text-[80px] text-pink-dark">
            {daysUntilNextCheckIn}
          </h1>
          <h3 className="galindo text-[24px] -mt-6 text-orange-dark leading-9">
            days until the next check-in call
          </h3>
        </div>

        {/* check-in call link */}
        <div className="my-3 duration-200">
          <div className="glassbox-clear p-4 flex justify-items-center rounded-t-2xl">
            <img src="/imgs/ray1.png" alt="" className="mx-auto max-h-52"></img>
          </div>
          <div className="glassbox-white flex flex-col p-8 rounded-b-2xl text-center">
            <a
              href="placeholder"
              className="galindo text-2xl text-orange-dark underline hover:decoration-wavy"
            >
              Check-in Call Link
            </a>
            <h3 className="text-pink-dark outfit text-base">
              meeting platform (zoom?)
            </h3>
            <h3 className="text-pink-dark outfit text-base">
              {soonestCheckInTime} EST - {soonestCheckInDay}
            </h3>
            <h3 className="text-blue-bright outfit text-base">
              more details &#8680;
            </h3>
          </div>
        </div>
      </div>

     <MobileNavbar />
    </div>
  );
}

export function SidebarItem({ href, text }: { href: string; text: string }) {
  return (
    <div>
      <Link href={href}>
        <div className="grid grid-cols-1 grid-rows-1 duration-200 hover:scale-102 hover:translate-x-5">
          <h2 className="col-start-1 row-start-1 outfit pink-outlined-text-drop-shadow lg:text-3xl xl:text-5xl font-bold">
            {text}
          </h2>
          <h2 className="col-start-1 row-start-1 outfit pink-gradient-text lg:text-3xl xl:text-5xl font-bold z-10">
            {text}
          </h2>
        </div>
      </Link>
    </div>
  );
}
