import { theSprint } from "@/lib/offerings";

export const sprintMedia = {
  webm: "/sprint/track.webm",
  mp4: "/sprint/track.mp4",
  poster: "/sprint/track.jpg",
} as const;

export const sprintStory = {
  hero: {
    kicker: "TechFolx presents",
    title: ["The", "Sprint"] as const,
    entry: "$25 entry",
    lede: "Two weeks to build it. Four minutes to prove it.",
    meta: [theSprint.city, "The room votes", "100% prize pool"] as const,
    launch: `First drop — ${theSprint.launch}`,
    cta: "Get on the list",
    secondary: "How it works",
  },
  ticker: [
    "Two-week sprint",
    "$25 entry",
    "Monthly",
    "Baltimore first",
    "100% prize pool",
    "The room votes",
  ] as const,
  idea: {
    kicker: "Baltimore first",
    title: "Bring your own idea.",
    lede: "No theme, no assignment, nothing is off-topic. We invest in Baltimore people, not Baltimore problems — the only city rule is that one of you lives, works, or studies here. Morgan State, Coppin, UMBC, Towson, BCCC, and everybody who never enrolled anywhere.",
    focusLabel: "Each month names a focus — optional",
    sectors: ["Transit", "Housing", "Schools", "Small business", "Returning citizens"] as const,
    note: "Land in the focus and there’s sponsor money on top. Miss it and you’re still in for everything else.",
    stats: [
      { value: "12", label: "sprints a year" },
      { value: "14", label: "days each" },
    ],
  },
  how: {
    kicker: "How it works",
    title: "Fourteen days, start to finish.",
    steps: [
      {
        day: "Day 00",
        title: "The Drop",
        body: "First Friday, 7:00 PM. The clock starts and the month’s focus goes up. You already know what you’re building.",
      },
      {
        day: "Days 01–07",
        title: "Build Week",
        body: "Make the thing. Solo or a team up to four, any stack, from anywhere.",
      },
      {
        day: "Days 08–13",
        title: "Ship Week",
        body: "Cut scope. Get it running somewhere that isn’t your laptop.",
      },
      {
        day: "Day 14",
        title: "Demo Night",
        body: "In the room, in Baltimore. Four minutes on stage, the room votes, and the pool splits before anyone goes home. There’s a stream for everyone who couldn’t make it.",
      },
    ],
    rules: [
      "Any stack, any tools, any AI.",
      "Teams up to four. At least one of you lives, works, or studies in Baltimore.",
      "Any idea, nothing off-topic. It can be old — the work has to be new, built inside the fourteen days.",
      "No VC round, no accelerator check, no grant over $25k. Bootstrapped revenue and side projects are fine.",
      "It has to run live, and you have to be in the room to demo.",
    ] as const,
    rulesNote: "The rules keep the pot pointed at students and everyday builders.",
  },
  vote: {
    kicker: "The vote",
    title: "The room decides.",
    lede: "No panel. Engineers, faculty, students, neighbors — every seat gets one ballot and marks all three categories. You have to be there to vote. The stream watches; it doesn’t.",
    categories: [
      { number: "01", name: "Best Design", body: "The one that felt built for a person." },
      { number: "02", name: "Best Build", body: "The one with real craft under the hood." },
      { number: "03", name: "Best Fix", body: "The one somebody could actually use on Monday." },
    ],
    tallyTitle: "How it adds up",
    tally:
      "Add a build’s three category totals together: highest takes first, then second, then third. Ties go to more Best Fix votes — usefulness breaks it.",
    note: "You don’t vote for your own build. Counted in the room, read out loud.",
  },
  money: {
    kicker: "The money",
    title: "$25 in. 100% out.",
    lede: "No application, no referral, no portfolio review — paying the entry is the whole door. And the entry isn’t revenue. It is the prize pool.",
    splits: [
      { place: "1st", share: "60%" },
      { place: "2nd", share: "25%" },
      { place: "3rd", share: "15%" },
    ],
    exampleLabel: "The math",
    example:
      "200 entrants at $25 is a $5,000 pool — $3,000, $1,250, and $750 handed out on demo night.",
    doorsTitle: "Two other ways in",
    doors: [
      {
        name: "Back a focus",
        body: "A company can fund a month’s focus. It covers the night, adds to the pool, and puts a bonus on builds that land in it. The entry stays $25 either way.",
      },
      {
        name: "Cover an entry",
        body: "Twenty-five dollars puts a builder who’s short on the stage. Your money becomes one specific person in the room, not overhead.",
      },
    ],
    cta: "Back a focus or cover an entry",
    fine: [
      "Entry closes the minute the clock starts.",
      "Teams pay one entry per builder and split a placement however they agree.",
      "Prizes paid within seven days. Didn’t place? It runs again in four weeks.",
    ] as const,
  },
  coming: {
    kicker: "Coming soon",
    title: theSprint.launch,
    lede: "The first clock starts in Baltimore in January 2027. The list gets the date, the venue, and the entry window first.",
    record:
      "Every demo is recorded and every placement lands on your TechFolx profile. Run the same idea across enough sprints and that record becomes something a sponsor or an investor can act on.",
    cta: "Get on the list",
    note: "Free to join. One email when entries open.",
  },
  footer: {
    line: "Two weeks. One build. The whole pot.",
    meta: [theSprint.city, "Monthly", `Launching ${theSprint.launch}`] as const,
  },
} as const;
