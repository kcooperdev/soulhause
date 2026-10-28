import { EventBoard } from "@/components/EventBoard";
import { sceneEvents } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Events",
  description: "Browse tech events on a calendar or as a list. Submit a tech event from its own page.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <div className="page">
      <EventBoard events={sceneEvents} />
    </div>
  );
}
