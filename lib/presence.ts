import { houseMembers, type Member } from "@/lib/members";

export type TonightTag =
  | "hiring"
  | "looking"
  | "investing"
  | "raising"
  | "collab"
  | "learning"
  | "vibe";

export type PresenceVisibility = "board" | "host" | "private";

export type CheckIn = {
  eventId: string;
  memberId: string;
  name: string;
  role: string;
  city: string;
  link: string;
  photo?: string;
  line: string;
  tags: TonightTag[];
  visibility: PresenceVisibility;
  at: number;
};

const CHECKINS = "soulhause-checkins-v1";

export const tonightTags: { id: TonightTag; label: string }[] = [
  { id: "hiring", label: "Hiring" },
  { id: "looking", label: "Looking for work" },
  { id: "investing", label: "Investing" },
  { id: "raising", label: "Raising" },
  { id: "collab", label: "Collaborating" },
  { id: "learning", label: "Learning" },
  { id: "vibe", label: "Just here to vibe" },
];

export const visibilities: { id: PresenceVisibility; label: string; line: string }[] =
  [
    { id: "board", label: "On the board", line: "Anyone in the room can see you." },
    { id: "host", label: "Hosts only", line: "The room won’t see you. Hosts will." },
    { id: "private", label: "Off the board", line: "You’re here. Nobody’s card list is." },
  ];

export function tagLabel(id: TonightTag) {
  return tonightTags.find((tag) => tag.id === id)?.label ?? id;
}

export function defaultTonightTags(member: Member): TonightTag[] {
  const tags: TonightTag[] = [];
  if (member.offerIds?.some((id) => id.startsWith("hiring"))) tags.push("hiring");
  if (
    member.lookingIds?.some(
      (id) => id === "dev-job" || id === "other-job" || id === "gov-role",
    )
  ) {
    tags.push("looking");
  }
  if (member.offerIds?.includes("investing")) tags.push("investing");
  if (member.lookingIds?.includes("investor")) tags.push("raising");
  if (member.lookingIds?.includes("collab") || member.offerIds?.includes("intros")) {
    tags.push("collab");
  }
  if (
    member.lookingIds?.includes("mentor") ||
    member.lookingIds?.includes("cyber-crew") ||
    member.offerIds?.includes("mentoring")
  ) {
    tags.push("learning");
  }
  if (!tags.length) tags.push("vibe");
  return tags;
}

export function defaultTonightLine(member: Member) {
  const extra = member.looking || member.offer;
  if (extra) return `${member.role}. ${extra}`;
  return `${member.role}. Open to the room.`;
}

export function readCheckins(): CheckIn[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CHECKINS);
    return raw ? (JSON.parse(raw) as CheckIn[]) : [];
  } catch {
    return [];
  }
}

export function writeCheckins(items: CheckIn[]) {
  window.localStorage.setItem(CHECKINS, JSON.stringify(items));
}

export function upsertCheckIn(next: CheckIn, all = readCheckins()) {
  const rest = all.filter(
    (item) => !(item.eventId === next.eventId && item.memberId === next.memberId),
  );
  const list = [...rest, next];
  writeCheckins(list);
  return list;
}

export function leaveCheckIn(eventId: string, memberId: string, all = readCheckins()) {
  const list = all.filter(
    (item) => !(item.eventId === eventId && item.memberId === memberId),
  );
  writeCheckins(list);
  return list;
}

export function myCheckIn(eventId: string, memberId: string, all: CheckIn[]) {
  return all.find((item) => item.eventId === eventId && item.memberId === memberId);
}

export function eventCheckins(eventId: string, all: CheckIn[]) {
  return all
    .filter((item) => item.eventId === eventId)
    .sort((a, b) => b.at - a.at);
}

export function visibleCheckins(
  eventId: string,
  all: CheckIn[],
  isHost: boolean,
) {
  return eventCheckins(eventId, all).filter((item) =>
    isHost ? true : item.visibility === "board",
  );
}

export function checkInFromMember(
  eventId: string,
  member: Member,
  extras: Pick<CheckIn, "line" | "tags" | "visibility">,
): CheckIn {
  return {
    eventId,
    memberId: member.id,
    name: member.name,
    role: member.role,
    city: member.city,
    link: member.link,
    photo: member.photo,
    line: extras.line.trim() || defaultTonightLine(member),
    tags: extras.tags.length ? extras.tags : defaultTonightTags(member),
    visibility: extras.visibility,
    at: Date.now(),
  };
}

export function seedDemoCheckins(eventId: string, selfId: string) {
  const samples: CheckIn[] = [
    demoCard(eventId, "jordan", {
      line: "Cyber. Mentoring people moving into security.",
      tags: ["learning", "collab"],
      visibility: "board",
    }),
    demoCard(eventId, "nia", {
      line: "Transitioning. Looking for a first frontend role.",
      tags: ["looking", "learning"],
      visibility: "board",
    }),
    demoCard(eventId, "priya", {
      line: "Investor. Healthcare and civic tools.",
      tags: ["investing"],
      visibility: "board",
    }),
    demoCard(eventId, "sam", {
      line: "Founder. Looking for a technical cofounder.",
      tags: ["raising", "collab"],
      visibility: "host",
    }),
    demoCard(eventId, "riley", {
      line: "Student. Here to learn and meet builders.",
      tags: ["vibe", "learning"],
      visibility: "board",
    }),
  ].filter((item): item is CheckIn => item != null && item.memberId !== selfId);

  writeCheckins(samples);
  return samples;
}

function demoCard(
  eventId: string,
  id: string,
  extras: Pick<CheckIn, "line" | "tags" | "visibility">,
): CheckIn | null {
  const member = houseMembers.find((item) => item.id === id);
  if (!member) return null;
  return checkInFromMember(eventId, member, extras);
}
