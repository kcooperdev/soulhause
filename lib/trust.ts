import type { OfferId } from "@/lib/intents";
import { normalizeLinkedIn, type Member } from "@/lib/members";
import { readGoing } from "@/lib/prefs";

export type TrustStatus = "pending" | "approved";

export const FAMILY_LINE =
  "The Hause is a family — intros, not cold pitches.";

export const MONEY_OFFERS: OfferId[] = [
  "hiring-dev",
  "hiring-other",
  "investing",
];

export function hasLinkedIn(member: Pick<Member, "link">) {
  return Boolean(normalizeLinkedIn(member.link));
}

export function hasMoneyOffer(member: Pick<Member, "offerIds">) {
  return Boolean(member.offerIds?.some((id) => MONEY_OFFERS.includes(id)));
}

export function isApproved(member: Member) {
  return (member.status ?? "approved") === "approved";
}

export function nextTrustStatus(previous: Member | null | undefined, next: Member): TrustStatus {
  if (!previous) return "pending";
  if ((previous.status ?? "approved") === "pending") return "pending";
  if (hasMoneyOffer(next) && !hasMoneyOffer(previous)) return "pending";
  return previous.status ?? "approved";
}

export function inTheRoom(id: string) {
  return readGoing().some((person) => person.id === id);
}
