import { lookingChips, type LookingId } from "@/lib/intents";
import { houseMembers } from "@/lib/members";

export type PostKind = "looking" | "job" | "resource";

export type FeedComment = {
  id: string;
  authorId: string;
  authorName: string;
  body: string;
  at: number;
};

export type FeedPost = {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorLink: string;
  kind: PostKind;
  tag: LookingId;
  body: string;
  at: number;
  comments: FeedComment[];
};

const FEED = "soulhause-feed-v1";
export const POST_MAX = 200;
export const COMMENT_MAX = 120;
export const POSTS_PER_PERSON = 2;
export const COMMENTS_PER_POST = 8;

export const postKinds: { id: PostKind; label: string }[] = [
  { id: "job", label: "Job" },
  { id: "looking", label: "Looking" },
  { id: "resource", label: "Resource" },
];

export function tagLabel(id: LookingId) {
  return lookingChips.find((chip) => chip.id === id)?.label ?? id;
}

export function readFeed(): FeedPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FEED);
    const parsed = raw ? (JSON.parse(raw) as FeedPost[]) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((post) =>
      (post as { kind: string }).kind === "offering"
        ? { ...post, kind: "job" as const }
        : post,
    );
  } catch {
    return [];
  }
}

export function writeFeed(posts: FeedPost[]) {
  window.localStorage.setItem(FEED, JSON.stringify(posts));
}

export function seedDemoFeed() {
  const byId = Object.fromEntries(houseMembers.map((member) => [member.id, member]));
  const base = 1_725_800_000_000;
  const posts: FeedPost[] = [
    makePost(byId.sam, "job", "dev-job", "Hiring a first frontend developer for a clinic scheduling tool. Remote OK.", base + 50),
    makePost(byId.nia, "looking", "dev-job", "Looking for a first developer role. Hospitality ops → frontend.", base + 40),
    makePost(byId.jordan, "looking", "cyber-crew", "Looking for a cyber crew — detection work, career-changers welcome.", base + 30),
    makePost(byId.jordan, "resource", "resources", "Sharing a free intro-to-SIEM path I use with mentees. Ask if you want the list.", base + 28, [
      comment(byId.nia, "Yes please — that’s exactly what I need.", base + 29),
    ]),
    makePost(byId.priya, "looking", "founders", "Looking to meet founders in healthcare / civic. Angel checks, not a spray.", base + 20),
    makePost(byId.riley, "looking", "ai", "Looking to meet people who love AI + civic hack nights.", base + 10),
    makePost(byId.khalif, "resource", "collab", "Tech After Dark — rooms and a crew, not a pitch cage. Register on Luma.", base + 5),
  ].filter((item): item is FeedPost => Boolean(item));
  writeFeed(posts);
  return posts;
}

export function visibleFeed(posts: FeedPost[], looking: LookingId[], selfId?: string) {
  if (!looking.length) {
    return [...posts].sort(byTime);
  }
  return posts
    .filter(
      (post) =>
        post.authorId === selfId ||
        looking.includes(post.tag),
    )
    .sort(byTime);
}

export function addPost(
  posts: FeedPost[],
  next: Omit<FeedPost, "id" | "at" | "comments">,
): FeedPost[] | { error: string } {
  const body = next.body.trim();
  if (body.length < 8) return { error: "A little more context — one sentence is enough." };
  if (body.length > POST_MAX) return { error: `Keep it under ${POST_MAX} characters.` };
  const mine = posts.filter((post) => post.authorId === next.authorId);
  if (mine.length >= POSTS_PER_PERSON) {
    return { error: "Two live listings at a time. Remove one first." };
  }
  const post: FeedPost = {
    ...next,
    body,
    id: `post-${Date.now()}`,
    at: Date.now(),
    comments: [],
  };
  const list = [post, ...posts];
  writeFeed(list);
  return list;
}

export function removePost(posts: FeedPost[], id: string, authorId: string) {
  const list = posts.filter(
    (post) => !(post.id === id && post.authorId === authorId),
  );
  writeFeed(list);
  return list;
}

export function addComment(
  posts: FeedPost[],
  postId: string,
  comment: Omit<FeedComment, "id" | "at">,
): FeedPost[] | { error: string } {
  const body = comment.body.trim();
  if (body.length < 2) return { error: "Say a little more." };
  if (body.length > COMMENT_MAX) {
    return { error: `Keep replies under ${COMMENT_MAX} characters.` };
  }
  const current = posts.find((post) => post.id === postId);
  if (!current) return { error: "That post is gone." };
  if (current.comments.length >= COMMENTS_PER_POST) {
    return { error: "This thread is full. Keep it in the room or on LinkedIn." };
  }
  const list = posts.map((post) =>
    post.id === postId
      ? {
          ...post,
          comments: [
            ...post.comments,
            { ...comment, body, id: `c-${Date.now()}`, at: Date.now() },
          ],
        }
      : post,
  );
  writeFeed(list);
  return list;
}

function byTime(a: FeedPost, b: FeedPost) {
  return b.at - a.at;
}

function makePost(
  member: (typeof houseMembers)[number] | undefined,
  kind: PostKind,
  tag: LookingId,
  body: string,
  at: number,
  comments: FeedComment[] = [],
): FeedPost | null {
  if (!member) return null;
  return {
    id: `seed-${member.id}-${tag}-${at}`,
    authorId: member.id,
    authorName: member.name,
    authorRole: member.role,
    authorLink: member.link,
    kind,
    tag,
    body,
    at,
    comments,
  };
}

function comment(
  member: (typeof houseMembers)[number] | undefined,
  body: string,
  at: number,
): FeedComment {
  return {
    id: `seed-c-${at}`,
    authorId: member?.id ?? "anon",
    authorName: member?.name ?? "Guest",
    body,
    at,
  };
}
