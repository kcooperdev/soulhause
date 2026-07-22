"use client";

import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

const FADE_MS = 340;
const BRAND_RE = /SoulHause/gi;

type SpotlightOwnProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  /** Smaller, deeper sun stops for nav/footer/inline body type */
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

    const root =
      (el.closest("a.nav-logo, a.footer-brand") as HTMLElement | null) ?? el;

    const targets = () =>
      el.querySelectorAll<HTMLElement>(".brand-sunflow");

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

    const activate = (clientX?: number, clientY?: number) => {
      window.clearTimeout(leaveTimerRef.current);
      // Capture ink before glyphs go transparent via background-clip
      el.style.setProperty("--spot-ink", getComputedStyle(el).color);
      el.classList.add("is-spotlit");
      root.classList.add("is-spotlit");

      if (prefersReducedMotion() || !hasFinePointer() || clientX == null) {
        setCentered();
      } else {
        setLocalSpot(clientX, clientY!);
      }

      // Next frame so opacity can transition from 0 → 1
      requestAnimationFrame(() => setOpacity(1));
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
      activate(e.clientX, e.clientY);
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

    const onPointerLeave = () => deactivate();

    const onFocus = () => activate();
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

type BrandMarkProps = {
  className?: string;
  quiet?: boolean;
  /** Stack Soul / Hause (hero wordmark) */
  stacked?: boolean;
  soulClassName?: string;
  hauseClassName?: string;
};

/** Split Soul + Hause wordmark with spotlight reveal. */
export function BrandMark({
  className = "",
  quiet = false,
  stacked = false,
  soulClassName = "",
  hauseClassName = "",
}: BrandMarkProps) {
  const sun = ["brand-sunflow", quiet ? "brand-sunflow--quiet" : "", stacked ? "" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <BrandSpotlight className={className} quiet={quiet}>
      <span className={["brand-soul", sun, soulClassName].filter(Boolean).join(" ")}>
        Soul
      </span>
      <span className={["brand-hause", sun, hauseClassName].filter(Boolean).join(" ")}>
        Hause
      </span>
    </BrandSpotlight>
  );
}

/** Wrap every SoulHause token in a string with an inline spotlight. */
export function BrandText({
  text,
  quiet = true,
}: {
  text: string;
  quiet?: boolean;
}) {
  const nodes: ReactNode[] = [];
  const re = new RegExp(BRAND_RE.source, "gi");
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    nodes.push(
      <BrandSpotlight
        key={`brand-${key++}`}
        className="brand-spotlight--inline"
        quiet={quiet}
      >
        <span className={quiet ? "brand-sunflow brand-sunflow--quiet" : "brand-sunflow"}>
          {match[0]}
        </span>
      </BrandSpotlight>,
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  if (nodes.length === 0) return <>{text}</>;
  return <>{nodes}</>;
}
