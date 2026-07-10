import Link from "next/link";
import SidebarItem from "../../../../components/SidebarItem";
import { docsDirectory } from "../_lib/DocsDirectory";

export default function DocsMobileNavbar() {
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
          <div className="flex gap-10 overflow-x-auto overflow-y-hidden" id="docs-mobile-navbar">
            {docsDirectory.map((item) => (
              <SidebarItem href={item.href} text={item.text} key={item.href} />
            ))}
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const navbar = document.getElementById("docs-mobile-navbar");
                if (document.referrer && new URL(document.referrer).pathname.startsWith("/organizers/docs/")) {
                  navbar.scrollLeft = sessionStorage.getItem("docsMobileNavbarScroll") || 0;
                } else {
                  sessionStorage.removeItem("docsMobileNavbarScroll");
                }
                navbar.addEventListener("scroll", function() {
                  sessionStorage.setItem("docsMobileNavbarScroll", navbar.scrollLeft);
                });
              })();
            `,
          }}
        />
      </nav>
    </div>
  );
}
