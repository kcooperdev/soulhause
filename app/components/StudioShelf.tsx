"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  STUDIO_APPS,
  STUDIO_OPEN_BAYS,
  STUDIO_PRODUCT,
} from "./constants";

function MagneticBay({
  children,
  className = "",
  strength = 9,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
      tx += (cx - tx) * 0.16;
      ty += (cy - ty) * 0.16;
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
      const radius = Math.max(r.width, r.height) * 1.2;
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

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`studio-mag${className ? ` ${className}` : ""}`}
      style={{ "--mag-x": "0px", "--mag-y": "0px" } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function StudioShelf() {
  const openBays = Array.from({ length: STUDIO_OPEN_BAYS }, (_, i) => i);

  return (
    <section className="sec sec-studio-shelf" aria-labelledby="studio-shelf-title">
      <div className="wrap studio-bench" data-reveal>
        <div className="studio-bench-head">
          <p className="eyebrow eyebrow--spaced">{STUDIO_PRODUCT.shelfEyebrow}</p>
          <h2 id="studio-shelf-title" className="studio-bench-title">
            {STUDIO_PRODUCT.shelfTitle}
          </h2>
          <p className="lede studio-bench-lede">{STUDIO_PRODUCT.shelfLede}</p>
        </div>

        <div className="studio-ledge" aria-hidden="true">
          <span className="studio-ledge-rail" />
          <span className="studio-ledge-glow" />
        </div>

        <ul className="studio-bays">
          {STUDIO_APPS.map((app, index) => (
            <li
              key={app.id}
              className="studio-bay-slot"
              style={{ "--bay-delay": `${80 + index * 90}ms` } as CSSProperties}
            >
              <MagneticBay>
                <article className="studio-bay studio-bay--featured">
                  <div className="studio-bay-edge" aria-hidden="true" />
                  <div className="studio-bay-head">
                    <span className="studio-bay-status">{app.status}</span>
                    <ul className="studio-tags" aria-label="Tags">
                      {app.tags.map((tag) => (
                        <li key={tag} className="studio-tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h3 className="studio-bay-name">{app.name}</h3>
                  <p className="studio-bay-line">{app.line}</p>
                  <a href={app.ctaHref} className="btn btn-primary studio-bay-cta">
                    {app.ctaLabel} <span className="arrow">→</span>
                  </a>
                </article>
              </MagneticBay>
            </li>
          ))}

          {openBays.map((i) => (
            <li
              key={`open-${i}`}
              className="studio-bay-slot"
              style={
                {
                  "--bay-delay": `${160 + (STUDIO_APPS.length + i) * 90}ms`,
                } as CSSProperties
              }
            >
              <div
                className="studio-bay studio-bay--open"
                aria-label={`${STUDIO_PRODUCT.openBayLabel}. ${STUDIO_PRODUCT.openBayLine}`}
              >
                <div className="studio-bay-edge" aria-hidden="true" />
                <span className="studio-bay-open-mark" aria-hidden="true">
                  +
                </span>
                <p className="studio-bay-open-label">{STUDIO_PRODUCT.openBayLabel}</p>
                <p className="studio-bay-open-line">{STUDIO_PRODUCT.openBayLine}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
