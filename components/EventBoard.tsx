"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { type SceneEvent } from "@/lib/content";
import { EventPreview, formatLongDate } from "@/components/EventPreview";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function monthLabel(year: number, month: number) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    new Date(year, month, 1),
  );
}

function dayKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function EventBoard({ events }: { events: SceneEvent[] }) {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [today, setToday] = useState<{ year: number; month: number; day: number } | null>(null);
  const [cursor, setCursor] = useState({ year: 2026, month: 0 });
  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const now = new Date();
    const next = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
    setToday(next);
    setCursor({ year: next.year, month: next.month });
    setSelected(dayKey(next.year, next.month, next.day));
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setModalOpen(false);
    }

    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
      previous?.focus?.();
    };
  }, [modalOpen]);

  const byDay = useMemo(() => {
    const map = new Map<string, SceneEvent[]>();
    for (const event of events) {
      const list = map.get(event.startsOn) ?? [];
      list.push(event);
      list.sort((a, b) => a.time.localeCompare(b.time) || a.name.localeCompare(b.name));
      map.set(event.startsOn, list);
    }
    return map;
  }, [events]);

  const upcoming = useMemo(() => {
    const start = today ? dayKey(today.year, today.month, today.day) : "0000-00-00";
    return [...events]
      .filter((event) => event.startsOn >= start)
      .sort((a, b) => a.startsOn.localeCompare(b.startsOn) || a.name.localeCompare(b.name));
  }, [events, today]);

  const cells = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1);
    const start = first.getDay();
    const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
    const slots: Array<{ key: string; day: number | null; events: SceneEvent[] }> = [];

    for (let i = 0; i < start; i += 1) {
      slots.push({ key: `pad-${i}`, day: null, events: [] });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const key = dayKey(cursor.year, cursor.month, day);
      slots.push({ key, day, events: byDay.get(key) ?? [] });
    }
    while (slots.length % 7 !== 0) {
      slots.push({ key: `trail-${slots.length}`, day: null, events: [] });
    }
    return slots;
  }, [byDay, cursor]);

  const selectedEvents = byDay.get(selected) ?? [];

  function shiftMonth(delta: number) {
    setCursor((current) => {
      const date = new Date(current.year, current.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  function openDay(key: string) {
    setSelected(key);
    setModalOpen(true);
  }

  return (
    <section className="stack" aria-labelledby="events-board-title">
      <header className="panel flat">
        <p className="kicker">Events</p>
        <h1 id="events-board-title">Tech events.</h1>
        <p className="lede">
          Browse the month on the calendar, or switch to a list of upcoming nights. Click a day to see what is on.
        </p>
        <div className="actions">
          <div className="view-toggle" role="group" aria-label="Event view">
            <button
              type="button"
              className={view === "calendar" ? "btn blue" : "btn white"}
              aria-pressed={view === "calendar"}
              onClick={() => setView("calendar")}
            >
              Calendar
            </button>
            <button
              type="button"
              className={view === "list" ? "btn blue" : "btn white"}
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              List
            </button>
          </div>
          <Link className="btn coral" href="/events/submit">
            Submit an event
          </Link>
        </div>
      </header>

      {view === "calendar" ? (
        <div className="panel calendar-panel">
          {!today ? (
            <p className="lede">Loading calendar…</p>
          ) : (
            <>
              <div className="calendar-toolbar">
                <button className="btn white" type="button" onClick={() => shiftMonth(-1)}>
                  Previous
                </button>
                <h2 className="calendar-month">{monthLabel(cursor.year, cursor.month)}</h2>
                <button className="btn white" type="button" onClick={() => shiftMonth(1)}>
                  Next
                </button>
              </div>

              <div className="calendar-weekdays" aria-hidden="true">
                {weekdays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="calendar-grid" role="grid" aria-label={monthLabel(cursor.year, cursor.month)}>
                {cells.map((cell) =>
                  cell.day === null ? (
                    <div key={cell.key} className="calendar-cell is-empty" />
                  ) : (
                    <button
                      key={cell.key}
                      type="button"
                      className={[
                        "calendar-cell",
                        cell.events.length > 0 ? "has-events" : "",
                        cell.key === selected && modalOpen ? "is-selected" : "",
                        cell.key === dayKey(today.year, today.month, today.day) ? "is-today" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-haspopup="dialog"
                      aria-label={`${monthLabel(cursor.year, cursor.month)} ${cell.day}${
                        cell.events.length ? `, ${cell.events.length} event${cell.events.length === 1 ? "" : "s"}` : ""
                      }`}
                      onClick={() => openDay(cell.key)}
                    >
                      <span className="calendar-day">{cell.day}</span>
                      {cell.events.length > 0 ? (
                        <span className="calendar-count" aria-hidden="true">
                          {cell.events.length}
                        </span>
                      ) : null}
                    </button>
                  ),
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="stack">
          {upcoming.length === 0 ? (
            <section className="panel">
              <h2>No upcoming events yet</h2>
              <p>
                When a tech event is listed, it will show here in date order.{" "}
                <Link href="/events/submit">Submit an event</Link> to add one.
              </p>
            </section>
          ) : (
            <div className="event-preview-list">
              {upcoming.map((event) => (
                <EventPreview key={event.id} event={event} showDate />
              ))}
            </div>
          )}
        </div>
      )}

      {modalOpen && selected ? (
        <div className="event-modal-root">
          <button
            type="button"
            className="event-modal-backdrop"
            aria-label="Close day events"
            onClick={() => setModalOpen(false)}
          />
          <div
            className="event-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="event-modal-head">
              <div>
                <p className="kicker">Day</p>
                <h2 id={titleId}>{formatLongDate(selected)}</h2>
              </div>
              <button
                ref={closeRef}
                className="btn white"
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
            {selectedEvents.length === 0 ? (
              <div className="event-modal-empty">
                <p>No tech events on this day yet.</p>
                <Link className="btn coral" href="/events/submit" onClick={() => setModalOpen(false)}>
                  Submit an event
                </Link>
              </div>
            ) : (
              <div className="event-preview-list">
                {selectedEvents.map((event) => (
                  <EventPreview key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
