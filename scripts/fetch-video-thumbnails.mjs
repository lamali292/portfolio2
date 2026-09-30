// Downloads the YouTube thumbnail of every video in lib/videos.ts into
// public/video-thumbs/ at build time, so the page can show a thumbnail
// without visitors contacting YouTube before they click play.
//
// Never fails the build: if a download is not possible (offline, blocked),
// that video simply keeps the plain play-button placeholder.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "video-thumbs");
const source = readFileSync(join(root, "lib", "videos.ts"), "utf8");
const ids = [...new Set([...source.matchAll(/id:\s*"([\w-]{11})"/g)].map((m) => m[1]))];

mkdirSync(outDir, { recursive: true });

for (const id of ids) {
  const target = join(outDir, `${id}.jpg`);
  if (existsSync(target)) continue;
  let saved = false;
  for (const name of ["maxresdefault", "hqdefault"]) {
    try {
      const res = await fetch(`https://i.ytimg.com/vi/${id}/${name}.jpg`, {
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) continue;
      writeFileSync(target, Buffer.from(await res.arrayBuffer()));
      saved = true;
      break;
    } catch {
      // try the next size, or give up on this video below
    }
  }
  console.log(`${saved ? "saved  " : "missing"} thumbnail ${id}`);
}
