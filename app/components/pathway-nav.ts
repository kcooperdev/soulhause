export const PATHWAY_SCROLL_OFFSET = 120;

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - PATHWAY_SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

/** Deep link into Events formats (or legacy home hashes). */
export function pathwayHref(id: string) {
  if (id === "pathways" || id === "events") return "/events";
  if (id.startsWith("pathway-")) return `/events#${id}`;
  return `/events#${id}`;
}

export function navigateToPathway(
  id: string,
  pathname: string,
  navigate: (href: string) => void,
) {
  const href = pathwayHref(id);
  if (pathname === "/events" && id.startsWith("pathway-")) {
    scrollToSection(id);
    window.history.replaceState(null, "", href);
    return;
  }
  navigate(href);
}
