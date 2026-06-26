"use client";

import Link from "next/link";
import { useState } from "react";
import SidebarItem from "../components/SidebarItem";

export default function DesktopSidebar() {
  const [sidebarClosed, setSidebarClosed] = useState(false);

  return (
    <div
      className={
        sidebarClosed
          ? "max-lg:hidden w-1/12 transition-all duration-500 ease-in-out"
          : "max-lg:hidden w-56 h-screen flex flex-col lg:px-4 2xl:px-6 lg:py-6 2xl:py-10 gap-4 2xl:gap-5 transition-all duration-500 ease-in-out"
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
            : "opacity-100 transition-all duration-500 ease-in-out flex flex-col gap-4 2xl:gap-5"
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
