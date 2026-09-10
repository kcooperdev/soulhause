import { techAfterDark } from "@/lib/offerings";
import { events } from "@/lib/events";

const night = events[0];

export const nightStory = {
  line: techAfterDark.line,
  lede: techAfterDark.what,
  trapsTitle: "Most tech events aren’t worth the drive.",
  traps: [
    "The Recruiter Trap — you go expecting builders, you leave dodging pitches",
    "The Lukewarm Room — business cards in a drawer, LinkedIn requests never answered",
    "The Wasted Drive — 45 minutes each way for a room that wasn’t worth it",
    "The Mixer Energy — a room that never gets sharp and nobody you’d follow up with",
  ],
  opposite: "We built the opposite of that.",
  pillars: [
    {
      number: "01",
      title: "The People",
      body: "You spend all week in Slack with people you’ll never meet. This is the opposite. Engineers, PMs, designers, founders, operators — if you’re a tech professional, you’re in.",
    },
    {
      number: "02",
      title: "The Time",
      body: "After work. Not a Saturday conference. Not a 7am breakfast. You were going to get a drink anyway. Now the room is full of people in tech.",
    },
    {
      number: "03",
      title: "The Night",
      body: "No lanyard. No slide deck. The room is the point.",
    },
    {
      number: "04",
      title: "The Out",
      body: "Most nights like this, you walk out with nothing you can use on Monday. You leave this one with people in the work — the kind you’d take a call from later.",
    },
  ],
  contrast:
    "A conference charges you to sit and watch panels. A lukewarm mixer costs you time and gas. Tech After Dark is the room — after work, at happy hour, open to anyone in tech.",
  whoTitle: "Is this for you?",
  whoLead: "If any of these is you, come. If it isn’t, this isn’t your night.",
  who: [
    {
      name: "Engineers",
      body: "Writing code, shipping product, or still figuring out the stack. Come anyway.",
    },
    {
      name: "Everyone else in tech",
      body: "PM, design, data, ops, sales, recruiting, support. If the job is tech, this is for you.",
    },
    {
      name: "Getting into tech",
      body: "Student, career switcher, first year in. You don’t need a title to show up.",
    },
  ],
  hostKicker: "From the host",
  host: "A decade in tech — founder, engineer, community builder. But before tech, I worked in theater and hospitality. I learned there that a great experience is built — produced, felt, remembered. A few months ago I was sitting at a restaurant thinking about all of it, and I knew exactly what I wanted to make. Tech After Dark is the after-work I always wanted — a happy hour full of people in tech, not a badge and a business card.",
  hostName: "Khalif",
  hostRole: "Founder, Tech After Dark",
  dealLead: "You were going to get a drink after work anyway. This is the version where the room is worth it.",
  walkTitle: "What you walk into",
  walk: [
    "A room of tech professionals — after work, not after a keynote.",
    "Engineers, PMs, designers, founders, operators. If you’re in the work, you belong.",
    "A happy hour. The room is the point.",
    "No one working the floor with a deck. If it feels like a pitch night, we did it wrong.",
  ],
  faqs: [
    {
      q: "What is this?",
      a: "An after-work happy hour for people in tech. Not a conference, not a meetup with a program, not a pitch night. You show up, the room is full of people in the work, and that’s the night.",
    },
    {
      q: "Is this a mixer?",
      a: "It’s a happy hour. Nobody’s running a slide deck. If someone starts pitching, that’s not the night.",
    },
    {
      q: "Who should come?",
      a: "People who work in tech, and people getting in. Engineers, PMs, designers, founders, operators, students, career switchers. If the job is tech — or you’re headed there — you’re in.",
    },
    {
      q: "Do I need to know anyone?",
      a: "No. It’s an open room. Come as you are. Talk to people, or don’t. There’s no host walking you around.",
    },
    {
      q: "When and where?",
      a: night
        ? `${night.date} at ${night.time}. ${night.venue}, ${night.city}. Check Luma for the next one.`
        : "After work, once a month. Check Luma for the next night.",
    },
    {
      q: "What actually happens?",
      a: "Doors at 6:00 PM. Grab a drink if you want one. Talk shop, or don’t. Some nights there’s a short talk from someone shipping real work — no panels, no slides. Wraps by 10.",
    },
    {
      q: "Is there a cost?",
      a: "Free to attend. RSVP so we know the size of the room. Drinks are on you.",
    },
    {
      q: "What if I can’t make it?",
      a: "Skip it. It comes back. Update your RSVP if you already registered so we have a sense of the room.",
    },
  ],
  closeTitle: "Don’t find out about it after.",
  close: "You already know what you do after work. This is the version with a room of tech professionals.",
} as const;
