export const PAGE_THEMES = [
  "home",
  "events",
  "tech-week",
  "os",
  "about",
] as const;

export type PageTheme = (typeof PAGE_THEMES)[number];

export function themeFromPath(pathname: string | null | undefined): PageTheme {
  const path = (pathname ?? "/").split("?")[0]?.replace(/\/+$/, "") || "/";

  if (path === "/events" || path.startsWith("/events/")) return "events";
  if (path === "/tech-week" || path.startsWith("/tech-week/")) return "tech-week";
  if (path === "/os" || path.startsWith("/os/")) return "os";
  if (path === "/about" || path.startsWith("/about/")) return "about";
  return "home";
}
