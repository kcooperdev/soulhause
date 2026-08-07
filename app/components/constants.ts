export const JOIN_URL = "https://luma.com/soulhause";
/** Hause of Soul upcoming event */
export const HAUSE_OF_SOUL_LUMA_URL = "https://luma.com/hj5hk5jf";
export const CONTACT_EMAIL = "team@soulhause.com";

export const MEMBER_COUNT = "1,100+";
export const EVENTS_HOSTED = "10+";
export const FOUNDED_YEAR = "2025";

export const PRIMARY_CTA = "RSVP on Luma";
export const FOLLOW_LUMA_CTA = "Follow on Luma";
export const NOTIFY_ME_CTA = "Notify me";

/** Short brand line for footer + shared surfaces. */
export const SITE_TAGLINE = "tech for the soul.";

/** Home hero brand line. */
export const HOME_BRAND_LINE = "tech for the soul.";

export const BRAND_STORY = {
  soul: "Soul is the people doing the work. Organizers, creators, and builders who care about what's happening in Maryland.",
  hause: "Hause is German for house. We mean the local scene. Real people, same rooms, not a brand metaphor.",
  together:
    "SoulHause runs nights and builds tools so those people can find each other, grow, and actually get things done.",
} as const;

export const NEXT_EVENT = {
  title: "Hause of Soul: Tech Happy Hour",
  shortTitle: "Hause of Soul",
  date: "September 17, 2026",
  shortDate: "Sep 17",
  format: "Happy hour",
  rsvpUrl: HAUSE_OF_SOUL_LUMA_URL,
} as const;

/** Night formats — each owns a route, nav item, and story. */
export const FORMAT_PAGES = [
  {
    id: "sessions",
    slug: "/sessions",
    navLabel: "Sessions",
    name: "Soul Sessions",
    emWord: "Sessions",
    titleKind: "soul-em" as const,
    format: "Talk night",
    purpose: "Real talk",
    whyLede:
      "One founder on stage. The full story, then your questions.",
    story: {
      label: "Why we do this",
      note: "Maryland didn't need another panel. One guest, one arc, start to finish.",
    },
    moments: [
      {
        title: "One person, full story",
        body: "No rotating panel. One founder has the floor from start to finish.",
      },
      {
        title: "Your questions",
        body: "The room asks what you can't get from a comment thread or a deck.",
      },
      {
        title: "You leave with context",
        body: "You understand how someone actually got through it.",
      },
    ],
    closeHook: "Next date goes up on Luma. Follow Sessions if you want in the room.",
    metaTitle: "Soul Sessions by SoulHause | Talk night",
    metaDescription:
      "Soul Sessions: one founder tells the full story, then the room asks questions. Maryland social tech, no panels for show.",
    ctaHref: JOIN_URL,
    ctaLabel: FOLLOW_LUMA_CTA,
    showNextEvent: false,
  },
  {
    id: "workshops",
    slug: "/workshops",
    navLabel: "Workshops",
    name: "Soul Workshops",
    emWord: "Workshops",
    titleKind: "soul-em" as const,
    format: "Hands on",
    purpose: "Build something",
    whyLede:
      "A workshop, not a webinar. Laptops open. Build something you can use tomorrow.",
    story: {
      label: "Why we do this",
      note: "We'd rather ship a rough v1 with the group than watch a demo from the back row.",
    },
    moments: [
      {
        title: "You build",
        body: "Bring a laptop. Do the work, don't watch.",
      },
      {
        title: "The workshop",
        body: "Facilitated and hands-on. Your question gets answered in the room.",
      },
      {
        title: "Use it Monday",
        body: "Walk out with a workflow, prototype, or fix.",
      },
    ],
    closeHook: "We post the next Workshop on Luma. Follow if you want a heads up.",
    metaTitle: "Soul Workshops by SoulHause | Hands on night",
    metaDescription:
      "Soul Workshops: hands-on workshop, laptops open, build something you can use. Maryland builders, no slide decks.",
    ctaHref: JOIN_URL,
    ctaLabel: FOLLOW_LUMA_CTA,
    showNextEvent: false,
  },
  {
    id: "hause-of-soul",
    slug: "/hause-of-soul",
    navLabel: "Hause of Soul",
    name: "Hause of Soul",
    emWord: "Soul",
    titleKind: "hause-of-soul" as const,
    format: "Happy hour",
    purpose: "Happy hour",
    whyLede:
      "Tech happy hour. No drinks provided. Just intros and an easy way to meet Maryland builders.",
    story: {
      label: "Why we do this",
    },
    moments: [
      {
        title: "Meet the room",
        body: "Builders who are actually doing the work.",
      },
      {
        title: "No decks",
        body: "Leave the pitch at home.",
      },
      {
        title: "Where it starts",
        body: "Most people find SoulHause here first.",
      },
    ],
    closeHook: "Next one is Sep 17. RSVP on Luma if you want in.",
    metaTitle: "Hause of Soul by SoulHause | Tech happy hour",
    metaDescription:
      "Hause of Soul: Maryland tech happy hour. No drinks provided. Intros and an easy way to meet the scene.",
    ctaHref: HAUSE_OF_SOUL_LUMA_URL,
    ctaLabel: PRIMARY_CTA,
    showNextEvent: true,
  },
] as const;

export type FormatPageId = (typeof FORMAT_PAGES)[number]["id"];

export function formatPageById(id: FormatPageId) {
  const page = FORMAT_PAGES.find((f) => f.id === id);
  if (!page) throw new Error(`Unknown format page: ${id}`);
  return page;
}

/** Legacy pathway ids → format routes (old /events#pathway-* bookmarks). */
export const PATHWAY_ROUTES = {
  "pathway-1": "/sessions",
  "pathway-2": "/workshops",
  "pathway-3": "/hause-of-soul",
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
  sub: `Tech happy hour · ${NEXT_EVENT.shortDate}. ${MEMBER_COUNT} on Luma. Takes about a minute.`,
} as const;

/** Soul OS: membership / online community (coming soon). */
export const OS_NOTIFY_HREF =
  `mailto:${CONTACT_EMAIL}?subject=Soul%20OS` as const;

export const OS_PRODUCT = {
  name: "Soul OS",
  slug: "/os",
  navLabel: "Membership",
  status: "Coming soon",
  notifyLabel: "Email us for updates",
  purpose: "Stay connected",
  whyLede:
    "Come to a night first. Soul OS is membership for people already in the room, when it opens.",
  story: {
    label: "Why we're building this",
    note: "Email us if you want a heads up when membership launches.",
  },
  moments: [
    {
      title: "Start at Hause of Soul",
      body: "Tech happy hour. No drinks provided. Just intros.",
    },
    {
      title: "Go deeper",
      body: "Sessions for talk. Workshops to build.",
    },
    {
      title: "OS opens later",
      body: "Membership for people who keep showing up.",
    },
  ],
  notifyHref: OS_NOTIFY_HREF,
  metaTitle: "Soul OS by SoulHause | Membership",
  metaDescription:
    "Soul OS membership: stay connected between SoulHause nights. Early event access, local perks, community rooms. Coming soon.",
} as const;

/** @deprecated Use OS_PRODUCT.moments — kept for any legacy references */
export const OS_ACCESS = [
  {
    title: "VIP event access",
    chip: "VIP",
    body: "Member lists, early RSVPs, and some nights before they go public.",
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
  lede: `${MEMBER_COUNT} people on Luma already. Come see what it's about.`,
} as const;

