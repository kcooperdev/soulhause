export type VolunteerJobId = "check-in" | "setup" | "breakdown";

export type VolunteerJob = {
  id: VolunteerJobId;
  name: string;
  line: string;
};

export const volunteerJobs: VolunteerJob[] = [
  {
    id: "check-in",
    name: "Check-in",
    line: "Names at the door as people arrive.",
  },
  {
    id: "setup",
    name: "Set up",
    line: "The room before anyone walks in.",
  },
  {
    id: "breakdown",
    name: "Break down",
    line: "The room after the night ends.",
  },
];

export type VolunteerAsk = {
  name: string;
  link: string;
  city: string;
  note: string;
  at: string;
};

const STORE = "soulhause-volunteer-v2";

export function readVolunteer(): VolunteerAsk | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as VolunteerAsk) : null;
  } catch {
    return null;
  }
}

export function writeVolunteer(ask: VolunteerAsk) {
  window.localStorage.setItem(STORE, JSON.stringify(ask));
}
