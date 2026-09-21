"use client";

import { useEffect, useRef, useState } from "react";

import { folx } from "@/lib/folx";

const KINDS: Record<string, "ai" | "cyber" | "biotech" | "ux"> = {
  ai: "ai",
  cyber: "cyber",
  biotech: "biotech",
  ux: "ux",
};

type Word = {
  text: string;
  kind?: "ai" | "cyber" | "biotech" | "ux";
};

function tokenize(line: string): Word[] {
  return line.split(" ").filter(Boolean).map((text) => {
    const key = text.replace(/[^a-z0-9]/gi, "").toLowerCase();
    return { text, kind: KINDS[key] };
  });
}

const PARAS = folx.reveal.map(tokenize);

function wordWindow(
  progress: number,
  index: number,
  total: number,
  overlapWords: number,
) {
  const totalTime = 1 + overlapWords / total;
  const start = (index / total) / totalTime;
  const end = (index / total + overlapWords / total) / totalTime;
  const duration = Math.max(0.0001, end - start);
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / duration;
}

function applyProgress(root: HTMLElement, progress: number) {
  const nodes = root.querySelectorAll<HTMLElement>("[data-word]");
  const total = nodes.length;
  if (!total) return;

  if (progress <= 0.7) {
    const reveal = Math.min(1, progress / 0.7);
    nodes.forEach((node, index) => {
      const local = wordWindow(reveal, index, total, 15);
      const bg = local < 0.9 ? 1 : 1 - (local - 0.9) / 0.1;
      const text = local < 0.9 ? 0 : Math.sqrt((local - 0.9) / 0.1);
      node.style.opacity = String(local);
      node.style.setProperty("--bg", String(Math.max(0, Math.min(1, bg))));
      node.style.setProperty("--txt", String(Math.max(0, Math.min(1, text))));
    });
    return;
  }

  const reverse = (progress - 0.7) / 0.3;
  nodes.forEach((node, index) => {
    const local = wordWindow(reverse, index, total, 5);
    node.style.opacity = "1";
    node.style.setProperty("--bg", String(local));
    node.style.setProperty("--txt", String(1 - local));
  });
}

export function TechReveal() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!pin || !stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setReduce(true);
      return;
    }

    let frame = 0;
    const tick = () => {
      frame = 0;
      const total = pin.offsetHeight - window.innerHeight;
      const p =
        total <= 0
          ? 1
          : Math.min(1, Math.max(0, -pin.getBoundingClientRect().top / total));
      applyProgress(stage, p);
    };
    const requestTick = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  return (
    <div ref={pinRef} className="reveal-pin">
      <div ref={stageRef} className="reveal-stage" data-reduce={reduce ? "true" : "false"}>
        <div className="reveal-copy">
          {PARAS.map((words, i) => (
            <p key={i}>
              {words.map((word, j) => (
                <span
                  key={`${i}-${j}`}
                  className={word.kind ? "word keyword-wrapper" : "word"}
                  data-word=""
                  data-kind={word.kind ?? "plain"}
                >
                  <span className={word.kind ? `keyword ${word.kind}` : undefined}>
                    {word.text}
                  </span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
