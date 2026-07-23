"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { EVENTS_ARM } from "./constants";

export type EventsFormat = {
  id: string;
  label: string;
  format: string;
  metal: "gold" | "bronze" | "platinum";
  body: string;
  index: number;
  stub: string;
};

/**
 * Full-width stacked Events lineup: ticket stubs, morphing switcher, ticket panel.
 */
export function EventsFormats({ formats }: { formats: EventsFormat[] }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(formats[0]?.id ?? "");
  const tablistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (formats.some((f) => f.id === hash)) setActiveId(hash);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [formats]);

  const active = formats.find((f) => f.id === activeId) ?? formats[0];
  if (!active) return null;

  const select = (id: string, opts?: { focus?: boolean }) => {
    if (id === activeId) return;
    setActiveId(id);
    if (pathname === "/events" || pathname === "/") {
      window.history.replaceState(null, "", `/events#${id}`);
    }
    if (opts?.focus) {
      tablistRef.current
        ?.querySelector<HTMLButtonElement>(`#tab-${id}`)
        ?.focus();
    }
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = formats.findIndex((f) => f.id === active.id);
    if (idx < 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(formats[(idx + 1) % formats.length].id, { focus: true });
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(
        formats[(idx - 1 + formats.length) % formats.length].id,
        { focus: true },
      );
    } else if (e.key === "Home") {
      e.preventDefault();
      select(formats[0].id, { focus: true });
    } else if (e.key === "End") {
      e.preventDefault();
      select(formats[formats.length - 1].id, { focus: true });
    }
  };

  return (
    <div className="events-lineup">
      {formats.map((f) => (
        <span
          key={f.id}
          id={f.id}
          className="pathway-hash-target"
          aria-hidden="true"
        />
      ))}

      <div className="events-lineup-head" data-reveal>
        <p className="eyebrow eyebrow--spaced">The lineup</p>
        <h2 className="h-section events-lineup-title">
          Three kinds of nights
          <span className="events-ember-underline" aria-hidden="true" />
        </h2>
        <p className="lede">{EVENTS_ARM.together}</p>
      </div>

      <ul className="events-ticket-stack" aria-label="Event formats">
        {formats.map((f, i) => {
          const selected = f.id === active.id;
          return (
            <motion.li
              key={f.id}
              className={`events-ticket-stub events-ticket-stub--${f.metal}${selected ? " is-active" : ""}`}
              style={{ ["--stub-i" as string]: String(i) }}
              initial={reduce ? false : { opacity: 0, y: 40, rotate: -3 + i * 1.5 }}
              whileInView={
                reduce ? undefined : { opacity: 1, y: 0, rotate: -1.2 + i * 1.1 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                delay: 0.07 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                className="events-ticket-stub-btn"
                aria-pressed={selected}
                aria-controls="events-format-panel"
                onClick={() => select(f.id)}
              >
                <span className="events-ticket-stub-num">
                  {String(f.index).padStart(2, "0")}
                </span>
                <span className="events-ticket-stub-copy">
                  <span className="events-ticket-stub-label">{f.label}</span>
                  <span className="events-ticket-stub-meta">{f.stub}</span>
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <LayoutGroup id="events-formats">
        <div
          className="events-format-switch"
          data-reveal
          style={{ ["--reveal-delay" as string]: "70ms" }}
        >
          <div
            ref={tablistRef}
            className="events-format-tabs"
            role="tablist"
            aria-label="SoulHause Events formats"
            onKeyDown={onTabKeyDown}
          >
            {formats.map((f) => {
              const selected = f.id === active.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  id={`tab-${f.id}`}
                  aria-selected={selected}
                  aria-controls="events-format-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`events-format-tab events-format-tab--${f.metal}${selected ? " is-active" : ""}`}
                  onClick={() => select(f.id)}
                >
                  {selected && !reduce ? (
                    <motion.span
                      layoutId="events-tab-ember"
                      className="events-format-tab-ember"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : selected ? (
                    <span className="events-format-tab-ember" />
                  ) : null}
                  <span className="events-format-tab-label">{f.label}</span>
                </button>
              );
            })}
          </div>

          <div className="events-format-stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={active.id}
                id="events-format-panel"
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
                className={`events-format-ticket events-format-ticket--${active.metal}`}
                initial={reduce ? false : { opacity: 0, y: 16, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="events-format-ticket-perf" aria-hidden="true" />
                <div className="events-format-ticket-inner">
                  <p className="events-format-ticket-meta">
                    <span className="events-format-ticket-num">
                      {String(active.index).padStart(2, "0")}
                    </span>
                    <span>{active.format}</span>
                  </p>
                  <h3 className="events-format-ticket-title">{active.label}</h3>
                  <p className="events-format-ticket-copy">{active.body}</p>
                </div>
                {!reduce ? (
                  <motion.span
                    layoutId="events-ticket-glow"
                    className="events-format-ticket-glow"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 320, damping: 36 }}
                  />
                ) : null}
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </LayoutGroup>
    </div>
  );
}
