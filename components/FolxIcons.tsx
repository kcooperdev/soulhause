"use client";

import { useState } from "react";
import { folx } from "@/lib/folx";

function Shape({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <title>{label}</title>
      {children}
    </svg>
  );
}

export function FolxIcons() {
  const [fan, setFan] = useState(false);

  const openFan = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setFan(true);
  };
  const closeFan = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setFan(false);
  };

  return (
    <div className="icon-stage">
      <p className="icon-cue">
        <span>tap</span>
        <svg className="crayon-arrow" viewBox="0 0 88 70" aria-hidden="true">
          <g
            fill="none"
            stroke="#f4be3c"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M68 8C54 16 44 32 38 54" />
            <path d="M38 54 18 40" />
            <path d="M38 54 56 42" />
          </g>
        </svg>
      </p>
      <div
        className="icon-row"
        data-fan={fan ? "true" : "false"}
        onMouseEnter={openFan}
        onMouseLeave={closeFan}
        onClick={() => {
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
          setFan((open) => !open);
        }}
      >
      {folx.field.map((item) => (
        <article
          key={item.kind}
          className="icon-card"
          data-tone={item.kind}
          tabIndex={0}
          aria-label={item.name}
        >
          <div className="icon-card-fan">
          <div className="icon-card-inner">
            {item.kind === "ai" ? (
              <Shape label="AI">
                <circle cx="40" cy="8" r="5" />
                <rect x="37" y="12" width="6" height="10" rx="2" />
                <rect x="6" y="32" width="10" height="16" rx="5" />
                <rect x="64" y="32" width="10" height="16" rx="5" />
                <rect x="16" y="22" width="48" height="42" rx="14" />
                <circle className="cut" cx="32" cy="40" r="5" />
                <circle className="cut" cx="48" cy="40" r="5" />
                <rect className="cut" x="30" y="52" width="20" height="5" rx="2.5" />
              </Shape>
            ) : null}
            {item.kind === "cyber" ? (
              <Shape label="Cybersecurity">
                <path
                  className="lock-shackle"
                  d="M26 42V24a14 14 0 0 1 28 0v18"
                />
                <rect x="16" y="38" width="48" height="38" rx="12" />
                <circle className="cut" cx="40" cy="54" r="5.5" />
                <rect className="cut" x="37.4" y="54" width="5.2" height="11" rx="2" />
              </Shape>
            ) : null}
            {item.kind === "ux" ? (
              <Shape label="UX">
                <rect x="8" y="10" width="64" height="60" rx="12" />
                <rect className="cut" x="14" y="18" width="52" height="7" rx="3.5" />
                <rect className="cut" x="14" y="32" width="32" height="30" rx="8" />
                <rect className="cut" x="50" y="32" width="16" height="30" rx="8" />
              </Shape>
            ) : null}
            {item.kind === "health" ? (
              <Shape label="Health Tech">
                <path d="M40 72C16 54 6 38 6 24 6 13 15 6 25 6c6 0 11 3 15 9 4-6 9-9 15-9 10 0 19 7 19 18 0 14-10 30-34 48Z" />
                <path
                  className="health-pulse"
                  d="M16 38h12l5-12 8 26 6-14h17"
                />
              </Shape>
            ) : null}
            {item.kind === "cloud" ? (
              <Shape label="Cloud">
                <circle cx="26" cy="38" r="16" />
                <circle cx="42" cy="28" r="18" />
                <circle cx="56" cy="40" r="14" />
                <rect x="12" y="38" width="56" height="22" rx="11" />
              </Shape>
            ) : null}
          </div>
          <p className="icon-label">{item.name}</p>
          </div>
        </article>
      ))}
      </div>
    </div>
  );
}
