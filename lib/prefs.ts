import type { Role } from "@/lib/events";
import type { InterestId } from "@/lib/intents";
import type { Member } from "@/lib/members";

const TASTE = "soulhause-taste-v2";
const SAVED = "soulhause-saved-v1";
const RSVP = "soulhause-rsvp-v1";
const HINT = "soulhause-hint-v1";
const PROFILE = "soulhause-profile-v1";
const FOLLOW = "soulhause-follow-v1";
const INSTALL = "soulhause-install-seen-v1";
const GOING = "soulhause-going-v1";
const DEMO = "soulhause-demo-role-v1";
const SEEK = "soulhause-seek-ok-v1";

export type Going = {
  id: string;
  eventId: string;
  name: string;
  link: string;
};

export type Pulse = {
  eventId: string;
  room: "great" | "ok" | "meh" | null;
  again: boolean | null;
  nextHost: string;
};

export type Intro = {
  toId: string;
  toName: string;
  note: string;
};

const GUESTS = "soulhause-guests-v1";
const INTROS = "soulhause-intros-v1";
const INTENTS = "soulhause-intents-v1";
const PULSE = "soulhause-pulse-v1";
const WENT = "soulhause-went-v1";

export type Taste = {
  roles: Role[];
};

export type DemoRole = "admin" | "member";

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, ids: string[]) {
  window.localStorage.setItem(key, JSON.stringify(ids));
}

export function readTaste(): Taste | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(TASTE);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Taste;
    if (!parsed.roles?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeTaste(taste: Taste) {
  window.localStorage.setItem(TASTE, JSON.stringify(taste));
}

export function readSaved() {
  return readList(SAVED);
}

export function writeSaved(ids: string[]) {
  writeList(SAVED, ids);
}

export function readRsvp() {
  return readList(RSVP);
}

export function writeRsvp(ids: string[]) {
  writeList(RSVP, ids);
}

export function readHintSeen() {
  return typeof window !== "undefined" && window.localStorage.getItem(HINT) === "1";
}

export function writeHintSeen() {
  window.localStorage.setItem(HINT, "1");
}

export function readProfile(): Member | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PROFILE);
    return raw ? (JSON.parse(raw) as Member) : null;
  } catch {
    return null;
  }
}

export function writeProfile(member: Member) {
  window.localStorage.setItem(PROFILE, JSON.stringify(member));
}

export function readFollow() {
  return readList(FOLLOW);
}

export function writeFollow(ids: string[]) {
  writeList(FOLLOW, ids);
}

export function readInstallSeen() {
  return (
    typeof window !== "undefined" &&
    window.localStorage.getItem(INSTALL) === "1"
  );
}

export function writeInstallSeen() {
  window.localStorage.setItem(INSTALL, "1");
}

export function readGoing(): Going[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GOING);
    return raw ? (JSON.parse(raw) as Going[]) : [];
  } catch {
    return [];
  }
}

export function writeGoing(people: Going[]) {
  window.localStorage.setItem(GOING, JSON.stringify(people));
}

export function readIntents(): InterestId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(INTENTS);
    return raw ? (JSON.parse(raw) as InterestId[]) : [];
  } catch {
    return [];
  }
}

export function writeIntents(ids: InterestId[]) {
  window.localStorage.setItem(INTENTS, JSON.stringify(ids));
}

export function readPulses(): Pulse[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PULSE);
    return raw ? (JSON.parse(raw) as Pulse[]) : [];
  } catch {
    return [];
  }
}

export function writePulses(pulses: Pulse[]) {
  window.localStorage.setItem(PULSE, JSON.stringify(pulses));
}

export function readWent() {
  return readList(WENT);
}

export function writeWent(ids: string[]) {
  writeList(WENT, ids);
}

export function readIntros(): Intro[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(INTROS);
    return raw ? (JSON.parse(raw) as Intro[]) : [];
  } catch {
    return [];
  }
}

export function writeIntros(intros: Intro[]) {
  window.localStorage.setItem(INTROS, JSON.stringify(intros));
}

export function readDemoRole(): DemoRole | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(DEMO);
  return raw === "admin" || raw === "member" ? raw : null;
}

export function writeDemoRole(role: DemoRole) {
  window.localStorage.setItem(DEMO, role);
}

export function readSeekConfirmed() {
  return (
    typeof window !== "undefined" &&
    window.localStorage.getItem(SEEK) === "1"
  );
}

export function writeSeekConfirmed(on: boolean) {
  if (on) window.localStorage.setItem(SEEK, "1");
  else window.localStorage.removeItem(SEEK);
}

export function clearMemberAccount() {
  window.localStorage.removeItem(PROFILE);
  window.localStorage.removeItem(DEMO);
  window.localStorage.removeItem(FOLLOW);
  window.localStorage.removeItem(SEEK);
}

export function readGuests(): Member[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GUESTS);
    return raw ? (JSON.parse(raw) as Member[]) : [];
  } catch {
    return [];
  }
}

export function writeGuests(members: Member[]) {
  window.localStorage.setItem(GUESTS, JSON.stringify(members));
}

export function upsertGuest(member: Member) {
  const rest = readGuests().filter((item) => item.id !== member.id);
  writeGuests([...rest, member]);
}

export function approveGuest(id: string) {
  const guests = readGuests().map((member) =>
    member.id === id ? { ...member, status: "approved" as const } : member,
  );
  writeGuests(guests);
  const mine = readProfile();
  if (mine?.id === id) writeProfile({ ...mine, status: "approved" });
  return guests;
}
