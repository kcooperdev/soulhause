"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PATHWAY_PICKER } from "./constants";
import { navigateToPathway, pathwayHref, scrollToSection } from "./pathway-nav";

function usePathwayNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (id: string) => {
    navigateToPathway(id, pathname, (href) => router.push(href));
  };
}

export function PathwayHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const scrollFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      requestAnimationFrame(() => {
        scrollToSection(id, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");
      });
    };

    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);
    return () => window.removeEventListener("hashchange", scrollFromHash);
  }, [pathname]);

  return null;
}

export function PathwayPicker() {
  const [open, setOpen] = useState(false);
  const goToPathway = usePathwayNavigation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pathway-picker-open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pathway-picker-open", onOpen);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="pathway-picker-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pathway-picker-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="pathway-picker">
        <button
          type="button"
          className="pathway-picker-close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <h2 id="pathway-picker-title" className="pathway-picker-title">
          Pick an event type
        </h2>
        <div className="pathway-picker-grid">
          {PATHWAY_PICKER.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`pathway-picker-card pathway-picker-card--${item.tone}`}
              onClick={() => {
                setOpen(false);
                goToPathway(item.id);
              }}
            >
              <span className="pathway-picker-label">{item.label}</span>
              <span className="pathway-picker-format">{item.format}</span>
              <span className="pathway-picker-desc">{item.tagline}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PathwayStickyNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("pathway-1");
  const pathname = usePathname();
  const goToPathway = usePathwayNavigation();

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    const sections = PATHWAY_PICKER.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    const pathwaysEl = document.getElementById("pathways");
    if (!sections.length || !pathwaysEl) return;

    const onScroll = () => {
      const navEl = document.querySelector(".nav");
    const navH = navEl?.getBoundingClientRect().height ?? 72;
      const pathwaysTop = pathwaysEl.getBoundingClientRect().top;
      const pathwaysBottom = pathwaysEl.getBoundingClientRect().bottom;
      setVisible(pathwaysTop <= navH + 8 && pathwaysBottom > navH + 80);

      let current = sections[0].id;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navH + 120) current = section.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <nav
      className={`pathway-sticky${visible ? " is-visible" : ""}`}
      aria-label="Event pathways"
      aria-hidden={!visible}
    >
      <div className="pathway-sticky-inner wrap">
        {PATHWAY_PICKER.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`pathway-sticky-link pathway-sticky-link--${item.tone}${active === item.id ? " is-active" : ""}`}
            aria-current={active === item.id ? "true" : undefined}
            onClick={() => goToPathway(item.id)}
          >
            {item.shortLabel}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function openPathwayPicker() {
  window.dispatchEvent(new Event("pathway-picker-open"));
}

export { pathwayHref, scrollToSection };
