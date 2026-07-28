"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSection } from "./pathway-nav";

/** Scroll to hash targets on /events (and legacy home hashes if present). */
export function PathwayHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/events" && pathname !== "/") return;

    const scrollFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;

      // Legacy home anchors → dedicated routes
      if (pathname === "/" && (id === "pathways" || id.startsWith("pathway-"))) {
        window.location.replace(`/events${id.startsWith("pathway-") ? `#${id}` : ""}`);
        return;
      }
      if (pathname === "/" && id === "flagship") {
        window.location.replace("/events");
        return;
      }

      requestAnimationFrame(() => {
        scrollToSection(
          id,
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
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
