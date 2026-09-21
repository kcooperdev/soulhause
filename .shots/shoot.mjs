// Headless-Chrome screenshot harness for local visual review. Scratch tool.
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const URL_ = process.argv[2] ?? "http://localhost:3000/the-sprint";
const WIDTH = Number(process.argv[3] ?? 1440);
const HEIGHT = Number(process.argv[4] ?? 900);
const TAG = process.argv[5] ?? "desktop";
const OUT = new URL("./out/", import.meta.url).pathname;

const SECTIONS = [
  ["hero", ".sprint-hero"],
  ["brief", "#baltimore"],
  ["how", "#how"],
  ["vote", "#vote"],
  ["money", "#money"],
  ["coming", "#january"],
  ["footer", ".sprint-footer"],
];

await mkdir(OUT, { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--user-data-dir=" + OUT + "profile",
  "--hide-scrollbars",
  "--autoplay-policy=no-user-gesture-required",
  "about:blank",
]);
chrome.stderr.on("data", () => {});

let target;
for (let i = 0; i < 60; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const list = await res.json();
    target = list.find((t) => t.type === "page");
    if (target) break;
  } catch {}
  await sleep(250);
}
if (!target) {
  console.error("chrome did not start");
  process.exit(1);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pending = new Map();
const events = [];
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else if (msg.method) {
    events.push(msg);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const mid = ++id;
    pending.set(mid, { resolve, reject });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
const evalJs = async (expression) => {
  const { result } = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return result.value;
};

await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: 2,
  mobile: WIDTH < 700,
});

await send("Page.navigate", { url: URL_ });
await sleep(6000);

const shot = async (name, clip) => {
  const params = { format: "png", captureBeyondViewport: true };
  if (clip) params.clip = { ...clip, scale: 1 };
  const { data } = await send("Page.captureScreenshot", params);
  const file = `${OUT}${TAG}-${name}.png`;
  await writeFile(file, Buffer.from(data, "base64"));
  console.log("shot", file);
};

// Hero first, before scrolling, so the stamp is settled and in frame.
console.log(
  "STAMP",
  await evalJs(`(() => {
    const el = document.querySelector('.sprint-word--main');
    const v = document.querySelector('.sprint-hero-video');
    const r = el.getBoundingClientRect();
    return JSON.stringify({
      stampWidth: Math.round(r.width),
      viewport: innerWidth,
      pctOfViewport: Math.round((r.width / innerWidth) * 100),
      fontSize: getComputedStyle(el).fontSize,
      stampBottom: Math.round(r.bottom),
      videoReady: v?.dataset.ready,
      videoCurrentSrc: v?.currentSrc || '(none)',
      videoPaused: v?.paused,
      videoTime: v?.currentTime?.toFixed(2),
      videoDims: v ? v.videoWidth + 'x' + v.videoHeight : '-',
    });
  })()`),
);
await shot("hero", { x: 0, y: 0, width: WIDTH, height: HEIGHT });

// Trigger all reveal observers.
await evalJs(`(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 220));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 700));
  return document.body.scrollHeight;
})()`);
await sleep(1200);

for (const [name, selector] of SECTIONS) {
  if (name === "hero") continue;
  const raw = await evalJs(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return JSON.stringify({ x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height });
  })()`);
  if (!raw) {
    console.log("skip", name);
    continue;
  }
  const box = JSON.parse(raw);
  await shot(name, {
    x: Math.round(box.x),
    y: Math.round(box.y),
    width: Math.round(box.width),
    height: Math.round(Math.min(box.height, 6000)),
  });
}

console.log(
  "AUDIT",
  await evalJs(`(() => {
    const de = document.documentElement;
    const bad = [];
    for (const el of document.querySelectorAll('.sprint *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.position === 'absolute' || el.closest('.sprint-ticker, .sprint-hero-media')) continue;
      if (r.right > de.clientWidth + 2 || r.left < -2) {
        bad.push({ sel: el.tagName + '.' + String(el.className), left: Math.round(r.left), right: Math.round(r.right) });
      }
    }
    return JSON.stringify({
      docScrollW: de.scrollWidth,
      clientW: de.clientWidth,
      pageHeight: document.body.scrollHeight,
      words: document.querySelector('.sprint').innerText.trim().split(/\\s+/).length,
      offenders: bad.slice(0, 20),
    }, null, 2);
  })()`),
);

const consoleMsgs = events
  .filter((e) => e.method === "Runtime.consoleAPICalled" || e.method === "Log.entryAdded")
  .map((e) =>
    e.method === "Log.entryAdded"
      ? `[log:${e.params.entry.level}] ${e.params.entry.text} ${e.params.entry.url ?? ""}`
      : `[console:${e.params.type}] ${e.params.args.map((a) => a.value ?? a.description ?? a.type).join(" ")}`,
  );
console.log("CONSOLE\n" + consoleMsgs.join("\n"));

ws.close();
chrome.kill();
process.exit(0);
