import { brand } from "@/lib/brand";

export const core =
  "BMore Tech Nights is a tech mixer that brings professionals together to connect, explore technology, and build relationships through interactive experiences.";

/** Published details only. Leave a field blank if it is not confirmed. */
export const nextNight = {
  published: true,
  name: "The Offer",
  date: "November 4, 2026",
  time: "6pm",
  venue: "Nola Seafood & Spirits",
  place: "36 E Cross St, Baltimore",
  description:
    "You choose a path. Experience steps into the hands-on moment and includes the offer drink. Spectator watches that experience from the outside.",
  interactive: [] as string[],
  registrationUrl: "https://luma.com/k7k9pcqz",
  paths: [
    {
      name: "Experience",
      detail: "Step into the hands-on moment. Includes the offer drink.",
    },
    {
      name: "Spectator",
      detail: "Watch the experience from the outside.",
    },
  ],
  voucher: {
    eligibleDrinks: "",
    nonalcoholic: "",
    venueRestrictions: "",
    checkoutFees: "",
  },
};

export const tickets = {
  general: {
    name: "General admission",
    price: "Free",
    includes: [
      "Admission",
      "The night’s main programming",
      "Time to meet other professionals",
      "The core interactive experiences we set up for that event",
    ],
  },
  vip: {
    name: "VIP",
    price: "$20",
    includes: [
      "Everything in general admission",
      "One eligible drink voucher",
    ],
  },
};

export const vendorRules = [
  "$50 for one event.",
  "Up to two people from your team.",
  "You bring your own setup. A table and power are not included.",
  "Be ready by the start time on the event page.",
  "Recruiting and large brand activations are sponsorship.",
  "This page does not take payment.",
] as const;

export const vendorOffer = {
  price: "$50 per event",
  confirmed: [
    "You sign up yourself. There is no vendor call.",
    "The fee is $50 for one event.",
    "A signature on this page does not charge you or hold a spot until the form can file it.",
    "Corporate recruiting and larger brand activations belong under sponsorship.",
  ],
  unconfirmed: [
    "Whether a table and chair are provided",
    "Setup and breakdown times",
    "How many people from your team are included",
    "Payment deadline",
    "Cancellation and refund terms",
    "Product restrictions",
  ],
};

export type SponsorTierId = "community" | "partner" | "presenting";

export const sponsorTiers = [
  {
    id: "community" as const,
    name: "Community Sponsor",
    one: 300,
    three: 850,
    six: 1600,
    availability: "Up to two per event",
    benefits: [
      "Logo and link on the sponsored event page",
      "Inclusion in one grouped sponsor social post",
      "Logo on shared event signage",
      "A verbal thank-you during the event",
    ],
  },
  {
    id: "partner" as const,
    name: "Event Partner",
    one: 500,
    three: 1400,
    six: 2700,
    availability: "One per event",
    benefits: [
      "Community Sponsor benefits",
      "One dedicated sponsor spotlight post",
      "A place for materials in a shared partner area",
      "Two VIP tickets",
    ],
  },
  {
    id: "presenting" as const,
    name: "Presenting Sponsor",
    one: 1000,
    three: 2800,
    six: 5400,
    availability: "One per event",
    benefits: [
      "Event Partner benefits",
      "“Presented by” placement on the event page and the main promotional graphic",
      "An optional welcome of up to two minutes",
      "Four VIP tickets total (this replaces the two tickets at the Event Partner level)",
      "One activation table when the venue has room for it",
    ],
  },
];

export const sponsorLimits = [
  "A speaking slot or a panel is not included.",
  "A dedicated email blast is not included.",
  "We don’t promise impressions, leads, or sales.",
  "Industry exclusivity is not included.",
  "Attendee contact details are not included.",
  "A physical table is not guaranteed at every venue.",
  "A six-event presenting sponsor holds the presenting slot for all six contracted nights. We won’t sell a second presenting right for those nights.",
];

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
    q: "What is BMore Tech Nights?",
    a: core,
  },
  {
    q: "Who is it for?",
    a: "People across technology, business, creative work, and fields next to tech. The room is for meeting other professionals, not for sitting through a program.",
  },
  {
    q: "Is general admission free?",
    a: "Yes. General admission is always free.",
  },
  {
    q: "What is included with VIP?",
    a: "VIP is $20. It includes general admission and one eligible drink voucher. Which drinks qualify, including a nonalcoholic option, plus any venue rules or checkout fees, will be listed on that night’s event page.",
  },
  {
    q: "Do I need to work in tech?",
    a: "No. Come if you want to meet people and spend time around technology. A job title is not the ticket.",
  },
  {
    q: "How do I apply to vend?",
    a: "Open the Vend page and sign. No call and no approval. The fee is $50 for one event. This page does not take payment.",
  },
  {
    q: "What does the $50 vendor fee include?",
    a: "The fee is $50 for one event. Up to two people from your team can work the spot. You bring your own setup. A table and power are not included. Be ready by the start time on the event page. This page does not take payment.",
  },
  {
    q: "Can my organization sponsor one or multiple events?",
    a: "Yes. Community Sponsor and Event Partner sign on the Sponsor page for one, three, or six events. Presenting books a short call first, then signs after the welcome and the table are placed. This page does not take payment.",
  },
  {
    q: "Are events held at restaurants or coworking spaces?",
    a: "The venue can change. Follow the calendar on Luma for the date and the room once that night is booked.",
  },
  {
    q: "How can I ask about accessibility or accommodations?",
    a: "Age rules, step-free access, and other access details are published with each event when we know them. We don’t have one rule that covers every venue.",
  },
];

export const photoSlots = [
  "Photo placeholder. Add a real photo from a BMore Tech Nights event.",
  "Photo placeholder. Caption goes here when the photo is real.",
  "Photo placeholder. We won’t use stock photos as if they were our nights.",
];

export { brand };
