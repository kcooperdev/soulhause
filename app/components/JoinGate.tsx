"use client";

import { useEffect, useState } from "react";
import { JOIN_GATE, JOIN_URL } from "./constants";

export function JoinGate() {
  const [open, setOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(JOIN_URL);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLAnchorElement>("[data-join-gate]");
      if (!target) return;
      e.preventDefault();
      setPendingUrl(target.href || JOIN_URL);
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
        <p className="join-gate-eyebrow">Before you go</p>
        <h2 id="join-gate-title" className="join-gate-title">
          {JOIN_GATE.headline}
        </h2>
        <p className="join-gate-sub">Here&apos;s what happens next:</p>
        <ol className="join-gate-steps">
          {JOIN_GATE.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="join-gate-actions">
          <a
            href={pendingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            Continue to join <span className="arrow">→</span>
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
