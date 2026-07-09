"use client";

import Link from "next/link";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

export default function DocsSidebar() {
  const [sidebarClosed, setSidebarClosed] = useState(false);

  return (
    <div
      className={
        sidebarClosed
          ? "max-lg:hidden w-1/12 transition-all duration-500 ease-in-out"
          : "max-lg:hidden w-70 h-screen flex flex-col lg:px-4 2xl:px-6 lg:py-6 2xl:py-10 gap-4 2xl:gap-5 transition-all duration-500 ease-in-out"
      }
      style={{
        backgroundImage: "url('/imgs/sidebar-water-desktop.webp')",
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
    >
      <div
        className={
          sidebarClosed
            ? "opacity-0 hidden"
            : "opacity-100 transition-all duration-500 ease-in-out flex flex-col gap-4 2xl:gap-5"
        }
      >
        <Link href="/organizers" className="grid grid-rows-1 grid-cols-1 transform hover:translate-x-5 duration-200">
          <h2 className="text-xl outfit pink-outlined-text-drop-shadow -mb-5 -mt-3 font-bold">
            &larr; back
          </h2>
          <h2 className="text-xl outfit text-yellow-light -mb-5 -mt-3 font-bold">
            &larr; back
          </h2>
        </Link>

        <Link href="/">
          <img
            src="/imgs/logo_orgportal.webp"
            className="w-4/4 hover:scale-105 duration-200"
            alt="go to landing page"
          ></img>
        </Link>
        <SidebarItem
          href="/organizers/docs/quickstart"
          text="Quickstart Guide"
        />
        <SidebarItem href="/organizers/docs/venue" text="Venue Guide" />
        <SidebarItem
          href="/organizers/docs/sponsorship"
          text="Sponsorship Guide"
        />
        <SidebarItem href="/organizers/docs/outreach" text="Outreach Guide" />
        <SidebarItem href="/organizers/docs/logistics" text="Logistics" />
        <SidebarItem href="/organizers/docs/day-of" text="Day Of" />
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
          src={sidebarClosed ? "/imgs/ray_open.webp" : "/imgs/ray_back.webp"}
          alt=""
          className="w-5/12 -m-6 hover:translate-x-5 duration-200"
        ></img>
      </button>
    </div>
  );
}
