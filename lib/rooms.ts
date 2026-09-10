import type { PlanId } from "@/lib/plans";
import { hasSupabase, supabasePublic } from "@/lib/supabase";

export type HouseGroup = {
  id: string;
  handle: string;
  name: string;
  description: string;
  emoji: string;
  planId: PlanId;
};

export type HouseMessage = {
  id: string;
  groupId: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

const STORE = "soulhause-rooms-v2";

export const SEED_GROUPS: HouseGroup[] = [
  {
    id: "general",
    handle: "general",
    name: "General",
    emoji: "👋",
    description: "The open room. How you got here, who you are.",
    planId: "member",
  },
  {
    id: "tech-jobs",
    handle: "tech-jobs",
    name: "Tech jobs",
    emoji: "💼",
    description: "Roles, leads, and I’m looking.",
    planId: "member",
  },
  {
    id: "tech-resources",
    handle: "tech-resources",
    name: "Tech resources",
    emoji: "📚",
    description: "Tools, posts, things that helped.",
    planId: "member",
  },
  {
    id: "linkedin-drop",
    handle: "linkedin-drop",
    name: "LinkedIn drop",
    emoji: "🔗",
    description: "Drop LinkedIn. Find people to connect with.",
    planId: "member",
  },
  {
    id: "showcase",
    handle: "showcase",
    name: "Showcase",
    emoji: "✨",
    description: "What you made. No soliciting.",
    planId: "member",
  },
  {
    id: "thoughts",
    handle: "thoughts",
    name: "Thoughts",
    emoji: "💭",
    description: "Thinking out loud.",
    planId: "member",
  },
];

const SEED_MESSAGES: HouseMessage[] = [
  {
    id: "m1",
    groupId: "general",
    authorId: "khalif",
    authorName: "Khalif",
    body: "This is general. Say how you got here.",
    createdAt: "2026-09-10T14:00:00.000Z",
  },
  {
    id: "m2",
    groupId: "general",
    authorId: "nia",
    authorName: "Nia",
    body: "First month in. Looking for other career-switchers.",
    createdAt: "2026-09-10T14:08:00.000Z",
  },
  {
    id: "m3",
    groupId: "tech-jobs",
    authorId: "jordan",
    authorName: "Jordan",
    body: "Anyone seen a junior security role that isn’t a 12-tool wishlist?",
    createdAt: "2026-09-10T14:21:00.000Z",
  },
  {
    id: "m4",
    groupId: "tech-resources",
    authorId: "sam",
    authorName: "Sam",
    body: "If you only read one thing this week: how people actually get referred.",
    createdAt: "2026-09-10T15:02:00.000Z",
  },
  {
    id: "m5",
    groupId: "linkedin-drop",
    authorId: "khalif",
    authorName: "Khalif",
    body: "Drop your LinkedIn. That’s the point of this room.",
    createdAt: "2026-09-10T15:10:00.000Z",
  },
  {
    id: "m6",
    groupId: "showcase",
    authorId: "nia",
    authorName: "Nia",
    body: "Shipped a small tool for my last class. No pitch — just proud it’s live.",
    createdAt: "2026-09-10T15:18:00.000Z",
  },
  {
    id: "m7",
    groupId: "thoughts",
    authorId: "jordan",
    authorName: "Jordan",
    body: "The night works when nobody is trying to collect people.",
    createdAt: "2026-09-10T15:26:00.000Z",
  },
];

type LocalStore = {
  groups: HouseGroup[];
  messages: HouseMessage[];
};

function readLocal(): LocalStore {
  if (typeof window === "undefined") {
    return { groups: SEED_GROUPS, messages: SEED_MESSAGES };
  }
  try {
    const raw = window.localStorage.getItem(STORE);
    if (!raw) return { groups: SEED_GROUPS, messages: SEED_MESSAGES };
    const parsed = JSON.parse(raw) as LocalStore;
    const messages = parsed.messages?.length ? parsed.messages : SEED_MESSAGES;
    return { groups: SEED_GROUPS, messages };
  } catch {
    return { groups: SEED_GROUPS, messages: SEED_MESSAGES };
  }
}

function writeLocal(store: LocalStore) {
  window.localStorage.setItem(STORE, JSON.stringify(store));
}

export function canUseGroup(planId: PlanId | undefined, group: HouseGroup) {
  if (group.planId === "member") return true;
  return planId === "circle";
}

export async function listGroups(): Promise<HouseGroup[]> {
  const db = supabasePublic();
  if (hasSupabase() && db) {
    const { data, error } = await db
      .from("groups")
      .select("id, name, description, plan_id")
      .order("created_at", { ascending: true });
    if (error || !data) return readLocal().groups;
    return data.map((row) => {
      const seed = SEED_GROUPS.find((group) => group.id === row.id || group.handle === row.name);
      return {
        id: row.id,
        handle: seed?.handle ?? row.id,
        name: row.name,
        description: row.description ?? seed?.description ?? "",
        emoji: seed?.emoji ?? "💬",
        planId: (row.plan_id as PlanId) ?? "member",
      };
    });
  }
  return readLocal().groups;
}

export async function listMessages(groupId: string): Promise<HouseMessage[]> {
  const db = supabasePublic();
  if (hasSupabase() && db) {
    const { data, error } = await db
      .from("messages")
      .select("id, group_id, profile_id, body, created_at, profiles(name)")
      .eq("group_id", groupId)
      .order("created_at", { ascending: true });
    if (error || !data) return readLocal().messages.filter((item) => item.groupId === groupId);
    return data.map((row) => {
      const profile = row.profiles as { name?: string } | { name?: string }[] | null;
      const name = Array.isArray(profile) ? profile[0]?.name : profile?.name;
      return {
        id: row.id,
        groupId: row.group_id,
        authorId: row.profile_id,
        authorName: name ?? "Member",
        body: row.body,
        createdAt: row.created_at,
      };
    });
  }
  return readLocal().messages.filter((item) => item.groupId === groupId);
}

export async function sendMessage(input: {
  groupId: string;
  authorId: string;
  authorName: string;
  body: string;
}): Promise<HouseMessage> {
  const text = input.body.trim();
  const next: HouseMessage = {
    id: `local-${Date.now()}`,
    groupId: input.groupId,
    authorId: input.authorId,
    authorName: input.authorName,
    body: text,
    createdAt: new Date().toISOString(),
  };

  const db = supabasePublic();
  if (hasSupabase() && db) {
    const { data, error } = await db
      .from("messages")
      .insert({
        group_id: input.groupId,
        profile_id: input.authorId,
        body: text,
      })
      .select("id, group_id, profile_id, body, created_at")
      .single();
    if (!error && data) {
      return {
        id: data.id,
        groupId: data.group_id,
        authorId: data.profile_id,
        authorName: input.authorName,
        body: data.body,
        createdAt: data.created_at,
      };
    }
  }

  const store = readLocal();
  store.messages = [...store.messages, next];
  writeLocal(store);
  return next;
}

export function watchMessages(
  groupId: string,
  onMessage: (message: HouseMessage) => void,
) {
  const db = supabasePublic();
  if (!hasSupabase() || !db) return () => undefined;

  const channel = db
    .channel(`room:${groupId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `group_id=eq.${groupId}`,
      },
      (payload) => {
        const row = payload.new as {
          id: string;
          group_id: string;
          profile_id: string;
          body: string;
          created_at: string;
        };
        onMessage({
          id: row.id,
          groupId: row.group_id,
          authorId: row.profile_id,
          authorName: "Member",
          body: row.body,
          createdAt: row.created_at,
        });
      },
    )
    .subscribe();

  return () => {
    void db.removeChannel(channel);
  };
}
