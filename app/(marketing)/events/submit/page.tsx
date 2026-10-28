import Link from "next/link";
import { EventSubmit } from "@/components/EventSubmit";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Submit an event",
  description:
    "List a tech event yourself. Guidelines and form. No approval. Off-scope listings get removed.",
  path: "/events/submit",
});

export default function SubmitEventPage() {
  return (
    <div className="page">
      <p className="kicker">
        <Link href="/events">← Events</Link>
      </p>
      <EventSubmit />
    </div>
  );
}
