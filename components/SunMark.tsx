"use client";

import { brand } from "@/lib/brand";

export function SunMark({
  size = 280,
  progress = 100,
  className,
  fill = "hold",
  onFillEnd,
}: {
  size?: number;
  progress?: number;
  className?: string;
  /** `load` uses CSS so the mark fills even if JS ticks late. */
  fill?: "load" | "hold" | "done";
  onFillEnd?: () => void;
}) {
  const shown = Math.min(100, Math.max(0, progress));

  return (
    <span
      className={["sun-mark", className].filter(Boolean).join(" ")}
      style={{ width: size, height: size }}
    >
      {/* Native img avoids Next/Image srcset diffs during hydration */}
      <img
        src={brand.logo}
        alt=""
        width={size}
        height={size}
        className="sun-mark-ghost"
      />
      <span
        className={["sun-mark-clip", fill === "load" ? "sun-mark-clip-load" : ""]
          .filter(Boolean)
          .join(" ")}
        style={fill === "load" ? undefined : { height: `${shown}%` }}
        onAnimationEnd={fill === "load" ? onFillEnd : undefined}
      >
        <img
          src={brand.logo}
          alt=""
          width={size}
          height={size}
          className="sun-mark-fill"
        />
      </span>
    </span>
  );
}
