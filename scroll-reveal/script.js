gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const phrases = [
  ["social", "energy"],
  ["community"],
  ["connection"],
  ["relationships"],
  ["momentum"],
];

function normalize(word) {
  return word.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function phraseKey(parts) {
  return parts.join("-");
}

function matchPhrase(words, start) {
  return phrases.find((phrase) =>
    phrase.every((part, offset) => normalize(words[start + offset] || "") === part),
  );
}

const paragraphs = document.querySelectorAll(".anim-text p");

paragraphs.forEach((paragraph) => {
  const text = paragraph.textContent.trim();
  const words = text.split(/\s+/);
  paragraph.textContent = "";

  let index = 0;

  while (index < words.length) {
    const raw = words[index];
    if (!raw) {
      index += 1;
      continue;
    }

    const phrase = matchPhrase(words, index);
    const wrapper = document.createElement("div");
    wrapper.className = "word";

    const span = document.createElement("span");

    if (phrase) {
      const key = phraseKey(phrase);
      span.textContent = words.slice(index, index + phrase.length).join(" ");
      wrapper.classList.add("keyword-wrapper", key);
      span.classList.add("keyword", key);
      index += phrase.length;
    } else {
      span.textContent = raw;
      index += 1;
    }

    wrapper.appendChild(span);
    paragraph.appendChild(wrapper);
  }
});

function wordWindow(progress, index, total, overlapWords) {
  const totalTime = 1 + overlapWords / total;
  const start = index / total / totalTime;
  const end = (index / total + overlapWords / total) / totalTime;
  const duration = Math.max(0.0001, end - start);

  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / duration;
}

function setReveal(word, local) {
  const keyword = word.classList.contains("keyword-wrapper");
  const span = word.querySelector("span");
  const shown = local > 0.02;
  const pill = local < 0.86 ? 1 : 1 - (local - 0.86) / 0.14;
  const text = local < 0.86 ? 0 : (local - 0.86) / 0.14;

  word.style.opacity = shown ? "1" : "0";
  word.style.visibility = shown ? "visible" : "hidden";
  word.style.setProperty("--bg", keyword ? String(local) : String(Math.max(0, Math.min(1, pill))));
  span.style.opacity = String(Math.max(0, Math.min(1, text)));
}

const cards = document.querySelectorAll(".icon-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (cards.length) {
  gsap.from(cards, {
    y: 72,
    opacity: 0,
    duration: 0.85,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
      toggleActions: "play reverse play reverse",
    },
  });

  if (!reduceMotion) {
    cards.forEach((card, index) => {
      const glyph = card.querySelector("svg");
      gsap.to(glyph, {
        y: index % 2 === 0 ? -3 : -2,
        duration: 2.6 + index * 0.18,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.9 + index * 0.1,
      });
    });
  }
}

document.querySelectorAll(".anim-text-container").forEach((section) => {
  const words = section.querySelectorAll(".word");
  const total = words.length;

  if (reduceMotion) {
    words.forEach((word) => {
      const span = word.querySelector("span");
      word.style.opacity = "1";
      word.style.visibility = "visible";
      word.style.setProperty("--bg", word.classList.contains("keyword-wrapper") ? "1" : "0");
      span.style.opacity = "1";
    });
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    pin: true,
    anticipatePin: 1,
    start: "top top",
    end: "+=260%",
    scrub: true,
    onUpdate(self) {
      words.forEach((word, index) => {
        setReveal(word, wordWindow(self.progress, index, total, 14));
      });
    },
  });
  words.forEach((word) => setReveal(word, 0));
});
