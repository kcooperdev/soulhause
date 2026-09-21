"use client";

import Link from "next/link";
import { brand, brandPillars } from "@/lib/brand";
import {
  company,
  contact,
  techAfterDark,
  work,
  workPackages,
  workSteps,
} from "@/lib/offerings";

const proof = [
  { value: "Free", label: "Audit before any quote" },
  { value: "One price", label: "Seen before work starts" },
  { value: "Simple", label: "Enterprise tagging, business scope" },
] as const;

export function CompanyHome() {
  return (
    <div className="omega">
      <section className="omega-hero" aria-labelledby="omega-title">
        <p className="omega-kicker">Analytics & tagging</p>
        <h1 id="omega-title">See every step. Trust the numbers.</h1>
        <p className="omega-lede">{company.what}</p>
        <div className="omega-cta">
          <Link className="omega-btn" href={contact.href}>
            {contact.name}
          </Link>
          <Link className="omega-btn-ghost" href={work.href}>
            See packages
          </Link>
        </div>
        <p className="omega-risk">{company.value}</p>
      </section>

      <ul className="omega-proof">
        {proof.map((item) => (
          <li key={item.label}>
            <b>{item.value}</b>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <section className="omega-section" aria-labelledby="omega-services">
        <p className="omega-kicker">What we do</p>
        <h2 id="omega-services">The craft, then the night.</h2>
        <ol className="omega-rows">
          {brandPillars.map((item, index) => (
            <li key={item.name}>
              <span>0{index + 1}</span>
              <h3>{item.name}</h3>
              <p>{item.line}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="omega-section" aria-labelledby="omega-how">
        <p className="omega-kicker">How it works</p>
        <h2 id="omega-how">Audit. Tag. Picture.</h2>
        <ol className="omega-rows">
          {workSteps.map((step, index) => (
            <li key={step.name}>
              <span>0{index + 1}</span>
              <h3>{step.name}</h3>
              <p>{step.line}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="omega-section" aria-labelledby="omega-rates">
        <p className="omega-kicker">{work.kicker}</p>
        <h2 id="omega-rates">{work.line}</h2>
        <p className="omega-lede">{work.what}</p>
        <ul className="omega-packs">
          {workPackages.map((pack) => (
            <li key={pack.id} data-feature={pack.id === "setup" ? "true" : undefined}>
              {pack.id === "setup" ? <p className="omega-pack-tag">Most teams</p> : null}
              <h3>{pack.name}</h3>
              <p className="omega-price">
                {pack.price}
                {pack.unit ? <i>{pack.unit}</i> : null}
              </p>
              <p className="omega-pack-line">{pack.line}</p>
              <ul>
                {pack.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                className={pack.id === "setup" ? "omega-btn" : "omega-btn-ghost"}
                href={`${contact.href}?pack=${pack.id}`}
              >
                {pack.cta}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="omega-night" aria-labelledby="omega-night">
        <p className="omega-kicker omega-kicker--light">{techAfterDark.kicker}</p>
        <h2 id="omega-night">{techAfterDark.name}</h2>
        <p>{techAfterDark.what}</p>
        <Link className="omega-btn omega-btn--mark" href={techAfterDark.href}>
          See the night
        </Link>
      </section>

      <footer className="omega-foot">
        <p className="omega-stamp">{brand.name}</p>
        <p>{brand.line}</p>
      </footer>
    </div>
  );
}
