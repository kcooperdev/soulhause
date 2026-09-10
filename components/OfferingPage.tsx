"use client";

import Link from "next/link";
import { techHause } from "@/lib/offerings";
import { planCompare, plans } from "@/lib/plans";

function Cell({ on, back }: { on: boolean; back?: number }) {
  return (
    <div className="th-cell" data-on={on ? "true" : "false"}>
      <span className="th-bar" aria-hidden />
      {on && back ? <span className="th-back">${back}</span> : null}
      <span className="sr-only">
        {on ? (back ? `Yes, about $${back} back` : "Yes") : "No"}
      </span>
    </div>
  );
}

export function TechHausePage() {
  const free = plans[0];
  const paid = plans[1];

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

      <section className="th-compare" aria-label="Free versus Paid">
        <div className="th-compare-head">
          <p className="th-compare-axis">The stack</p>
          <div className="th-head-plan" data-tier="free">
            <p className="th-col-name">{free.name}</p>
            <p className="th-col-price">
              <sup>$</sup>
              <b>{free.figure}</b>
              <i>{free.unit}</i>
            </p>
          </div>
          <div className="th-head-plan" data-tier="paid">
            <p className="th-col-name">{paid.name}</p>
            <p className="th-col-price">
              <sup>$</sup>
              <b>{paid.figure}</b>
              <i>{paid.unit}</i>
            </p>
          </div>
        </div>

        <div className="th-viz" role="table">
          {planCompare.map((row) => (
            <div className="th-viz-row" role="row" key={row.perk}>
              <p role="rowheader">{row.perk}</p>
              <Cell on={row.free} />
              <Cell on={row.paid} back={row.back} />
            </div>
          ))}
        </div>

        <div className="th-compare-act">
          <span />
          <Link className="th-join" href={techHause.enter}>
            Start free
          </Link>
          <p className="th-col-soon">Not open</p>
        </div>
      </section>

      <p className="th-foot">
        <Link className="th-enter" href={techHause.enter}>
          Already in? Enter
        </Link>
      </p>
    </div>
  );
}
