"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HouseRoster, Me, ProfilePage } from "@/components/HausePeople";
import { MenuClose } from "@/components/MenuClose";
import { JoinFlow } from "@/components/JoinFlow";
import { Splash } from "@/components/Splash";
import { ThemeToggle } from "@/components/ThemeToggle";
import { brand } from "@/lib/brand";
import { ADMIN_ID, memberById, type Member } from "@/lib/members";
import { readTheme, type Theme } from "@/lib/theme";
import {
  readFollow,
  readProfile,
  writeFollow,
  clearMemberAccount,
} from "@/lib/prefs";
import { startClickthroughDemo, startNewUserDemo } from "@/lib/demo";
import { isDemoWalk, readDemoRole, type DemoRole } from "@/lib/prefs";
import { planLabel, planById } from "@/lib/plans";
import { hasEnteredThisVisit, markEntered, markHeroSeen } from "@/lib/visit";

type Screen = "hause" | "me";

export function EventsApp({ skipGate = false }: { skipGate?: boolean }) {
  const [ready, setReady] = useState(false);
  const [splash, setSplash] = useState(!skipGate);

  useEffect(() => {
    if (skipGate) {
      markEntered();
      markHeroSeen();
      setSplash(false);
    } else {
      setSplash(!hasEnteredThisVisit());
    }
    setReady(true);
  }, [skipGate]);

  if (!ready || splash) {
    return (
      <Splash
        onEnter={() => {
          markEntered();
          markHeroSeen();
          setSplash(false);
        }}
      />
    );
  }

  return <House />;
}

