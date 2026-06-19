export const JOIN_URL = "https://luma.com/soulhause";
export const CONTACT_EMAIL = "team@soulhause.com";

export const MEMBER_COUNT = "1,100+";
export const EVENTS_HOSTED = "10+";
export const FOUNDED_YEAR = "2025";

export const NEXT_EVENT = {
  title: "Hause of Soul",
  date: "September 22, 2026",
  format: "Happy Hour",
  location: "In person",
  rsvpUrl: JOIN_URL,
} as const;

export const PATHWAY_PICKER = [
  {
    id: "pathway-1",
    label: "Soul Sessions",
    format: "Talks",
    tagline: "Stories from people doing the work",
    tone: "gold",
  },
  {
    id: "pathway-2",
    label: "Soul Labs",
    format: "Workshops",
    tagline: "Hands-on sessions with real output",
    tone: "orange",
  },
  {
    id: "pathway-3",
    label: "Hause Link",
    format: "Mixers",
    tagline: "Where collaborations start",
    tone: "green",
  },
] as const;

export const STACK_LAYERS = [
  {
    label: "Events",
    sub: "Sessions, Labs, Link",
    tone: "gold",
    href: "#pathways",
  },
  {
    label: "Community",
    sub: `${MEMBER_COUNT} members`,
    tone: "green",
    href: "#pathways",
  },
  {
    label: "Tools",
    sub: "Coming soon",
    tone: "orange",
    href: "/what-we-offer",
  },
  {
    label: "Impact",
    sub: "Local and digital",
    tone: "ink",
    href: "/about",
  },
] as const;

export const JOIN_GATE = {
  headline: `You're joining ${MEMBER_COUNT} builders`,
  steps: [
    "RSVP or sign up on Luma",
    "Get event updates and community invites",
    "Show up to your first session, lab, or mixer",
  ],
} as const;
