import { brand } from "@/lib/brand";

export const company = {
  name: brand.name,
  href: "/",
  kicker: "The night",
  offer: "Tech, social, and community in one house.",
  what: "We learn, have fun, build, and grow together. A real room for people in tech.",
  who: "Anyone in tech who wants to show up and build with other people.",
  value: "Free to attend. Get on the list so we know the size of the room.",
} as const;

export const techAfterDark = {
  name: "Tech After Dark",
  href: "/tech-after-dark",
  kicker: "The experience",
  line: "A tech-infused night.",
  what: "TechFolx is a house for people in tech — learn, have fun, build, grow. Happy hour energy. The room is the point.",
  who: "People in tech who want community, not a pitch.",
  value: "Meet the same house over time. Free to attend. Get on the list.",
  live: "https://techafterdark.live",
  when: "The night",
  where: "",
  rsvp: brand.luma,
  calendar: brand.luma,
} as const;

export const work = {
  name: "Pricing",
  href: "/pricing",
  kicker: "The packages",
  line: "Tagging, analytics, a monthly keep.",
  what: "The audit is free. Then you pick Workflow, Setup, or Monthly.",
  who: "Businesses that already have a site, a funnel, or a sales flow.",
  from: "Free",
} as const;

export const workSteps = [
  {
    name: "Audit",
    line: "What fires, what does not, and what the workflow actually is. Free.",
  },
  {
    name: "Tag",
    line: "We name the steps and implement the tags in the stack you already bought.",
  },
  {
    name: "Picture",
    line: "A report or dashboard you can read on Monday. Monthly if the flow keeps moving.",
  },
] as const;

export const workFor = [
  "You have a live site, funnel, or sales flow.",
  "The tools you bought do not match what people actually do.",
  "You want tagging without an enterprise program.",
] as const;

export const workNot = [
  "You want a rebrand first.",
  "You need a 200-page tagging spec.",
  "You have not shipped a flow yet.",
] as const;

export const workPackages = [
  {
    id: "workflow",
    name: "Workflow",
    price: "$4,500",
    unit: "",
    line: "The business steps named and tagged. Simple. Done.",
    includes: [
      "Tagging plan for the workflow",
      "Events implemented in your stack",
      "A report you can read Monday",
    ],
    cta: "Choose Workflow",
  },
  {
    id: "setup",
    name: "Setup",
    price: "$8,500",
    unit: "",
    line: "Tagging plus the dashboard. Tools connected. One view.",
    includes: [
      "Everything in Workflow",
      "Tools connected",
      "A dashboard the room can read",
    ],
    cta: "Choose Setup",
  },
  {
    id: "month",
    name: "Monthly",
    price: "$2,500",
    unit: "/ mo",
    line: "The workflow moves. We keep the tags true.",
    includes: [
      "Tags kept current",
      "Dashboard kept current",
      "A short monthly read",
    ],
    cta: "Choose Monthly",
  },
] as const;

export const about = {
  name: "About",
  href: "/about",
  kicker: "The house",
  line: "Tech, social, community. One house.",
  what: "TechFolx is about building together. We learn, have fun, and grow in the same room. Get on the list so we know the size of the house.",
} as const;

export const contact = {
  name: "RSVP",
  href: brand.luma,
  audit: brand.luma,
  kicker: "The night",
  line: "Get on the list so we know the size of the room.",
  what: "Free to attend. Drinks are on you.",
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

export const theSprint = {
  name: "The Sprint",
  href: "/the-sprint",
  kicker: "The competition",
  line: "Two weeks. One build. The whole pot.",
  what: "A monthly two-week build sprint for Baltimore builders working on their own ideas. $25 to enter, 100% of the entries become the prize pool, and the whole room votes on demo night.",
  who: "Students from the schools recruiters skip, and everyday builders who never enrolled anywhere.",
  value: "Your own idea, fourteen days, and a demo night where every seat in the room gets a ballot.",
  entry: "$25",
  launch: "January 2027",
  city: "Baltimore, MD",
  enter: "/enter",
} as const;

export const volunteer = {
  name: "Volunteer",
  href: "/volunteer",
  kicker: "The crew",
  line: "Check-in. Set up. Break down.",
} as const;

export const techWeek = {
  name: "Tech Week",
  href: "https://www.bmoretechweek.com/",
} as const;

export const navOfferings = [techAfterDark] as const;

export const siteLinks = [
  { name: about.name, href: about.href },
] as const;
