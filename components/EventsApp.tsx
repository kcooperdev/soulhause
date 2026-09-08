"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DeskSide } from "@/components/DeskSide";
import { EventPoster } from "@/components/EventPoster";
import { Directory, Insights, JoinForm, Me, ProfilePage } from "@/components/HausePeople";
import { Logo } from "@/components/Logo";
import { PresencePanel } from "@/components/Presence";
import { Splash } from "@/components/Splash";
import { ThemeToggle } from "@/components/ThemeToggle";
import { brand } from "@/lib/brand";
import { doorsAreOpen, events } from "@/lib/events";
import { ADMIN_ID, memberById, type Member } from "@/lib/members";
import {
  checkInFromMember,
  eventCheckins,
  leaveCheckIn,
  readCheckins,
  seedDemoCheckins,
  writeCheckins,
  type CheckIn,
} from "@/lib/presence";
import { readTheme, type Theme } from "@/lib/theme";
import {
  clearMemberAccount,
  readFollow,
  readProfile,
  readRsvp,
  writeFollow,
  writeProfile,
  writeRsvp,
} from "@/lib/prefs";
import {
  hasEnteredThisVisit,
  hasSeenHeroThisVisit,
  markEntered,
  markHeroSeen,
} from "@/lib/visit";

const LandingHero = dynamic(() =>
  import("@/components/DesktopHero").then((mod) => ({ default: mod.LandingHero })),
);

type Screen = "nights" | "here" | "hause" | "me" | "hosts";

const joinPad = {
  paddingTop: "max(1.5rem, env(safe-area-inset-top))",
  paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
  paddingLeft: "max(1.35rem, env(safe-area-inset-left), env(safe-area-inset-right))",
  paddingRight: "max(1.35rem, env(safe-area-inset-left), env(safe-area-inset-right))",
} as const;

export function EventsApp() {
  const [ready, setReady] = useState(false);
  const [splash, setSplash] = useState(true);
  const [hero, setHero] = useState(true);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    setHasAccount(Boolean(readProfile()));
    setSplash(!hasEnteredThisVisit());
    setHero(!hasSeenHeroThisVisit());
    setReady(true);
  }, []);

  if (!ready || splash) {
    return (
      <Splash
        onEnter={() => {
          markEntered();
          setSplash(false);
          setHero(true);
        }}
      />
    );
  }

  if (hero) {
    return (
      <LandingHero
        hasAccount={hasAccount}
        onReset={() => {
          clearMemberAccount();
          setHasAccount(false);
        }}
        onContinue={() => {
          markHeroSeen();
          setHero(false);
        }}
      />
    );
  }

  return <House />;
}

