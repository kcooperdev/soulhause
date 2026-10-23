import { NextNight } from "@/components/NextNight";
import { nextNight } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Events",
  description:
    "The Offer is November 4, 2026 at 6pm at Nola Seafood & Spirits in Baltimore. Choose Experience or Spectator and get tickets.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <div className="page">
      <NextNight showTickets titleAs="h1" />
      <section id="tickets" className="grid-2" aria-labelledby="tickets-title">
        <h2 id="tickets-title" className="sr-only">
          Tickets
        </h2>
        {nextNight.paths.map((path) => (
          <article className="ticket card quiet" key={path.name}>
            <h2>{path.name}</h2>
            <p>{path.detail}</p>
          </article>
        ))}
      </section>
      <p>Choose a ticket on the event page. That page has the current price.</p>
      <p>
        <a className="btn coral" href={nextNight.registrationUrl}>
          Get tickets
        </a>
      </p>
    </div>
  );
}
