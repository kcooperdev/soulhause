"use client";

import { useEffect, useRef, useState } from "react";

const VOLUME = 0.14;

export function RoomSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const onRef = useRef(false);
  const [on, setOn] = useState(false);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (onRef.current) {
      audio.pause();
      onRef.current = false;
      setOn(false);
      return;
    }

    audio.loop = true;
    audio.volume = VOLUME;
    try {
      await audio.play();
      onRef.current = true;
      setOn(true);
    } catch {
      onRef.current = false;
      setOn(false);
    }
  }

  useEffect(() => {
    const hide = () => {
      const audio = audioRef.current;
      if (!audio || !onRef.current) return;
      if (document.hidden) audio.pause();
      else {
        audio.volume = VOLUME;
        void audio.play().catch(() => {
          onRef.current = false;
          setOn(false);
        });
      }
    };

    document.addEventListener("visibilitychange", hide);
    return () => {
      document.removeEventListener("visibilitychange", hide);
      audioRef.current?.pause();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/room.ogg" preload="metadata" playsInline />
      <button
        type="button"
        className="gold-sound"
        aria-pressed={on}
        onClick={() => void toggle()}
      >
        {on ? "sound off" : "sound on"}
      </button>
    </>
  );
}
