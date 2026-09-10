import { brand } from "@/lib/brand";
import { events } from "@/lib/events";

const night = events[0];

export const company = {
  name: brand.name,
  href: "/",
  kicker: "The company",
  what: "SoulHause is a tech company. We build technology for everyday people — tools with soul, rooms that last, and what comes next.",
  who: "People in tech, people breaking in, and anyone who wants the work to feel human. Maryland first. Open to the rest.",
  value: "One house. An event that fills the room. A membership that keeps the room after the night. Products we ship under the same name.",
} as const;

export const techAfterDark = {
  name: "Tech After Dark",
  href: "/tech-after-dark",
  kicker: "The event",
  line: "The after-work you actually want to go to.",
  what: "A tech happy hour for professionals. No pitch. No slide deck. You walk in after work and leave with a peer you’d take a call from.",
  who: "Engineers, founders, operators, designers, and people changing careers. If you want conversation without the badge line, this is for you.",
  value: "Show up once a month. Meet the same house over time. Free to attend. Register on Luma.",
  live: "https://techafterdark.live",
  when: night ? `${night.date} · ${night.time}` : "Next night soon",
  where: night ? `${night.venue}, ${night.city}` : "Laurel, MD",
  rsvp: brand.luma,
  calendar: brand.luma,
} as const;

export const techHause = {
  name: "Tech Hause",
  href: "/tech-hause",
  kicker: "The offer",
  line: "Free to be found. $25 for a card that pays you back.",
  what: "Free gets you in the house. Paid gets you the card. Both get better as more people join.",
  who: "Free to join.",
  value: "The night fills the room. The house keeps the names.",
  enter: "/enter",
} as const;

export const volunteer = {
  name: "Volunteer",
  href: "/volunteer",
  kicker: "The crew",
  line: "Check-in. Set up. Break down.",
} as const;

export const navOfferings = [techAfterDark, techHause] as const;

export const siteLinks = [
  { name: "Home", href: "/" },
  { name: techAfterDark.name, href: techAfterDark.href },
  { name: techHause.name, href: techHause.href },
  { name: volunteer.name, href: volunteer.href },
] as const;
