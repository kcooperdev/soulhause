import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { sceneEvents } from "@/lib/content";

const paths = ["/", "/events", "/events/submit", "/jobs", "/resources", "/faq", "/privacy", "/conduct"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-28");
  const staticEntries = paths.map((path) => ({
    url: `${brand.site}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: (path === "/" || path === "/events" ? "weekly" : "monthly") as const,
    priority: path === "/" ? 1 : path === "/events" ? 0.9 : 0.6,
  }));

  const eventEntries = sceneEvents.map((event) => ({
    url: `${brand.site}/events/${event.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...eventEntries];
}
