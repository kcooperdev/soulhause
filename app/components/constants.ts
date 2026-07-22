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
    tagline: "Hands on learning you can use",
    tone: "bronze",
    metal: "bronze",
  },
  {
    id: "pathway-3",
    label: "Hause of Soul: Tech Happy Hour",
    shortLabel: "Hause of Soul",
    format: "Tech Happy Hour",
    tagline: "Our tech happy hour",
    tone: "platinum",
    metal: "platinum",
  },
] as const;

/** SoulHause Events: community programming. */
export const EVENTS_ARM = {
  name: "SoulHause Events",
  summary:
    "SoulHause Events is nights in the room for builders, founders, creatives, and technologists.",
  together:
    "Sessions, workshops, and happy hours that keep Baltimore social tech in the same rooms.",
} as const;

export const PRIMARY_CTA = "RSVP on Luma";
export const EXPLORE_EVENTS_CTA = "Explore Events";
export const EXPLORE_TECH_WEEK_CTA = "Explore the tech week";
export const RSVP_INFO_SESSION_CTA = "RSVP for the info session";
export const FOLLOW_LUMA_CTA = "Follow on Luma";
export const NOTIFY_ME_CTA = "Notify me";

/** Short brand line for footer + shared surfaces. */
export const SITE_TAGLINE =
  "Tools and nights that help communities and small businesses grow.";

/** Homepage hero support. */
export const HOME_LEDE =
  "Tech for culture, community, and local growth.";

export const BRAND_STORY = {
  soul: "Soul is the drive. Organizers, creators, and builders who care about culture and place.",
  hause: "Hause is German for house. A place people belong, and where local scenes take root.",
  together:
    "SoulHause builds digital tools and citywide programs that help organizers, creators, and local businesses grow culture and impact.",
} as const;

export const NEXT_EVENT = {
  title: PATHWAY_PICKER[2].label,
  shortTitle: PATHWAY_PICKER[2].shortLabel,
  date: "September 17, 2026",
  shortDate: "Sep 17",
  format: PATHWAY_PICKER[2].format,
  rsvpUrl: HAUSE_OF_SOUL_LUMA_URL,
} as const;

export const PATHWAY_OFFERS = [
  {
    heading: "Soul Sessions",
    body: "Real founder journeys. Builders and operators share the work as it unfolds: mistakes, pivots, and what actually landed.",
  },
  {
    heading: "Soul Workshops",
    body: "Hands on learning you can use. Leave with skills and work that help builders, founders, and local businesses grow.",
  },
  {
    heading: "Hause of Soul",
    body: "Our tech happy hour. Builders, founders, creatives, and technologists in one room.",
  },
] as const;

export const FLAGSHIP_PRODUCT = {
  id: "baltimore-tech-week",
  href: "https://bmoretechweek.com",
  lumaHref: BTW_LUMA_URL,
  name: "Baltimore Tech Week",
  badge: "Powered by SoulHause",
  tagline: "Five days across Baltimore, powered by SoulHause.",
  meta: "Five days · citywide · powered by SoulHause",
  stageLede: "Not a conference hall. A week across the city.",
  status: "Schedule and venues coming soon",
  closeSub:
    "Schedule and venues are coming soon. RSVP for the info session to hear first, or explore Baltimore Tech Week.",
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
  sub: `Our tech happy hour. ${MEMBER_COUNT} already on Luma. Takes about a minute.`,
} as const;

/** SoulHause OS: member / online community (coming soon). */
export const OS_NOTIFY_HREF =
  `mailto:${CONTACT_EMAIL}?subject=SoulHause%20OS` as const;

export const OS_PRODUCT = {
  name: "SoulHause OS",
  slug: "/os",
  status: "Coming soon",
  eyebrow: "Online community · Coming soon",
  lede: "The member side of SoulHause. Perks, VIP access, and a house that stays open between nights out.",
  promise: "Stay in the house when the lights go up.",
  body: "SoulHause OS is for people already in the rooms. Members get closer to the nights that matter, partner perks across the city, and a place to stay connected all year. Same house as Events and Tech Week, just online.",
  closeSub:
    "Get notified when SoulHause OS launches. Until then, the rooms are live through Events.",
  notifyHref: OS_NOTIFY_HREF,
} as const;

/** Member access pillars for SoulHause OS (coming soon). */
export const OS_ACCESS = [
  {
    title: "VIP event access",
    body: "Member lists, early RSVPs, and invite-only nights before they hit the public calendar.",
  },
  {
    title: "Community rooms",
    body: "Spaces to trade notes, make intros, and keep the house warm between IRL nights.",
  },
  {
    title: "Local business perks",
    body: "Offers from Baltimore shops, studios, and spots that show up for members.",
  },
  {
    title: "Early drops",
    body: "First word on programs, house releases, and city-week moments before they go wide.",
  },
  {
    title: "Member-only moments",
    body: "Private sessions, AMAs, and digital hangs for people inside the house.",
  },
] as const;

/** About: company story. */
export const ABOUT_STORY = {
  title: "Tech and culture for local impact.",
  titleTurn: "Lights on.",
  lede: `SoulHause builds digital tools and citywide programs for local culture. ${MEMBER_COUNT} people strong.`,
} as const;
