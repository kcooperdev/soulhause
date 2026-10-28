import Link from "next/link";
import { notFound } from "next/navigation";
import { formatLongDate } from "@/components/EventPreview";
import { getSceneEvent, sceneEvents } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return sceneEvents.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getSceneEvent(id);
  if (!event) return {};
  return pageMeta({
    title: event.name,
    description: event.detail,
    path: `/events/${event.id}`,
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getSceneEvent(id);
  if (!event) notFound();

  return (
    <div className="page">
      <p className="kicker">
        <Link href="/events">← Events</Link>
      </p>

      <section className="event-detail" aria-labelledby="event-detail-title">
        <div className="event-detail-hero">
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG/PNG covers */}
          <img src={event.image} alt="" className="event-detail-image" />
        </div>

        <div className="event-detail-copy panel flat">
          <p className="kicker">
            {event.company} · {formatLongDate(event.startsOn)}
          </p>
          <h1 id="event-detail-title">{event.name}</h1>
          <p className="lede">{[event.time, event.place].filter(Boolean).join(" · ")}</p>
          <p>{event.body}</p>
          <div className="actions">
            <a className="btn coral" href={event.href} target="_blank" rel="noreferrer">
              Open event
            </a>
            <Link className="btn white" href="/events">
              Back to calendar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
