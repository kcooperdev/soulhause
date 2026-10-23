import type { Metadata } from "next";
import { JobList } from "@/components/JobList";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Jobs · ${brand.name}`,
  description: "Job listings for the Baltimore tech community.",
};

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
