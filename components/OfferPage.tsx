"use client";

import { useEffect, useRef, useState } from "react";

const FILM_ID = "zE7PKRjrid4";
const HEARD = 80;
const START_AT = 80;
const END_AT = 105;
const CALENDAR = "https://luma.com/techfolx";

type Phase = "film" | "black" | "still";

type FilmPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        options: {
          videoId: string;
          playerVars: Record<string, string | number>;
          events: { onReady: (event: { target: FilmPlayer }) => void };
        },
      ) => FilmPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function prefersStill() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function SoundOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9.5v5h3.2L12 18.2V5.8L7.2 9.5H4z" fill="currentColor" />
      <path
        d="M16 9.5 20.5 14.5M20.5 9.5 16 14.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SoundOnIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 9.5v5h3.2L11.5 18.2V5.8L6.7 9.5H3.5z" fill="currentColor" />
      <path
        d="M15 8.8a4.2 4.2 0 0 1 0 6.4M17.6 6.4a7.2 7.2 0 0 1 0 11.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PillCue({ word }: { word: string }) {
  return (
    <p className={`offer-cue offer-cue--${word}`} aria-hidden="true">
      <span>{word}</span>
      <svg className="offer-arrow" viewBox="0 0 88 70" aria-hidden="true">
        <g fill="none" stroke="#f4be3c" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M68 8C54 16 44 32 38 54" />
          <path d="M38 54 18 40" />
          <path d="M38 54 56 42" />
        </g>
      </svg>
    </p>
  );
}

function loadYouTube() {
  if (window.YT?.Player) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    if (!document.querySelector("script[data-youtube-iframe]")) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.dataset.youtubeIframe = "true";
      document.body.appendChild(script);
    }
  });
}

export function OfferPage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<FilmPlayer | null>(null);
  const levelRef = useRef(0);
  const frameRef = useRef(0);
  const onRef = useRef(false);
  const endedRef = useRef(false);
  const watchRef = useRef(0);
  const [on, setOn] = useState(false);
  const [phase, setPhase] = useState<Phase>("film");

  function ramp(to: number) {
    const player = playerRef.current;
    if (!player) return;
    window.cancelAnimationFrame(frameRef.current);
    if (to > 0) {
      player.unMute();
      if (!endedRef.current) player.playVideo();
    }
    const from = levelRef.current;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700;
    const start = performance.now();
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = t * t * (3 - 2 * t);
      const level = from + (to - from) * eased;
      levelRef.current = level;
      player.setVolume(Math.round(level));
      if (t < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
        return;
      }
      if (to === 0) player.mute();
    };
    frameRef.current = window.requestAnimationFrame(tick);
  }

  function reveal() {
    if (endedRef.current) return;
    endedRef.current = true;
    playerRef.current?.pauseVideo();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("black");
    window.setTimeout(() => setPhase("still"), reduced ? 0 : 900);
  }

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let player: FilmPlayer | null = null;
    if (prefersStill()) {
      endedRef.current = true;
      setPhase("still");
    }
    void loadYouTube().then(() => {
      if (cancelled || !hostRef.current || !window.YT) return;
      player = new window.YT.Player(hostRef.current, {
        videoId: FILM_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          start: START_AT,
          end: END_AT,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
            event.target.mute();
            if (endedRef.current || prefersStill()) {
              event.target.pauseVideo();
              reveal();
              return;
            }
            event.target.seekTo(START_AT, true);
            event.target.playVideo();
            if (onRef.current) ramp(HEARD);
            watchRef.current = window.setInterval(() => {
              const film = playerRef.current;
              if (!film || endedRef.current) return;
              const time = film.getCurrentTime();
              if (time < END_AT) return;
              film.seekTo(END_AT, true);
              reveal();
            }, 200);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      window.clearInterval(watchRef.current);
      window.cancelAnimationFrame(frameRef.current);
      player?.destroy();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onHide = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameRef.current);
        playerRef.current?.mute();
        levelRef.current = 0;
        return;
      }
      if (onRef.current && !endedRef.current) ramp(HEARD);
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  function toggle() {
    const next = !onRef.current;
    onRef.current = next;
    setOn(next);
    ramp(next ? HEARD : 0);
  }

  return (
    <main className="offer-page" data-phase={phase}>
      <div className="offer-video">
        <div ref={hostRef} />
      </div>
      <div className="offer-still" aria-hidden={phase !== "still"}>
        <div className="offer-frame">
          <img
            src="/offer-pills.png"
            alt="Two open hands. A red pill in the left hand and a blue pill in the right."
          />
          <button type="button" className="offer-hit offer-hit--red" aria-label="Experience" onClick={() => window.location.assign(CALENDAR)} />
          <button type="button" className="offer-hit offer-hit--blue" aria-label="Spectator" onClick={() => window.location.assign(CALENDAR)} />
          <PillCue word="experience" />
          <PillCue word="spectator" />
        </div>
        <p className="offer-choose">Choose one</p>
      </div>
      <div className="offer-controls" aria-hidden={phase !== "film"}>
        <button type="button" className="offer-skip" onClick={reveal}>
          Skip
        </button>
        <button
          type="button"
          className="offer-sound"
          aria-pressed={on}
          aria-label={on ? "Sound on" : "Sound off"}
          onClick={toggle}
        >
          {on ? <SoundOnIcon /> : <SoundOffIcon />}
        </button>
      </div>
    </main>
  );
}
