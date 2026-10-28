import { brand } from "@/lib/brand";

export const core =
  "BMore Tech Scene is one stop for the tech community: events to attend, and resources to learn AI, cybersecurity, and more.";

export type SceneEvent = {
  id: string;
  name: string;
  /** Hosting company or organizer */
  company: string;
  /** Local calendar date as YYYY-MM-DD */
  startsOn: string;
  time: string;
  place: string;
  /** External RSVP / ticket page */
  href: string;
  /** Short blurb for calendar modal and list previews */
  detail: string;
  /** Cover image under /public */
  image: string;
  /** Longer copy for the on-site detail page */
  body: string;
};

/**
 * Published tech events only.
 * Add one after the link, date, and place are real.
 * Submitted events will fill this list once the form is connected.
 * Remove with: npm run remove-event -- <event-id>
 */
export const sceneEvents: SceneEvent[] = [
  {
    id: "lovable-office-hours",
    name: "Lovable Office Hours",
    company: "Lovable",
    startsOn: "2026-10-29",
    time: "12:00pm",
    place: "Virtual",
    href: "https://luma.com/qfg5fdk4",
    detail: "Live virtual office hours to get unstuck building with Lovable — Q&A, troubleshooting, and practical tips.",
    image: "/events/lovable-office-hours.jpg",
    body: "Building with Lovable and need a hand? Join a live, virtual office hours session with questions, blockers, and works in progress. Whether you’re stuck on a bug, unsure how to prompt for what you have in mind, or looking for ideas to take your build further, ambassadors are there to help. For anyone building with Lovable, from first-timers to seasoned builders. Expect live Q&A, hands-on troubleshooting, and practical tips. Bring a project, a question, or your curiosity.",
  },
  {
    id: "the-offer",
    name: "The Offer: An Immersive Tech Experience",
    company: "Bmore Tech Nights",
    startsOn: "2026-11-04",
    time: "6:00pm",
    place: "Nola Seafood & Spirits, 36 E Cross St, Baltimore",
    href: "https://luma.com/k7k9pcqz",
    detail: "A choice-driven immersive tech night in Baltimore — step inside the experience or watch from the outside.",
    image: "/events/the-offer.jpg",
    body: "The Offer is a new kind of tech experience in Baltimore, built around one decision: will you step inside the moment, or watch from the outside? On November 4th you’ll enter a space that blends nightlife, immersion, and hands-on tech interaction. This isn’t a panel, a networking mixer, or a traditional meetup. It’s a cinematic, choice-driven night where your path shapes what you learn and how deeply you participate. Choose Experience for a guided interactive path, or Spectator to take in the atmosphere from outside the threshold. For tech professionals, creators, builders, and the curious.",
  },
  {
    id: "bmore-ai-challenge",
    name: "The BMORE AI Challenge",
    company: "BMORENews.com",
    startsOn: "2026-11-11",
    time: "11:00am",
    place: "Thurgood Marshall Amenity Center, 1315 Division Street, Baltimore",
    href: "https://www.eventbrite.com/e/the-bmore-ai-challenge-tickets-2003263628439",
    detail: "Free community challenge exploring AI for education, healthcare, nonprofits, and business — bring a problem, build a solution.",
    image: "/events/bmore-ai-challenge.png",
    body: "Beloved Community Services Corporation, STEM CITY USA, and BMORENews.com present the BMORE AI Challenge, a free interactive community event on how AI can help people strengthen organizations, grow businesses, and serve communities. Wednesday, November 11, 2026, 11 a.m.–2 p.m. at the Justice Thurgood Marshall Amenity Center. Moderated by Doni Glover across education, healthcare, nonprofits, and entrepreneurs, with AI facilitators rotating among groups. Ask questions, explore practical tools, develop ideas, then share solutions after a snack break. For educators, healthcare professionals, nonprofit leaders, entrepreneurs, veterans, and community members — no prior AI experience needed. Bring a laptop or phone if you have one. Admission is free; refreshments provided.",
  },
  {
    id: "human-side-ai",
    name: "The Human Side of AI",
    company: "The AI Collective",
    startsOn: "2026-11-11",
    time: "6:00pm",
    place: "Baltimore, MD",
    href: "https://luma.com/human-side-ai",
    detail: "A Baltimore mixer for technologists, creatives, and the AI-curious — real conversation, no technical expertise required.",
    image: "/events/human-side-ai.jpg",
    body: "AI is changing how we work, create, build, and connect. Behind every new tool and breakthrough are people. The Human Side of AI is a Baltimore mixer bringing together technologists, creatives, entrepreneurs, professionals, and the AI-curious for an evening of conversation and connection. No technical expertise required. Space is limited and registration may require host approval. The AI Collective is a global non-profit building the human layer for the AI era across forums worldwide.",
  },
  {
    id: "bmore-tech-trek-ai",
    name: "B’more Tech Trek [AI]",
    company: "Tyler Roper",
    startsOn: "2026-11-14",
    time: "10:00am",
    place: "The Backyard, 131 S Schroeder St, Baltimore",
    href: "https://luma.com/ckqpi03q",
    detail: "A walking tour of Baltimore for people who’d rather talk tech and AI on foot — Fells Point loop, then lunch.",
    image: "/events/bmore-tech-trek.jpg",
    body: "Originally founded in Washington D.C., the AI Walk lands in Baltimore as B’More Tech Trek. It’s a walking tour of Charm City for people who’d rather talk tech, AI, and the future on foot than from a stuffy networking event. Start at The Backyard, walk to Fells Point, and loop back for lunch via Inner Harbor and Harbor East. Built for founders, marketers, investors, engineers, and product people — you don’t need a tech job to join. Wear comfortable shoes and dress for November on the water. Registration may require host approval.",
  },
  {
    id: "industry-spotlight-sports-tech",
    name: "Industry Spotlight on Sports and Technology",
    company: "UpSurge Baltimore",
    startsOn: "2026-11-17",
    time: "5:00pm",
    place: "Spark-Flex, 621 East Pratt Street, Baltimore",
    href: "https://events.blackthorn.io/en/KbOkKk6/g/K6RWFzv502/industry-spotlight-on-sports-and-technology-6a2cPC2mKBCM/overview",
    detail: "Fireside chat with Orioles VP Sig Mejdal on sports analytics, tech, and opportunity beyond the locker room.",
    image: "/events/sports-tech-spotlight.jpg",
    body: "From pro stadiums to youth fields, technology keeps changing how we experience sports. Join UpSurge Baltimore at Spark Flex in the Inner Harbor for an industry spotlight on professional sports, tech, and opportunities beyond the locker room. Sig Mejdal, VP and assistant general manager of the Baltimore Orioles and a recognized sports analytics leader, sits for a fireside chat with Peter Stournaras of T. Rowe Price. Expect insight from Mejdal’s engineering and NASA background through decades at the forefront of baseball’s science-enabled changes — plus time to connect with others working at the intersection of athletics and innovation. Runs 5:00pm–8:00pm ET.",
  },
];

