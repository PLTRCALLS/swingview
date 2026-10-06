#!/usr/bin/env node
// Generates the "Hear TYGA in action" demo clips with xAI text-to-speech.
//
//   XAI_API_KEY=xai-... node scripts/make-tyga-demo.mjs
//
// Writes public/audio/tyga-q.mp3 (the golfer's question) and
// public/audio/tyga-1.mp3 … tyga-3.mp3 (TYGA's answer, voice "carina").
// The site plays them in sequence and shows each line as a caption.
// Edit LINES below and re-run to change the script.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const KEY = process.env.XAI_API_KEY;
if (!KEY) {
  console.error("Set XAI_API_KEY first, e.g.  XAI_API_KEY=xai-... node scripts/make-tyga-demo.mjs");
  process.exit(1);
}

const TYGA_VOICE = process.env.TYGA_VOICE || "carina";
const GOLFER_VOICE = process.env.GOLFER_VOICE || "rex";

const LINES = [
  { file: "tyga-q.mp3", voice: GOLFER_VOICE, speed: 1.0, text: "TYGA, what should I focus on next?" },
  { file: "tyga-1.mp3", voice: TYGA_VOICE, speed: 1.0, text: "Your tempo has been steady at three point oh to one all week. That's not the problem." },
  { file: "tyga-2.mp3", voice: TYGA_VOICE, speed: 1.0, text: "Your hips stood up about three inches before impact on your last six swings." },
  { file: "tyga-3.mp3", voice: TYGA_VOICE, speed: 1.0, text: "Let's work on staying in posture. Try the chair drill for your next ten balls." },
];

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "audio");
await mkdir(outDir, { recursive: true });

for (const line of LINES) {
  process.stdout.write(`→ ${line.file} (${line.voice}) … `);
  const res = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      text: line.text,
      voice_id: line.voice,
      language: "en",
      speed: line.speed,
      output_format: { codec: "mp3", sample_rate: 44100, bit_rate: 128000 },
    }),
  });
  if (!res.ok) {
    console.error(`\nxAI returned ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(outDir, line.file), buf);
  console.log(`${(buf.length / 1024).toFixed(0)} KB`);
}

console.log(`\nDone. Clips are in public/audio/. Commit them and push — the site picks them up automatically.`);
