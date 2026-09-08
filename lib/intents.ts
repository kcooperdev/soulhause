export type InterestId =
  | "car"
  | "home"
  | "banking"
  | "hiring"
  | "learning"
  | "tools"
  | "other";

export const interestChips: {
  id: InterestId;
  label: string;
  pitch: string;
}[] = [
  { id: "car", label: "Car", pitch: "a vehicle" },
  { id: "home", label: "Home", pitch: "a home" },
  { id: "banking", label: "Banking", pitch: "banking" },
  { id: "hiring", label: "Hiring", pitch: "hiring" },
  { id: "learning", label: "Learning", pitch: "workshops" },
  { id: "tools", label: "Tools & software", pitch: "tools & software" },
  { id: "other", label: "Other", pitch: "other" },
];

export type LookingId =
  | "dev-job"
  | "other-job"
  | "investor"
  | "founders"
  | "ai"
  | "mentor"
  | "gov-role"
  | "cyber-crew"
  | "collab"
  | "resources";

export const lookingChips: { id: LookingId; label: string }[] = [
  { id: "dev-job", label: "A developer job" },
  { id: "other-job", label: "Another role" },
  { id: "investor", label: "An investor" },
  { id: "founders", label: "Other founders" },
  { id: "ai", label: "People who love AI" },
  { id: "mentor", label: "A mentor" },
  { id: "gov-role", label: "A gov-tech role" },
  { id: "cyber-crew", label: "A cyber crew" },
  { id: "collab", label: "A crew" },
  { id: "resources", label: "Tech resources" },
];

export type OfferId =
  | "hiring-dev"
  | "hiring-other"
  | "investing"
  | "intros"
  | "mentoring"
  | "cyber-gov";

export const offerChips: { id: OfferId; label: string }[] = [
  { id: "hiring-dev", label: "Hiring" },
  { id: "hiring-other", label: "Hiring (other roles)" },
  { id: "investing", label: "Capital" },
  { id: "intros", label: "Intros" },
  { id: "mentoring", label: "Mentorship" },
  { id: "cyber-gov", label: "Resources" },
];

export const CONSENT =
  "Used to connect the house and bring relevant partners — not a hidden data harvest.";

export function pitchLine(count: number, guests: number, pitch: string) {
  if (guests <= 0) return `No opted-in guests yet for ${pitch}.`;
  return `${count} of ${guests} guests opted in as in-market for ${pitch}.`;
}

export function mixLine(count: number, phrase: string) {
  if (count <= 0) return null;
  return `${count} ${phrase}`;
}
