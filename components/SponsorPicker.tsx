"use client";

import { useState } from "react";
import { sponsorTiers } from "@/lib/content";

const spans = [
  { id: "one", label: "One event", key: "one" },
  { id: "three", label: "Three events", key: "three" },
  { id: "six", label: "Six events", key: "six" },
] as const;

export function SponsorPicker() {
  const [span, setSpan] = useState<(typeof spans)[number]["id"]>("one");
  const active = spans.find((item) => item.id === span) ?? spans[0];

  return (
    <div className="panel">
      <h2>One night, or a run of them</h2>
      <p>
        These are proposed introductory prices, still waiting on a final sign-off. Inventory has to be open, and a written agreement comes before an invoice.
      </p>
      <div className="choice" role="group" aria-label="Number of events">
        {spans.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={span === item.id}
            onClick={() => setSpan(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid-3">
        {sponsorTiers.map((tier) => (
          <article className="card quiet" key={tier.id}>
            <h3>{tier.name}</h3>
            <p className="price">${tier[active.key].toLocaleString()}</p>
            <p>{active.label}</p>
            <p>{tier.availability}</p>
          </article>
        ))}
      </div>
      <div className="table-wrap">
        <table>
          <caption className="sr-only">Sponsorship prices for one, three, and six events</caption>
          <thead>
            <tr>
              <th scope="col">Package</th>
              <th scope="col">One event</th>
              <th scope="col">Three events</th>
              <th scope="col">Six events</th>
            </tr>
          </thead>
          <tbody>
            {sponsorTiers.map((tier) => (
              <tr key={tier.id}>
                <th scope="row">{tier.name}</th>
                <td>${tier.one.toLocaleString()}</td>
                <td>${tier.three.toLocaleString()}</td>
                <td>${tier.six.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
