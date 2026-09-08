"use client";

import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

const FADE_MS = 340;
const TAP_STRONG = 1;

type SpotlightOwnProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  quiet?: boolean;
};

type BrandSpotlightProps<T extends ElementType> = SpotlightOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof SpotlightOwnProps<T>>;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

/** Mobile / touch: solid ink only — no sun spotlight. */
function isSunDisabled() {
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

/**
 * Soft circular sun-stripe spotlight over brand text.
 * Default paint stays solid ink; hover/focus reveals logo colors inside the spot.
 */
export function BrandSpotlight<T extends ElementType = "span">({
  as,
  children,
  className = "",
  quiet = false,
  ...rest
}: BrandSpotlightProps<T>) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const leaveTimerRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isSunDisabled()) return;

    const root = el;
    const targets = () => el.querySelectorAll<HTMLElement>(".brand-sunflow");

    const setLocalSpot = (clientX: number, clientY: number) => {
      targets().forEach((t) => {
        const r = t.getBoundingClientRect();
        t.style.setProperty("--spot-x", `${clientX - r.left}px`);
        t.style.setProperty("--spot-y", `${clientY - r.top}px`);
      });
    };

    const setCentered = () => {
      targets().forEach((t) => {
        t.style.setProperty("--spot-x", "50%");
        t.style.setProperty("--spot-y", "50%");
      });
    };

    const setOpacity = (value: number) => {
      el.style.setProperty("--spot-opacity", String(value));
    };

    const activate = (
      clientX?: number,
      clientY?: number,
      strength: number = TAP_STRONG,
    ) => {
      window.clearTimeout(leaveTimerRef.current);
      el.style.setProperty("--spot-ink", getComputedStyle(el).color);
      el.classList.add("is-spotlit");
      root.classList.add("is-spotlit");

      if (clientX != null && clientY != null && !prefersReducedMotion()) {
        setLocalSpot(clientX, clientY);
      } else {
        setCentered();
      }

      requestAnimationFrame(() => setOpacity(strength));
    };

    const deactivate = () => {
      setOpacity(0);
      leaveTimerRef.current = window.setTimeout(() => {
        el.classList.remove("is-spotlit");
        root.classList.remove("is-spotlit");
      }, FADE_MS);
    };

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      activate(e.clientX, e.clientY, TAP_STRONG);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (prefersReducedMotion() || !hasFinePointer()) return;
      if (!el.classList.contains("is-spotlit")) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setLocalSpot(e.clientX, e.clientY);
      });
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      deactivate();
    };

    const onFocus = () => {
      window.clearTimeout(leaveTimerRef.current);
      const strength = prefersReducedMotion() ? 0.72 : TAP_STRONG;
      activate(undefined, undefined, strength);
    };

    const onBlur = () => deactivate();

    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("focus", onFocus);
    root.addEventListener("blur", onBlur);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(leaveTimerRef.current);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("focus", onFocus);
      root.removeEventListener("blur", onBlur);
      root.classList.remove("is-spotlit");
      el.classList.remove("is-spotlit", "is-breathing");
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={["brand-spotlight", quiet ? "brand-spotlight--quiet" : "", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
