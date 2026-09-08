"use client";

import { useEffect, useRef, useState } from "react";
import { SunMark } from "@/components/SunMark";
import { brand } from "@/lib/brand";
import { hasEnteredThisVisit, markEntered } from "@/lib/visit";

export { hasEnteredThisVisit, markEntered };

const LOAD_MS = 2500;
const TICK_MS = 80;

function markSize() {
  if (typeof window === "undefined") return 280;
  return window.matchMedia("(min-width: 64rem)").matches ? 380 : 280;
}

function loadPercent(elapsed: number, reduce: boolean) {
  if (reduce) return 100;
  const t = Math.min(1, elapsed / LOAD_MS);
  if (t >= 1) return 100;
  return Math.min(90, Math.round(t * 10) * 10);
}

export function Splash({ onEnter }: { onEnter: () => void }) {
  const [percent, setPercent] = useState(0);
  const [sunSize, setSunSize] = useState(280);
  const handedOff = useRef(false);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    document.body.classList.add("is-splash");
    setSunSize(markSize());

    const wide = window.matchMedia("(min-width: 64rem)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onWide = () => setSunSize(wide.matches ? 380 : 280);
    wide.addEventListener("change", onWide);

    const reduce = motion.matches;
    if (reduce) {
      setPercent(100);
      return () => {
        wide.removeEventListener("change", onWide);
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

    const clip = document.querySelector(".sun-mark-clip-load");
    const anims = clip?.getAnimations?.() ?? [];
    if (anims.some((anim) => anim.playState === "finished")) setPercent(100);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(fallback);
      wide.removeEventListener("change", onWide);
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
        <h1 id="splash-title" className="sr-only">
          {brand.name}
        </h1>
        <SunMark
          className="splash-sun"
          size={sunSize}
          progress={percent}
          fill="load"
          onFillEnd={() => setPercent(100)}
        />
        <p className="sun-load-pct" aria-live="polite">
          {percent}%
        </p>
      </div>
    </main>
  );
}