export function getSceneEvent(id: string) {
  return sceneEvents.find((event) => event.id === id);
}

export const resourceCategories = [
  "Learn & Build",
  "Support Organizations",
  "Communities",
  "Spaces",
] as const;

export type Resource = {
  name: string;
  description: string;
  category: (typeof resourceCategories)[number];
  href: string;
  cost: "Free" | "Paid" | "Mixed";
  reviewed: string;
  sponsored: boolean;
};

/** Add a resource only after the link and the free/paid label are verified. */
export const resources: Resource[] = [];

export type Job = {
  title: string;
  org: string;
  location: string;
  type: string;
  href: string;
  posted: string;
};

/** Add a job only when the posting link is real. */
export const jobs: Job[] = [];

export const faqs = [
  {
    q: "What is BMore Tech Scene?",
    a: core,
  },
  {
    q: "Who is it for?",
    a: "People in and around tech: builders, designers, founders, students, and anyone looking for the next event, role, or resource.",
  },
  {
    q: "What will I find here?",
    a: "A calendar of tech events, job openings when we have a real posting, and resources that help people in the local tech community.",
  },
  {
    q: "How do I browse events?",
    a: "Open Events and switch between Calendar and List. Calendar is the default. Click a day to open that day’s events, then open Details for the full listing.",
  },
  {
    q: "Can I submit an event?",
    a: "Yes. Open Submit an event from the Events page. It is self-service for tech events only. There is no approval. Listings outside tech get removed. The form is not connected yet, so nothing is filed until it is.",
  },
  {
    q: "Is this a mixer or a conference?",
    a: "This site is a resource place. The Events page shows tech gatherings when they are published. Individual events set their own format.",
  },
];

export const photoSlots = [
  "Photo placeholder. Add a real photo from the local tech community.",
  "Photo placeholder. Caption goes here when the photo is real.",
  "Photo placeholder. We won’t use stock photos as if they were ours.",
];

export { brand };