function House() {
  const [screen, setScreen] = useState<Screen>("nights");
  const [rsvp, setRsvp] = useState<string[]>([]);
  const [mine, setMine] = useState<Member | null>(null);
  const [follow, setFollow] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [editingMe, setEditingMe] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [theme, setTheme] = useState<Theme>("light");

  function reload() {
    setRsvp(readRsvp());
    setMine(readProfile());
    setFollow(readFollow());
  }

  useEffect(() => {
    reload();
    const night = events[0]?.id;
    const profile = readProfile();
    let here = readCheckins();
    if (night && profile && !here.some((item) => item.eventId === night)) {
      here = seedDemoCheckins(night, profile.id);
    }
    setCheckins(here);
    setHydrated(true);
    setTheme(readTheme());
  }, []);

  useEffect(() => {
    if (hydrated) writeRsvp(rsvp);
  }, [rsvp, hydrated]);

  useEffect(() => {
    if (hydrated) writeFollow(follow);
  }, [follow, hydrated]);

  useEffect(() => {
    if (hydrated) writeCheckins(checkins);
  }, [checkins, hydrated]);

  function markRsvp(id: string) {
    setRsvp((ids) => (ids.includes(id) ? ids : [...ids, id]));
  }

  const isHost = mine?.id === ADMIN_ID;
  const opened = openId ? memberById(openId, mine) : null;
  const night = events[0];
  const live = night ? doorsAreOpen(night) : false;
  const here = night ? eventCheckins(night.id, checkins) : [];
  const mast = pageMast(screen, opened?.name);

  function go(next: Screen) {
    setScreen(next);
    setOpenId(null);
    setEditingMe(false);
    window.scrollTo(0, 0);
    document.querySelector(".app-body")?.scrollTo(0, 0);
  }

  useEffect(() => {
    if (!hydrated) return;
    window.scrollTo(0, 0);
    document.querySelector(".app-body")?.scrollTo(0, 0);
  }, [hydrated, mine?.id, screen, openId]);

  useEffect(() => {
    if (!hydrated) return;
    if (screen === "here" && !live) go("nights");
    if (screen === "hosts" && !isHost) go("nights");
  }, [hydrated, screen, live, isHost]);

  function toggleKeep(id: string) {
    setFollow((ids) =>
      ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id],
    );
  }

  if (!hydrated) {
    return <div className="min-h-full" />;
  }

  if (!mine) {
    return (
      <div
        className="join-desk mx-auto flex min-h-full max-w-xl flex-col"
        style={joinPad}
      >
        <header className="flex items-center justify-between gap-4 pb-2">
          <BrandMark compact />
          <ThemeToggle theme={theme} onTheme={setTheme} />
        </header>
        <p className="kicker mt-8">New here</p>
        <h1 className="font-poster mt-2 text-[2.4rem] leading-[0.9] font-extrabold uppercase">
          Join the Hause
        </h1>
        <p className="mt-3 max-w-sm text-[15px] leading-6 text-muted">
          Two short steps. Then Events, The Hause, and Me from there.
        </p>
        <JoinForm
          onSave={(member) => {
            setMine(member);
            setScreen("nights");
          }}
        />
      </div>
    );
  }

  function mainNav() {
    return (
      <>
        <DockItem id="nights" on={screen === "nights"} onClick={() => go("nights")}>
          Events
        </DockItem>
        {live ? (
          <DockItem
            id="here"
            on={screen === "here"}
            onClick={() => go("here")}
            dock="Here"
          >
            Who’s here
          </DockItem>
        ) : null}
        <DockItem id="hause" on={screen === "hause"} onClick={() => go("hause")}>
          The Hause
        </DockItem>
        <DockItem id="me" on={screen === "me"} onClick={() => go("me")}>
          Me
        </DockItem>
      </>
    );
  }

  return (
    <div className="app-shell">
      <aside className="app-rail" aria-label="SoulHause">
        <button
          type="button"
          onClick={() => go("nights")}
          className="app-rail-brand text-left"
          aria-label="SoulHause Events"
        >
          <BrandMark compact />
        </button>
        <div className="app-rail-who">
          <p>{mine.name}</p>
          <p className="mt-1 text-sm text-muted">
            {mine.role}
            {isHost ? " · host" : ""}
          </p>
        </div>
        <nav className="app-rail-nav">{mainNav()}</nav>
        {isHost && (
          <button
            type="button"
            className="app-rail-item"
            aria-current={screen === "hosts" ? "page" : undefined}
            onClick={() => go("hosts")}
          >
            Insights
            <span className="app-dock-dot" aria-hidden />
          </button>
        )}
      </aside>

      <header className="app-mast">
        <button
          type="button"
          onClick={() => go("nights")}
          className="app-mast-brand text-left"
          aria-label="SoulHause Events"
        >
          <BrandMark compact />
        </button>
        <div className="app-mast-page">
          <p className="kicker">{mast.kicker}</p>
          <h1>{mast.title}</h1>
        </div>
        <div className="app-mast-tools">
          <ThemeToggle theme={theme} onTheme={setTheme} />
          {isHost && (
            <button
              type="button"
              className={`min-h-10 text-sm font-semibold ${
                screen === "hosts" ? "text-ink" : "text-muted"
              }`}
              onClick={() => go("hosts")}
            >
              Insights
            </button>
          )}
        </div>
        <div className="app-mast-desk">
          <ThemeToggle theme={theme} onTheme={setTheme} />
        </div>
      </header>

      <div key={mine.id} className="app-body">
        {opened ? (
          <ProfilePage
            member={opened}
            mine={mine}
            kept={follow.includes(opened.id)}
            onKeep={() => toggleKeep(opened.id)}
            onBack={() => setOpenId(null)}
            onEdit={
              opened.id === mine?.id
                ? () => {
                    setOpenId(null);
                    setEditingMe(true);
                    setScreen("me");
                  }
                : undefined
            }
          />
        ) : screen === "here" && night && live ? (
          <PresencePanel
            eventId={night.id}
            eventTitle={night.title}
            mine={mine}
            isHost={isHost}
            checkins={checkins}
            follow={follow}
            onSave={(draft) => {
              setCheckins((list) => {
                const next = checkInFromMember(night.id, mine, draft);
                return [
                  ...list.filter(
                    (item) =>
                      !(item.eventId === next.eventId && item.memberId === next.memberId),
                  ),
                  next,
                ];
              });
            }}
            onLeave={() => {
              setCheckins((list) => leaveCheckIn(night.id, mine.id, list));
            }}
            onKeep={toggleKeep}
            onOpen={setOpenId}
          />
        ) : screen === "hause" ? (
          <Directory
            mine={mine}
            onJoin={() => go("me")}
            onSeek={(ids) => {
              const next = { ...mine, lookingIds: ids };
              writeProfile(next);
              setMine(next);
            }}
          />
        ) : screen === "me" ? (
          <Me
            key={editingMe ? "edit" : "view"}
            forceForm={editingMe}
            mine={mine}
            follow={follow}
            onProfile={(member) => {
              setMine(member);
              setEditingMe(false);
              setScreen("me");
            }}
            onOpen={setOpenId}
          />
        ) : screen === "hosts" && isHost ? (
          <Insights checkins={checkins} />
        ) : (
          <EventsPanel
            rsvp={rsvp}
            onRsvp={markRsvp}
            live={live}
            onOpenHere={() => go("here")}
          />
        )}
      </div>

      <DeskSide
        screen={opened ? "profile" : screen}
        night={night}
        live={live}
        mine={mine}
        following={follow.length}
        hereCount={here.length}
        boardCount={here.filter((item) => item.visibility === "board").length}
        onOpenHere={() => go("here")}
      />

      <nav className="app-dock" aria-label="SoulHause">
        <div className="app-dock-inner">{mainNav()}</div>
      </nav>
    </div>
  );
}


