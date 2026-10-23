import { brand } from "@/lib/brand";
import { nextNight } from "@/lib/content";
import { eventJsonLd } from "@/lib/seo";

export function NextNight({
  showTickets = false,
  titleAs = "h2",
}: {
  showTickets?: boolean;
  titleAs?: "h1" | "h2";
}) {
  const Title = titleAs;

  if (!nextNight.published) {
    return (
      <section className="panel" id="next" aria-labelledby="next-title">
        <p className="kicker">Calendar</p>
        <Title id="next-title" className="h1">
          Subscribe for the next night.
        </Title>
        <p>
          Dates and tickets are on our calendar. Follow it and you’ll hear when the next mixer is up.
        </p>
        <p>
          <a className="btn coral" href={brand.calendar}>
            Subscribe on Luma
          </a>
        </p>
        {showTickets ? null : (
          <p>General admission is free. VIP is $20 and includes one eligible drink voucher.</p>
        )}
      </section>
    );
  }

  const facts = [
    ["Date", nextNight.date],
    ["Time", nextNight.time],
    ["Venue", nextNight.venue],
    ["Where", nextNight.place],
  ].filter(([, value]) => value);

  const event = eventJsonLd();

  return (
    <section className="panel" id="next" aria-labelledby="next-title">
      {event ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }} />
      ) : null}
      <p className="kicker">Next event</p>
      <Title id="next-title" className="h1">
        {nextNight.name}
      </Title>
      {nextNight.description ? <p>{nextNight.description}</p> : null}
      {facts.length > 0 ? (
        <dl className="facts">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {nextNight.interactive.length > 0 ? (
        <div>
          <h3>At this night</h3>
          <ul className="plain-list">
            {nextNight.interactive.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <a className="btn coral" href={nextNight.registrationUrl || brand.calendar}>
        Get tickets
      </a>
    </section>
  );
}
