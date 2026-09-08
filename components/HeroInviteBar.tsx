"use client";

import { useEffect, useRef, useState } from "react";

export const HOUSE_INVITE_WATCH = "https://www.youtube.com/watch?v=Gs069dndIYk";
export const HOUSE_INVITE_EMBED = "https://www.youtube.com/embed/Gs069dndIYk";

const VIDEO_ID = "Gs069dndIYk";
const START_SEC = 50;
const END_SEC = 90;
const CLIP = { videoId: VIDEO_ID, startSeconds: START_SEC, endSeconds: END_SEC };
const FRAME_ID = "hero-invite-yt";
const YT_API_SRC = "https://www.youtube.com/iframe_api";
const DESKTOP = "(min-width: 64rem)";
const REDUCE = "(prefers-reduced-motion: reduce)";
const YT_ENDED = 0;
const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_BUFFERING = 3;
const LINE = "Join us for Hause of Soul Tech Happy Hour";

type ClipOpts = { videoId: string; startSeconds: number; endSeconds: number };

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume?: (n: number) => void;
  getPlayerState?: () => number;
  getCurrentTime?: () => number;
  seekTo?: (seconds: number, allowSeekAhead?: boolean) => void;
  getIframe?: () => HTMLIFrameElement;
  cueVideoById?: (opts: string | ClipOpts) => void;
  loadVideoById?: (opts: string | ClipOpts) => void;
  destroy?: () => void;
};

