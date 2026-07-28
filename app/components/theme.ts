export const PAGE_THEMES = [
  "home",
  "events",
  "os",
  "about",
  "studio",
] as const;

export type PageTheme = (typeof PAGE_THEMES)[number];

export function themeFromPath(pathname: string | null | undefined): PageTheme {
  const path = (pathname ?? "/").split("?")[0]?.replace(/\/+$/, "") || "/";

  if (path === "/events" || path.startsWith("/events/")) return "events";
  if (path === "/os" || path.startsWith("/os/")) return "os";
  if (path === "/about" || path.startsWith("/about/")) return "about";
  if (path === "/studio" || path.startsWith("/studio/")) return "studio";
  return "home";
}
