"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CustomCursor } from "@/components/CustomCursor";
import { NightAtmosphere } from "@/components/NightAtmosphere";
import { SiteNav } from "@/components/SiteNav";

function useMarketingPage(night: boolean) {
  useEffect(() => {
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
  }, [night]);
}

export function MarketingShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const night = path === "/tech-after-dark";
  const hause = path === "/tech-hause";
  useMarketingPage(night);

  return (
    <main
      className={
        night
          ? "landing-hero landing-hero--night"
          : hause
            ? "landing-hero landing-hero--hause"
            : "landing-hero"
      }
      aria-label="SoulHause"
    >
      <div className="landing-hero-canvas" aria-hidden="true" />
      {night ? <NightAtmosphere /> : null}
      <SiteNav />
      {children}
      <CustomCursor />
    </main>
  );
}
