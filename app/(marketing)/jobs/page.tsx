import { JobList } from "@/components/JobList";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Jobs",
  description: "Job openings shared with the Baltimore tech community by BMore Tech Nights.",
  path: "/jobs",
});

export default function JobsPage() {
  return (
    <div className="page">
      <header className="panel flat">
        <p className="kicker">Jobs</p>
        <h1>Find a role.</h1>
        <p className="lede">
          Openings for people in and around Baltimore tech. We add a job when the posting is real.
        </p>
      </header>
      <JobList />
    </div>
  );
}
