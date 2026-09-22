"use client";

import Script from "next/script";
import Link from "next/link";
import { forwardRef, useEffect, useRef } from "react";
import { HouseNav } from "@/components/HouseNav";

const EVENT_ID = "evt-c0PRMJkFHQr5G9a";
const EVENT_URL = `https://luma.com/event/${EVENT_ID}`;

declare global {
  interface Window {
    luma?: { initCheckout?: () => void };
  }
}

function openCheckout() {
  window.luma?.initCheckout?.();
}

const paths = {
  experience: {
    open: "You are the experience.",
    note: "A limited number of guests.",
    price: "$20",
    included: [
      {
        name: "Activated Drink Moment",
        line: "Your drink triggers a visual response inside the experience.",
      },
      {
        name: "Signature Cocktail or Mocktail",
        line: "One themed drink crafted for the night.",
      },
      {
        name: "Prize Entry",
        line: "Automatic entry to win a featured tech item.",
      },
      {
        name: "Immersive Access",
        line: "You unlock the full system sequence.",
      },
    ],
  },
  spectator: {
    open: "You are a spectator.",
    note: "The room, the people, the moments.",
    price: "Free",
    included: [
      {
        name: "Environment Access",
        line: "Step into the space and feel the atmosphere.",
      },
      {
        name: "View System Moments",
        line: "Watch the Experience Path unfold around you.",
      },
      {
        name: "Community Connection",
        line: "Meet Baltimore’s tech creatives, founders, and working professionals.",
      },
    ],
  },
} as const;

type Side = keyof typeof paths;

function ScrollCue() {
  return (
    <p className="path-scroll-cue" aria-hidden="true">
      <span className="path-scroll-arrow">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            d="M5 9.5 12 16.5 19 9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </p>
  );
}

function NeonScene({ side }: { side: Side }) {
  return (
    <div className="path-object">
      <div className="path-frame">
        {side === "experience" ? (
          <DrinkScene />
        ) : (
          <img
            className="path-neon path-figure"
            src="/offer-spectator-real.png?v=3"
            alt="A person seen from behind, standing at a window and looking out."
          />
        )}
      </div>
      <ScrollCue />
    </div>
  );
}

function DrinkScene() {
  return (
    <div
      className="path-drink"
      role="img"
      aria-label="A cocktail glass. Ice drops in, liquor rises, then a lime lands on the rim."
    >
      <img className="path-shot path-shot-empty" src="/offer-glass-empty.png" alt="" />
      <img className="path-shot path-shot-ice" src="/offer-cut-ice.png" alt="" />
      <img className="path-shot path-shot-pour" src="/offer-glass-pour.png" alt="" />
      <img className="path-shot path-shot-lime" src="/offer-cut-lime.png" alt="" />
    </div>
  );
}

const Checkout = forwardRef<
  HTMLAnchorElement,
  { side: Side; onPress: (button: HTMLAnchorElement) => void }
>(function Checkout({ side, onPress }, ref) {
  const label =
    side === "experience"
      ? "Be part of the experience, November 4. Experience."
      : "Be part of the experience, November 4. Spectator.";

  return (
    <a
      ref={ref}
      href={EVENT_URL}
      className="hero-cta"
      aria-label={label}
      data-luma-action="checkout"
      data-luma-event-id={EVENT_ID}
      data-luma-utm-source={side}
      onClick={(event) => {
        if (event.currentTarget instanceof HTMLAnchorElement) onPress(event.currentTarget);
      }}
    >
      Be part of the experience
    </a>
  );
});

function showLine(receipt: HTMLElement, words: number) {
  const lines = [...receipt.querySelectorAll<HTMLElement>(".path-line")];
  if (!lines.length) return;
  const index = Math.min(lines.length - 1, Math.floor(Math.max(0, words) * lines.length * 0.999));
  lines.forEach((line, lineIndex) => line.classList.toggle("is-on", lineIndex === index));
}

function sectionProgress(section: HTMLElement) {
  const total = section.offsetHeight - window.innerHeight;
  const passed = Math.min(Math.max(-section.getBoundingClientRect().top, 0), Math.max(total, 0));
  return total <= 0 ? 1 : passed / total;
}

function Ways() {
  return (
    <p className="path-ways">
      <Link href="/offer">Back to the film</Link>
      <Link href="/">TechFolx</Link>
    </p>
  );
}

