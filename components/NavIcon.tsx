type NavIconName = "home" | "events" | "jobs" | "resources" | "faq";

const paths: Record<NavIconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3.5 10.5 10 4l6.5 6.5" />
      <path d="M5.5 9.2V16h9V9.2" />
      <path d="M8.2 16v-4.2h3.6V16" />
    </>
  ),
  events: (
    <>
      <rect x="3.5" y="5" width="13" height="11.5" rx="1.5" />
      <path d="M3.5 8.2h13" />
      <path d="M7 3.5v3" />
      <path d="M13 3.5v3" />
      <path d="M7.2 11.2h2.2M10.6 11.2h2.2M7.2 13.8h2.2" />
    </>
  ),
  jobs: (
    <>
      <rect x="3.2" y="7" width="13.6" height="9.3" rx="1.5" />
      <path d="M7.2 7V5.6A1.6 1.6 0 0 1 8.8 4h2.4A1.6 1.6 0 0 1 12.8 5.6V7" />
      <path d="M3.2 11.2h13.6" />
      <path d="M9.2 10.4h1.6v2" />
    </>
  ),
  resources: (
    <>
      <path d="M4 4.5h5.2a2 2 0 0 1 2 2V16l-2.2-1.4L6.8 16V6.5A2 2 0 0 0 4.8 4.5H4" />
      <path d="M16 4.5h-5.2a2 2 0 0 0-2 2V16l2.2-1.4L13.2 16V6.5a2 2 0 0 1 2-2H16" />
    </>
  ),
  faq: (
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M7.8 7.8a2.2 2.2 0 0 1 4.3.8c0 1.5-2.15 2-2.15 3.4" />
      <path d="M10 14.6h.01" />
    </>
  ),
};

const byHref: Record<string, NavIconName> = {
  "/": "home",
  "/events": "events",
  "/jobs": "jobs",
  "/resources": "resources",
  "/faq": "faq",
};

export function NavIcon({ href, tone }: { href: string; tone: string }) {
  const name = byHref[href] ?? "home";
  return (
    <span className="nav-icon" style={{ color: tone }} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    </span>
  );
}
