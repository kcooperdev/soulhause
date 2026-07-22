export const JOIN_URL = "https://luma.com/soulhause";
/** Hause of Soul upcoming event */
export const HAUSE_OF_SOUL_LUMA_URL = "https://luma.com/hj5hk5jf";
/** Baltimore Tech Week on Luma */
export const BTW_LUMA_URL = "https://luma.com/on6frsgw";
export const CONTACT_EMAIL = "team@soulhause.com";

export const MEMBER_COUNT = "1,100+";
export const EVENTS_HOSTED = "10+";
export const FOUNDED_YEAR = "2025";

export const PATHWAY_PICKER = [
  {
    id: "pathway-1",
    label: "Soul Sessions",
    shortLabel: "Soul Sessions",
    format: "Real founder journeys",
    tagline: "Real founder journeys",
    tone: "gold",
    metal: "gold",
  },
  {
    id: "pathway-2",
    label: "Soul Workshops",
    shortLabel: "Soul Workshops",
    format: "Hands on learning",
    tagline: "Hands on learning with real takeaways",
    tone: "bronze",
    metal: "bronze",
  },
  {
    id: "pathway-3",
    label: "Hause of Soul: Tech Happy Hour",
    shortLabel: "Hause of Soul",
    format: "Tech Happy Hour",
    tagline: "Our signature tech happy hour",
    tone: "platinum",
    metal: "platinum",
  },
] as const;

/** SoulHause Events: community arm (distinct from company + BTW). */
export const EVENTS_ARM = {
  name: "SoulHause Events",
  summary:
    "SoulHause Events is how SoulHause shows up in community, creating intentional experiences rooted in culture for builders, founders, creatives, and technologists.",
  together:
    "Together, these events strengthen the local tech ecosystem through connection, learning, and community.",
} as const;

export const PATHWAYS_SUMMARY =
  "How SoulHause shows up in community. Intentional nights for builders, founders, creatives, and technologists.";

export const PRIMARY_CTA = "RSVP on Luma";

/** Short brand line for hero support + footer. Not event-only identity. */
export const SITE_TAGLINE =
  "Year-round systems that help communities and small businesses grow.";

export const BRAND_STORY = {
  soul: "Soul is the passion behind the work. The drive of organizers, creators, and builders who care about culture and place.",
  hause: "Hause is the German word for house. A place where people belong, and where local ecosystems take root.",
  together:
    "SoulHause is a community and economic development technology company. We build digital tools, cultural infrastructure, and ecosystem platforms that help organizers, creators, and local businesses activate culture and grow their impact.",
} as const;

export const NEXT_EVENT = {
  title: PATHWAY_PICKER[2].label,
  shortTitle: PATHWAY_PICKER[2].shortLabel,
  date: "September 17, 2026",
  format: PATHWAY_PICKER[2].format,
  rsvpUrl: HAUSE_OF_SOUL_LUMA_URL,
} as const;

export const PATHWAY_OFFERS = [
  {
    heading: "Soul Sessions",
    body: "Real founder journeys. Builders and operators share the work as it actually unfolds: mistakes, pivots, and what landed.",
  },
  {
    heading: "Soul Workshops",
    body: "Hands on learning with real takeaways. Leave with skills and artifacts that help builders, founders, and local businesses grow.",
  },
  {
    heading: "Hause of Soul",
    body: "Our signature tech happy hour, where builders, founders, creatives, and technologists meet face to face.",
  },
] as const;

export const FLAGSHIP_PRODUCT = {
  id: "baltimore-tech-week",
  href: "https://bmoretechweek.com",
  lumaHref: BTW_LUMA_URL,
  name: "Baltimore Tech Week",
  badge: "Powered by SoulHause",
  tagline:
    "Five days of citywide cultural infrastructure at scale, powered by SoulHause",
  meta: "5 days · Citywide · Powered by SoulHause",
} as const;

export const SOUL_BUILDERS_LINKEDIN =
  "https://www.linkedin.com/groups/30920002/" as const;

export const SOUL_BUILDERS_PRODUCT = {
  name: "Soul Builders",
  href: SOUL_BUILDERS_LINKEDIN,
  badge: "LinkedIn group",
  tagline: "Share resources. Share wins. Build together.",
} as const;

export const JOIN_GATE = {
  headline: `RSVP for ${NEXT_EVENT.shortTitle}`,
  sub: `One night in SoulHause Events. ${MEMBER_COUNT} people already on Luma. Takes about a minute.`,
} as const;
