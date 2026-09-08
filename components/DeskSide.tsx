"use client";

import { lookingChips } from "@/lib/intents";
import type { EventItem } from "@/lib/events";
import type { Member } from "@/lib/members";

export function DeskSide({
  screen,
  night,
  live,
  mine,
  following,
  hereCount,
  boardCount,
  onOpenHere,
}: {
  screen: string;
  night: EventItem | undefined;
  live: boolean;
  mine: Member;
  following: number;
  hereCount: number;
  boardCount: number;
  onOpenHere: () => void;
}) {
  const looking =
    mine.lookingIds
      ?.map((id) => lookingChips.find((chip) => chip.id === id)?.label)
      .filter((label): label is string => Boolean(label)) ?? [];
  const onEvents = screen === "nights";

  return (
    <aside className="app-dash" aria-label="Dashboard">
      <article className="dash-card">
        <p className="kicker">Tonight</p>
        {onEvents ? (
          <>
            <p className="dash-title">Doors</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {live
                ? "Doors are open."
                : night
                  ? `Who’s here opens at ${night.time}.`
                  : "Who’s here opens when the night starts."}
            </p>
          </>
        ) : (
          <>
            <p className="dash-title">
              {night?.title.split(":")[0] ?? "Hause of Soul"}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {night ? `${night.date} · ${night.time}` : "Next night soon"}
              <br />
              {live
                ? "Doors are open."
                : night
                  ? `Who’s here opens at ${night.time}.`
                  : "Who’s here opens when the night starts."}
            </p>
            {night ? (
              <a
                className="ctl-quiet mt-3 self-start"
                href={night.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register
              </a>
            ) : null}
          </>
        )}
        {live ? (
          <button type="button" className="ctl-quiet self-start" onClick={onOpenHere}>
            Who’s here
          </button>
        ) : null}
      </article>

      <article className="dash-card">
        <p className="kicker">Room</p>
        <dl className="dash-stats">
          <div>
            <dt>Checked in</dt>
            <dd>{hereCount}</dd>
          </div>
          <div>
            <dt>On the board</dt>
            <dd>{boardCount}</dd>
          </div>
          <div>
            <dt>Following</dt>
            <dd>{following}</dd>
          </div>
        </dl>
      </article>

      <article className="dash-card">
        <p className="kicker">You</p>
        <p className="dash-title">{mine.name.split(" ")[0]}</p>
        <p className="mt-1 text-sm text-muted">
          {mine.role} · {mine.city}
        </p>
        {looking.length ? (
          <p className="mt-3 text-sm leading-6 text-muted">
            Looking for {looking.slice(0, 3).join(", ").toLowerCase()}.
          </p>
        ) : (
          <p className="mt-3 text-sm leading-6 text-muted">
            Set what you’re looking for in The Hause.
          </p>
        )}
      </article>
    </aside>
  );
}
