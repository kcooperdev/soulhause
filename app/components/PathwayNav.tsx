"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSection } from "./pathway-nav";

export function PathwayHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const scrollFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      requestAnimationFrame(() => {
        scrollToSection(
          id,
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth"
        );
      });
    };

    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);
    return () => window.removeEventListener("hashchange", scrollFromHash);
  }, [pathname]);

  return null;
}

export { pathwayHref, scrollToSection } from "./pathway-nav";
