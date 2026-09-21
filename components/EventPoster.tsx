import type { EventItem } from "@/lib/events";

export function EventPoster({
  event,
  compact,
}: {
  event: EventItem;
  compact?: boolean;
}) {
  const [headline, sub] = event.title.split(":").map((part) => part.trim());

  return (
    <article
      className={`event-card overflow-hidden rounded-[1.85rem] text-center ${
        compact ? "mt-4" : "mt-5"
      }`}
    >
      <div className={compact ? "px-5 pt-5 pb-5" : "px-6 pt-7 pb-7"}>
        <p className="kicker">{event.price}</p>
        <h2
          className={`font-poster mt-3 font-extrabold tracking-tight uppercase ${
            compact
              ? "text-[2.05rem] leading-[0.88]"
              : "text-[2.55rem] leading-[0.86]"
          }`}
        >
          {headline}
        </h2>
        {sub ? (
          <p className={`mt-3 tracking-wide text-ink/80 ${compact ? "text-[0.98rem]" : "text-[1.05rem]"}`}>
            {sub}
          </p>
        ) : null}
        {event.time || event.city ? (
          <p className={`mt-4 leading-7 text-muted ${compact ? "text-[0.86rem]" : "text-[0.92rem]"}`}>
            {event.time}
            {event.time && event.city ? <br /> : null}
            {event.city}
          </p>
        ) : null}
      </div>
    </article>
  );
}
