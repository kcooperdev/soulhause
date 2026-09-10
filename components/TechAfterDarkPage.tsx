"use client";

import { useReveal } from "@/lib/useReveal";
import { nightStory } from "@/lib/night";
import { techAfterDark } from "@/lib/offerings";
import { events } from "@/lib/events";
import { readRsvp, writeRsvp } from "@/lib/prefs";

function markNight() {
  const night = events[0];
  if (!night) return;
  const already = readRsvp();
  if (!already.includes(night.id)) writeRsvp([...already, night.id]);
}

function Gold({ children }: { children: string }) {
  return (
    <span
      style={{
        background: "linear-gradient(135deg, #E8A838 0%, #F0C060 50%, #E8A838 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

function Eye({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-4">
      <div className="h-px w-7 bg-amber" aria-hidden="true" />
      <span className="font-mono text-xs tracking-[0.25em] text-amber uppercase">{children}</span>
      <div className="h-px w-7 bg-amber" aria-hidden="true" />
    </div>
  );
}

function Rsvp({ className }: { className?: string }) {
  return (
    <a
      href={techAfterDark.rsvp}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={markNight}
    >
      Save a spot
    </a>
  );
}

export function TechAfterDarkPage() {
  const city = events[0]?.city ?? "Laurel, MD";
  const venue = events[0]?.venue ?? "Miss Toya’s";
  const problem = useReveal({ threshold: 0.1 });
  const pillarsHead = useReveal();
  const pillars = useReveal({ threshold: 0.1 });
  const audience = useReveal({ threshold: 0.15 });
  const host = useReveal({ threshold: 0.15 });
  const deal = useReveal();
  const walk = useReveal({ threshold: 0.1 });
  const faqHead = useReveal({ threshold: 0.1 });
  const faq = useReveal({ threshold: 0.05 });
  const close = useReveal({ threshold: 0.15 });

  return (
    <div className="relative z-[5]">
      <header
        id="main"
        className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center sm:px-8"
        aria-label="Tech After Dark"
      >
        <div
          className="mb-6 sm:mb-8"
          style={{ animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both 0.35s" }}
        >
          <h1
            className="font-display font-black uppercase leading-[0.88]"
            style={{ fontSize: "clamp(2.5rem, 10vw, 8.5rem)", letterSpacing: "-0.02em" }}
          >
            <span className="block text-cream">Tech</span>
            <span
              className="block"
              style={{
                color: "rgba(160,125,212,0.28)",
                WebkitTextStroke: "1.5px #A07DD4",
              }}
            >
              After
            </span>
            <span className="block">
              <Gold>Dark</Gold>
            </span>
          </h1>
        </div>
        <p
          className="font-body mb-3 max-w-lg px-2 text-lg font-medium text-cream/75 sm:text-2xl"
          style={{ animation: "fadeUp 0.8s ease both 0.6s" }}
        >
          {nightStory.line}
        </p>
        <p
          className="font-body mb-4 max-w-md px-2 text-sm font-medium text-cream/70 sm:text-base"
          style={{ animation: "fadeUp 0.8s ease both 0.65s" }}
        >
          {nightStory.lede}
        </p>
        <p
          className="font-mono text-xs text-cream/65"
          style={{ animation: "fadeUp 0.9s ease both 0.8s" }}
        >
          {city} · After work
        </p>
      </header>

      <section
        aria-label="This month"
        className="relative z-10 border-y border-cream-faint bg-deep/50"
      >
        <div className="mx-auto max-w-5xl px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="font-mono mb-2 text-[10px] tracking-[0.25em] text-amber uppercase sm:text-xs">
            This month
          </p>
          <p
            className="font-display text-2xl font-black tracking-tight text-cream uppercase sm:text-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {city}
          </p>
          <p className="font-body mt-2 text-sm text-cream/70 sm:text-base">
            {techAfterDark.when}
            <span className="text-cream/65" aria-hidden="true">
              {" "}
              ·{" "}
            </span>
            {venue}
          </p>
        </div>
      </section>

      <section id="about" className="relative z-10 px-6 py-24 sm:px-[5vw] sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div
            ref={problem.ref}
            className={`reveal mx-auto mb-20 max-w-3xl text-center sm:mb-28 ${problem.visible ? "visible" : ""}`}
          >
            <Eye>The Problem</Eye>
            <h2
              className="font-display mb-10 font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}
            >
              Most Tech Events <Gold>Aren’t Worth The Drive.</Gold>
            </h2>
            <div className="mx-auto max-w-md space-y-4 text-left">
              {nightStory.traps.map((trap) => (
                <div key={trap} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-mono text-sm text-red-400/70">✗</span>
                  <p className="font-body text-base leading-[1.7] font-medium text-cream/70 sm:text-lg">
                    {trap}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-body mx-auto mt-12 max-w-lg text-xl font-medium text-cream/80 sm:text-2xl">
              {nightStory.opposite}
            </p>
          </div>

          <div
            ref={pillarsHead.ref}
            className={`reveal mx-auto mb-16 max-w-3xl text-center sm:mb-20 ${pillarsHead.visible ? "visible" : ""}`}
          >
            <Eye>What You Get</Eye>
            <h2
              className="font-display font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(2rem, 7vw, 7rem)" }}
            >
              Same Happy Hour. <Gold>Better Room.</Gold>
            </h2>
          </div>

          <div
            ref={pillars.ref}
            className={`reveal-stagger grid grid-cols-1 gap-px bg-cream/15 sm:grid-cols-2 lg:grid-cols-4 ${pillars.visible ? "visible" : ""}`}
            role="list"
          >
            {nightStory.pillars.map((item) => (
              <div key={item.number} role="listitem" className="group bg-ink p-7 transition-colors duration-400 hover:bg-deep sm:p-8">
                <span className="font-mono mb-6 block text-xs tracking-widest text-amber/70">
                  {item.number}
                </span>
                <h3 className="font-display mb-4 text-2xl font-black tracking-tight text-cream uppercase group-hover:text-amber sm:text-3xl">
                  {item.title}
                </h3>
                <p className="font-body text-lg leading-[1.7] font-medium text-cream/80">{item.body}</p>
              </div>
            ))}
          </div>

          <p
            className={`reveal mx-auto mt-16 max-w-2xl text-center font-body text-lg font-medium leading-[1.8] text-cream/70 sm:mt-20 sm:text-xl ${pillars.visible ? "visible" : ""}`}
          >
            {nightStory.contrast}
          </p>

          <div
            ref={audience.ref}
            className={`reveal mx-auto mt-20 max-w-3xl sm:mt-28 ${audience.visible ? "visible" : ""}`}
          >
            <h3 className="font-display mb-4 text-center text-3xl font-black tracking-tight text-cream uppercase sm:text-4xl">
              {nightStory.whoTitle}
            </h3>
            <p className="font-body mx-auto mb-12 max-w-md text-center text-base text-cream/70">
              {nightStory.whoLead}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {nightStory.who.map((item) => (
                <div
                  key={item.name}
                  className="group border border-cream/20 p-6 text-center transition-all duration-400 hover:border-violet/40 hover:bg-deep/50"
                >
                  <h4 className="font-display mb-3 text-base font-black tracking-tight text-cream uppercase group-hover:text-amber sm:text-lg">
                    {item.name}
                  </h4>
                  <p className="font-body text-base leading-[1.7] font-medium text-cream/80">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-cream-faint px-6 py-24 sm:px-[5vw] sm:py-32">
        <div
          ref={host.ref}
          className={`reveal mx-auto max-w-3xl ${host.visible ? "visible" : ""}`}
        >
          <Eye>{nightStory.hostKicker}</Eye>
          <blockquote className="font-body mx-auto max-w-2xl text-center text-lg leading-[1.8] font-medium text-cream/80 sm:text-xl">
            {nightStory.host}
          </blockquote>
          <p className="font-display mt-8 text-center text-sm font-bold tracking-[0.2em] text-amber uppercase">
            — {nightStory.hostName}
          </p>
          <p className="font-mono mt-1 text-center text-xs text-cream/65">{nightStory.hostRole}</p>
        </div>
      </section>

      <section id="the-night" className="relative z-10 px-6 py-24 sm:px-[5vw] sm:py-32">
        <div className="mx-auto max-w-3xl">
          <div
            ref={deal.ref}
            className={`reveal mb-16 text-center sm:mb-20 ${deal.visible ? "visible" : ""}`}
          >
            <Eye>The Night</Eye>
            <h2
              className="font-display mb-6 font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(2rem, 7vw, 6.5rem)" }}
            >
              Here’s The <Gold>Deal.</Gold>
            </h2>
            <p className="font-body mx-auto max-w-lg text-xl font-medium text-cream/75 sm:text-2xl">
              {nightStory.dealLead}
            </p>
          </div>

          <div
            ref={walk.ref}
            className={`reveal mb-8 border border-amber/25 bg-amber/[0.02] p-6 sm:p-10 ${walk.visible ? "visible" : ""}`}
          >
            <p className="font-mono mb-8 text-xs tracking-widest text-amber uppercase">
              {nightStory.walkTitle}
            </p>
            <div className="divide-y divide-cream/10">
              {nightStory.walk.map((line) => (
                <div key={line} className="flex items-start gap-3 py-4">
                  <span className="mt-0.5 shrink-0 font-mono text-sm text-amber">✓</span>
                  <span className="font-body flex-1 text-base text-cream/80 sm:text-lg">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="relative z-10 border-t border-cream-faint px-6 py-24 sm:px-[5vw] sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div
            ref={faqHead.ref}
            className={`reveal lg:sticky lg:top-32 lg:self-start ${faqHead.visible ? "visible" : ""}`}
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-7 bg-amber opacity-40" aria-hidden="true" />
              <span className="font-mono text-xs tracking-[0.25em] text-amber uppercase">FAQ</span>
            </div>
            <h2
              className="font-display font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)" }}
            >
              Good
              <br />
              Questions.
            </h2>
          </div>
          <div
            ref={faq.ref}
            className={`reveal divide-y divide-cream-faint ${faq.visible ? "visible" : ""}`}
          >
            {nightStory.faqs.map((item) => (
              <details key={item.q} className="group">
                <summary className="font-display cursor-pointer list-none py-5 text-left text-lg font-bold tracking-tight text-cream uppercase transition-colors duration-300 hover:text-amber sm:py-6 sm:text-xl lg:text-2xl">
                  {item.q}
                </summary>
                <p className="font-body max-w-xl pb-6 text-base leading-[1.7] font-medium text-cream/75">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="final-cta"
        className="relative z-10 overflow-hidden border-t border-cream-faint px-6 py-24 sm:px-[5vw] sm:py-32"
      >
        <div
          ref={close.ref}
          className={`reveal relative mx-auto max-w-3xl text-center ${close.visible ? "visible" : ""}`}
        >
          <h2
            className="font-display mb-6 font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}
          >
            You Made It <Gold>This Far.</Gold>
          </h2>
          <p className="font-body mx-auto mb-3 max-w-lg text-lg font-medium text-cream/70 sm:text-xl">
            {nightStory.closeTitle}
          </p>
          <p className="font-body mx-auto mb-8 max-w-md text-base font-medium text-cream/70">
            {nightStory.close}
          </p>
          <Rsvp className="cta-primary font-display mb-4 inline-flex items-center justify-center text-xs sm:text-sm" />
          <p className="font-mono text-xs text-cream/65">
            {city} · After work
          </p>
        </div>
      </footer>
    </div>
  );
}
