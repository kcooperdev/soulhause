"use client";

import { useMemo, useState } from "react";
import { resourceCategories, resources, type Resource } from "@/lib/content";

export function ResourceList({ items = resources }: { items?: Resource[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filled = resourceCategories.filter((name) =>
    items.some((item) => item.category === name),
  );
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const inCategory = category === "All" || item.category === category;
      const inText =
        !needle ||
        `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(needle);
      return inCategory && inText;
    });
  }, [category, items, query]);

  return (
    <div className="search">
      {items.length > 0 ? (
        <label htmlFor="resource-search">
          Search resources
          <input
            id="resource-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name"
          />
        </label>
      ) : null}
      {filled.length > 0 ? (
        <div className="choice" role="group" aria-label="Filter by category">
          {["All", ...filled].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
      ) : null}
      {shown.length === 0 ? (
        <section className="panel">
          <h2>Nothing verified to list yet</h2>
          <p>
            Each card will name the resource or organization, say what it offers, and link out. Paid sponsor listings will be marked separately from recommendations we write ourselves.
          </p>
          <p>We won’t add an organization or program until that link is real. Job openings live on the Jobs page.</p>
        </section>
      ) : (
        <div className="grid-2">
          {shown.map((item) => (
            <article className="card quiet" key={item.href}>
              <p className="kicker">
                {item.category}
                {item.sponsored ? " · Sponsor listing" : ""}
              </p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>
                {item.cost} · Reviewed {item.reviewed}
              </p>
              <a className="btn white" href={item.href}>
                Open resource
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
