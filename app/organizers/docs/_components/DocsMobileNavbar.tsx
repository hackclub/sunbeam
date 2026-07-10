"use client";

import Link from "next/link";
import SidebarItem from "../../../../components/SidebarItem";
import { docsDirectory } from "../_lib/DocsDirectory";

export default function DocsMobileNavbar() {
  const scrollToCurrentPage = (el: HTMLDivElement) => {
    el?.querySelector('a[href="#"]')?.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
  };

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
        <div className="flex gap-4 items-center justify-around py-3 px-4">
          <Link href="/organizers" style={{ flexShrink: 0}}>
            <img
              src="/imgs/mobile-icon-logo.webp"
              alt="Home"
              className="h-15 sm:h-20 -mt-4 hover:scale-110 duration-200"
            />
          </Link>
          <div
            className="flex gap-10 overflow-x-auto overflow-y-hidden"
            ref={scrollToCurrentPage}
          >
            {docsDirectory.map((item) => (
              <SidebarItem href={item.href} text={item.text} key={item.href} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
