"use client";

import { useEffect } from "react";
import { BrandSpotlight } from "@/components/BrandSpotlight";
import { CustomCursor } from "@/components/CustomCursor";
import { HeroInviteBar } from "@/components/HeroInviteBar";
import { Logo } from "@/components/Logo";
import { brand } from "@/lib/brand";
import { events } from "@/lib/events";
import { readRsvp, writeRsvp } from "@/lib/prefs";
import { hasSeenHeroThisVisit, markHeroSeen } from "@/lib/visit";

export { hasSeenHeroThisVisit, markHeroSeen };

const NEXT_LINE = "Next: Hause of Soul · September 17, 2026";

function useLandingPage() {
  useEffect(() => {
    document.body.classList.add("is-landing-hero");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      document.body.classList.toggle("reduce-motion", mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.classList.remove("reduce-motion");
      document.body.classList.remove("is-landing-hero");
    };
  }, []);
}

function HouseMark() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 3.4 28.8 15.4h-3.3V28.4H6.5V15.4H3.2L16 3.4Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        d="M21.5 6.6v5.2"
      />
    </svg>
  );
}

export function LandingHero({
  onContinue,
  onReset,
}: {
  onContinue: () => void;
  hasAccount?: boolean;
  onReset?: () => void;
}) {
  useLandingPage();

  const night = events[0];
  const rsvpUrl = night?.registerUrl ?? "https://luma.com/hj5hk5jf";

  function rsvp() {
    if (!night) return;
    const already = readRsvp();
    if (!already.includes(night.id)) writeRsvp([...already, night.id]);
  }

  function join() {
    onReset?.();
    onContinue();
  }

  return (
    <main className="landing-hero" aria-labelledby="landing-hero-title">
      <div className="landing-hero-canvas" aria-hidden="true" />
      <span className="landing-hero-logo" aria-hidden="true">
        <Logo size={60} decorative />
      </span>
      <div className="landing-hero-stage">
        <span className="landing-hero-house" aria-hidden="true">
          <HouseMark />
        </span>

        <BrandSpotlight
          as="h1"
          id="landing-hero-title"
          className="landing-hero-brand"
          aria-label={brand.name}
          tabIndex={0}
        >
          <span className="brand-soul brand-sunflow">Soul</span>
          <span className="brand-hause brand-sunflow">Hause</span>
        </BrandSpotlight>

        <p className="landing-hero-say">pronounced (/sōl/-hau̇s)</p>

        <p className="landing-hero-line">{brand.line}.</p>

        <a
          href={rsvpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="landing-hero-rsvp landing-hero-rsvp-phone"
          onClick={rsvp}
        >
          RSVP on Luma <span className="arrow">→</span>
        </a>

        <div className="landing-hero-ctas">
          <button type="button" className="landing-hero-join" onClick={join}>
            New here? Join the Hause
          </button>
          <button type="button" className="landing-hero-enter" onClick={onContinue}>
            Already a member? Enter the Hause
          </button>
        </div>

        <p className="landing-hero-next">{NEXT_LINE}</p>
      </div>

      <HeroInviteBar rsvpHref={rsvpUrl} onRsvp={rsvp} />

      <CustomCursor />
    </main>
  );
}

/** @deprecated Use LandingHero */
export const DesktopHero = LandingHero;
