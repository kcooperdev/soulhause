"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { siteLinks, theSprint } from "@/lib/offerings";
import { sprintMedia, sprintStory } from "@/lib/sprint";
import { useReveal } from "@/lib/useReveal";

function Kicker({ children }: { children: string }) {
  return <p className="sprint-kicker">{children}</p>;
}

function Film() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // canplay can fire before hydration attaches the handler, which would
    // otherwise leave the footage parked at opacity 0.
    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setReady(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      return;
    }
    el.play().catch(() => {});
  }, []);

  return (
    <div className="sprint-hero-media" aria-hidden="true">
      <div className="sprint-hero-track" />
      <video
        ref={ref}
        className="sprint-hero-video"
        data-ready={ready ? "true" : "false"}
        poster={sprintMedia.poster}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setReady(true)}
      >
        <source src={sprintMedia.webm} type="video/webm" />
        <source src={sprintMedia.mp4} type="video/mp4" />
      </video>
    </div>
  );
}

function Ticker() {
  const row = (
    <div className="sprint-ticker-row" aria-hidden="true">
      {sprintStory.ticker.map((item) => (
        <span key={item} className="sprint-ticker-item">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="sprint-ticker">
      <p className="sr-only">{sprintStory.ticker.join(". ")}.</p>
      {row}
      {row}
    </div>
  );
}

export function SprintPage() {
  const { hero, idea, how, vote, money, coming, footer } = sprintStory;

  const ideaHead = useReveal();
  const focusStrip = useReveal<HTMLUListElement>({ threshold: 0.1 });
  const ideaFoot = useReveal({ threshold: 0.2 });
  const howHead = useReveal();
  const steps = useReveal<HTMLOListElement>({ threshold: 0.05 });
  const rules = useReveal<HTMLUListElement>({ threshold: 0.1 });
  const voteHead = useReveal();
  const categories = useReveal({ threshold: 0.1 });
  const tally = useReveal({ threshold: 0.1 });
  const moneyHead = useReveal();
  const moneyBody = useReveal({ threshold: 0.1 });
  const doors = useReveal({ threshold: 0.1 });
  const close = useReveal({ threshold: 0.2 });

  return (
    <div className="sprint">
      <header className="sprint-hero" id="main" aria-label={theSprint.name}>
        <Film />
        <div className="sprint-hero-scrim" aria-hidden="true" />

        <div className="sprint-hero-inner">
          <p className="sprint-kicker sprint-hero-kicker">{hero.kicker}</p>

          <h1 className="sprint-title">
            <span className="sprint-word sprint-word--the">{hero.title[0]}</span>
            <span className="sprint-word sprint-word--main">{hero.title[1]}</span>
          </h1>

          <div className="sprint-hero-beat">
            <p className="sprint-entry">{hero.entry}</p>
            <p className="sprint-hero-lede">{hero.lede}</p>
          </div>
        </div>

        <div className="sprint-hero-foot">
          <div className="sprint-ctas">
            <Link className="sprint-cta" href={theSprint.enter}>
              {hero.cta}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a className="sprint-cta sprint-cta--ghost" href="#how">
              {hero.secondary}
            </a>
          </div>
          <ul className="sprint-hero-meta">
            {hero.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>{hero.launch}</li>
          </ul>
        </div>
      </header>

      <Ticker />

      <section
        className="sprint-section sprint-section--flat"
        id="baltimore"
        aria-labelledby="sprint-idea"
      >
        <div
          ref={ideaHead.ref}
          className={`sprint-head sprint-head--split sprint-rv ${ideaHead.visible ? "is-in" : ""}`}
        >
          <div>
            <Kicker>{idea.kicker}</Kicker>
            <h2 className="sprint-h2" id="sprint-idea">
              {idea.title}
            </h2>
          </div>
          <p className="sprint-lede">{idea.lede}</p>
        </div>

        <div>
          <p className="sprint-sublabel">{idea.focusLabel}</p>
          <ul
            ref={focusStrip.ref}
            className={`sprint-sectors sprint-rv-stagger ${focusStrip.visible ? "is-in" : ""}`}
          >
            {idea.sectors.map((sector) => (
              <li key={sector} className="sprint-sector">
                {sector}
              </li>
            ))}
          </ul>

          <div
            ref={ideaFoot.ref}
            className={`sprint-brief-foot sprint-rv ${ideaFoot.visible ? "is-in" : ""}`}
          >
            <p className="sprint-note">{idea.note}</p>
            <dl className="sprint-stats">
              {idea.stats.map((stat) => (
                <div key={stat.label} className="sprint-stat">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <b>{stat.value}</b>
                    <span>{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="sprint-section" id="how" aria-labelledby="sprint-how">
        <div ref={howHead.ref} className={`sprint-head sprint-rv ${howHead.visible ? "is-in" : ""}`}>
          <Kicker>{how.kicker}</Kicker>
          <h2 className="sprint-h2" id="sprint-how">
            {how.title}
          </h2>
        </div>

        <div>
          <ol
            ref={steps.ref}
            className={`sprint-steps sprint-rv-stagger ${steps.visible ? "is-in" : ""}`}
          >
            {how.steps.map((step) => (
              <li key={step.day} className="sprint-step">
                <span className="sprint-step-day">{step.day}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <ul
            ref={rules.ref}
            className={`sprint-rules sprint-rv-stagger ${rules.visible ? "is-in" : ""}`}
          >
            {how.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="sprint-note">{how.rulesNote}</p>
        </div>
      </section>

      <section className="sprint-section" id="vote" aria-labelledby="sprint-vote">
        <div
          ref={voteHead.ref}
          className={`sprint-head sprint-head--split sprint-rv ${voteHead.visible ? "is-in" : ""}`}
        >
          <div>
            <Kicker>{vote.kicker}</Kicker>
            <h2 className="sprint-h2" id="sprint-vote">
              {vote.title}
            </h2>
          </div>
          <p className="sprint-lede">{vote.lede}</p>
        </div>

        <div>
          <div
            ref={categories.ref}
            className={`sprint-ballot sprint-rv-stagger ${categories.visible ? "is-in" : ""}`}
          >
            {vote.categories.map((category) => (
              <article key={category.name} className="sprint-category">
                <span className="sprint-num">{category.number}</span>
                <h3>{category.name}</h3>
                <p>{category.body}</p>
              </article>
            ))}
          </div>

          <div ref={tally.ref} className={`sprint-tally sprint-rv ${tally.visible ? "is-in" : ""}`}>
            <b>{vote.tallyTitle}</b>
            <p>{vote.tally}</p>
          </div>
          <p className="sprint-note">{vote.note}</p>
        </div>
      </section>

      <section className="sprint-section" id="money" aria-labelledby="sprint-money">
        <div
          ref={moneyHead.ref}
          className={`sprint-head sprint-head--split sprint-rv ${moneyHead.visible ? "is-in" : ""}`}
        >
          <div>
            <Kicker>{money.kicker}</Kicker>
            <h2 className="sprint-h2" id="sprint-money">
              {money.title}
            </h2>
          </div>
          <p className="sprint-lede">{money.lede}</p>
        </div>

        <div
          ref={moneyBody.ref}
          className={`sprint-price sprint-rv ${moneyBody.visible ? "is-in" : ""}`}
        >
          <div>
            <p className="sprint-price-figure" aria-hidden="true">
              {theSprint.entry}
              <span>→</span>
            </p>
            <ul className="sprint-fine">
              {money.fine.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div>
            <dl className="sprint-splits">
              {money.splits.map((split) => (
                <div key={split.place} className="sprint-split">
                  <dt>{split.place}</dt>
                  <dd>{split.share}</dd>
                </div>
              ))}
            </dl>
            <p className="sprint-example">
              <b>{money.exampleLabel}</b>
              {money.example}
            </p>
          </div>
        </div>

        <div ref={doors.ref} className={`sprint-doors-block sprint-rv ${doors.visible ? "is-in" : ""}`}>
          <p className="sprint-sublabel">{money.doorsTitle}</p>
          <dl className="sprint-doors">
            {money.doors.map((door) => (
              <div key={door.name} className="sprint-door">
                <dt>{door.name}</dt>
                <dd>{door.body}</dd>
              </div>
            ))}
          </dl>
          <div className="sprint-ctas">
            <Link className="sprint-cta sprint-cta--ghost" href={theSprint.enter}>
              {money.cta}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="sprint-section sprint-coming"
        id="january"
        aria-labelledby="sprint-coming"
      >
        <div ref={close.ref} className={`sprint-rv ${close.visible ? "is-in" : ""}`}>
          <Kicker>{coming.kicker}</Kicker>
          <p className="sprint-date" id="sprint-coming">
            {coming.title}
          </p>
          <p className="sprint-lede">{coming.lede}</p>
          <p className="sprint-lede sprint-record">{coming.record}</p>
          <div className="sprint-ctas">
            <Link className="sprint-cta" href={theSprint.enter}>
              {coming.cta}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <p className="sprint-note">{coming.note}</p>
        </div>
      </section>

      <footer className="sprint-footer">
        <div className="sprint-footer-inner">
          <div className="sprint-footer-mark">
            <b>{theSprint.name}</b>
            <i>{footer.line}</i>
          </div>
          <nav aria-label={`${brand.name} pages`}>
            {siteLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.name}
              </Link>
            ))}
          </nav>
          <ul className="sprint-footer-meta">
            <li>{brand.name}</li>
            {footer.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
