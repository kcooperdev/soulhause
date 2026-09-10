"use client";

import { useEffect, useState } from "react";
import { brand, brandLineFull } from "@/lib/brand";

const DWELL_MS = 2000;
const ROLL_MS = 700;

export function BrandLine() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [reduce, setReduce] = useState(false);
  const reel = [...brand.words, brand.words[0]];

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const tick = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => current + 1);
    }, DWELL_MS);
    return () => window.clearInterval(tick);
  }, [reduce]);

  useEffect(() => {
    if (index !== brand.words.length) return;
    const snap = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, ROLL_MS);
    return () => window.clearTimeout(snap);
  }, [index]);

  if (reduce) {
    return <p className="landing-hero-line">{brandLineFull}.</p>;
  }

  return (
    <p className="landing-hero-line" aria-label={`${brandLineFull}.`}>
      <span aria-hidden="true">
        tech for the{" "}
        <span className="brand-roll">
          <span
            className="brand-roll-reel"
            data-animate={animate ? "true" : "false"}
            style={{ transform: `translateY(-${index * 1.2}em)` }}
          >
            {reel.map((word, i) => (
              <span key={`${word}-${i}`} className="brand-roll-word">
                {word}.
              </span>
            ))}
          </span>
        </span>
      </span>
    </p>
  );
}
