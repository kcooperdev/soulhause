export const JOIN_URL = "https://luma.com/soulhause";
export const CONTACT_EMAIL = "team@soulhause.com";

export const MEMBER_COUNT = "1,100+";
export const EVENTS_HOSTED = "10+";
export const FOUNDED_YEAR = "2025";

export const PATHWAY_PICKER = [
  {
    id: "pathway-1",
    label: "Soul Sessions",
    shortLabel: "Soul Sessions",
    format: "Talks",
    tagline: "Stories from people doing the work",
    tone: "gold",
  },
  {
    id: "pathway-2",
    label: "Soul Workshops",
    shortLabel: "Soul Workshops",
    format: "Workshops",
    tagline: "Hands-on sessions with real output",
    tone: "orange",
  },
  {
    id: "pathway-3",
    label: "Hause of Soul: Tech Happy Hour",
    shortLabel: "Hause of Soul",
    format: "Tech Happy Hour",
    tagline: "SoulHause's signature tech happy hour",
    tone: "green",
  },
] as const;

export const PATHWAYS_SUMMARY =
  "Talks, workshops, and tech happy hours. RSVP on Luma.";

export const PATHWAYS_VS_BUILDERS =
  "Pathways are in-person events on SoulHause. Soul Builders is a LinkedIn group to share resources, wins, and build together between events.";

export const PRIMARY_CTA = "RSVP on Luma";

export const SITE_TAGLINE =
  "A tech community that feels like home.";

export const BRAND_STORY = {
  soul: "Soul is the passion behind the work. The intensity and drive of people who love technology and want to build meaningful things.",
  hause: "Hause is the German word for house. A place where people belong.",
  together:
    "Together, SoulHause is a grassroots community centered on connection, technology, networking, and real-world events that feel welcoming and human.",
} as const;

export const BRAND_PILLARS = [
  {
    title: "Connection",
    body: "Bringing people together across cultures and backgrounds.",
  },
  {
    title: "Technology",
    body: "Sharing knowledge, skills, and innovation with people who love the work.",
  },
  {
    title: "Networking",
    body: "Creating real relationships that open doors, not just exchanging cards.",
  },
  {
    title: "Community",
    body: "Events and spaces that feel welcoming, inclusive, and human.",
  },
] as const;

export const NEXT_EVENT = {
  title: PATHWAY_PICKER[2].label,
  shortTitle: PATHWAY_PICKER[2].shortLabel,
  date: "September 17, 2026",
  format: PATHWAY_PICKER[2].format,
  rsvpUrl: JOIN_URL,
} as const;

export const PROOF_STATS = [
  { value: MEMBER_COUNT, label: "builders" },
  { value: EVENTS_HOSTED, label: "events hosted" },
  { value: "3", label: "pathways" },
] as const;

export const NEXT_EVENT_OFFER = {
  eyebrow: `Next up · ${NEXT_EVENT.date}`,
  lede: `${NEXT_EVENT.shortTitle} is our signature tech happy hour for builders, founders, and technologists.`,
  detail:
    "Open room, curated crowd. The kind of Thursday night you're glad you didn't skip.",
} as const;

export const PATHWAY_OFFERS = [
  {
    heading: "Soul Sessions",
    body: "Founders and technologists share the real journey: mistakes, pivots, and what actually worked.",
    bullets: [
      "One guest, one honest story",
      "Lessons you can use right away",
      `${MEMBER_COUNT} builders in the community`,
    ],
  },
  {
    heading: "Soul Workshops",
    body: "Hands-on sessions with real output. AI, software, branding, and more, led by people doing the work.",
    bullets: [
      "Build something, don't just watch",
      "Beginner-friendly and practical",
      `${EVENTS_HOSTED} events hosted so far`,
    ],
  },
  {
    heading: "Hause of Soul",
    body: "Our signature tech happy hour. The room where builders, creatives, and founders actually meet.",
    bullets: [
      "Curated crowd, real conversation",
      "Your people, in the room",
      `Next up: ${NEXT_EVENT.date}`,
    ],
  },
] as const;

export const FUNNEL_STEPS = [
  { step: "01", title: "RSVP on Luma", body: "Pick Soul Sessions, Soul Workshops, or Hause of Soul. Takes a minute." },
  { step: "02", title: "Show up in person", body: "Meet builders, founders, and technologists in the room." },
  { step: "03", title: "Come back", body: "Stay on the list for the next event, and bigger moments like Baltimore Tech Week." },
] as const;

export const FLAGSHIP_PRODUCT = {
  id: "baltimore-tech-week",
  href: "https://bmoretechweek.com",
  name: "Baltimore Tech Week",
  badge: "A SoulHause product",
  tagline: "Baltimore's decentralized tech week",
  location: "Baltimore, MD",
  summary:
    "Baltimore's decentralized tech week. The biggest thing built from SoulHause, powered by the same pathways and community.",
  description:
    "A citywide week of independently hosted events under one calendar. For hosts, sponsors, and builders who want Baltimore on the map.",
  highlights: [
    "Produced by SoulHause.com, not a standalone organization",
    "Decentralized events across the city, one shared calendar",
    "Powered by SoulHause pathways: Soul Sessions, Soul Workshops, and Hause of Soul",
    "Built to raise Baltimore's profile as a builder city",
  ],
} as const;

export const SOUL_BUILDERS_PRODUCT = {
  name: "Soul Builders",
  href: "https://www.linkedin.com/groups/30920002/",
  badge: "LinkedIn group",
  tagline: "Share resources. Share wins. Build together.",
  summary:
    "A LinkedIn group for SoulHause builders to share resources, celebrate wins, and build together between events.",
  description:
    "Soul Builders lives on LinkedIn for now. Share what you're learning, post wins, swap resources, and stay connected until the platform earns enough traction to stand on its own.",
} as const;

export const STACK_LAYERS = [
  {
    label: "Pathways",
    sub: "Sessions, Workshops, Happy Hour",
    tone: "orange",
    href: "/#pathways",
  },
  {
    label: "Community",
    sub: `${MEMBER_COUNT} members`,
    tone: "green",
    href: JOIN_URL,
  },
  {
    label: "Products",
    sub: "Built from SoulHause",
    tone: "gold",
    href: FLAGSHIP_PRODUCT.href,
  },
  {
    label: "Soul Builders",
    sub: "LinkedIn group",
    tone: "ink",
    href: SOUL_BUILDERS_PRODUCT.href,
  },
] as const;

export const JOIN_GATE = {
  headline: `RSVP for ${NEXT_EVENT.shortTitle}`,
  sub: `Join ${MEMBER_COUNT} builders on Luma. Takes about a minute.`,
  steps: [
    "Open Luma and pick your event",
    "RSVP to Soul Sessions, Soul Workshops, or Hause of Soul",
    "Show up and meet people in the room",
  ],
} as const;
