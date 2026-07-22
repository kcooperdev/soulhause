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

/** SoulHause Events: community programming. */
export const EVENTS_ARM = {
  name: "SoulHause Events",
  summary:
    "SoulHause Events is how the house shows up in the room — intentional nights for builders, founders, creatives, and technologists.",
  together:
    "Together, these nights strengthen the local tech ecosystem through connection, learning, and community.",
} as const;

export const PRIMARY_CTA = "RSVP on Luma";
export const EXPLORE_EVENTS_CTA = "Explore Events";
export const EXPLORE_TECH_WEEK_CTA = "Explore the tech week";
export const RSVP_INFO_SESSION_CTA = "RSVP for the info session";
export const FOLLOW_LUMA_CTA = "Follow on Luma";
export const NOTIFY_ME_CTA = "Notify me";

/** Short brand line for footer + shared surfaces. Not event-only identity. */
export const SITE_TAGLINE =
  "Year-round systems that help communities and small businesses grow.";

/** Homepage hero support — CED company positioning. */
export const HOME_LEDE =
  "Community and economic development technology for culture and local growth.";

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
  shortDate: "Sep 17",
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
    "Five days of citywide cultural infrastructure, powered by SoulHause.",
  meta: "Five days · citywide · powered by SoulHause",
  stageLede: "Not a conference hall. A week across the city.",
  status: "Schedule & venues coming soon",
  closeSub:
    "Full schedule and venues coming soon. RSVP for the info session to get first word — or explore Baltimore Tech Week.",
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
  sub: `Our signature tech happy hour. ${MEMBER_COUNT} people already on Luma. Takes about a minute.`,
} as const;

/** SoulHause OS — member / online community (coming soon). */
export const OS_NOTIFY_HREF =
  `mailto:${CONTACT_EMAIL}?subject=SoulHause%20OS` as const;

export const OS_PRODUCT = {
  name: "SoulHause OS",
  slug: "/os",
  status: "Coming soon",
  eyebrow: "Online community · Coming soon",
  lede: "The member layer of SoulHause — perks, VIP access, and a house that stays open between nights out.",
  promise: "Stay in the house when the lights go up.",
  body: "SoulHause OS is the online community for people already in the rooms. Members get closer to the nights that matter, plug into partner perks across the city, and keep the conversation warm year-round. It is how cultural infrastructure works when nobody is on a stage — a digital door into the same system that powers Events and Tech Week.",
  closeSub:
    "Get notified when SoulHause OS launches. Until then, the rooms are live through Events.",
  notifyHref: OS_NOTIFY_HREF,
} as const;

/** Member access pillars for SoulHause OS (coming soon). */
export const OS_ACCESS = [
  {
    title: "VIP event access",
    body: "Member lists, early RSVPs, and invite-only nights that do not hit the public calendar first.",
  },
  {
    title: "Community rooms",
    body: "Ongoing spaces to trade notes, make intros, and keep the house warm between IRL nights.",
  },
  {
    title: "Local business perks",
    body: "Partner offers from Baltimore shops, studios, and spots that treat membership like a real key.",
  },
  {
    title: "Early drops",
    body: "First word on programs, house releases, and city-week moments before they go wide.",
  },
  {
    title: "Member-only moments",
    body: "Private sessions, AMAs, and digital hangs reserved for people inside the house.",
  },
] as const;

/** About — company story. */
export const ABOUT_STORY = {
  title: "Cultural infrastructure for local impact.",
  titleTurn: "Lights on.",
  lede: `SoulHause is a community and economic development technology company. We build digital tools, cultural infrastructure, and ecosystem platforms for local impact. ${MEMBER_COUNT} people strong.`,
} as const;
