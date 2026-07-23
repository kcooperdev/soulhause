"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type MagneticRsvpProps = {
  children: ReactNode;
  className?: string;
  /** Max pull in px (desktop fine pointer only). */
  strength?: number;
};

/**
 * Subtle magnetic pull toward the cursor for RSVP controls.
 * No-op on touch / reduced-motion.
 */
export function MagneticRsvp({
  children,
  className = "",
  strength = 10,
}: MagneticRsvpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let hovering = false;

    const tick = () => {
      tx += (cx - tx) * 0.18;
      ty += (cy - ty) * 0.18;
      el.style.setProperty("--mag-x", `${tx.toFixed(2)}px`);
      el.style.setProperty("--mag-y", `${ty.toFixed(2)}px`);
      if (hovering || Math.abs(tx) > 0.08 || Math.abs(ty) > 0.08) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        el.style.setProperty("--mag-x", "0px");
        el.style.setProperty("--mag-y", "0px");
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(mx, my);
      const radius = Math.max(r.width, r.height) * 1.35;
      if (dist > radius) {
        cx = 0;
        cy = 0;
        hovering = false;
      } else {
        const t = 1 - dist / radius;
        cx = (mx / radius) * strength * t;
        cy = (my / radius) * strength * t;
        hovering = true;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      cx = 0;
      cy = 0;
      hovering = false;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={`magnetic-rsvp${className ? ` ${className}` : ""}`}
      style={{ "--mag-x": "0px", "--mag-y": "0px" } as CSSProperties}
    >
      {children}
    </span>
  );
}
