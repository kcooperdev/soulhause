export type Role =
  | "Transitioning"
  | "Student"
  | "Mid-level"
  | "Senior"
  | "Cyber"
  | "Gov tech"
  | "Creative"
  | "Builder"
  | "Founder"
  | "Investor"
  | "Hiring"
  | "Job seeker";

export type EventItem = {
  id: string;
  title: string;
  host: string;
  roleFit: Role[];
  price: string;
  date: string;
  time: string;
  city: string;
  venue: string;
  image: string;
  imageAlt: string;
  registerUrl: string;
  icebreaker: string;
  startsAt: string;
};

export const roleGroups: {
  label: string;
  roles: { id: Role; line: string }[];
}[] = [
  {
    label: "Path",
    roles: [
      { id: "Transitioning", line: "Into tech from another career" },
      { id: "Student", line: "In school, still becoming" },
      { id: "Mid-level", line: "In tech, not new" },
      { id: "Senior", line: "Deep in the stack" },
    ],
  },
  {
    label: "Lane",
    roles: [
      { id: "Cyber", line: "Security of systems" },
      { id: "Gov tech", line: "Civic and public-sector" },
      { id: "Creative", line: "Culture, craft, story" },
      { id: "Builder", line: "Shipping something" },
    ],
  },
  {
    label: "Company & work",
    roles: [
      { id: "Founder", line: "A company, raising or not" },
      { id: "Investor", line: "Looking to invest" },
      { id: "Hiring", line: "Building a team" },
      { id: "Job seeker", line: "Developer or other roles" },
    ],
  },
];

export const roles = roleGroups.flatMap((group) => group.roles);

export const events: EventItem[] = [
  {
    id: "hause-of-soul",
    title: "Hause of Soul: Tech Happy Hour",
    host: "SoulHause Events",
    roleFit: roles.map((role) => role.id),
    price: "Free",
    date: "Sep 17",
    time: "6:00 PM",
    city: "Laurel, MD",
    venue: "Miss Toya’s Southern Kitchen",
    image: "/hause-of-soul.png",
    imageAlt: "Hause of Soul house and sunset mark",
    registerUrl: "https://luma.com/hj5hk5jf",
    icebreaker:
      "What’s bringing you into this room — a job, a company, or a second career?",
    startsAt: "2026-09-17T18:00:00-04:00",
  },
];

export function eventsForYou(picks: Role[]) {
  if (!picks.length) return events;
  return events.filter((event) =>
    event.roleFit.some((role) => picks.includes(role)),
  );
}

export function roleLabel(id: string) {
  return roles.find((role) => role.id === id)?.id ?? id;
}

export function eventStartMs(event: EventItem) {
  return Date.parse(event.startsAt);
}

export function eventHasStarted(event: EventItem, now = Date.now()) {
  const start = eventStartMs(event);
  return Number.isFinite(start) && now >= start;
}

export function doorsAreOpen(event: EventItem, now = Date.now()) {
  return eventHasStarted(event, now);
}
