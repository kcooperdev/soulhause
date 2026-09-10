"use client";

import Link from "next/link";
import { useState } from "react";
import { InstallHome } from "@/components/InstallHome";
import { techHause } from "@/lib/offerings";
import { planCompare, plans } from "@/lib/plans";

type Tier = "free" | "paid";

export function TechHausePage() {
  const [tier, setTier] = useState<Tier>("free");
  const free = plans[0];
  const paid = plans[1];
  const onPaid = tier === "paid";
  const perks = onPaid
    ? [
        "Everything in Free",
        ...planCompare.filter((row) => row.paid && !row.free).map((row) => row.perk),
      ]
    : planCompare.filter((row) => row.free).map((row) => row.perk);

  return (
    <div className="th">
      <header className="th-hero" aria-labelledby="hause-title">
        <p className="th-kicker">{techHause.kicker}</p>
        <h1 id="hause-title" className="th-title">
          <span>Tech</span>
          <em>Hause</em>
        </h1>
        <p className="th-lede">{techHause.line}</p>
        <p className="th-what">{techHause.what}</p>
      </header>

      <section className="th-pick" aria-label="Free versus Paid">
        <div className="th-switch" data-on={tier}>
          <span className="th-switch-thumb" aria-hidden />
          <button
            type="button"
            aria-pressed={!onPaid}
            onClick={() => setTier("free")}
          >
            {free.name}
          </button>
          <button
            type="button"
            aria-pressed={onPaid}
            onClick={() => setTier("paid")}
          >
            {paid.name}
          </button>
        </div>

        <div key={tier} className="th-pick-body">
          <h2 className="th-pack-name">{onPaid ? paid.name : free.name}</h2>
          <p className="th-pack-price">
            {onPaid ? (
              <>
                $25 <i>/ mo</i>
              </>
            ) : (
              "$0"
            )}
          </p>
          <p className="th-pack-line">{onPaid ? "The card." : "In the house."}</p>
          <ul className="th-perks">
            {perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          {onPaid ? (
            <p className="th-col-soon">Coming soon 2027</p>
          ) : (
            <Link className="th-join" href={techHause.enter}>
              Start free
            </Link>
          )}
        </div>
      </section>

      <p className="th-foot">
        <Link className="th-enter" href={techHause.enter}>
          Already in? Enter
        </Link>
      </p>
      <InstallHome tone="offer" />
    </div>
  );
}
