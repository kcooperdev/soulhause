"use client";

import { useEffect, useState } from "react";
import { readInstallSeen, writeInstallSeen } from "@/lib/prefs";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
};

type Tone = "house" | "offer";

let deferred: InstallEvent | null = null;
let watching = false;

function isStandalone() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function isIos() {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
}

function watchInstall() {
  if (watching || typeof window === "undefined") return;
  watching = true;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferred = event as InstallEvent;
  });
}

export function InstallHome({ tone = "house" }: { tone?: Tone }) {
  const [open, setOpen] = useState(false);
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    watchInstall();
    if (isStandalone() || readInstallSeen()) return;
    setOpen(true);
    setInstallEvent(deferred);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      const next = event as InstallEvent;
      deferred = next;
      setInstallEvent(next);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!open) return null;

  function dismiss() {
    writeInstallSeen();
    setOpen(false);
  }

  async function add() {
    if (installEvent) {
      await installEvent.prompt();
      deferred = null;
    }
    writeInstallSeen();
    setOpen(false);
  }

  const canPrompt = Boolean(installEvent);
  const ios = isIos() && !canPrompt;

  return (
    <aside className="pwa-install" data-tone={tone} aria-label="Add to Home Screen">
      <p>Keep the house on your phone.</p>
      {ios ? <p className="pwa-install-how">Share, then Add to Home Screen.</p> : null}
      {!ios && !canPrompt ? (
        <p className="pwa-install-how">
          In the browser menu, choose Add to Home Screen.
        </p>
      ) : null}
      <div className="pwa-install-act">
        {canPrompt ? (
          <button type="button" className="pwa-add" onClick={add}>
            Add to Home Screen
          </button>
        ) : null}
        <button type="button" className="pwa-skip" onClick={dismiss}>
          Not now
        </button>
      </div>
    </aside>
  );
}
