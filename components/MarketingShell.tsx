"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CustomCursor } from "@/components/CustomCursor";
import { SiteNav } from "@/components/SiteNav";
import { brand } from "@/lib/brand";

function useMarketingPage(enabled: boolean, night: boolean) {
  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("is-landing-hero");
    document.body.classList.toggle("is-night", night);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      document.body.classList.toggle("reduce-motion", mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.classList.remove("reduce-motion");
      document.body.classList.remove("is-landing-hero");
      document.body.classList.remove("is-night");
    };
  }, [enabled, night]);
}

export function MarketingShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const house =
    path === "/" ||
    path === "/about" ||
    path === "/tech-after-dark" ||
    path === "/offer";
  const hause = path === "/tech-hause";
  const sprint = path === "/the-sprint";
  useMarketingPage(!house, false);

  if (house) {
    return children;
  }

  return (
    <main
      className={
        hause
          ? "landing-hero landing-hero--hause"
          : sprint
            ? "landing-hero landing-hero--sprint"
            : "landing-hero"
      }
      aria-label={brand.name}
    >
      <div className="landing-hero-canvas" aria-hidden="true" />
      <SiteNav />
      {children}
      <CustomCursor />
    </main>
  );
}
