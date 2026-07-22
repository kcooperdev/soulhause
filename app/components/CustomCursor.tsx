"use client";

import { useEffect, useRef, useState } from "react";

const HOT_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor-hot]";
const TEXT_SELECTOR = "input, textarea, [contenteditable='true']";

type Mode = "default" | "hot" | "text" | "down";

/**
 * Compact house silhouette.
 * Dual-tone: light outline layer under dark fill — readable on linen and night.
 */
function HouseMark() {
  return (
    <svg
      className="cursor-hause-svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <g id="cursor-hause-geom">
          <rect x="15.2" y="3.2" width="2.6" height="5.2" rx="0.35" />
          <path d="M3.4 11.2 12 3.8l8.6 7.4H3.4Z" />
          <path d="M5.2 10.6h13.6v9.2H5.2Z" />
        </g>
      </defs>
      <use href="#cursor-hause-geom" className="cursor-hause-outline" />
      <use href="#cursor-hause-geom" className="cursor-hause-fill" />
      <path className="cursor-hause-door" d="M10.4 14.2h3.2v5.6h-3.2Z" />
    </svg>
  );
}

/**
 * House-mark cursor only — scales on interactive, native on touch/reduced-motion.
 * No tip, trail, ring, or dual-follower.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setActive(fine.matches && !reduced.matches);
    sync();

    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const root = rootRef.current;
    if (!root) return;

    const mark = root.querySelector<HTMLElement>(".cursor-hause-mark");
    if (!mark) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let visible = false;
    let mode: Mode = "default";
    let magnetX = 0;
    let magnetY = 0;
    let raf = 0;

    const setMode = (next: Mode) => {
      if (mode === next) return;
      mode = next;
      root.dataset.mode = next;
    };

    const resolveTarget = (target: EventTarget | null) => {
      const el = target instanceof Element ? target : null;
      if (!el) {
        magnetX = 0;
        magnetY = 0;
        setMode("default");
        return;
      }
      if (el.closest(TEXT_SELECTOR)) {
        magnetX = 0;
        magnetY = 0;
        setMode("text");
        return;
      }
      const hot = el.closest(HOT_SELECTOR) as HTMLElement | null;
      if (hot) {
        const rect = hot.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const pull = 0.16;
        magnetX = (cx - mx) * pull;
        magnetY = (cy - my) * pull;
        const mag = Math.hypot(magnetX, magnetY);
        const max = 12;
        if (mag > max) {
          magnetX = (magnetX / mag) * max;
          magnetY = (magnetY / mag) * max;
        }
        setMode("hot");
        return;
      }
      magnetX = 0;
      magnetY = 0;
      setMode("default");
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        root.dataset.visible = "true";
        rx = mx;
        ry = my;
      }
      resolveTarget(e.target);
    };

    const onOver = (e: PointerEvent) => resolveTarget(e.target);
    const onDown = () => {
      if (mode !== "text") setMode("down");
      root.dataset.down = "true";
    };
    const onUp = (e: PointerEvent) => {
      root.dataset.down = "false";
      resolveTarget(e.target);
    };
    const onLeave = () => {
      visible = false;
      root.dataset.visible = "false";
    };
    const onEnter = () => {
      visible = true;
      root.dataset.visible = "true";
    };

    const tick = () => {
      const targetX = mx + magnetX;
      const targetY = my + magnetY;
      const ease = mode === "hot" ? 0.35 : 0.28;
      rx += (targetX - rx) * ease;
      ry += (targetY - ry) * ease;
      mark.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    // Body only — never mutate <html> classList; React owns it (next/font).
    document.body.classList.add("has-custom-cursor");
    root.dataset.visible = "false";
    root.dataset.mode = "default";
    root.dataset.down = "false";

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div ref={rootRef} className="cursor-hause" aria-hidden="true">
      <div className="cursor-hause-mark">
        <HouseMark />
      </div>
    </div>
  );
}
