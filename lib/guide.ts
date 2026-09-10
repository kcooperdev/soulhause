export type GuideScreen = "nights" | "hause" | "me";

export type GuideBeat = {
  id: string;
  screen: GuideScreen;
  menu?: boolean;
  title: string;
  body: string;
  next: string;
};

export const guideBeats: GuideBeat[] = [
  {
    id: "hello",
    screen: "hause",
    title: "You’re in the house",
    body: "Four places. The night, the board, the rooms, and you. This walk takes a minute. Skip anytime.",
    next: "Show me",
  },
  {
    id: "events",
    screen: "nights",
    title: "The night",
    body: "Tech After Dark lives here. RSVP when you’re going so the room knows you’ll be there.",
    next: "The board",
  },
  {
    id: "board",
    screen: "hause",
    title: "The board",
    body: "Jobs, mentors, crews. Post what you need. People find work here after they find each other.",
    next: "The rooms",
  },
  {
    id: "rooms",
    screen: "hause",
    title: "The rooms",
    body: "The House is the open room. Write how you got here. After the Night is what stayed.",
    next: "How to move",
  },
  {
    id: "move",
    screen: "hause",
    menu: true,
    title: "Menu opens the house",
    body: "On your phone, Menu slides the house in from the left. On a desk, the list stays on the side.",
    next: "You",
  },
  {
    id: "you",
    screen: "me",
    title: "This is you",
    body: "People open this after they meet you. Keep LinkedIn and a face current. Replay this walk anytime from here.",
    next: "Got it",
  },
];
