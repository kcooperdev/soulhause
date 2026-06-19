export const PATHWAY_SCROLL_OFFSET = 120;

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - PATHWAY_SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

export function pathwayHref(id: string) {
  return `/#${id}`;
}

export function navigateToPathway(
  id: string,
  pathname: string,
  navigate: (href: string) => void
) {
  if (pathname === "/") {
    scrollToSection(id);
    window.history.replaceState(null, "", pathwayHref(id));
    return;
  }
  navigate(pathwayHref(id));
}
