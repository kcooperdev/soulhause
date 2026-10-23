import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

const paths = [
  "/",
  "/events",
  "/jobs",
  "/resources",
  "/vend",
  "/sponsor",
  "/partner",
  "/about",
  "/privacy",
  "/conduct",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-23");
  return paths.map((path) => ({
    url: `${brand.site}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" || path === "/events" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/events" ? 0.9 : 0.6,
  }));
}