export function OfferPath({ side }: { side: Side }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const pressedRef = useRef<HTMLAnchorElement | null>(null);
  const focusedRef = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const sticky = stickyRef.current;
    const receipt = receiptRef.current;
    if (!scene || !sticky) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = () => {
      if (reduce) {
        scene.dataset.reduced = "true";
        sticky.style.setProperty("--move", "1");
        sticky.style.setProperty("--p", "1");
        sticky.style.setProperty("--walk", "1");
        sticky.style.setProperty("--zoom", "1");
        sticky.style.setProperty("--fade", "1");
        sticky.style.setProperty("--cue", "0");
        sticky.dataset.revealed = "true";
        sticky.dataset.swapped = "true";
        titleRef.current?.focus({ preventScroll: true });
        return;
      }
      const rect = scene.getBoundingClientRect();
      const raw = sectionProgress(scene);
      const cue = Math.max(0, 1 - raw / 0.05);
      sticky.style.setProperty("--cue", cue.toFixed(3));
      let fade = 0;
      if (side === "experience") {
        sticky.style.setProperty("--p", Math.min(1, raw / 0.36).toFixed(3));
        fade = Math.min(1, Math.max(0, (raw - 0.48) / 0.12));
        const words = raw <= 0.62 ? 0 : Math.min(1, (raw - 0.62) / 0.38);
        if (receipt) showLine(receipt, words);
      } else {
        sticky.style.setProperty("--walk", Math.min(1, raw / 0.26).toFixed(3));
        sticky.style.setProperty("--zoom", Math.min(1, Math.max(0, (raw - 0.26) / 0.2)).toFixed(3));
        fade = Math.min(1, Math.max(0, (raw - 0.56) / 0.12));
        const words = raw <= 0.7 ? 0 : Math.min(1, (raw - 0.7) / 0.3);
        if (receipt) showLine(receipt, words);
      }
      sticky.style.setProperty("--fade", fade.toFixed(3));
      const swapped = fade > 0.92;
      sticky.dataset.swapped = swapped ? "true" : "false";
      if (swapped && !focusedRef.current) {
        focusedRef.current = true;
        titleRef.current?.focus({ preventScroll: true });
      }
      const pinning = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight + 1;
      sticky.classList.toggle("is-held", pinning);
      sticky.classList.toggle("is-parked", !pinning && rect.top < 0);
    };

    show();
    window.addEventListener("scroll", show, { passive: true });
    window.addEventListener("resize", show);
    return () => {
      window.removeEventListener("scroll", show);
      window.removeEventListener("resize", show);
    };
  }, [side]);

  useEffect(() => {
    let open = false;
    const checkoutOpen = () =>
      Boolean(
        document.querySelector("iframe[src*='luma.com/embed'], [class*='background-overlay']"),
      );
    const watcher = new MutationObserver(() => {
      if (checkoutOpen()) {
        open = true;
        return;
      }
      if (!open) return;
      open = false;
      pressedRef.current?.focus();
    });
    watcher.observe(document.body, { childList: true, subtree: true });
    return () => watcher.disconnect();
  }, []);

  function remember(button: HTMLAnchorElement) {
    pressedRef.current = button;
  }

  function skipToTicket() {
    const scene = sceneRef.current;
    if (!scene) return;
    const total = scene.offsetHeight - window.innerHeight;
    const at = side === "experience" ? 0.64 : 0.72;
    window.scrollTo({ top: Math.max(0, total * at), behavior: "smooth" });
  }

  return (
    <>
      <HouseNav />
      <main className="folx-scroll offer-path" data-side={side}>
        <section
          ref={sceneRef}
          className="path-scene path-pin-scroll"
          style={{ height: "520vh" }}
        >
          <div ref={stickyRef} className="path-scene-sticky" data-revealed="false">
            <div className="path-stage">
              <NeonScene side={side} />
            </div>
            <div ref={receiptRef} className="path-receipt-sticky path-receipt-in">
              <div className={side === "experience" ? "path-slip" : "path-pane"}>
                {side === "experience" ? <p className="path-slip-kicker">Receipt</p> : null}
                <h1 ref={titleRef} tabIndex={-1}>
                  {side === "experience"
                    ? "You are a part of the experience."
                    : "You are a spectator."}
                </h1>
                <p className="path-price">
                  <span className="path-kind">
                    {side === "experience" ? "Experience" : "Spectator"}
                  </span>
                  {paths[side].price}
                </p>
                <div className="path-line-slot" aria-live="polite">
                  {paths[side].included.map((item, index) => (
                    <p key={item.name} className={index === 0 ? "path-line is-on" : "path-line"}>
                      <strong>{item.name}</strong>
                      <span>{item.line}</span>
                    </p>
                  ))}
                </div>
                <p className="path-when">November 4 · Nola Seafood</p>
                <div className="cta-stack">
                  <Checkout side={side} onPress={remember} />
                </div>
              </div>
            </div>
            <div className="path-pin-foot">
              <button type="button" className="path-skip" onClick={skipToTicket}>
                Skip to the ticket
              </button>
              <Ways />
            </div>
          </div>
        </section>
      </main>
      <Script
        id="luma-checkout"
        src="https://embed.lu.ma/checkout-button.js"
        strategy="afterInteractive"
        onReady={openCheckout}
      />
    </>
  );
}
