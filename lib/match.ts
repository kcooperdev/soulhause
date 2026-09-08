import {
  interestChips,
  lookingChips,
  offerChips,
  type InterestId,
  type LookingId,
  type OfferId,
} from "@/lib/intents";
import type { Member } from "@/lib/members";
import { isApproved } from "@/lib/trust";

const lookingToOffers: Partial<Record<LookingId, OfferId[]>> = {
  "dev-job": ["hiring-dev"],
  "other-job": ["hiring-other", "hiring-dev"],
  investor: ["investing"],
  mentor: ["mentoring"],
  "gov-role": ["cyber-gov", "intros"],
  "cyber-crew": ["cyber-gov"],
  collab: ["intros", "mentoring"],
  founders: ["intros"],
  resources: ["cyber-gov"],
};

export type Suggestion = {
  member: Member;
  why: string;
};

export type ThoughtId =
  | "career-change"
  | "building"
  | "cyber"
  | "civic"
  | "capital"
  | "creative"
  | "learning"
  | "hiring"
  | "crew"
  | "ai";

export const thoughtChips: { id: ThoughtId; label: string }[] = [
  { id: "career-change", label: "Career change" },
  { id: "building", label: "Building" },
  { id: "cyber", label: "Cyber" },
  { id: "civic", label: "Civic tech" },
  { id: "capital", label: "Capital" },
  { id: "creative", label: "Creative" },
  { id: "learning", label: "Learning" },
  { id: "hiring", label: "Hiring" },
  { id: "crew", label: "Finding a crew" },
  { id: "ai", label: "AI" },
];

export type MindPerson = {
  member: Member;
  why: string;
  thoughts: ThoughtId[];
  score: number;
};

function lookingLabel(id: LookingId) {
  return lookingChips.find((chip) => chip.id === id)?.label ?? id;
}

function offerLabel(id: OfferId) {
  return offerChips.find((chip) => chip.id === id)?.label ?? id;
}

function thoughtLabel(id: ThoughtId) {
  return thoughtChips.find((chip) => chip.id === id)?.label ?? id;
}

export function thoughtsOf(member: Member): ThoughtId[] {
  const set = new Set<ThoughtId>();
  const looking = member.lookingIds ?? [];
  const offers = member.offerIds ?? [];
  const interests = member.interests ?? [];

  if (
    member.role === "Transitioning" ||
    member.role === "Job seeker" ||
    looking.includes("mentor") ||
    looking.includes("dev-job") ||
    looking.includes("other-job")
  ) {
    set.add("career-change");
  }
  if (member.role === "Founder" || member.role === "Builder" || looking.includes("founders")) {
    set.add("building");
  }
  if (
    member.role === "Cyber" ||
    looking.includes("cyber-crew") ||
    offers.includes("cyber-gov")
  ) {
    set.add("cyber");
  }
  if (member.role === "Gov tech" || looking.includes("gov-role")) set.add("civic");
  if (
    member.role === "Investor" ||
    looking.includes("investor") ||
    offers.includes("investing")
  ) {
    set.add("capital");
  }
  if (member.role === "Creative") set.add("creative");
  if (
    member.role === "Student" ||
    looking.includes("mentor") ||
    interests.includes("learning")
  ) {
    set.add("learning");
  }
  if (
    member.role === "Hiring" ||
    offers.includes("hiring-dev") ||
    offers.includes("hiring-other") ||
    interests.includes("hiring")
  ) {
    set.add("hiring");
  }
  if (looking.includes("collab") || offers.includes("intros")) set.add("crew");
  if (looking.includes("ai")) set.add("ai");
  if (looking.includes("resources") || offers.includes("cyber-gov")) {
    set.add("learning");
  }

  return thoughtChips.map((chip) => chip.id).filter((id) => set.has(id));
}

export function recommendFor(me: Member, pool: Member[]): Suggestion[] {
  return mindShare(me, pool)
    .filter((item) => item.member.matchPool)
    .slice(0, 4)
    .map((item) => ({ member: item.member, why: item.why }));
}

export function mindShare(me: Member, pool: Member[]): MindPerson[] {
  const myThoughts = thoughtsOf(me);
  const myLooking = me.lookingIds ?? [];
  const myInterests = me.interests ?? [];

  const ranked: MindPerson[] = [];

  for (const person of pool) {
    if (person.id === me.id || !isApproved(person)) continue;

    const reasons: string[] = [];
    let score = 0;
    const sharedThoughts = thoughtsOf(person).filter((id) =>
      myThoughts.includes(id),
    );

    for (const want of myLooking) {
      const offers = lookingToOffers[want] ?? [];
      const hit = offers.find((offer) => person.offerIds?.includes(offer));
      if (hit && person.matchPool) {
        reasons.push(
          `${lookingLabel(want)} → they offer ${offerLabel(hit).toLowerCase()}`,
        );
        score += 3;
      }
    }

    for (const want of myLooking) {
      if (person.lookingIds?.includes(want)) {
        reasons.push(`Also looking for ${lookingLabel(want).toLowerCase()}`);
        score += 3;
      }
    }

    const sharedInterests = (person.interests ?? []).filter(
      (id) => myInterests.includes(id) && !["car", "home", "banking"].includes(id),
    );
    for (const id of sharedInterests) {
      const label =
        interestChips.find((chip) => chip.id === id)?.label.toLowerCase() ?? id;
      reasons.push(`Same thought: ${label}`);
      score += 2;
    }

    for (const id of sharedThoughts) {
      if (
        reasons.some((line) =>
          line.toLowerCase().includes(thoughtLabel(id).toLowerCase()),
        )
      ) {
        continue;
      }
      reasons.push(`Like-minded: ${thoughtLabel(id).toLowerCase()}`);
      score += 1;
    }

    if (score < 2 && !(score === 1 && person.matchPool)) continue;
    if (!reasons.length) continue;

    ranked.push({
      member: person,
      why: reasons[0],
      thoughts: sharedThoughts,
      score,
    });
  }

  return ranked.sort((a, b) => b.score - a.score || a.member.name.localeCompare(b.member.name));
}

export function mindFilters(people: MindPerson[]): ThoughtId[] {
  const used = new Set<ThoughtId>();
  for (const person of people) {
    for (const id of person.thoughts) used.add(id);
  }
  return thoughtChips.map((chip) => chip.id).filter((id) => used.has(id));
}
