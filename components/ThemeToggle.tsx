"use client";

import { useEffect, useState } from "react";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";

function SunIcon() {
  return (
    <svg
      className="theme-switch-icon"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <circle className="theme-switch-sun-core" cx="12" cy="12" r="3.2" />
      <path
        className="theme-switch-sun-rays"
        d="M12 4.5v1.55M12 17.95v1.55M4.5 12h1.55M17.95 12h1.55M6.72 6.72l1.1 1.1M16.18 16.18l1.1 1.1M6.72 17.28l1.1-1.1M16.18 7.82l1.1-1.1"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="theme-switch-icon"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        className="theme-switch-moon-body"
        d="M15.15 4.7A7.35 7.35 0 1 0 19.3 14.1 5.7 5.7 0 0 1 15.15 4.7z"
      />
    </svg>
  );
}

export function ThemeToggle({
  theme,
  onTheme,
}: {
  theme?: Theme | null;
  onTheme?: (theme: Theme) => void;
}) {
  const [local, setLocal] = useState<Theme | null>(null);
  const current = theme ?? local;

  useEffect(() => {
    if (theme) return;
    setLocal(readTheme());
  }, [theme]);

  if (!current) {
    return <div className="theme-switch theme-switch-slot" aria-hidden />;
  }

  const dark = current === "dark";

  function choose() {
    const next: Theme = current === "dark" ? "light" : "dark";
    applyTheme(next);
    onTheme?.(next);
    if (!theme) setLocal(next);
  }

  return (
    <button
      type="button"
      className="theme-switch"
      role="switch"
      aria-label="Theme"
      aria-checked={dark}
      onClick={choose}
    >
      <span className="theme-switch-face theme-switch-sun" aria-hidden>
        <SunIcon />
      </span>
      <span className="theme-switch-face theme-switch-moon" aria-hidden>
        <MoonIcon />
      </span>
      <span className="theme-switch-thumb" aria-hidden />
    </button>
  );
}
