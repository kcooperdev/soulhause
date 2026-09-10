"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { HouseAvatar } from "@/components/HouseAvatar";
import { memberById, type Member } from "@/lib/members";
import {
  canUseGroup,
  listGroups,
  listMessages,
  sendMessage,
  watchMessages,
  type HouseGroup,
  type HouseMessage,
} from "@/lib/rooms";

type Pane = "board" | string;

function clock(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function stacked(current: HouseMessage, prior?: HouseMessage) {
  if (!prior) return false;
  if (prior.authorId !== current.authorId) return false;
  return new Date(current.createdAt).getTime() - new Date(prior.createdAt).getTime() < 7 * 60 * 1000;
}

export function HauseGroups({
  mine,
  board,
  start = "list",
}: {
  mine: Member;
  board: ReactNode;
  start?: "list" | "board";
}) {
  const [groups, setGroups] = useState<HouseGroup[]>([]);
  const [pane, setPane] = useState<Pane | null>(start === "board" ? "board" : null);
  const [wide, setWide] = useState(false);
  const [messages, setMessages] = useState<HouseMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const open = groups.find((group) => group.id === pane) ?? null;
  const allowed = open ? canUseGroup(mine.planId, open) : false;
  const onBoard = pane === "board";
  const inRoom = Boolean(open || onBoard);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const apply = () => {
      const desk = mq.matches;
      setWide(desk);
      if (desk) {
        setPane((current) => current ?? (start === "board" ? "board" : "general"));
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [start]);

  useEffect(() => {
    let ignore = false;
    void listGroups().then((list) => {
      if (!ignore) setGroups(list);
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setMessages([]);
      return;
    }
    if (!canUseGroup(mine.planId, open)) {
      setMessages([]);
      return;
    }
    let ignore = false;
    void listMessages(open.id).then((list) => {
      if (!ignore) setMessages(list);
    });
    const stop = watchMessages(open.id, (message) => {
      setMessages((list) =>
        list.some((item) => item.id === message.id) ? list : [...list, message],
      );
    });
    return () => {
      ignore = true;
      stop();
    };
  }, [open, mine.planId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, pane]);

  async function post() {
    if (!open || !allowed || busy) return;
    const body = draft.trim();
    if (!body) return;
    setBusy(true);
    setDraft("");
    if (draftRef.current) draftRef.current.style.height = "";
    const sent = await sendMessage({
      groupId: open.id,
      authorId: mine.id,
      authorName: mine.name.split(" ")[0] ?? mine.name,
      body,
    });
    setMessages((list) =>
      list.some((item) => item.id === sent.id) ? list : [...list, sent],
    );
    setBusy(false);
  }

  function onKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void post();
    }
  }

  return (
    <div className="chat" data-open={inRoom ? "true" : "false"}>
      <aside className="chat-nav" aria-label="Tech Hause rooms">
        <p className="chat-nav-label">Channels</p>
        <ul className="chat-nav-list">
          {groups.map((group) => (
            <li key={group.id}>
              <button
                type="button"
                className="chat-nav-item"
                data-on={pane === group.id ? "true" : "false"}
                aria-current={pane === group.id ? "page" : undefined}
                onClick={() => setPane(group.id)}
              >
                <span className="chat-nav-emoji" aria-hidden>
                  {group.emoji}
                </span>
                <span className="chat-nav-hash" aria-hidden>
                  #
                </span>
                {group.handle}
              </button>
            </li>
          ))}
        </ul>
        <p className="chat-nav-label">House</p>
        <ul className="chat-nav-list">
          <li>
            <button
              type="button"
              className="chat-nav-item"
              data-on={onBoard ? "true" : "false"}
              aria-current={onBoard ? "page" : undefined}
              onClick={() => setPane("board")}
            >
              <span className="chat-nav-emoji" aria-hidden>
                📋
              </span>
              the-board
            </button>
          </li>
        </ul>
      </aside>

      {open ? (
        <section className="chat-room" aria-label={`#${open.handle}`}>
          <header className="chat-head">
            <button type="button" className="chat-back" onClick={() => setPane(null)}>
              Rooms
            </button>
            <h2 className="chat-title">
              <span aria-hidden>{open.emoji}</span>
              <span aria-hidden>#</span>
              {open.handle}
            </h2>
            <p className="chat-topic">{open.description}</p>
          </header>

          {!allowed ? (
            <div className="chat-locked">
              <p>This room opens with Hause.</p>
            </div>
          ) : (
            <>
              <div className="chat-scroll">
                <ol className="chat-thread">
                  {messages.length === 0 ? (
                    <li className="chat-empty">
                      <strong>
                        {open.emoji} #{open.handle}
                      </strong>
                      <p>{open.description}</p>
                    </li>
                  ) : null}
                  {messages.map((item, index) => {
                    const compact = stacked(item, messages[index - 1]);
                    const who = memberById(item.authorId, mine);
                    return (
                      <li key={item.id} data-compact={compact ? "true" : "false"}>
                        {compact ? (
                          <span className="chat-gutter" aria-hidden />
                        ) : (
                          <HouseAvatar name={item.authorName} photo={who?.photo} size={36} />
                        )}
                        <div>
                          {compact ? null : (
                            <p className="chat-meta">
                              <strong>{item.authorName}</strong>
                              <time dateTime={item.createdAt}>{clock(item.createdAt)}</time>
                            </p>
                          )}
                          <p className="chat-body">{item.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
                <div ref={endRef} />
              </div>
              <form
                className="chat-compose"
                onSubmit={(event) => {
                  event.preventDefault();
                  void post();
                }}
              >
                <label className="sr-only" htmlFor="channel-draft">
                  {`Message # ${open.handle}`}
                </label>
                <textarea
                  id="channel-draft"
                  ref={draftRef}
                  className="chat-input"
                  rows={1}
                  value={draft}
                  onChange={(event) => {
                    setDraft(event.target.value);
                    event.target.style.height = "auto";
                    event.target.style.height = `${Math.min(event.target.scrollHeight, 128)}px`;
                  }}
                  onKeyDown={onKey}
                  placeholder={`Message # ${open.handle}`}
                  autoComplete="off"
                />
                <button type="submit" className="chat-send" disabled={busy || !draft.trim()}>
                  Send
                </button>
              </form>
            </>
          )}
        </section>
      ) : onBoard ? (
        <section className="chat-room" aria-label="The board">
          <header className="chat-head">
            <button type="button" className="chat-back" onClick={() => setPane(null)}>
              Rooms
            </button>
            <h2 className="chat-title">
              <span aria-hidden>📋</span>
              the-board
            </h2>
            <p className="chat-topic">Jobs, mentors, crews. Posts you submit — not a chat.</p>
          </header>
          <div className="chat-scroll">{board}</div>
        </section>
      ) : (
        <section className="chat-room chat-room--idle">
          <p>{wide ? "Pick a channel." : ""}</p>
        </section>
      )}
    </div>
  );
}
