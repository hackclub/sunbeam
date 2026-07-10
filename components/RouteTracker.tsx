"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    sessionStorage.setItem("lastVisitedPath", pathname);
  }, [pathname]);

  return null;
}