import Link from "next/link";
import { type SceneEvent } from "@/lib/content";

function parseDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return { year, month: month - 1, day };
}

export function formatLongDate(value: string) {
  const { year, month, day } = parseDay(value);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month, day));
}

export function EventPreview({
  event,
  showDate = false,
}: {
  event: SceneEvent;
  /** List view needs the date; day modal already shows it in the header. */
  showDate?: boolean;
}) {
  return (
    <article className="event-preview">
      <div className="event-preview-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG/PNG covers; avoid next/image SVG limits */}
        <img src={event.image} alt="" className="event-preview-image" />
      </div>
      <div className="event-preview-body">
        {showDate ? <p className="kicker">{formatLongDate(event.startsOn)}</p> : null}
        <p className="event-preview-company">{event.company}</p>
        <h3>{event.name}</h3>
        <p className="event-preview-meta">{[event.time, event.place].filter(Boolean).join(" · ")}</p>
        <p className="event-preview-blurb">{event.detail}</p>
      </div>
      <Link className="btn white event-preview-action" href={`/events/${event.id}`}>
        Details
      </Link>
    </article>
  );
}
