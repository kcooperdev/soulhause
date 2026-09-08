"use client";

import { useState } from "react";
import { HouseAvatar } from "@/components/HouseAvatar";
import { connectHref, type Member } from "@/lib/members";
import {
  defaultTonightLine,
  defaultTonightTags,
  myCheckIn,
  tagLabel,
  tonightTags,
  visibleCheckins,
  visibilities,
  type CheckIn,
  type PresenceVisibility,
  type TonightTag,
} from "@/lib/presence";

export function PresencePanel({
  eventId,
  eventTitle,
  mine,
  isHost,
  checkins,
  follow,
  onSave,
  onLeave,
  onKeep,
  onOpen,
}: {
  eventId: string;
  eventTitle: string;
  mine: Member;
  isHost: boolean;
  checkins: CheckIn[];
  follow: string[];
  onSave: (draft: {
    line: string;
    tags: TonightTag[];
    visibility: PresenceVisibility;
  }) => void;
  onLeave: () => void;
  onKeep: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  const mineHere = myCheckIn(eventId, mine.id, checkins);
  const [editing, setEditing] = useState(false);
  const here = visibleCheckins(eventId, checkins, isHost);
  const boardCount = checkins.filter(
    (item) => item.eventId === eventId && item.visibility === "board",
  ).length;

  return (
    <section className="w-full text-left">
      <p className="kicker">Tonight</p>
      <h1 className="font-poster mt-2 text-[2.4rem] leading-[0.9] font-extrabold uppercase">
        Who’s here
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        {boardCount
          ? `${boardCount} on the board for ${eventTitle}.`
          : "Check in when you arrive. The board stays empty until someone does."}
      </p>

      {editing ? (
        <TonightCard
          member={mine}
          initial={mineHere}
          onCancel={() => setEditing(false)}
          onSave={(draft) => {
            onSave(draft);
            setEditing(false);
          }}
        />
      ) : mineHere ? (
        <div className="here-you mt-5">
          <p className="text-sm leading-6">
            You’re here
            {mineHere.visibility === "board"
              ? " — on the board."
              : mineHere.visibility === "host"
                ? " — hosts only."
                : " — off the board."}
          </p>
          <p className="mt-1 text-sm leading-6 text-muted">{mineHere.line}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" className="ctl-quiet" onClick={() => setEditing(true)}>
              Edit tonight
            </button>
            <button type="button" className="ctl-quiet" onClick={onLeave}>
              Leave
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="ctl ctl-save mt-5 h-12 w-full text-[0.92rem]"
          onClick={() => setEditing(true)}
        >
          I’m here
        </button>
      )}

      {here.length ? (
        <ul className="mt-6 grid gap-3">
          {here.map((person) => (
            <li key={person.memberId}>
              <HereRow
                person={person}
                isYou={person.memberId === mine.id}
                isHost={isHost}
                kept={follow.includes(person.memberId)}
                onKeep={() => onKeep(person.memberId)}
                onOpen={() => onOpen(person.memberId)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-sm leading-6 text-muted">
          Nobody is on the board yet.
        </p>
      )}
    </section>
  );
}

function TonightCard({
  member,
  initial,
  onSave,
  onCancel,
}: {
  member: Member;
  initial?: CheckIn;
  onSave: (draft: {
    line: string;
    tags: TonightTag[];
    visibility: PresenceVisibility;
  }) => void;
  onCancel?: () => void;
}) {
  const [line, setLine] = useState(initial?.line ?? defaultTonightLine(member));
  const [tags, setTags] = useState<TonightTag[]>(
    initial?.tags ?? defaultTonightTags(member),
  );
  const [visibility, setVisibility] = useState<PresenceVisibility>(
    initial?.visibility ?? "board",
  );

  function toggle(id: TonightTag) {
    setTags((list) =>
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id],
    );
  }

  return (
    <form
      className="here-editor mt-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSave({ line, tags, visibility });
      }}
    >
      <p className="kicker">Tonight’s card</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        This is for this night only. It doesn’t rewrite your Hause page.
      </p>
      <textarea
        value={line}
        onChange={(event) => setLine(event.target.value.slice(0, 140))}
        className="field mt-4 min-h-24"
        rows={3}
        maxLength={140}
      />
      <p className="kicker mt-4">Open to</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tonightTags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            className="chip"
            aria-pressed={tags.includes(tag.id)}
            onClick={() => toggle(tag.id)}
          >
            {tag.label}
          </button>
        ))}
      </div>
      <p className="kicker mt-4">Visibility</p>
      <div className="mt-2 grid gap-2">
        {visibilities.map((item) => (
          <button
            key={item.id}
            type="button"
            className="here-vis"
            aria-pressed={visibility === item.id}
            onClick={() => setVisibility(item.id)}
          >
            <span className="font-semibold">{item.label}</span>
            <span className="mt-0.5 block text-sm font-normal text-muted">
              {item.line}
            </span>
          </button>
        ))}
      </div>
      <button type="submit" className="ctl ctl-save mt-5 h-12 w-full">
        {initial ? "Update" : "Check in"}
      </button>
      {onCancel ? (
        <button type="button" className="ctl-quiet mt-2 w-full" onClick={onCancel}>
          Cancel
        </button>
      ) : null}
    </form>
  );
}

function HereRow({
  person,
  isYou,
  isHost,
  kept,
  onKeep,
  onOpen,
}: {
  person: CheckIn;
  isYou: boolean;
  isHost: boolean;
  kept: boolean;
  onKeep: () => void;
  onOpen: () => void;
}) {
  return (
    <article className="here-row">
      <button type="button" className="here-row-main" onClick={onOpen}>
        <HouseAvatar name={person.name} photo={person.photo} size={52} />
        <span className="min-w-0 flex-1 text-left">
          <span className="here-row-name">
            {isYou ? "You · " : ""}
            {person.name}
          </span>
          <span className="mt-0.5 block text-sm text-muted">
            {person.role}
            {person.city ? ` · ${person.city}` : ""}
          </span>
          <span className="mt-1 block text-[15px] leading-6">{person.line}</span>
          {person.tags.length ? (
            <span className="here-tags">
              {person.tags.map((tag) => tagLabel(tag)).join(" · ")}
            </span>
          ) : null}
          {isHost && person.visibility !== "board" ? (
            <span className="here-hidden">
              {person.visibility === "private" ? "Off the board" : "Hosts only"}
            </span>
          ) : null}
        </span>
      </button>
      <div className="here-row-actions">
        <a
          className="ctl ctl-secondary"
          href={connectHref({
            id: person.memberId,
            name: person.name,
            role: person.role,
            building: "",
            city: person.city,
            link: person.link,
            photo: person.photo,
          })}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        {!isYou ? (
          <button
            type="button"
            className="ctl"
            aria-pressed={kept}
            onClick={onKeep}
          >
            {kept ? "Following" : "Follow"}
          </button>
        ) : null}
      </div>
    </article>
  );
}
