"use client";

import { useEffect, useState } from "react";
import { lookingChips, type LookingId } from "@/lib/intents";
import type { Member } from "@/lib/members";
import {
  addComment,
  addPost,
  COMMENT_MAX,
  POST_MAX,
  postKinds,
  readFeed,
  removePost,
  seedDemoFeed,
  tagLabel,
  visibleFeed,
  type FeedPost,
  type PostKind,
} from "@/lib/feed";

export function HauseFeed({
  mine,
  looking,
}: {
  mine: Member;
  looking: LookingId[];
}) {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<LookingId | "all">("all");
  const [kind, setKind] = useState<PostKind>("job");
  const [tag, setTag] = useState<LookingId>(looking[0] ?? "dev-job");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [board, setBoard] = useState<PostKind | "all">("all");

  useEffect(() => {
    let list = readFeed();
    if (!list.length) list = seedDemoFeed();
    setPosts(list);
    setReady(true);
  }, [mine.id]);

  useEffect(() => {
    if (looking.length && !looking.includes(tag)) setTag(looking[0]);
  }, [looking, tag]);

  const visible = visibleFeed(posts, looking, mine.id);
  const byKind =
    board === "all" ? visible : visible.filter((post) => post.kind === board);
  const shown =
    filter === "all" ? byKind : byKind.filter((post) => post.tag === filter);
  const filters = lookingChips
    .map((chip) => chip.id)
    .filter((id) => byKind.some((post) => post.tag === id));

  const placeholders: Record<PostKind, string> = {
    job: "Hiring a frontend developer. Remote, first engineer…",
    looking: "Looking for a first developer role / a cyber crew…",
    resource: "Sharing a free intro path, a doc, a workshop…",
  };

  function publish() {
    const result = addPost(posts, {
      authorId: mine.id,
      authorName: mine.name,
      authorRole: mine.role,
      authorLink: mine.link,
      kind,
      tag,
      body,
    });
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setPosts(result);
    setBody("");
    setError("");
    setBoard(kind);
    setFilter("all");
  }

  if (!ready) return <div className="mt-8 min-h-40" />;

  return (
    <div className="mt-6">
      <form
        className="feed-composer"
        onSubmit={(event) => {
          event.preventDefault();
          publish();
        }}
      >
        <p className="kicker">Submit</p>
        <p className="mt-1 text-sm leading-6 text-muted">
          A job, what you’re looking for, or a resource. It goes on the board
          for people with that tag.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {postKinds.map((item) => (
            <button
              key={item.id}
              type="button"
              className="chip"
              aria-pressed={kind === item.id}
              onClick={() => setKind(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {lookingChips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="chip"
              aria-pressed={tag === chip.id}
              onClick={() => setTag(chip.id)}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <textarea
          className="field mt-3 min-h-24"
          maxLength={POST_MAX}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder={placeholders[kind]}
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-sm text-muted">
            {body.trim().length}/{POST_MAX}
          </span>
          <button type="submit" className="ctl ctl-save" disabled={body.trim().length < 8}>
            Put it on the board
          </button>
        </div>
        {error ? <p className="mt-2 text-sm text-muted">{error}</p> : null}
      </form>

      <p className="kicker mt-8">On the board</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="chip"
          aria-pressed={board === "all"}
          onClick={() => setBoard("all")}
        >
          All
        </button>
        {postKinds.map((item) => (
          <button
            key={item.id}
            type="button"
            className="chip"
            aria-pressed={board === item.id}
            onClick={() => setBoard(item.id)}
          >
            {item.id === "job"
              ? "Jobs"
              : item.id === "resource"
                ? "Resources"
                : "Looking"}
          </button>
        ))}
      </div>

      {filters.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="chip"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Your wavelength
          </button>
          {filters.map((id) => (
            <button
              key={id}
              type="button"
              className="chip"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {tagLabel(id)}
            </button>
          ))}
        </div>
      ) : null}

      {shown.length === 0 ? (
        <p className="mt-6 text-sm leading-6 text-muted">
          Nothing on the board for this yet. Submit one above.
        </p>
      ) : (
        <ul className="mt-5 grid gap-3">
          {shown.map((post) => (
            <li key={post.id}>
              <FeedCard
                post={post}
                mine={mine}
                open={openId === post.id}
                onToggle={() =>
                  setOpenId((id) => (id === post.id ? null : post.id))
                }
                onDelete={() => {
                  setPosts(removePost(posts, post.id, mine.id));
                }}
                onComment={(text) => {
                  const result = addComment(posts, post.id, {
                    authorId: mine.id,
                    authorName: mine.name,
                    body: text,
                  });
                  if ("error" in result) {
                    setError(result.error);
                    return false;
                  }
                  setPosts(result);
                  setError("");
                  return true;
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FeedCard({
  post,
  mine,
  open,
  onToggle,
  onDelete,
  onComment,
}: {
  post: FeedPost;
  mine: Member;
  open: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onComment: (text: string) => boolean;
}) {
  const [reply, setReply] = useState("");
  const kindLabel = postKinds.find((item) => item.id === post.kind)?.label ?? post.kind;
  const isYou = post.authorId === mine.id;

  return (
    <article className="feed-post">
      <p className="kicker">
        {kindLabel} · {tagLabel(post.tag)}
      </p>
      <p className="mt-2 text-[15px] leading-6">{post.body}</p>
      <p className="mt-3 text-sm text-muted">
        {isYou ? "You" : post.authorName} · {post.authorRole}
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a
          className="ctl-quiet"
          href={post.authorLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <button type="button" className="ctl-quiet" onClick={onToggle}>
          {post.comments.length
            ? `${post.comments.length} ${post.comments.length === 1 ? "reply" : "replies"}`
            : "Reply"}
        </button>
        {isYou ? (
          <button type="button" className="ctl-quiet" onClick={onDelete}>
            Remove
          </button>
        ) : null}
      </div>
      {open ? (
        <div className="mt-4">
          {post.comments.length ? (
            <ul className="grid gap-3">
              {post.comments.map((item) => (
                <li key={item.id} className="feed-comment">
                  <p className="text-sm font-semibold">
                    {item.authorId === mine.id ? "You" : item.authorName}
                  </p>
                  <p className="mt-1 text-sm leading-6">{item.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">No replies yet. Keep it useful.</p>
          )}
          <form
            className="mt-3 flex flex-col gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (onComment(reply)) setReply("");
            }}
          >
            <input
              className="field"
              maxLength={COMMENT_MAX}
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              placeholder="A short reply"
            />
            <button
              type="submit"
              className="ctl ctl-secondary self-start"
              disabled={reply.trim().length < 2}
            >
              Reply
            </button>
          </form>
        </div>
      ) : null}
    </article>
  );
}
