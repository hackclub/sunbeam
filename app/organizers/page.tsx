"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useState } from "react";
import DesktopSidebar from "../../components/DesktopSidebar";
import MobileNavbar from "../../components/MobileNavbar";


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
        backgroundImage: "url('/imgs/sand.webp')",
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
                  href="/organizers/weeklyplan"
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
                  src="/imgs/ray1.webp"
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
              href="/organizers/weeklyplan"
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
            <img src="/imgs/ray1.webp" alt="" className="mx-auto max-h-52"></img>
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


