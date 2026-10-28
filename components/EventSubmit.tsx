"use client";

import { useState } from "react";

const fits = [
  "Meetups",
  "Workshops",
  "Product launches",
  "Hiring nights",
  "Founder sessions",
  "Investor or customer events around tech",
  "Skills sessions",
] as const;

const doesNotFit = [
  "Nightlife",
  "Sports",
  "Parties",
  "Unrelated socials",
] as const;

const rules = [
  "You list it yourself. There is no approval step.",
  "If a listing is outside tech, it will be removed.",
  "Include a real event link and a clear date.",
] as const;

type Fields = {
  title: string;
  date: string;
  time: string;
  place: string;
  link: string;
  detail: string;
  name: string;
  email: string;
  agree: boolean;
};

const empty: Fields = {
  title: "",
  date: "",
  time: "",
  place: "",
  link: "",
  detail: "",
  name: "",
  email: "",
  agree: false,
};

function problem(fields: Fields) {
  if (!fields.title.trim()) return "Add an event name.";
  if (!fields.date.trim()) return "Add a date.";
  if (!fields.place.trim()) return "Add a venue or place.";
  if (!fields.link.trim()) return "Add a link to the event page.";
  if (!fields.name.trim()) return "Add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) return "Add a real email.";
  if (!fields.agree) return "Confirm the guidelines to finish.";
  return "";
}

export function EventSubmit() {
  const [fields, setFields] = useState<Fields>(empty);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function update<K extends keyof Fields>(name: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [name]: value }));
    setError("");
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const issue = problem(fields);
    if (issue) {
      setError(issue);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <section className="stack" aria-labelledby="submit-done-title">
        <div className="form-card">
          <p className="kicker">Event listing</p>
          <h2 id="submit-done-title">Listed.</h2>
          <p className="form-status">
            This is self-service. There is no approval. This form is not connected yet, so nothing was filed. When it is, tech events go up from here. Listings outside tech get removed.
          </p>
          <p>
            <strong>{fields.title}</strong>
            {fields.date ? ` · ${fields.date}` : ""}
            {fields.time ? ` · ${fields.time}` : ""}
          </p>
          <button
            className="btn white"
            type="button"
            onClick={() => {
              setDone(false);
              setFields(empty);
            }}
          >
            Submit another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="stack" aria-labelledby="submit-title">
      <div className="panel note guide">
        <p className="kicker">Submission guidelines</p>
        <h1 id="submit-title">Tech events only.</h1>
        <p className="guide-lede">
          You add the listing yourself. There is no approval. If an event is outside tech, it will be removed.
        </p>

        <div className="guide-grid">
          <div className="guide-block">
            <h3>What fits</h3>
            <ul className="guide-list">
              {fits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="guide-block">
            <h3>What does not</h3>
            <ul className="guide-list">
              {doesNotFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="guide-block">
          <h3>How it works</h3>
          <ul className="guide-list">
            {rules.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <form className="form-card" onSubmit={onSubmit} noValidate>
        <p className="kicker">Submit an event</p>
        <h2>Get it listed.</h2>
        <p>Fill the details and confirm the guidelines.</p>

        <label htmlFor="event-title">
          Event name *
          <input
            id="event-title"
            name="title"
            value={fields.title}
            onChange={(event) => update("title", event.target.value)}
            autoComplete="off"
            required
          />
        </label>
        <label htmlFor="event-date">
          Date *
          <input
            id="event-date"
            name="date"
            value={fields.date}
            onChange={(event) => update("date", event.target.value)}
            placeholder="November 4, 2026"
            autoComplete="off"
            required
          />
        </label>
        <label htmlFor="event-time">
          Time
          <input
            id="event-time"
            name="time"
            value={fields.time}
            onChange={(event) => update("time", event.target.value)}
            placeholder="6pm"
            autoComplete="off"
          />
        </label>
        <label htmlFor="event-place">
          Venue or place *
          <input
            id="event-place"
            name="place"
            value={fields.place}
            onChange={(event) => update("place", event.target.value)}
            autoComplete="street-address"
            required
          />
        </label>
        <label htmlFor="event-link">
          Event link *
          <input
            id="event-link"
            name="link"
            type="url"
            value={fields.link}
            onChange={(event) => update("link", event.target.value)}
            placeholder="https://"
            autoComplete="url"
            required
          />
        </label>
        <label htmlFor="event-detail">
          Short description
          <textarea
            id="event-detail"
            name="detail"
            value={fields.detail}
            onChange={(event) => update("detail", event.target.value)}
            rows={4}
          />
        </label>
        <label htmlFor="event-name">
          Your name *
          <input
            id="event-name"
            name="name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label htmlFor="event-email">
          Your email *
          <input
            id="event-email"
            name="email"
            type="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="check" htmlFor="event-agree">
          <input
            id="event-agree"
            name="agree"
            type="checkbox"
            checked={fields.agree}
            onChange={(event) => update("agree", event.target.checked)}
          />
          <span>
            This is a tech event. I am listing it myself. If it is outside tech, it can be removed.
          </span>
        </label>
        {error ? (
          <p className="field-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="btn coral" type="submit">
          Submit event
        </button>
      </form>
    </section>
  );
}
