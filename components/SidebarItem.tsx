'use client';
import Link from "next/link";

export default function SidebarItem({ href, text }: { href: string; text: string }) {
  return (
    <div>
      <Link href={href}>
        <div className="grid grid-cols-1 grid-rows-1 h-[115%] duration-200 hover:scale-102 hover:translate-x-5">
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