function House() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("hause");
  const [mine, setMine] = useState<Member | null>(null);
  const [follow, setFollow] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [editingMe, setEditingMe] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [demoWalk, setDemoWalk] = useState(false);
  const [joinStart, setJoinStart] = useState<"path" | "name">("path");
  const [menu, setMenu] = useState(false);
  const [desk, setDesk] = useState(false);

  function reload() {
    setMine(readProfile());
    setFollow(readFollow());
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get("demo");
    if (demo === "new") {
      startNewUserDemo();
      setJoinStart("name");
    } else if (demo === "existing" || demo === "1" || (demo !== "new" && isDemoWalk() && readProfile())) {
      startClickthroughDemo(readDemoRole() ?? "member");
    }
    reload();
    setDemoWalk(isDemoWalk());
    setHydrated(true);
    setTheme(readTheme());
  }, []);

  useEffect(() => {
    if (hydrated) writeFollow(follow);
  }, [follow, hydrated]);

  const isHost = mine?.id === ADMIN_ID;
  const opened = openId ? memberById(openId, mine) : null;
  const mast = pageMast(screen, opened?.name);

  function go(next: Screen, keepMenu = false) {
    setScreen(next);
    setOpenId(null);
    setEditingMe(false);
    if (!keepMenu) setMenu(false);
    window.scrollTo(0, 0);
    document.querySelector(".app-body")?.scrollTo(0, 0);
  }

  useEffect(() => {
    if (!hydrated) return;
    window.scrollTo(0, 0);
    document.querySelector(".app-body")?.scrollTo(0, 0);
  }, [hydrated, mine?.id, screen, openId]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const apply = () => {
      setDesk(mq.matches);
      if (mq.matches) setMenu(false);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  function toggleKeep(id: string) {
    setFollow((ids) =>
      ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id],
    );
  }

  if (!hydrated) {
    return <div className="min-h-full" />;
  }

  function enterDemo(role: DemoRole = "admin") {
    startClickthroughDemo(role);
    reload();
    setDemoWalk(true);
    setScreen("hause");
    setOpenId(null);
  }

  function signOut() {
    clearMemberAccount();
    setDemoWalk(false);
    setMine(null);
    router.push("/");
  }

  if (!mine) {
    return (
      <JoinFlow
        brand={<BrandMark compact home />}
        start={joinStart}
        demo={demoWalk}
        onDemoNew={() => {
          startNewUserDemo();
          setDemoWalk(true);
          setJoinStart("name");
          setMine(null);
        }}
        onDemoExisting={() => enterDemo("member")}
        onSave={(member) => {
          setMine(member);
          setScreen("hause");
        }}
      />
    );
  }

  function mainNav() {
    return (
      <>
        <DockItem id="hause" on={screen === "hause"} onClick={() => go("hause")}>
          Directory
        </DockItem>
        <DockItem id="me" on={screen === "me"} onClick={() => go("me")}>
          Profile
        </DockItem>
      </>
    );
  }

  return (
    <div className="app-shell" data-menu={menu ? "true" : "false"}>
      <button
        type="button"
        className="app-veil"
        data-open={menu ? "true" : "false"}
        aria-label="Close menu"
        tabIndex={menu ? 0 : -1}
        onClick={() => setMenu(false)}
      />
      <aside
        id="house-menu"
        className="app-rail"
        aria-label="TechFolx"
        data-open={menu ? "true" : "false"}
        inert={!menu ? true : undefined}
      >
        <div className="app-rail-top">
          <BrandMark compact home className="app-rail-brand" />
          <button
            type="button"
            className="menu-close"
            aria-label="Close menu"
            onClick={() => setMenu(false)}
          >
            <MenuClose />
          </button>
        </div>
        <div className="app-rail-who">
          <p>{mine.name}</p>
          <p className="plan-tag" data-plan={planById(mine.planId).id}>
            {planLabel(mine.planId)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {mine.role}
            {isHost ? " · host" : ""}
          </p>
        </div>
        <nav className="app-rail-nav" aria-label="The house">
          {mainNav()}
          <button
            type="button"
            className="app-dock-item"
            disabled
            aria-disabled="true"
          >
            <span className="app-dock-label-rail">Volunteer</span>
            <span className="app-dock-label-phone">Volunteer</span>
            <span className="app-dock-soon">Opening soon</span>
          </button>
          <button
            type="button"
            className="app-dock-item"
            disabled
            aria-disabled="true"
          >
            <span className="app-dock-label-rail">Perks</span>
            <span className="app-dock-label-phone">Perks</span>
            <span className="app-dock-soon">Coming soon</span>
          </button>
        </nav>
        {demoWalk ? (
          <p className="demo-flag">
            Demo
            <button
              type="button"
              onClick={() => enterDemo(isHost ? "member" : "admin")}
            >
              {isHost ? "As member" : "As host"}
            </button>
          </p>
        ) : null}
        <button type="button" className="app-rail-item" onClick={() => { setMenu(false); signOut(); }}>
          Sign out
        </button>
      </aside>

      <header className="app-mast">
        <BrandMark compact home className="app-mast-brand" />
        <div className="app-mast-page">
          <p className="kicker">{mast.kicker}</p>
          <h1>{mast.title}</h1>
        </div>
        <button
          type="button"
          className={menu ? "app-menu menu-close" : "app-menu"}
          aria-expanded={menu}
          aria-controls="house-menu"
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu((open) => !open)}
        >
          {menu ? <MenuClose /> : "Menu"}
        </button>
        <div className="app-mast-tools">
          {demoWalk ? (
            <p className="demo-flag">
              Demo
              <button
                type="button"
                onClick={() => enterDemo(isHost ? "member" : "admin")}
              >
                {isHost ? "As member" : "As host"}
              </button>
            </p>
          ) : null}
          <ThemeToggle theme={theme} onTheme={setTheme} />
          <button type="button" className="app-mast-extra min-h-10 text-sm font-semibold text-muted" onClick={signOut}>
            Sign out
          </button>
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
        ) : screen === "hause" ? (
          <HouseRoster mine={mine} onOpen={setOpenId} />
        ) : (
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
            onSignOut={signOut}
          />
        )}
      </div>
    </div>
  );
}


function pageMast(screen: Screen, opened?: string) {
  if (opened) return { kicker: "In the house", title: opened };
  if (screen === "me") return { kicker: "You", title: "Profile" };
  return { kicker: "The house", title: "Directory" };
}

function BrandMark({
  compact,
  home,
  className,
}: {
  compact?: boolean;
  home?: boolean;
  className?: string;
}) {
  const mark = (
    <span className={compact ? "text-lg font-bold tracking-tight" : "text-xl font-bold tracking-tight"}>
      {brand.name}
    </span>
  );

  if (!home) return mark;

  return (
    <Link
      href="/"
      className={`${className ?? ""} inline-flex text-ink no-underline`.trim()}
      aria-label={brand.name}
    >
      {mark}
    </Link>
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
