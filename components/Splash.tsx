"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { hasEnteredThisVisit, markEntered } from "@/lib/visit";

export { hasEnteredThisVisit, markEntered };

const LOAD_MS = 2500;
const TICK_MS = 80;

function loadPercent(elapsed: number, reduce: boolean) {
  if (reduce) return 100;
  const t = Math.min(1, elapsed / LOAD_MS);
  if (t >= 1) return 100;
  return Math.min(90, Math.round(t * 10) * 10);
}

export function Splash({ onEnter }: { onEnter: () => void }) {
  const [percent, setPercent] = useState(0);
  const handedOff = useRef(false);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    document.body.classList.add("is-splash");

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = motion.matches;
    if (reduce) {
      setPercent(100);
      return () => {
        document.body.classList.remove("is-splash");
      };
    }

    const started = performance.now();
    const pulse = () => {
      setPercent(loadPercent(performance.now() - started, false));
    };

    pulse();
    const interval = window.setInterval(pulse, TICK_MS);
    const fallback = window.setTimeout(() => setPercent(100), LOAD_MS + 40);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(fallback);
      document.body.classList.remove("is-splash");
    };
  }, []);

  useEffect(() => {
    if (percent < 100 || handedOff.current) return;
    handedOff.current = true;
    onEnterRef.current();
  }, [percent]);

  return (
    <main
      className="splash-shell"
      aria-labelledby="splash-title"
      aria-busy={percent < 100}
    >
      <div className="splash-stack">
        <h1 id="splash-title">{brand.name}</h1>
        <p className="sun-load-pct" aria-live="polite">
          {percent}%
        </p>
      </div>
    </main>
  );
}
