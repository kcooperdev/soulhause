import { jobs } from "@/lib/content";

export function JobList() {
  if (jobs.length === 0) {
    return (
      <section className="panel">
        <h2>No openings listed yet</h2>
        <p>
          A listing will show the role, the organization, where it is, and a link to apply. Nothing goes up until that posting is real.
        </p>
      </section>
    );
  }

  return (
    <div className="grid-2">
      {jobs.map((job) => (
        <article className="card quiet" key={job.href}>
          <p className="kicker">{job.org}</p>
          <h2>{job.title}</h2>
          <p>
            {job.location} · {job.type}
          </p>
          <p>Posted {job.posted}</p>
          <a className="btn white" href={job.href}>
            View posting
          </a>
        </article>
      ))}
    </div>
  );
}
