"use client";

import { volunteer } from "@/lib/offerings";
import { volunteerJobs } from "@/lib/volunteer";

export function VolunteerPage() {
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
        <div className="vol-done">
          <p className="vol-kicker">The crew</p>
          <h2 id="vol-form-title">Opening soon</h2>
          <p>Check-in, set up, and break down. Sign up when this opens.</p>
          <button type="button" className="ctl ctl-save" disabled>
            Opening soon
          </button>
        </div>
      </section>
    </div>
  );
}
