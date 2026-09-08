"use client";

import { useEffect, useState } from "react";
import { readInstallSeen, writeInstallSeen } from "@/lib/prefs";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
};

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

export function InstallHome({ allowed }: { allowed: boolean }) {
  const [open, setOpen] = useState(false);
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    if (!allowed || readInstallSeen() || isStandalone()) return;
    setOpen(true);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, [allowed]);

  if (!open) return null;

  function dismiss() {
    writeInstallSeen();
    setOpen(false);
  }

  async function add() {
    if (installEvent) {
      await installEvent.prompt();
    }
    dismiss();
  }

  return (
    <aside
      className="mt-8 rounded-2xl bg-white/8 px-4 py-4 text-left"
      aria-label="Add to Home Screen"
    >
      <p className="text-sm leading-6 text-ink">
        Keep SoulHause on your phone for the next event.
      </p>
      {isIos() && !installEvent ? (
        <p className="mt-2 text-sm leading-6 text-muted">
          Share, then Add to Home Screen.
        </p>
      ) : null}
      <div className="mt-3 flex gap-2">
        {installEvent ? (
          <button type="button" className="ctl ctl-save" onClick={add}>
            Add to Home Screen
          </button>
        ) : null}
        <button type="button" className="ctl" onClick={dismiss}>
          Not now
        </button>
      </div>
    </aside>
  );
}
