"use client";

import { lookingChips } from "@/lib/intents";
import type { EventItem } from "@/lib/events";
import type { Member } from "@/lib/members";

export function DeskSide({
  screen,
  night,
  mine,
  following,
  houseCount,
}: {
  screen: string;
  night: EventItem | undefined;
  mine: Member;
  following: number;
  houseCount: number;
}) {
  const looking =
    mine.lookingIds
      ?.map((id) => lookingChips.find((chip) => chip.id === id)?.label)
      .filter((label): label is string => Boolean(label)) ?? [];
  const onEvents = screen === "nights";

  return (
    <aside className="app-dash" aria-label="Dashboard">
      <article className="dash-card">
        <p className="kicker">Next night</p>
        {onEvents ? (
          <>
            <p className="dash-title">{night ? night.date : "Soon"}</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {night
                ? `${night.time} · ${night.venue}`
                : "The next Tech After Dark lands on Luma when it’s ready."}
            </p>
          </>
        ) : (
          <>
            <p className="dash-title">
              {night?.title.split(":")[0] ?? "Tech After Dark"}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {night ? `${night.date} · ${night.time}` : "Next night soon"}
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
      </article>

      <article className="dash-card">
        <p className="kicker">House</p>
        <dl className="dash-stats">
          <div>
            <dt>In the house</dt>
            <dd>{houseCount}</dd>
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
            Set what you’re looking for on Me.
          </p>
        )}
      </article>
    </aside>
  );
}
