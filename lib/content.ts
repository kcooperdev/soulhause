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

export const vendorOffer = {
  price: "$50 per event",
  confirmed: [
    "We review vendors for fit with the people in the room.",
    "An application does not hold a spot.",
    "If we approve you, we’ll send payment and setup instructions.",
    "We may ask for a short call. You don’t need one before you apply.",
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
      "A place for approved materials in a shared partner area",
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
      "One activation table only when the venue layout allows it and we agree in advance",
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
    a: "Use the form on the Vend page. We review for fit. Applying does not reserve a spot. Vendor spots are $50 per event, and how many we can take depends on the room.",
  },
  {
    q: "What does the $50 vendor fee include?",
    a: "The $50 is the fee to vend at one event after you’re approved. Table, chairs, setup times, how many people are included, and refund terms are not set as a standing policy yet. We’ll send those with your approval.",
  },
  {
    q: "Can my organization sponsor one or multiple events?",
    a: "Yes. Community, Event Partner, and Presenting packages can cover one, three, or six events, if that inventory is still open. A written agreement comes before payment.",
  },
  {
    q: "Are events held at restaurants or coworking spaces?",
    a: "The venue can change. Follow the calendar on Luma for the date and the room once that night is booked.",
  },
  {
    q: "How can I ask about accessibility or accommodations?",
    a: "Write to us from the About page. Age rules, step-free access, and other access details will be published with each event when we know them. We don’t have one rule that covers every venue.",
  },
];

export const photoSlots = [
  "Photo placeholder. Add a real photo from a BMore Tech Nights event.",
  "Photo placeholder. Caption goes here when the photo is real.",
  "Photo placeholder. We won’t use stock photos as if they were our nights.",
];

export { brand };
