"use client";

import { useEffect, useState } from "react";
import { normalizeLinkedIn } from "@/lib/members";
import { volunteer } from "@/lib/offerings";
import { readVolunteer, volunteerJobs, writeVolunteer } from "@/lib/volunteer";

export function VolunteerPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    const existing = readVolunteer();
    if (existing) setSaved(existing.name);
  }, []);

  function submit() {
    const linked = normalizeLinkedIn(link);
    if (!name.trim() || !city.trim() || !linked) {
      setError("Name, city, and LinkedIn get you on the list.");
      return;
    }
    writeVolunteer({
      name: name.trim(),
      city: city.trim(),
      link: linked,
      note: note.trim(),
      at: new Date().toISOString(),
    });
    setError("");
    setSaved(name.trim());
  }

  return (
    <div className="vol">
      <header className="vol-hero">
        <p className="vol-kicker">{volunteer.kicker}</p>
        <h1 className="vol-title">Volunteer</h1>
        <p className="vol-lede">{volunteer.line}</p>
        <p className="vol-copy">
          Check people in. Set the room up. Tear it down. That is the work.
        </p>
      </header>

      <section className="vol-roles" aria-label="The work">
        {volunteerJobs.map((job) => (
          <article key={job.id} className="vol-role">
            <p className="vol-kicker">The night</p>
            <h2>{job.name}</h2>
            <p>{job.line}</p>
          </article>
        ))}
      </section>

      <section className="vol-form-wrap" aria-labelledby="vol-form-title">
        {saved ? (
          <div className="vol-done">
            <p className="vol-kicker">You’re on the list</p>
            <h2 id="vol-form-title">Thanks, {saved.split(" ")[0]}.</h2>
            <p>We’ll use this when the next night needs hands.</p>
          </div>
        ) : (
          <form
            className="vol-form"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <p className="vol-kicker">Sign up</p>
            <h2 id="vol-form-title">Help run the night</h2>
            <p className="vol-copy">
              Name, city, LinkedIn. We’ll put you on the crew.
            </p>
            <label className="sr-only" htmlFor="vol-name">
              Name
            </label>
            <input
              id="vol-name"
              className="field"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
            <label className="sr-only" htmlFor="vol-city">
              City
            </label>
            <input
              id="vol-city"
              className="field"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Laurel, MD"
              autoComplete="address-level2"
            />
            <label className="sr-only" htmlFor="vol-link">
              LinkedIn
            </label>
            <input
              id="vol-link"
              className="field"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="linkedin.com/in/you"
              autoComplete="url"
              inputMode="url"
            />
            <label className="sr-only" htmlFor="vol-note">
              Note
            </label>
            <textarea
              id="vol-note"
              className="field"
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Anything we should know"
            />
            {error ? <p className="vol-error">{error}</p> : null}
            <button type="submit" className="ctl ctl-save">
              Sign up to volunteer
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
