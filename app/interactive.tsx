"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CustomCursor } from "./components/CustomCursor";
import { ThemeSync } from "./components/ThemeSync";

/* ─── Reduced motion ─────────────────────────────────────────────────── */
function useReducedMotion() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      // Body only — never mutate <html> classList; React owns it (next/font).
      document.body.classList.toggle("reduce-motion", mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.classList.remove("reduce-motion");
    };
  }, []);
}

/* ─── Scroll reveal ─────────────────────────────────────────────────── */
function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => {
      el.classList.remove("in");
      observer.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 40) {
        el.classList.add("in");
        observer.unobserve(el);
      }
    });
    return () => observer.disconnect();
  }, [pathname]);
}

function useParallax() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-parallax]");
    if (!els.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ticking = false;

    const update = () => {
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? "0");
        const rect = el.getBoundingClientRect();
        const centerOffset = rect.top + rect.height * 0.5 - window.innerHeight * 0.5;
        el.style.transform = `translate3d(0, ${centerOffset * speed}px, 0)`;
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      els.forEach((el) => {
        el.style.transform = "";
      });
    };
  }, [pathname]);
}

export default function Interactive() {
  useReducedMotion();
  useScrollReveal();
  useParallax();

  return (
    <>
      <ThemeSync />
      <CustomCursor />
    </>
  );
}
