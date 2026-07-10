'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ href, text, noAnimate }: { href: string; text: string; noAnimate?: boolean }) {
  const isCurrentPage = usePathname() === href;
  return (
    <div>
      <Link href={isCurrentPage ? "#" : href}>
        <div className={
          `grid grid-cols-1 grid-rows-1 h-[115%] w-max ${((noAnimate || isCurrentPage) ? "" : "duration-200 hover:scale-102 hover:translate-x-5")}`
        }>
          <h2 className="col-start-1 row-start-1 outfit pink-outlined-text-drop-shadow text-xl font-bold select-none">
            {text}
          </h2>
          <h2 className={
            `col-start-1 row-start-1 outfit ${isCurrentPage ? "text-yellow-light" : "pink-gradient-text"} text-xl font-bold z-10 select-none`
          }>
            {text}
          </h2>
        </div>
      </Link>
    </div>
  );
}

