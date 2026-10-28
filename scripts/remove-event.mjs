#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentPath = join(root, "lib/content.ts");

function usage() {
  console.log(`Remove a published event from lib/content.ts.

Usage:
  npm run remove-event -- <event-id>
  npm run remove-event -- --list

Example:
  npm run remove-event -- spark-labs-demo-day
`);
}

function listIds(source) {
  return [...source.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((match) => match[1]);
}

function extractImage(block) {
  const match = block.match(/image:\s*"([^"]+)"/);
  return match?.[1] ?? null;
}

function removeObjectWithId(source, id) {
  const needle = `id: "${id}"`;
  const idx = source.indexOf(needle);
  if (idx === -1) return null;

  let start = idx;
  while (start > 0 && source[start] !== "{") start -= 1;
  if (source[start] !== "{") return null;

  let depth = 0;
  let end = start;
  for (; end < source.length; end += 1) {
    const char = source[end];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        end += 1;
        break;
      }
    }
  }

  const block = source.slice(start, end);
  let removeEnd = end;
  if (source[removeEnd] === ",") removeEnd += 1;
  while (source[removeEnd] === "\n" || source[removeEnd] === "\r") removeEnd += 1;

  let removeStart = start;
  while (removeStart > 0 && (source[removeStart - 1] === " " || source[removeStart - 1] === "\t")) {
    removeStart -= 1;
  }

  return {
    next: source.slice(0, removeStart) + source.slice(removeEnd),
    block,
  };
}

const arg = process.argv[2];

if (!arg || arg === "--help" || arg === "-h") {
  usage();
  process.exit(arg ? 0 : 1);
}

const source = readFileSync(contentPath, "utf8");

if (arg === "--list") {
  const ids = listIds(source);
  if (ids.length === 0) {
    console.log("No events in sceneEvents.");
  } else {
    console.log("Events:");
    for (const id of ids) console.log(`  ${id}`);
  }
  process.exit(0);
}

const result = removeObjectWithId(source, arg);
if (!result) {
  console.error(`No event with id "${arg}".`);
  console.error("Run npm run remove-event -- --list to see ids.");
  process.exit(1);
}

writeFileSync(contentPath, result.next);

const image = extractImage(result.block);
if (image?.startsWith("/events/")) {
  const stillUsed = result.next.includes(`image: "${image}"`);
  const filePath = join(root, "public", image.replace(/^\//, ""));
  if (!stillUsed && existsSync(filePath)) {
    unlinkSync(filePath);
    console.log(`Removed cover ${image}`);
  }
}

console.log(`Removed event "${arg}" from lib/content.ts`);
console.log("Calendar counters update from sceneEvents length per day.");
