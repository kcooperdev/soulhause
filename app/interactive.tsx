"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Scroll reveal ─────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els.length) return;

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

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Parallax ──────────────────────────────────────────────────────── */
function useParallax() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-parallax]");
    if (!els.length) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        els.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax ?? "0");
          el.style.transform = `translateY(${y * speed}px)`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ─── Custom cursor ─────────────────────────────────────────────────── */
export default function Interactive() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useScrollReveal();
  useParallax();

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || !ringRef.current) return;
      const hot = t.closest("a, button, [data-cursor-hot]");
      ringRef.current.classList.toggle("cursor-ring-hot", !!hot);
    };
    const onDown = () => ringRef.current?.classList.add("cursor-ring-down");
    const onUp = () => ringRef.current?.classList.remove("cursor-ring-down");

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