type YTNamespace = {
  Player: new (
    el: HTMLIFrameElement | string,
    opts: {
      events?: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number; target: YTPlayer }) => void;
        onError?: (e: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  get?: (id: string) => YTPlayer | undefined;
};

let apiPromise: Promise<YTNamespace> | null = null;

function youtubeApi() {
  return (window as Window & { YT?: YTNamespace }).YT;
}

function loadYouTubeApi() {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve) => {
    let settled = false;
    const done = () => {
      const api = youtubeApi();
      if (settled || !api?.Player) return false;
      settled = true;
      resolve(api);
      return true;
    };

    if (done()) return;

    const win = window as Window & { onYouTubeIframeAPIReady?: () => void };
    const prev = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      prev?.();
      done();
    };

    if (!document.querySelector(`script[src="${YT_API_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = YT_API_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    const started = Date.now();
    const poll = () => {
      if (done()) return;
      if (!settled && Date.now() - started < 12000) requestAnimationFrame(poll);
    };
    poll();
  });

  return apiPromise;
}

function inviteSrc() {
  const params = new URLSearchParams({
    enablejsapi: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    controls: "0",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    autoplay: "0",
    mute: "0",
    start: String(START_SEC),
    end: String(END_SEC),
  });
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
    params.set("widget_referrer", window.location.href);
  }
  return `${HOUSE_INVITE_EMBED}?${params.toString()}`;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path fill="currentColor" d="M8 5.8v12.4L18.2 12 8 5.8Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path fill="currentColor" d="M7.2 5.5h3.1v13H7.2zm6.5 0h3.1v13h-3.1z" />
    </svg>
  );
}

function liveFrame(fallback: HTMLIFrameElement | null, player: YTPlayer | null) {
  try {
    const fromPlayer = player?.getIframe?.();
    if (fromPlayer?.contentWindow) return fromPlayer;
  } catch {
    /* player may not expose iframe yet */
  }
  if (fallback?.isConnected && fallback.contentWindow) return fallback;
  return document.querySelector<HTMLIFrameElement>(`#${FRAME_ID}, .hero-invite iframe`);
}

function inChorus(player: YTPlayer | null) {
  try {
    const t = player?.getCurrentTime?.();
    return typeof t === "number" && t >= START_SEC && t < END_SEC;
  } catch {
    return false;
  }
}

function playNow(player: YTPlayer | null, frame: HTMLIFrameElement | null) {
  try {
    player?.unMute();
  } catch {
    /* still try play */
  }
  try {
    player?.setVolume?.(100);
  } catch {
    /* still try play */
  }
  try {
    const state = player?.getPlayerState?.();
    if (state === YT_ENDED || state === -1 || state === 5 || !inChorus(player)) {
      player?.loadVideoById?.(CLIP);
      player?.seekTo?.(START_SEC, true);
    } else {
      player?.playVideo();
    }
  } catch {
    try {
      player?.playVideo();
    } catch {
      /* postMessage fallback */
    }
  }
  postCommand(frame, "unMute");
  postCommand(frame, "playVideo");
}

function pauseNow(player: YTPlayer | null, frame: HTMLIFrameElement | null) {
  try {
    player?.pauseVideo();
  } catch {
    /* postMessage fallback */
  }
  try {
    if (player?.getPlayerState?.() === YT_BUFFERING) {
      player.cueVideoById?.(CLIP);
    }
  } catch {
    /* pauseVideo may still land */
  }
  postCommand(frame, "pauseVideo");
}

function stopChorus(player: YTPlayer | null, frame: HTMLIFrameElement | null) {
  try {
    player?.pauseVideo();
  } catch {
    /* ignore */
  }
  try {
    player?.cueVideoById?.(CLIP);
  } catch {
    /* ignore */
  }
  postCommand(frame, "pauseVideo");
}

const live = {
  onReady: (_player: YTPlayer) => {},
  onState: (_event: { data: number; target: YTPlayer }) => {},
};

let sharedPlayer: YTPlayer | null = null;

function isOn(state: number | undefined) {
  return state === YT_PLAYING || state === YT_BUFFERING;
}

function postCommand(frame: HTMLIFrameElement | null, func: string) {
  const win = frame?.contentWindow;
  if (!win) return;
  const payload = JSON.stringify({
    event: "command",
    func,
    args: [],
    id: FRAME_ID,
    channel: "widget",
  });
  try {
    win.postMessage(JSON.stringify({ event: "listening", id: FRAME_ID, channel: "widget" }), "*");
  } catch {
    /* ignore */
  }
  win.postMessage(payload, "*");
}

/** Desktop-only Hause of Soul invite — official YouTube embed, no hosted audio. */
export function HeroInviteBar({
  rsvpHref,
  onRsvp,
}: {
  rsvpHref?: string;
  onRsvp?: () => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const wantRef = useRef<"play" | "pause" | null>(null);
  const [desktop, setDesktop] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [src, setSrc] = useState("");

  useEffect(() => {
    const wide = window.matchMedia(DESKTOP);
    const motion = window.matchMedia(REDUCE);
    const sync = () => {
      setDesktop(wide.matches);
      setReduce(motion.matches);
    };
    sync();
    setSrc(inviteSrc());
    wide.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!desktop || !src) return;
    const host = frameRef.current;
    if (!host) return;

    const markReady = (target: YTPlayer) => {
      sharedPlayer = target;
      readyRef.current = true;
      playerRef.current = target;
      setReady(true);
      try {
        const node = target.getIframe?.() ?? host;
        node.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
      } catch {
        /* ignore */
      }
      if (wantRef.current === "play") playNow(target, liveFrame(host, target));
      if (wantRef.current === "pause") pauseNow(target, liveFrame(host, target));
    };

    live.onReady = markReady;
    live.onState = (event) => {
      playerRef.current = event.target;
      sharedPlayer = event.target;
      const frame = liveFrame(frameRef.current, event.target);
      if (wantRef.current === "pause") {
        if (isOn(event.data)) pauseNow(event.target, frame);
        setPlaying(false);
        if (event.data === YT_PAUSED || event.data === YT_ENDED || event.data === 5) {
          wantRef.current = null;
        }
        return;
      }
      if (event.data === YT_ENDED) {
        wantRef.current = null;
        setPlaying(false);
        try {
          event.target.cueVideoById?.(CLIP);
        } catch {
          /* next play() reloads 0:50–1:30 */
        }
        return;
      }
      const on = isOn(event.data);
      if (on) {
        try {
          const t = event.target.getCurrentTime?.() ?? 0;
          if (t < START_SEC) event.target.seekTo?.(START_SEC, true);
        } catch {
          /* start=50 on the embed / loadVideoById still applies */
        }
      }
      if (wantRef.current === "play" && on) wantRef.current = null;
      setPlaying(on);
      if (on) {
        try {
          setMuted(event.target.isMuted());
        } catch {
          setMuted(false);
        }
      }
    };

    loadYouTubeApi().then((YT) => {
      const frame = frameRef.current;
      if (!frame) return;
      const existing = sharedPlayer ?? YT.get?.(FRAME_ID);
      if (existing) {
        markReady(existing);
        return;
      }
      sharedPlayer = new YT.Player(frame.id || frame, {
        events: {
          onReady: (event) => live.onReady(event.target),
          onStateChange: (event) => live.onState(event),
        },
      });
      playerRef.current = sharedPlayer;
    });
  }, [desktop, src]);

  useEffect(() => {
    if (!desktop) return;
    const hero = document.querySelector(".landing-hero");
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) return;
        wantRef.current = "pause";
        pauseNow(playerRef.current, liveFrame(frameRef.current, playerRef.current));
      },
      { threshold: 0.2 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [desktop]);

  useEffect(() => {
    if (!desktop || !playing) return;
    const clip = window.setInterval(() => {
      const player = playerRef.current ?? sharedPlayer;
      let t = 0;
      try {
        t = player?.getCurrentTime?.() ?? 0;
      } catch {
        return;
      }
      if (t >= END_SEC) {
        wantRef.current = null;
        setPlaying(false);
        stopChorus(player, liveFrame(frameRef.current, player));
      }
    }, 200);
    return () => window.clearInterval(clip);
  }, [desktop, playing]);

  function syncPlaying(player: YTPlayer | null) {
    try {
      setPlaying(isOn(player?.getPlayerState?.()));
    } catch {
      /* onStateChange still updates */
    }
  }

  function togglePlay() {
    const player = playerRef.current ?? sharedPlayer;
    const frame = liveFrame(frameRef.current, player);
    if (playing) {
      wantRef.current = "pause";
      setPlaying(false);
      pauseNow(player, frame);
      window.setTimeout(() => {
        if (wantRef.current === "pause") setPlaying(false);
        else syncPlaying(player);
      }, 80);
      return;
    }
    wantRef.current = "play";
    playNow(player, frame);
    window.setTimeout(() => syncPlaying(player), 80);
    window.setTimeout(() => syncPlaying(player), 400);
  }

  function hear() {
    wantRef.current = "play";
    const player = playerRef.current;
    const frame = liveFrame(frameRef.current, player);
    playNow(player, frame);
  }

  if (!desktop) return null;

  const needSound = playing && muted;

  return (
    <div
      className="hero-invite"
      role="region"
      aria-label="Hause of Soul invite"
      data-watch={HOUSE_INVITE_WATCH}
      data-yt-ready={ready ? "true" : "false"}
      data-yt-playing={playing ? "true" : "false"}
    >
      <iframe
        ref={frameRef}
        id={FRAME_ID}
        className="hero-invite-frame"
        title="Hause of Soul Tech Happy Hour"
        src={src || undefined}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
        aria-hidden="true"
      />

      <button
        type="button"
        className="hero-invite-play"
        aria-label={playing ? "Pause invite" : "Play Hause of Soul invite"}
        aria-pressed={playing}
        disabled={!ready}
        onClick={togglePlay}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      {rsvpHref ? (
        <a
          href={rsvpHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-invite-rsvp"
          onClick={onRsvp}
        >
          RSVP on Luma <span className="arrow">→</span>
        </a>
      ) : null}

      <span
        className="hero-invite-dot"
        data-on={playing ? "true" : "false"}
        aria-hidden="true"
      />

      <div className="hero-invite-copy">
        {needSound ? (
          <button type="button" className="hero-invite-title-btn" onClick={hear}>
            <span className="hero-invite-title">{LINE}</span>
            <span className="hero-invite-hint">Tap for sound</span>
          </button>
        ) : (
          <p className="hero-invite-title">{LINE}</p>
        )}
      </div>

      <span
        className="hero-invite-wave"
        data-on={playing && !reduce ? "true" : "false"}
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
