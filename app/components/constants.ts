export const JOIN_URL = "https://luma.com/soulhause";
/** Hause of Soul upcoming event */
export const HAUSE_OF_SOUL_LUMA_URL = "https://luma.com/hj5hk5jf";
export const CONTACT_EMAIL = "team@soulhause.com";

export const MEMBER_COUNT = "1,100+";
export const EVENTS_HOSTED = "10+";
export const FOUNDED_YEAR = "2025";

export const PATHWAY_PICKER = [
  {
    id: "pathway-1",
    label: "Soul Sessions",
    shortLabel: "Soul Sessions",
    format: "Talk night",
    tagline: "Founders telling it straight",
    stub: "Talks",
    tone: "gold",
    metal: "gold",
  },
  {
    id: "pathway-2",
    label: "Soul Workshops",
    shortLabel: "Soul Workshops",
    format: "Hands-on",
    tagline: "Learn something you can use",
    stub: "Workshops",
    tone: "bronze",
    metal: "bronze",
  },
  {
    id: "pathway-3",
    label: "Hause of Soul: Tech Happy Hour",
    shortLabel: "Hause of Soul",
    format: "Happy hour",
    tagline: "Drinks, intros, no agenda",
    stub: "Happy hour",
    tone: "platinum",
    metal: "platinum",
  },
] as const;

/** Soul Events: community programming, by SoulHause. */
export const EVENTS_ARM = {
  name: "Soul Events",
  summary:
    "Maryland nights for social tech: talks, workshops, and tech happy hour.",
  together: "Pick a format. Show up. Meet people building here.",
} as const;

export const PRIMARY_CTA = "RSVP on Luma";
export const EXPLORE_EVENTS_CTA = "Explore Events";
export const FOLLOW_LUMA_CTA = "Follow on Luma";
export const NOTIFY_ME_CTA = "Notify me";

/** Short brand line for footer + shared surfaces. */
export const SITE_TAGLINE = "tech for the soul.";

/** Home hero brand line. */
export const HOME_BRAND_LINE = "tech for the soul.";

export const BRAND_STORY = {
  soul: "Soul is the drive: organizers, creators, and builders who care about culture across Maryland.",
  hause: "Hause is German for house. We mean a local scene with roots, not a metaphor.",
  together:
    "SoulHause builds digital tools and statewide programs so organizers, creators, and local businesses can grow culture and impact.",
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
    body: "Founders and operators tell it straight: what broke, what stuck, what they'd skip next time. Sit, listen, ask hard questions.",
  },
  {
    heading: "Soul Workshops",
    body: "Bring a laptop. Small group, real reps. Leave with something you can use Monday.",
  },
  {
    heading: "Hause of Soul",
    body: "Tech happy hour. Drinks, intros, no agenda. The easy way to meet the room.",
  },
] as const;

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
  sub: `Tech happy hour · ${NEXT_EVENT.shortDate}. ${MEMBER_COUNT} on Luma. About a minute.`,
} as const;

/** Soul OS: member / online community, by SoulHause (coming soon). */
export const OS_NOTIFY_HREF =
  `mailto:${CONTACT_EMAIL}?subject=Soul%20OS` as const;

export const OS_PRODUCT = {
  name: "Soul OS",
  slug: "/os",
  status: "Coming soon",
  eyebrow: "Online community by SoulHause · Coming soon",
  lede: "The member side of SoulHause. VIP access, local perks, and rooms that stay open between events.",
  promise: "VIP access that lasts past the event night.",
  body: "Soul OS is for people already showing up. Members get closer to the nights that matter, partner perks across Maryland, and a place to stay connected all year. Same crew as Events, just online.",
  closeSub: "Get notified when Soul OS launches.",
  notifyHref: OS_NOTIFY_HREF,
} as const;

/** Member access list for Soul OS (coming soon). */
export const OS_ACCESS = [
  {
    title: "VIP event access",
    chip: "VIP",
    body: "Member lists, early RSVPs, and invite-only nights before they hit the public calendar.",
  },
  {
    title: "Local business perks",
    chip: "Perks",
    body: "Offers from Maryland shops, studios, and spots that show up for members.",
  },
  {
    title: "Community rooms",
    chip: "Rooms",
    body: "Spaces to trade notes, make intros, and stay in touch between event nights.",
  },
  {
    title: "Early drops",
    chip: "Drops",
    body: "First word on programs and member releases before they go wide.",
  },
  {
    title: "Member nights",
    chip: "Nights",
    body: "Private sessions, AMAs, and digital hangs reserved for members.",
  },
] as const;

/** About: company story. */
export const ABOUT_STORY = {
  title: "tech for the soul.",
  lede: `${MEMBER_COUNT} people on Luma.`,
} as const;

