// POST /api/tyga — handled by the Worker in worker/index.js
// Body: { messages: [{ role: "user"|"assistant", content: string }, ...] }
// Returns: { text: string, audio: string (base64 mp3) }
//
// Secrets / vars (Cloudflare → Workers & Pages → swingview → Settings → Variables and Secrets):
//   XAI_API_KEY      required
//   XAI_CHAT_MODEL   optional, default "grok-4.7"
//   TYGA_VOICE       optional, default "carina"
//   TYGA_MAX_TURNS   optional, default 5 (user turns per conversation)

const SYSTEM_PROMPT = `You are TYGA, SwingView's AI golf swing coach, talking out loud to a visitor on the SwingView website.
You are warm, direct and confident — like a good range coach, not a chatbot.
Keep every reply to one or two short sentences (under 40 words). It will be spoken aloud, so no lists, no markdown, no emojis.
Spell your own name "Tyga" when you say it.
What SwingView does: records swings at 240 frames per second on an iPhone, tracks the body with a skeleton overlay, measures tempo, hip and chest turn, early extension and sequencing, and gives coaching grounded in those numbers. It remembers past sessions. Free to start; Pro adds unlimited analyses and a coach with full session memory. It is coming to the App Store — visitors can join the waitlist on this page.
If asked about their swing, give one practical, specific tip and invite them to record a swing in the app so you can see it. If asked something unrelated to golf or SwingView, answer briefly and steer back. Never invent prices or dates beyond what is here.`;

const ALLOWED_ORIGINS = ["https://swingview.ai", "https://www.swingview.ai"];

// Fast, non-reasoning models are tried first; grok-4.7 is the safe fallback.
// Set XAI_CHAT_MODEL to force one. The first id that works is remembered per isolate.
const MODEL_CANDIDATES = ["grok-4-2-fast-non-reasoning", "grok-4-1-fast-non-reasoning", "grok-4-fast-non-reasoning", "grok-4.7"];
let workingModel = null;

async function chat(env, messages) {
  const candidates = env.XAI_CHAT_MODEL ? [env.XAI_CHAT_MODEL] : workingModel ? [workingModel, ...MODEL_CANDIDATES.filter((m) => m !== workingModel)] : MODEL_CANDIDATES;
  let lastErr;
  for (const model of candidates) {
    const r = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      signal: AbortSignal.timeout(20000),
      headers: { Authorization: `Bearer ${env.XAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages], max_tokens: 90, temperature: 0.7 }),
    });
    if (r.ok) {
      const data = await r.json();
      workingModel = model;
      return (data.choices?.[0]?.message?.content || "").trim();
    }
    const body = (await r.text()).slice(0, 200);
    lastErr = new Error(`chat ${r.status} (${model}): ${body}`);
    // unknown / unavailable model → try the next one; anything else is a real failure
    if (!((r.status === 404 || r.status === 400 || r.status === 403) && /model/i.test(body))) break;
  }
  throw lastErr;
}

export async function handleTyga(request, env) {
  const origin = request.headers.get("Origin") || "";
  const isAllowed = ALLOWED_ORIGINS.includes(origin) || /\.pages\.dev$/.test(new URL(origin || "https://x.invalid").hostname) || /^https?:\/\/localhost(:\d+)?$/.test(origin);
  if (origin && !isAllowed) return json({ error: "forbidden" }, 403);

  if (!env.XAI_API_KEY) return json({ error: "TYGA is not configured yet." }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: "bad json" }, 400); }

  const maxTurns = Number(env.TYGA_MAX_TURNS || 5);
  const raw = Array.isArray(body?.messages) ? body.messages : [];
  const messages = raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, 400) }))
    .filter((m) => m.content.length > 0)
    .slice(-12);
  const userTurns = messages.filter((m) => m.role === "user").length;
  if (userTurns === 0 || messages[messages.length - 1].role !== "user") return json({ error: "no question" }, 400);
  if (userTurns > maxTurns) return json({ error: "limit", text: "That's the end of the preview. Grab the app and we can keep going on the range." }, 429);

  // 1) Grok reply
  let text;
  try {
    text = await chat(env, messages);
  } catch (err) {
    console.error(err);
    text = "I'm having a little trouble hearing you right now. Try me again in a second.";
  }
  if (!text) text = "Say that again? I want to make sure I get your swing right.";
  text = text.replace(/\s+/g, " ").slice(0, 400);

  // 2) Carina speaks it
  let audio = null;
  try {
    const r = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      signal: AbortSignal.timeout(15000),
      headers: { Authorization: `Bearer ${env.XAI_API_KEY}`, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text: text.replace(/\bTYGA\b/g, "Tyga"),
        voice_id: env.TYGA_VOICE || "carina",
        language: "en",
        output_format: { codec: "mp3", sample_rate: 44100, bit_rate: 96000 },
      }),
    });
    if (r.ok) audio = toBase64(await r.arrayBuffer());
    else console.error("tts", r.status, (await r.text()).slice(0, 200));
  } catch (err) {
    console.error(err);
  }

  return json({ text, audio, turnsLeft: Math.max(0, maxTurns - userTurns) });
}

export function handleOptions() {
  return new Response(null, { status: 204, headers: cors() });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...cors() } });
}
function cors() {
  return { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
}
function toBase64(buf) {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
