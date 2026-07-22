"use client";

import { useEffect, useState } from "react";
import { JOIN_GATE, HAUSE_OF_SOUL_LUMA_URL } from "./constants";
import { BrandSpotlight, BrandText } from "./BrandSpotlight";

export function JoinGate() {
  const [open, setOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(HAUSE_OF_SOUL_LUMA_URL);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        "[data-join-gate]",
      );
      if (!target) return;
      e.preventDefault();
      setPendingUrl(target.href || HAUSE_OF_SOUL_LUMA_URL);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="join-gate-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-gate-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="join-gate">
        <button
          type="button"
          className="join-gate-close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <BrandSpotlight as="p" className="join-gate-brand" aria-label="SoulHause" quiet>
          <span className="brand-soul brand-sunflow brand-sunflow--quiet">Soul</span>
          <span className="brand-hause brand-sunflow brand-sunflow--quiet">Hause</span>
        </BrandSpotlight>
        <h2 id="join-gate-title" className="join-gate-title">
          {JOIN_GATE.headline}
        </h2>
        <p className="join-gate-sub">
          <BrandText text={JOIN_GATE.sub} />
        </p>
        <div className="join-gate-actions">
          <a
            href={pendingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            Continue on Luma <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