function EventsPanel({
  onRsvp,
  live,
  onOpenHere,
}: {
  rsvp: string[];
  onRsvp: (id: string) => void;
  live?: boolean;
  onOpenHere?: () => void;
}) {
  const event = events[0];

  if (!event) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="font-poster text-4xl font-extrabold uppercase">
          Events soon
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
          More SoulHause events land on Luma when they’re ready.
        </p>
        <a
          className="ctl ctl-save mt-6"
          href={brand.luma}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open calendar
        </a>
      </div>
    );
  }

  return (
    <div className="events-stage flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-md text-center">
        <p className="kicker">Next event</p>
        <EventPoster event={event} />
        <a
          className="ctl ctl-save mt-7 h-12 w-full text-[0.92rem]"
          href={event.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onRsvp(event.id)}
        >
          Register on Luma
        </a>
        {live ? (
          <button
            type="button"
            className="ctl ctl-secondary mt-3 h-12 w-full"
            onClick={onOpenHere}
          >
            Who’s here
          </button>
        ) : (
          <p className="mt-5 text-sm leading-6 text-muted">
            Who’s here opens at {event.time} when the night starts.
          </p>
        )}
      </div>
    </div>
  );
}

function pageMast(screen: Screen, opened?: string) {
  if (opened) return { kicker: "In the Hause", title: opened };
  if (screen === "here") return { kicker: "Tonight", title: "Who’s here" };
  if (screen === "hause") return { kicker: "Board", title: "The Hause" };
  if (screen === "me") return { kicker: "You", title: "Me" };
  if (screen === "hosts") return { kicker: "Host", title: "Insights" };
  return { kicker: "House", title: "Events" };
}

function BrandMark({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Logo size={compact ? 40 : 52} round={false} />
      <div>
        <p className="font-poster text-[1.65rem] leading-none font-extrabold tracking-tight uppercase">
          {brand.name}
        </p>
        {!compact && (
          <p className="mt-1 text-xs tracking-[0.14em] text-ink/75 uppercase">
            {brand.line}
          </p>
        )}
      </div>
    </div>
  );
}

function DockItem({
  id,
  on,
  onClick,
  dock,
  children,
}: {
  id: Screen;
  on: boolean;
  onClick: () => void;
  dock?: string;
  children: string;
}) {
  return (
    <button
      type="button"
      data-nav={id}
      onClick={onClick}
      aria-current={on ? "page" : undefined}
      className="app-dock-item"
    >
      <span className="app-dock-label-rail">{children}</span>
      <span className="app-dock-label-phone">{dock ?? children}</span>
      <span className="app-dock-dot" aria-hidden />
    </button>
  );
}
