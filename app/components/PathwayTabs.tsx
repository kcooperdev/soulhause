"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export type PathwayTab = {
  id: string;
  label: string;
  format: string;
  metal: "gold" | "bronze" | "platinum";
  body: string;
  index: number;
};

/**
 * Tab strip names the pathway; panel shows number + category + body only.
 * No second title repeating the active tab. Hash updates without scroll jump.
 */
export function PathwayTabs({ pathways }: { pathways: PathwayTab[] }) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(pathways[0]?.id ?? "");
  const [panelKey, setPanelKey] = useState(0);
  const tablistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (pathways.some((p) => p.id === hash)) {
        setActiveId(hash);
        setPanelKey((k) => k + 1);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [pathways]);

  const active = pathways.find((p) => p.id === activeId) ?? pathways[0];
  if (!active) return null;

  const select = (id: string, opts?: { focus?: boolean }) => {
    if (id === activeId) return;
    setActiveId(id);
    setPanelKey((k) => k + 1);
    if (pathname === "/events" || pathname === "/") {
      window.history.replaceState(null, "", `/events#${id}`);
    }
    if (opts?.focus) {
      const btn = tablistRef.current?.querySelector<HTMLButtonElement>(
        `#tab-${id}`,
      );
      btn?.focus();
    }
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = pathways.findIndex((p) => p.id === active.id);
    if (idx < 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(pathways[(idx + 1) % pathways.length].id, { focus: true });
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(
        pathways[(idx - 1 + pathways.length) % pathways.length].id,
        { focus: true },
      );
    } else if (e.key === "Home") {
      e.preventDefault();
      select(pathways[0].id, { focus: true });
    } else if (e.key === "End") {
      e.preventDefault();
      select(pathways[pathways.length - 1].id, { focus: true });
    }
  };

  return (
    <div className="pathway-showcase">
      {/* Stable hash targets so deep links / nav Events still land correctly */}
      {pathways.map((p) => (
        <span
          key={p.id}
          id={p.id}
          className="pathway-hash-target"
          aria-hidden="true"
        />
      ))}

      <div
        ref={tablistRef}
        className="pathway-tabs"
        role="tablist"
        aria-label="SoulHause Events formats"
        onKeyDown={onTabKeyDown}
      >
        {pathways.map((p) => {
          const selected = p.id === active.id;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`tab-${p.id}`}
              aria-selected={selected}
              aria-controls="pathway-panel"
              tabIndex={selected ? 0 : -1}
              className={`pathway-tab pathway-tab--${p.metal}${selected ? " is-active" : ""}`}
              onClick={() => select(p.id)}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <article
        key={panelKey}
        id="pathway-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className={`pathway-row pathway-row--${active.metal} pathway-panel`}
      >
        <span className="pathway-row-num">
          {String(active.index).padStart(2, "0")}
        </span>
        <div className="pathway-row-copy">
          <p className="pathway-row-format">{active.format}</p>
          <p className="pathway-row-body">{active.body}</p>
        </div>
      </article>
    </div>
  );
}
