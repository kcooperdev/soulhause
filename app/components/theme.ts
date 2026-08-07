export const PAGE_THEMES = ["home"] as const;

export type PageTheme = (typeof PAGE_THEMES)[number];

/** Single unified canvas on every route. */
export function themeFromPath(_pathname: string | null | undefined): PageTheme {
  return "home";
}
