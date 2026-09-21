"use client";

import { useEffect } from "react";
import { FolxIcons } from "@/components/FolxIcons";
import { HouseNav } from "@/components/HouseNav";
import { RoomSound } from "@/components/RoomSound";
import { folx } from "@/lib/folx";

const PHRASES = [
  { key: "social-energy", words: ["spatial", "flow"] },
  { key: "community", words: ["interaction"] },
  { key: "connection", words: ["discovery"] },
  { key: "relationships", words: ["learning"] },
  { key: "momentum", words: ["technology"] },
] as const;

type Keyword = (typeof PHRASES)[number]["key"];

type Piece = {
  text: string;
  punct: string;
  key?: Keyword;
  say?: string;
};

function stem(text: string) {
  return text.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function splitPunct(text: string) {
  const match = text.match(/^(.*?)([.,!?;:]*)$/);
  return { core: match?.[1] || text, punct: match?.[2] || "" };
}

function matchesAt(words: string[], index: number, phrase: readonly string[]) {
  return phrase.every((word, offset) => stem(words[index + offset] ?? "") === word);
}

function tokenize(line: string): Piece[] {
  const words = line.split(/\s+/).filter(Boolean);
  const pieces: Piece[] = [];
  let index = 0;

  while (index < words.length) {
    const phrase = PHRASES.find((item) => matchesAt(words, index, item.words));
    if (phrase) {
      const slice = words.slice(index, index + phrase.words.length);
      const last = splitPunct(slice[slice.length - 1] ?? "");
      const cores = [...slice.slice(0, -1), last.core];
      pieces.push({
        text: cores.join(" "),
        punct: last.punct,
        key: phrase.key,
      });
      index += phrase.words.length;
      continue;
    }
    const { core, punct } = splitPunct(words[index] ?? "");
    pieces.push({
      text: core,
      punct,
      say: stem(core) === "techfolx" ? folx.phonetic : undefined,
    });
    index += 1;
  }

  return pieces;
}

export function TechAfterDarkPage() {
  useEffect(() => {
    const boot = () => {
      const start = (
        window as Window & { bootFolxReveal?: () => void }
      ).bootFolxReveal;
      start?.();
    };
    const ready = document.querySelector('script[data-folx-reveal]');
    if (ready) {
      boot();
      return;
    }
    const script = document.createElement("script");
    script.src = "/folx-reveal.js?v=scrub5";
    script.dataset.folxReveal = "true";
    script.onload = boot;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <HouseNav>
        <RoomSound />
      </HouseNav>
      <main className="folx-scroll" aria-label="TechFolx">
        <section className="hero">
          <div className="copy-container hero-frame">
            <div className="hero-copy">
              <h1>{folx.hero}</h1>
              <div className="cta-stack">
                <a
                  className="hero-cta"
                  href="https://luma.com/tech-after-dark?period=past"
                  aria-label={folx.ctaAria}
                >
                  {folx.cta}
                </a>
              </div>
            </div>
            <div className="hero-foot">
              <FolxIcons />
            </div>
          </div>
        </section>

        {folx.revealSections.map((paragraphs) => (
          <section
            key={paragraphs[0]}
            id="about"
            className="about anim-text-container"
          >
            <div className="copy-container">
              <div className="anim-text">
                {paragraphs.map((line) => (
                  <p
                    key={line}
                    aria-label={
                      line.includes("TechFolx")
                        ? line.replace("TechFolx", "TechFolx, pronounced tech folks,")
                        : line
                    }
                  >
                    <span aria-hidden="true">
                      {tokenize(line).map((word, wordIndex) => (
                        <span key={`${line}-${wordIndex}`}>
                          {wordIndex > 0 ? " " : null}
                          <span
                            className={
                              word.key
                                ? `word keyword-wrapper ${word.key}`
                                : word.say
                                  ? "word word-entry"
                                  : "word"
                            }
                          >
                            <span className={word.key ? `keyword ${word.key}` : undefined}>
                              {word.say ? (
                                <>
                                  <span className="entry-name">{word.text}</span>
                                  <i className="phonetic">/{word.say}/</i>
                                </>
                              ) : (
                                word.text
                              )}
                              {word.punct}
                            </span>
                          </span>
                        </span>
                      ))}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="cta" id="cta">
          <div className="copy-container">
            <h2>{folx.close}</h2>
            <div className="cta-stack">
              <a
                className="hero-cta"
                href="https://luma.com/tech-after-dark?period=past"
                aria-label={folx.ctaAria}
              >
                {folx.cta}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
