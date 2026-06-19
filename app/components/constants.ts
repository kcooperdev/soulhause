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
    label: "Soul Tech",
    format: "Mixers",
    tagline: "Where collaborations start",
    tone: "green",
  },
] as const;

export const STACK_LAYERS = [
  {
    label: "Events",
    sub: "Sessions, Labs, Tech",
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

export const FOUNDER = {
  name: "Khalif Cooper",
  role: "Founder & CEO",
  credentials: "Software engineer · community builder · speaker",
  highlights: [
    "Self-taught software engineer",
    "Taught others to code",
    "Hosts talks and workshops",
  ],
  story: [
    "This journey has been full circle for me. I've always been a problem solver: someone who learns by doing, builds by trying, and figures things out along the way. I started as a theatre kid who also wanted to be a chef. That mix of creativity, curiosity, and discipline still shapes how I build today.",
    "My mother has always believed in me, and that belief kept me showing up. I taught myself to code, then taught others, gave talks, and kept following the work that made me feel alive. I never planned to start a tech company. I just wanted to find people who loved building, helping others, and solving problems the way I do.",
    "That search became SoulHause: a tech company and a home for builders. Today we're {MEMBER_COUNT} strong, running real events, and building the platform behind it all. I finally feel like I'm exactly where I'm supposed to be, and the door is open for you.",
  ],
} as const;
