export const brand = {
  name: "BMore Tech Scene",
  short: "BTS",
  line: "Events, jobs, and tech resources in one place.",
  position:
    "BMore Tech Scene is one stop for the tech community: events to attend, and resources to learn AI, cybersecurity, and more.",
  site: "https://www.bmoretechnights.com",
  calendar: "https://luma.com/bmore-tech-nights",
} as const;

export const nav = [
  { href: "/", label: "Home", tone: "#141414" },
  { href: "/events", label: "Events", tone: "#2f6bff" },
  { href: "/jobs", label: "Jobs", tone: "#17a85a" },
  { href: "/resources", label: "Resources", tone: "#ff4d3a" },
  { href: "/faq", label: "FAQ", tone: "#141414" },
] as const;
