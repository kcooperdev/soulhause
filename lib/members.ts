import type { InterestId, LookingId, OfferId } from "@/lib/intents";
import type { PlanId } from "@/lib/plans";

export type Socials = {
  instagram?: string;
  x?: string;
  github?: string;
  site?: string;
};

export type HouseFieldId =
  | "ai"
  | "cyber"
  | "engineering"
  | "founders"
  | "career"
  | "product";

export const houseFields: { id: HouseFieldId; label: string }[] = [
  { id: "ai", label: "AI" },
  { id: "cyber", label: "Cyber" },
  { id: "engineering", label: "Engineering" },
  { id: "founders", label: "Founders" },
  { id: "career", label: "Career change" },
  { id: "product", label: "Product" },
];

export type Member = {
  id: string;
  name: string;
  role: string;
  building: string;
  city: string;
  link: string;
  sample?: boolean;
  status?: "pending" | "approved";
  interests?: InterestId[];
  lookingIds?: LookingId[];
  offerIds?: OfferId[];
  fields?: HouseFieldId[];
  offer?: string;
  looking?: string;
  socials?: Socials;
  matchPool?: boolean;
  photo?: string;
  planId?: PlanId;
};

export const ADMIN_ID = "khalif";
export const MEMBER_ID = "nia";

export const houseMembers: Member[] = [
  {
    id: ADMIN_ID,
    name: "Khalif Cooper",
    role: "Founder",
    building: "SoulHause — rooms and tools with soul",
    city: "Laurel, MD",
    link: "https://www.linkedin.com/in/kcooperdev",
    offerIds: ["intros", "mentoring"],
    lookingIds: ["collab", "founders", "ai"],
    fields: ["founders", "ai", "product"],
    offer: "Intros, rooms, and a monthly happy hour",
    status: "approved",
    matchPool: true,
    interests: ["learning", "hiring", "tools"],
    socials: { site: "https://soulhause.com" },
  },
  {
    id: MEMBER_ID,
    name: "Nia Brooks",
    role: "Transitioning",
    building: "Moving from hospitality ops into frontend",
    city: "Baltimore, MD",
    link: "https://www.linkedin.com/in/demo-nia-brooks",
    lookingIds: ["dev-job", "mentor"],
    fields: ["career", "engineering"],
    looking: "A first developer role and a career-change mentor",
    status: "approved",
    interests: ["learning", "car"],
    socials: { github: "https://github.com/demo-nia", x: "https://x.com/demo_nia" },
  },
  {
    id: "jordan",
    name: "Jordan Hale",
    role: "Cyber",
    building: "Detection work for mid-size orgs",
    city: "Arlington, VA",
    link: "https://www.linkedin.com/in/demo-jordan-hale",
    offerIds: ["mentoring", "cyber-gov"],
    lookingIds: ["cyber-crew"],
    fields: ["cyber"],
    offer: "Mentoring career-changers into cyber",
    status: "approved",
    matchPool: true,
    interests: ["learning"],
    socials: { github: "https://github.com/demo-jordan" },
  },
  {
    id: "sam",
    name: "Sam Okonkwo",
    role: "Founder",
    building: "A scheduling tool for clinics",
    city: "Baltimore, MD",
    link: "https://www.linkedin.com/in/demo-sam-okonkwo",
    lookingIds: ["investor", "dev-job", "founders"],
    offerIds: ["hiring-dev"],
    fields: ["founders", "engineering"],
    looking: "Pre-seed investors",
    offer: "Hiring a first developer",
    status: "approved",
    matchPool: true,
    socials: { site: "https://soulhause.com" },
  },
  {
    id: "priya",
    name: "Priya Shah",
    role: "Investor",
    building: "Angel checks into operators building with soul",
    city: "Washington, DC",
    link: "https://www.linkedin.com/in/demo-priya-shah",
    offerIds: ["investing", "intros"],
    lookingIds: ["founders"],
    fields: ["founders"],
    offer: "Introductions and a few angel checks",
    status: "approved",
    matchPool: true,
    interests: ["hiring"],
    socials: { x: "https://x.com/demo_priya" },
  },
  {
    id: "riley",
    name: "Riley Chen",
    role: "Student",
    building: "CS, civic hack nights",
    city: "College Park, MD",
    link: "https://www.linkedin.com/in/demo-riley-chen",
    lookingIds: ["collab", "gov-role", "ai"],
    fields: ["ai", "engineering"],
    looking: "A gov-tech internship or a collab",
    status: "approved",
    matchPool: true,
    interests: ["learning", "tools"],
    socials: { github: "https://github.com/demo-riley", instagram: "https://instagram.com/demo.riley" },
  },
];

export const pendingDemoMember: Member = {
  id: "casey",
  name: "Casey Vale",
  role: "Founder",
  building: "A payroll tool for small crews",
  city: "Nairobi",
  link: "https://www.linkedin.com/in/demo-casey-vale",
  offerIds: ["hiring-dev", "investing"],
  offer: "Hiring a developer and raising a small round",
  status: "pending",
};

export function memberById(id: string, mine?: Member | null, guests: Member[] = []) {
  if (mine?.id === id) return mine;
  const guest = guests.find((member) => member.id === id);
  if (guest) return guest;
  return houseMembers.find((member) => member.id === id) ?? null;
}

export function withYou(member: Member): Member {
  return { ...member, id: member.id };
}

export function normalizeLinkedIn(raw: string): string | null {
  return normalizeHosted(raw, ["linkedin.com"]);
}

export function normalizeHandle(
  raw: string,
  kind: keyof Socials,
): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (kind === "site") return normalizeHosted(trimmed);
  if (kind === "github") {
    if (trimmed.startsWith("@") || !trimmed.includes(".")) {
      return `https://github.com/${trimmed.replace(/^@/, "")}`;
    }
    return normalizeHosted(trimmed, ["github.com"]);
  }
  if (kind === "instagram") {
    if (trimmed.startsWith("@") || !trimmed.includes(".")) {
      return `https://www.instagram.com/${trimmed.replace(/^@/, "")}`;
    }
    return normalizeHosted(trimmed, ["instagram.com"]);
  }
  if (kind === "x") {
    if (trimmed.startsWith("@") || !trimmed.includes(".")) {
      return `https://x.com/${trimmed.replace(/^@/, "")}`;
    }
    return normalizeHosted(trimmed, ["x.com", "twitter.com"]);
  }
  return null;
}

function normalizeHosted(raw: string, hosts?: string[]) {
  const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withProto);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (hosts && !hosts.some((item) => host === item || host.endsWith(`.${item}`))) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

export function hasOpportunity(member: Member) {
  return Boolean(
    member.offer?.trim() ||
      member.looking?.trim() ||
      member.offerIds?.length ||
      member.lookingIds?.length,
  );
}

export function socialLinks(member: Member) {
  const links: { label: string; href: string }[] = [];
  if (member.link) links.push({ label: "LinkedIn", href: member.link });
  if (member.socials?.site) links.push({ label: "Site", href: member.socials.site });
  if (member.socials?.github) links.push({ label: "GitHub", href: member.socials.github });
  if (member.socials?.instagram) {
    links.push({ label: "Instagram", href: member.socials.instagram });
  }
  if (member.socials?.x) links.push({ label: "X", href: member.socials.x });
  return links;
}

export function connectHref(member: Member) {
  return socialLinks(member)[0]?.href ?? member.link;
}
