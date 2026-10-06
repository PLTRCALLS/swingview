#!/usr/bin/env node
// Generates the "Hear TYGA in action" demo clips with xAI text-to-speech.
//
//   XAI_API_KEY=xai-... node --dns-result-order=ipv4first scripts/make-tyga-demo.mjs
//
// Writes public/audio/tyga-intro.mp3 (TYGA's greeting, voice "carina").
// Add more entries to LINES and the site plays them in sequence, one caption each.
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

const LINES = [
  { file: "tyga-intro.mp3", voice: TYGA_VOICE, speed: 1.0, text: "Hi, I'm Tyga. Ready to analyze your swing, or get some tips?" },
];

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "audio");
await mkdir(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function synthesize(line, attempt = 1) {
  try {
    const res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", Accept: "audio/mpeg", Connection: "close" },
      body: JSON.stringify({
        text: line.text,
        voice_id: line.voice,
        language: "en",
        speed: line.speed,
        output_format: { codec: "mp3", sample_rate: 44100, bit_rate: 128000 },
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`xAI returned ${res.status}${body ? `: ${body.slice(0, 300)}` : ""}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) throw new Error(`response too small (${buf.length} bytes) — not audio`);
    return buf;
  } catch (err) {
    if (attempt >= 4) throw err;
    process.stdout.write(`retry ${attempt} (${err.message.split("\n")[0]}) … `);
    await sleep(1500 * attempt);
    return synthesize(line, attempt + 1);
  }
}

for (const line of LINES) {
  process.stdout.write(`→ ${line.file} (${line.voice}) … `);
  const buf = await synthesize(line);
  await writeFile(join(outDir, line.file), buf);
  console.log(`${(buf.length / 1024).toFixed(0)} KB`);
}

console.log(`\nDone. Clips are in public/audio/. Commit them and push — the site picks them up automatically.`);
