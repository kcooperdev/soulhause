import Image from "next/image";
import type { EventItem } from "@/lib/events";

export function EventPoster({
  event,
  compact,
}: {
  event: EventItem;
  compact?: boolean;
}) {
  const [headline, sub] = event.title.split(":").map((part) => part.trim());
  const day = event.date.replace(/^[A-Za-z]+\s+/, "");
  const month = event.date.slice(0, 3).toUpperCase();

  return (
    <article
      className={`event-card overflow-hidden rounded-[1.85rem] text-center ${
        compact ? "mt-4" : "mt-5"
      }`}
    >
      <div className={compact ? "px-5 pt-5" : "px-6 pt-7"}>
        <div className="relative">
          <Image
            src={event.image}
            alt={event.imageAlt}
            width={1024}
            height={1024}
            className={`mx-auto h-auto object-contain ${compact ? "w-[64%]" : "w-[78%]"}`}
            sizes="(min-width: 576px) 448px, 100vw"
            draggable={false}
            priority
          />
          <p
            className={`font-poster absolute top-0 right-0 leading-none tracking-tight ${
              compact ? "text-[2.1rem]" : "text-[2.7rem]"
            }`}
          >
            {day}
            <span className="mt-1 block text-right text-[0.62rem] tracking-[0.32em]">
              {month}
            </span>
          </p>
        </div>
      </div>
      <div className={compact ? "px-5 pt-1 pb-5" : "px-6 pt-2 pb-7"}>
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
        <p className={`mt-4 leading-7 text-muted ${compact ? "text-[0.86rem]" : "text-[0.92rem]"}`}>
          {event.date} · {event.time}
          <br />
          {event.venue}
          <br />
          {event.city}
        </p>
      </div>
    </article>
  );
}
