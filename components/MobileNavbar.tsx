import Link from "next/link";
//import { useState } from "react";
import SidebarItem from "../components/SidebarItem";

export default function MobileNavbar() {
  return (
    <div>
      <nav
        className="fixed pt-16 sm:pt-24 bottom-0 left-0 right-0 lg:hidden z-50"
        style={{
          backgroundImage: "url('/imgs/sidebar-water-mobile.webp')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="flex items-center justify-around py-3 px-4">
          <Link href="/organizers/docs">
            <img
              src="/imgs/mobile-icon-docs.webp"
              alt="Docs"
              className="h-9 sm:h-12 hover:scale-110 duration-200"
            />
          </Link>
          <Link href="/organizers/resources">
            <img
              src="/imgs/mobile-icon-resources.webp"
              alt="More Resources"
              className="h-9 sm:h-12 hover:scale-110 duration-200"
            />
          </Link>
          <Link href="/organizers">
            <img
              src="/imgs/mobile-icon-logo.webp"
              alt="Home"
              className="h-15 sm:h-20 -mt-4 hover:scale-110 duration-200"
            />
          </Link>
          <Link href="/organizers/branding">
            <img
              src="/imgs/mobile-icon-branding.webp"
              alt="Branding & Social Media"
              className="h-9 sm:h-12 hover:scale-110 duration-200"
            />
          </Link>
          <Link href="/organizers/contact-hq">
            <img
              src="/imgs/mobile-icon-contact.webp"
              alt="Contact HQ"
              className="h-9 sm:h-12 hover:scale-110 duration-200"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}
