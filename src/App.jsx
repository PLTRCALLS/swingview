import { useState } from "react";
import TygaOrb from "./TygaOrb.jsx";

// ── IMAGES (public/images) ───────────────────────────────────────────────────
const IMG = {
  heroMe: "/images/hero-me-screen.jpg",
  builtAround: "/images/built-around.jpg",
  tabCoach: "/images/tab-coach.jpg",
  tabPractice: "/images/tab-practice.jpg",
  tab3d: "/images/tab-3d-data.jpg",
  tabCompare: "/images/tab-compare.jpg",
  stepRecord: "/images/step-record.jpg",
  stepMeasure: "/images/step-measure.jpg",
  stepReview: "/images/step-review.jpg",
  stepImprove: "/images/step-improve.jpg",
  liveRange: "/images/live-range.jpg",
  liveEvents: "/images/live-events.jpg",
};

const FORMSPREE = "https://formspree.io/f/mqeybpyn";

// ── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap');

  :root {
    --accent: #4ade80;
    --accent-ink: #06120a;
    --purple: #6d3cff;
    --bg: #000;
    --card: #0c0c11;
    --card-border: #1c1b23;
    --line: #1f1e27;
    --text: #e9e6f5;
    --muted: #b9b5c9;
    --dim: #a7a3b8;
    --faint: #7a7690;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Hanken Grotesk', system-ui, -apple-system, sans-serif;
    letter-spacing: -0.01em;
    overflow-x: hidden;
  }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; cursor: pointer; }
  img { display: block; max-width: 100%; }
  ::selection { background: var(--accent); color: var(--accent-ink); }

  .wrap { max-width: 1280px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
  .section { padding-top: 112px; }
  .section-lg { padding-top: 160px; }
  .section-xl { padding-top: 200px; }

  .pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: #16151c; border: 1px solid #2b2a33; color: #c9c5d9;
    font-size: 13px; font-weight: 600; padding: 7px 14px; border-radius: 999px;
  }
  .pill .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }

  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 600; font-size: 16px; padding: 14px 26px; border-radius: 999px; border: 0;
    transition: transform .15s ease, opacity .15s ease;
  }
  .btn:hover { transform: translateY(-1px); }
  .btn-white { background: #fff; color: #0b0b10; }
  .btn-ghost { background: rgba(255,255,255,0.06); border: 1px solid #2b2a33; color: #fff; }
  .btn-sm { font-size: 15px; padding: 11px 20px; }

  h1, h2, h3 { color: #fff; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }
  .h-xl { font-size: clamp(42px, 6vw, 76px); letter-spacing: -0.035em; line-height: 1.02; }
  .h-lg { font-size: clamp(36px, 4.5vw, 56px); }
  .h-md { font-size: clamp(32px, 4vw, 52px); }
  .lead { font-size: 19px; line-height: 1.5; color: var(--muted); }

  /* NAV */
  .nav {
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    padding-top: 22px; padding-bottom: 22px; flex-wrap: wrap;
  }
  .logo { display: flex; align-items: center; color: #fff; font-weight: 700; font-size: 22px; letter-spacing: -0.02em; }
  .nav-right { display: flex; align-items: center; gap: 36px; }
  .logo-mark {
    width: 30px; height: 30px; border-radius: 8px; background: var(--accent); color: var(--accent-ink);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .nav-links { display: flex; gap: 36px; font-size: 15px; font-weight: 500; }
  .nav-links a { color: #e9e6f5; }
  .nav-links a:hover { color: #fff; }

  /* HERO */
  .hero { position: relative; overflow: hidden; padding-top: 28px; text-align: center; }
  .hero-inner { position: relative; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 24px; }
  .hero-inner p.lead { max-width: 620px; font-size: 20px; }
  .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
  .hero-note { font-size: 13px; color: var(--faint); }

  .stage {
    position: relative; max-width: 1180px; margin: 64px auto 0; padding: 56px 24px 0;
    display: flex; justify-content: center; align-items: flex-end; gap: 40px; flex-wrap: wrap; overflow: hidden;
  }
  .stage-glow {
    position: absolute; left: 0; right: 0; bottom: -200px; height: 420px; pointer-events: none;
    background: radial-gradient(ellipse at center bottom, rgba(150,100,255,0.75), rgba(0,0,0,0) 70%);
  }
  .chips { position: relative; display: flex; flex-direction: column; gap: 14px; padding-bottom: 72px; flex: 0 0 230px; width: 230px; }
  .chip { background: #0b0b10; border: 1px solid #2b2a33; border-radius: 16px; padding: 14px 18px; }
  .chip-label { font-size: 12px; color: var(--dim); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
  .chip-value { font-size: 32px; font-weight: 800; line-height: 1.1; }
  .chip-sub { font-size: 12px; color: var(--faint); }
  .chip-coach { background: linear-gradient(135deg, #6d3cff, #9b5cff); border-radius: 16px; padding: 14px 18px; color: #fff; }
  .chip-coach .chip-label { color: #fff; display: flex; align-items: center; gap: 6px; font-weight: 700; }
  .chip-coach p { font-size: 14px; line-height: 1.4; margin-top: 6px; }

  .phone {
    position: relative; width: 330px; height: 580px; border-radius: 52px 52px 0 0; background: #0b0b10;
    border: 10px solid #1d1c24; border-bottom: 0; overflow: hidden;
    box-shadow: 0 -20px 80px rgba(120,80,255,0.45), 0 0 0 1px rgba(255,255,255,0.06);
  }
  .phone img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
  .phone-fade { position: absolute; left: 0; right: 0; bottom: 0; height: 120px; background: linear-gradient(180deg, rgba(11,11,16,0) 0%, rgba(40,20,90,0.55) 100%); pointer-events: none; }


  /* TYGA ORB */
  .tyga { position: relative; margin-top: 44px; display: flex; flex-direction: column; align-items: center; gap: 0; }
  .tyga-eyebrow { font-size: 13px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--accent); }
  .tyga-title { margin-top: 10px; font-size: clamp(24px, 2.6vw, 34px); font-weight: 600; letter-spacing: -0.02em; color: #fff; }
  .tyga-stage { position: relative; width: min(1180px, 100vw); height: clamp(320px, 40vw, 500px); margin-top: 0; }
  .tyga-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .tyga-player {
    position: relative; z-index: 2; margin-top: -24px;
    display: inline-flex; align-items: center; gap: 16px;
    background: rgba(10,12,11,0.85); border: 1px solid rgba(255,255,255,0.12); color: #fff;
    padding: 10px 26px 10px 10px; border-radius: 999px; backdrop-filter: blur(12px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(74,222,128,0.08);
    transition: border-color .2s ease, box-shadow .2s ease;
  }
  .tyga-player:hover, .tyga-player.on { border-color: rgba(74,222,128,0.45); box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(74,222,128,0.18); }
  .tyga-play { width: 40px; height: 40px; border-radius: 50%; background: #fff; color: #0b0b10; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 40px; }
  .tyga-label { font-size: 16px; font-weight: 600; }
  .tyga-wave { display: inline-flex; align-items: center; gap: 3px; height: 26px; }
  .tyga-wave i { display: block; width: 3px; height: 26px; border-radius: 2px; background: var(--accent); transform-origin: center; transform: scaleY(0.2); }
  .tyga-talk { position: relative; z-index: 2; margin-top: -24px; display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; }
  .tyga-bar {
    display: flex; align-items: center; gap: 12px; width: min(560px, 100%);
    background: rgba(10,12,11,0.85); border: 1px solid rgba(255,255,255,0.12);
    padding: 8px 18px 8px 8px; border-radius: 999px; backdrop-filter: blur(12px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(74,222,128,0.08); transition: border-color .2s ease, box-shadow .2s ease;
  }
  .tyga-bar.listening { border-color: rgba(74,222,128,0.6); box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(74,222,128,0.25); }
  .tyga-bar.busy { border-color: rgba(255,255,255,0.2); }
  .tyga-mic { flex: 0 0 44px; width: 44px; height: 44px; border-radius: 50%; border: 0; background: #fff; color: #0b0b10; display: inline-flex; align-items: center; justify-content: center; transition: background .2s ease, transform .15s ease; }
  .tyga-mic:hover:not(:disabled) { transform: scale(1.05); }
  .tyga-mic:disabled { opacity: 0.5; cursor: default; }
  .tyga-bar.listening .tyga-mic { background: var(--accent); animation: tygaPulse 1.2s ease-in-out infinite; }
  @keyframes tygaPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); } 50% { box-shadow: 0 0 0 10px rgba(74,222,128,0); } }
  .tyga-form { flex: 1 1 auto; display: flex; align-items: center; gap: 6px; min-width: 0; }
  .tyga-form input { flex: 1 1 auto; min-width: 0; background: transparent; border: 0; outline: none; color: #fff; font-family: inherit; font-size: 15px; padding: 8px 4px; }
  .tyga-form input::placeholder { color: var(--faint); }
  .tyga-send { flex: 0 0 32px; width: 32px; height: 32px; border-radius: 50%; border: 0; background: rgba(255,255,255,0.1); color: #fff; display: inline-flex; align-items: center; justify-content: center; }
  .tyga-send:not(:disabled) { background: var(--accent); color: var(--accent-ink); }
  .tyga-send:disabled { opacity: 0.4; cursor: default; }
  .tyga-chips { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; max-width: 640px; }
  .tyga-chips button { background: rgba(255,255,255,0.05); border: 1px solid #2b2a33; color: #c9c5d9; font-size: 13px; font-weight: 500; padding: 8px 14px; border-radius: 999px; transition: all .15s ease; }
  .tyga-chips button:hover { border-color: #4a4860; color: #fff; }
  .tyga-cta { margin-top: 4px; }
  .tyga-sub { margin-top: 10px; font-size: 13px; color: var(--faint); }
  .tyga-caption { margin-top: 22px; min-height: 28px; font-size: 18px; max-width: 640px; text-align: center; line-height: 1.4; }
  .tyga-caption .you { color: #d4d0e0; font-style: italic; }
  .tyga-caption .ai { color: #fff; }
  .tyga-caption .soft { color: var(--faint); font-style: italic; }

  /* BUILT AROUND */
  .two-col { display: flex; gap: 64px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
  .two-col .copy { flex: 1 1 460px; min-width: 280px; display: flex; flex-direction: column; gap: 26px; }
  .two-col .copy .strong { font-size: 21px; line-height: 1.4; font-weight: 600; color: #fff; max-width: 440px; }
  .two-col .copy .soft { font-size: 21px; line-height: 1.45; color: #9a97a8; max-width: 600px; }
  .square-photo { flex: 0 0 470px; width: 470px; height: 470px; border-radius: 24px; object-fit: cover; }

  /* TABS */
  .center { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 18px; max-width: 760px; margin: 0 auto; }
  .tabs { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 40px; }
  .tab {
    min-width: 190px; min-height: 92px; border-radius: 999px; padding: 18px 28px;
    font-size: 20px; font-weight: 600; line-height: 1.25; white-space: pre-line;
    background: transparent; border: 1px solid #2b2a33; color: #b9b5c9; transition: all .2s ease;
  }
  .tab:hover { border-color: #4a4860; color: #fff; }
  .tab.on { background: #fff; border-color: #fff; color: #0b0b10; }

  .panel {
    width: 100%; max-width: 1200px; margin: 40px auto 0; border-radius: 20px;
    background: radial-gradient(ellipse at 92% 115%, rgba(96,48,190,0.55) 0%, rgba(96,48,190,0) 55%), #09071a;
    border: 1px solid #17132e; padding: 22px; display: flex; gap: 88px; align-items: center; flex-wrap: wrap; text-align: left;
  }
  .panel img { flex: 0 1 446px; min-width: 280px; width: 446px; height: 446px; border-radius: 16px; object-fit: cover; object-position: 55% 48%; }
  .panel .copy { flex: 1 1 320px; min-width: 260px; display: flex; flex-direction: column; gap: 14px; padding: 16px 24px 16px 0; }
  .panel h3 { font-size: 26px; letter-spacing: -0.02em; }
  .panel p { font-size: 21px; line-height: 1.45; color: #b3afc4; max-width: 400px; }

  .features { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 40px; text-align: left; }
  .feature { background: var(--card); border: 1px solid var(--card-border); border-radius: 20px; padding: 28px; display: flex; flex-direction: column; gap: 16px; }
  .feature .icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid #262530; color: #c9c5d9; display: inline-flex; align-items: center; justify-content: center; }
  .feature h4 { margin-top: 6px; font-size: 19px; font-weight: 700; color: #fff; }
  .feature p { font-size: 15px; line-height: 1.55; color: var(--dim); }

  /* STEPS */
  .steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; margin-top: 56px; }
  .step { display: flex; flex-direction: column; gap: 16px; }
  .step-num { width: 44px; height: 44px; border-radius: 999px; background: #1d1c24; color: #fff; font-weight: 700; font-size: 15px; display: inline-flex; align-items: center; justify-content: center; }
  .step h3 { font-size: 26px; letter-spacing: -0.02em; }
  .step p { font-size: 17px; line-height: 1.5; color: #c9c5d9; min-height: 78px; }
  .step-img { position: relative; height: 300px; border-radius: 24px; overflow: hidden; border: 1px solid #2a2250; }
  .step-img img { width: 100%; height: 100%; object-fit: cover; }

  /* STATS */
  .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
  .stat { background: #0f0e16; border: 1px solid var(--line); border-radius: 24px; padding: 32px; display: flex; flex-direction: column; gap: 8px; }
  .stat-num { font-size: 56px; font-weight: 800; letter-spacing: -0.03em; color: #fff; line-height: 1; }
  .stat-num span { font-size: 22px; color: var(--dim); font-weight: 600; }
  .stat p { font-size: 15px; color: var(--dim); line-height: 1.5; }

  /* COACH */
  .coach {
    border-radius: 32px; background: linear-gradient(120deg, #07060c 0%, #0c0a1c 50%, #1d1148 100%);
    border: 1px solid #2a2250; padding: 64px; display: flex; gap: 56px; align-items: center; flex-wrap: wrap;
  }
  .coach .copy { flex: 1 1 420px; min-width: 280px; display: flex; flex-direction: column; gap: 20px; }
  .coach .pill { align-self: flex-start; background: rgba(155,92,255,0.16); border-color: rgba(155,92,255,0.5); color: #d9c7ff; }
  .coach ul { list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 17px; }
  .coach li { display: flex; gap: 12px; align-items: flex-start; }
  .check { margin-top: 3px; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); color: var(--accent-ink); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .chat { flex: 0 1 380px; min-width: 300px; margin: 0 auto; }
  .chat-phone { border-radius: 40px; background: #0b0b10; border: 10px solid #1d1c24; padding: 28px 18px 22px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 30px 80px rgba(120,80,255,0.3); }
  .bubble { font-size: 14px; line-height: 1.5; padding: 12px 14px; max-width: 92%; }
  .bubble.me { align-self: flex-end; max-width: 85%; background: var(--accent); color: var(--accent-ink); border-radius: 18px 18px 4px 18px; padding: 10px 14px; }
  .bubble.ai { align-self: flex-start; background: #1d1c24; color: var(--text); border-radius: 18px 18px 18px 4px; }
  .bubble.tip { align-self: flex-start; background: linear-gradient(135deg, #6d3cff, #9b5cff); color: #fff; border-radius: 18px 18px 18px 4px; }
  .chat-input { margin-top: 6px; display: flex; gap: 8px; align-items: center; background: #15131f; border: 1px solid #2b2a33; border-radius: 999px; padding: 8px 8px 8px 16px; }
  .chat-input > span:first-child { flex: 1; font-size: 14px; color: var(--faint); }
  .chat-send { flex: 0 0 32px; width: 32px; height: 32px; border-radius: 50%; background: #fff; color: #0b0b10; display: inline-flex; align-items: center; justify-content: center; }

  /* LIVE */
  .live-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 40px; }
  .live-card {
    position: relative; display: flex; flex-direction: column; justify-content: flex-end; gap: 10px; min-height: 420px;
    border-radius: 28px; padding: 32px; color: #fff; background: #0b0b10; border: 1px solid var(--line); overflow: hidden;
  }
  .live-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
  .live-card:hover img { transform: scale(1.03); }
  .live-card .shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.88) 100%); }
  .live-card .tag { position: absolute; top: 24px; left: 24px; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 999px; }
  .live-card .tag.green { color: var(--accent-ink); background: var(--accent); }
  .live-card .tag.purple { color: #fff; background: var(--purple); }
  .live-card .meta { position: relative; font-size: 13px; color: #d4d0e0; font-weight: 600; }
  .live-card .title { position: relative; font-size: 30px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }

  /* PRICING */
  .toggle-row { display: flex; align-items: center; gap: 14px; font-size: 20px; font-weight: 600; margin-top: 40px; justify-content: center; }
  .toggle-row button.txt { background: none; border: 0; font-size: inherit; font-weight: inherit; padding: 8px; }
  .switch { width: 68px; height: 38px; border-radius: 999px; background: #fff; border: 0; position: relative; padding: 0; }
  .switch .knob { position: absolute; top: 5px; width: 28px; height: 28px; border-radius: 50%; background: #0b0b10; transition: left .2s ease; }
  .plans { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 40px; }
  .plan { background: linear-gradient(180deg, #0f0e16, #0b0b10); border: 1px solid var(--line); border-radius: 28px; padding: 36px; display: flex; flex-direction: column; gap: 22px; position: relative; }
  .plan.pro { background: linear-gradient(160deg, #130e2a 0%, #0f0e16 40%, #0b0b10 100%); border-color: #4a33a8; box-shadow: 0 0 0 1px rgba(109,60,255,0.2), 0 30px 90px rgba(109,60,255,0.25); }
  .plan-name { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 17px; color: #fff; }
  .plan-price { font-size: 56px; font-weight: 800; letter-spacing: -0.03em; color: #fff; line-height: 1; }
  .plan-price span { font-size: 18px; color: var(--dim); font-weight: 600; }
  .plan p { font-size: 17px; color: var(--muted); line-height: 1.5; }
  .plan .btn { width: 100%; padding: 15px; }
  .plan h5 { font-weight: 700; font-size: 17px; color: #fff; }
  .plan ul { list-style: none; display: flex; flex-direction: column; gap: 14px; font-size: 17px; color: var(--muted); }
  .plan.pro ul { color: var(--text); }
  .plan li { display: flex; gap: 12px; }
  .plan li b { font-weight: 400; }
  .plan .badge { position: absolute; top: 24px; right: 24px; font-size: 12px; font-weight: 700; color: var(--accent-ink); background: var(--accent); padding: 6px 12px; border-radius: 999px; }
  .fine { font-size: 14px; color: var(--faint); text-align: center; margin-top: 24px; }

  /* FAQ */
  .faq { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; }
  .faq-list { display: flex; flex-direction: column; gap: 10px; }
  .faq-item { background: #0f0e16; border: 1px solid var(--line); border-radius: 20px; overflow: hidden; }
  .faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; text-align: left; padding: 22px 26px; font-size: 19px; font-weight: 600; color: #fff; }
  .faq-q span:last-child { font-size: 26px; color: var(--dim); line-height: 1; }
  .faq-a { padding: 0 26px 24px; font-size: 17px; line-height: 1.55; color: var(--muted); }

  /* WAITLIST */
  .waitlist {
    position: relative; border-radius: 32px; overflow: hidden; border: 1px solid #2a2250;
    background: linear-gradient(180deg, #0c0a18 0%, #1b0f3d 60%, #4a26a8 100%);
    padding: 96px 24px 112px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 22px;
  }
  .waitlist-glow { position: absolute; left: 0; right: 0; bottom: -260px; height: 500px; background: radial-gradient(ellipse at center bottom, rgba(190,150,255,0.95), rgba(0,0,0,0) 70%); pointer-events: none; }
  .waitlist h2 { position: relative; font-size: clamp(40px, 5.5vw, 64px); letter-spacing: -0.035em; line-height: 1.02; }
  .waitlist p { position: relative; max-width: 560px; font-size: 19px; line-height: 1.5; color: #d9d4ee; }
  .waitlist form { position: relative; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 8px; width: 100%; }
  .waitlist input {
    flex: 1 1 260px; max-width: 360px; font-family: inherit; font-size: 16px; padding: 15px 20px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.25); background: rgba(0,0,0,0.45); color: #fff; outline: none;
  }
  .waitlist input::placeholder { color: var(--faint); }
  .waitlist .btn { background: var(--accent); color: var(--accent-ink); }
  .waitlist .thanks { position: relative; font-size: 18px; color: #fff; font-weight: 600; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

  /* FOOTER */
  footer { padding: 96px 0 40px; }
  .foot-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px; }
  .foot-col { display: flex; flex-direction: column; gap: 12px; font-size: 15px; }
  .foot-col b { color: #fff; font-weight: 700; }
  .foot-col a { color: var(--dim); }
  .foot-col a:hover { color: #fff; }
  .foot-col p { font-size: 14px; line-height: 1.55; color: var(--faint); }
  .foot-bottom { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 13px; color: var(--faint); border-top: 1px solid var(--line); padding-top: 24px; margin-top: 48px; }

  /* RESPONSIVE */
  @media (max-width: 1100px) {
    .steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .features { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .chips { display: none; }
    .square-photo { flex-basis: 100%; width: 100%; max-width: 560px; height: auto; aspect-ratio: 1; }
    .panel { gap: 40px; }
    .panel img { flex-basis: 100%; width: 100%; height: auto; aspect-ratio: 1; }
    .panel .copy { padding: 8px; }
    .coach { padding: 40px; }
    .foot-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 700px) {
    .wrap { padding-left: 16px; padding-right: 16px; }
    .section { padding-top: 80px; }
    .section-lg { padding-top: 104px; }
    .section-xl { padding-top: 120px; }
    .nav-links { display: none; }
    .hero { padding-top: 40px; }
    .stage { margin-top: 40px; padding: 32px 0 0; }
    .tyga-stage { height: 300px; }
    .tyga-player { padding-right: 16px; gap: 10px; }
    .tyga-wave { display: none; }
    .tyga-bar { padding-right: 10px; }
    .tyga-caption { font-size: 16px; padding: 0 8px; }
    .steps, .features, .stats, .live-grid, .plans, .foot-grid { grid-template-columns: 1fr; }
    .step p { min-height: 0; }
    .tab { min-width: 150px; min-height: 76px; font-size: 17px; padding: 14px 22px; }
    .coach { padding: 28px 20px; }
    .two-col .copy .strong, .two-col .copy .soft, .panel p { font-size: 18px; }
    .live-card { min-height: 340px; }
    .live-card .title { font-size: 26px; }
    .plan { padding: 28px 22px; }
    .plan-price, .stat-num { font-size: 44px; }
    .waitlist { padding: 64px 20px 80px; border-radius: 24px; }
    .faq-q { font-size: 17px; padding: 18px 20px; }
    .faq-a { padding: 0 20px 20px; font-size: 16px; }
  }
`;

// ── ICONS ────────────────────────────────────────────────────────────────────
const I = {
  logo: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16c4-9 10-9 16-4" /><circle cx="18" cy="7" r="2" /></svg>
  ),
  spark: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></svg>,
  check: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>,
  up: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>,
  cam: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="14" height="12" rx="2" /><path d="M17 10l4-2v8l-4-2z" /></svg>,
  body: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="4" r="2" /><path d="M12 6v6l-4 8M12 12l4 8M7 9l5 1 5-1" /></svg>,
  wave: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>,
  chat: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5.1A8 8 0 1 1 21 12z" /></svg>,
  trend: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h16M8 15l4-5 3 3 5-7" /></svg>,
  split: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="8" height="16" rx="2" /><rect x="13" y="4" width="8" height="16" rx="2" /></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.6L22 9.3l-5.4 4.8L18.2 21 12 17.3 5.8 21l1.6-6.9L2 9.3l7.1-.7z" /></svg>,
  bolt: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7z" /></svg>,
};

// ── CONTENT ──────────────────────────────────────────────────────────────────
const TABS = [
  { label: "AI\nCoach", title: "Personalized AI Coach", img: IMG.tabCoach, body: "TYGA is your AI swing coach, using your measurements to answer questions, uncover insights, and guide you toward smarter improvement." },
  { label: "In Depth\n3D Data", title: "In Depth 3D Data", img: IMG.tab3d, body: "Turn a simple video from your phone into detailed swing data, giving you a clearer picture of how your body moves throughout the swing." },
  { label: "Automated\nPractice", title: "Automated Practice", img: IMG.tabPractice, body: "Set the phone down and hit balls. Every swing is detected, trimmed and measured automatically — nothing to tap between shots." },
  { label: "Compare\nSwings", title: "Compare Swings", img: IMG.tabCompare, body: "Put today next to last month, or next to a reference swing, frame for frame at the real frame rate." },
];

const FEATURES = [
  { icon: I.cam, title: "240 fps capture", body: "High-frame-rate video from your iPhone's back camera, so the downswing is dozens of frames instead of three." },
  { icon: I.body, title: "Skeleton tracking", body: "Full-body pose on every frame, so you can see hip, shoulder and hand positions instead of guessing." },
  { icon: I.wave, title: "Phase breakdown", body: "Backswing, downswing and follow-through timed to the millisecond. Tempo, hip lead and sequencing on each swing." },
  { icon: I.chat, title: "A coach with memory", body: "Ask anything about your swing. The coach reads your measurements and your history, and answers in plain language." },
  { icon: I.trend, title: "Sessions that add up", body: "Every swing is saved and trimmed. Watch a tendency change over weeks, not just within one bucket of balls." },
  { icon: I.split, title: "Replay and compare", body: "Frame-step at the real frame rate, slow to a quarter speed, and compare a reference swing side by side." },
];

const STEPS = [
  { n: "01", title: "Record", body: "Lean your iPhone against your bag, face-on or down the line. SwingView records at 240 fps and detects each swing automatically.", img: IMG.stepRecord, alt: "SwingView recording a swing at 240 fps" },
  { n: "02", title: "Measure", body: "Pose tracking runs on every frame. Tempo, hip lead, club path and a dozen more measurements are pulled from the video.", img: IMG.stepMeasure, alt: "Swing analysis with skeleton overlay, tempo, pelvis and chest turn" },
  { n: "03", title: "Review", body: "Your swing is on screen the second you finish — scrub it, slow it, see the skeleton. Coaching fits in below while you keep hitting.", img: IMG.stepReview, alt: "Swing review with frame scrubber and TYGA coach tip" },
  { n: "04", title: "Improve", body: "Ask the coach what to work on. It knows this swing and the last fifty, so it can tell you what's actually changing and what isn't.", img: IMG.stepImprove, alt: "TYGA Coach screen with insights and next drill" },
];

const FAQS = [
  { q: "Do I need any equipment?", a: "Just your iPhone and something to lean it on. SwingView records at 240 fps from the back camera and runs pose tracking on-device, so there is no sensor, no launch monitor and no subscription hardware." },
  { q: "How is this different from a launch monitor?", a: "A launch monitor measures the ball and club. SwingView measures your body — turn, tilt, sequencing and tempo — which is what you actually change when you practise." },
  { q: "Is the coaching generic?", a: "No. Every answer is grounded in the measurements from your swing and your history, and the coach cites the number behind each claim." },
  { q: "How long does an analysis take?", a: "Under a minute from the moment you finish the swing to full coaching. Replay and skeleton overlay are instant." },
  { q: "Is it only for good golfers?", a: "It is built for everyday golfers. If you can hit a bucket at the range, SwingView can tell you what your body is doing." },
  { q: "What about my video and data?", a: "Your swings stay in your account and are used only to analyse and coach you. You can delete any session, or everything, at any time." },
];

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const [yearly, setYearly] = useState(true);
  const [open, setOpen] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch(FORMSPREE, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email }) });
    } catch (err) {
      console.error(err);
    }
    setSubmitted(true);
  };

  const t = TABS[tab];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <header className="wrap nav">
        <a href="#top" className="logo">SwingView</a>
        <div className="nav-right">
          <nav className="nav-links">
            <a href="#how">How it works</a><a href="#tyga">TYGA</a>
          </nav>
          <a href="#waitlist" className="btn btn-white btn-sm">Get the app</a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="hero wrap">
        <div className="hero-inner">
          <span className="pill"><span className="dot" />Now in beta on iPhone</span>
          <h1 className="h-xl">A swing coach that has actually seen your swing.</h1>
          <p className="lead">SwingView records every swing at 240 frames per second, measures what your body did, and gives you a coach that remembers all of it.</p>
          <div className="hero-cta">
            <a href="#waitlist" className="btn btn-white">Get the app</a>
            <a href="#how" className="btn btn-ghost">See how it works</a>
          </div>
          <p className="hero-note">iPhone · Free to start · No extra hardware</p>
        </div>

        <div id="tyga"><TygaOrb /></div>
      </section>

      {/* BUILT AROUND */}
      <section id="features" className="wrap section-xl">
        <div className="two-col">
          <div className="copy">
            <h2 className="h-md">Measurement first,<br />advice second.</h2>
            <p className="strong">Golf advice is everywhere. The hard part is knowing what actually works with your swing.</p>
            <p className="soft">Instead of generic tips, get feedback grounded in your own measurements — every swing at 240 fps, remembered by a coach that has seen them all.</p>
          </div>
          <img className="square-photo" src={IMG.builtAround} alt="Golfer at the range holding an iPhone showing SwingView's Me screen" />
        </div>
      </section>

      {/* TABS */}
      <section className="wrap section-xl">
        <div className="center">
          <h2 className="h-lg">The smarter way to improve</h2>
          <p className="lead">A data-driven feedback loop that keeps your practice purposeful and shows you when you're getting better</p>
        </div>
        <div className="tabs" role="tablist">
          {TABS.map((x, i) => (
            <button key={x.title} role="tab" aria-selected={i === tab} className={"tab" + (i === tab ? " on" : "")} onClick={() => setTab(i)}>{x.label}</button>
          ))}
        </div>
        <div className="panel">
          <img src={t.img} alt={t.title} />
          <div className="copy">
            <h3>{t.title}</h3>
            <p>{t.body}</p>
          </div>
        </div>

        <div className="features">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature">
              <span className="icon">{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section id="how" className="wrap section-lg">
        <div className="center">
          <h2 className="h-lg">Set your phone down. Hit balls.</h2>
          <p className="lead">There's nothing to tap between shots. The whole loop fits inside a normal range session.</p>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.n} className="step">
              <span className="step-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="step-img"><img src={s.img} alt={s.alt} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="wrap section">
        <div className="stats">
          <div className="stat"><div className="stat-num">240<span> fps</span></div><p>Capture rate on supported iPhones</p></div>
          <div className="stat"><div className="stat-num">133</div><p>Body keypoints tracked per frame</p></div>
          <div className="stat"><div className="stat-num">19</div><p>Swing measurements per analysis</p></div>
          <div className="stat"><div className="stat-num">&lt;60<span> s</span></div><p>From swing to full coaching</p></div>
        </div>
      </section>

      {/* COACH */}
      <section className="wrap section-lg">
        <div className="coach">
          <div className="copy">
            <span className="pill">AI coach</span>
            <h2 className="h-md">Ask it why the ball went left.</h2>
            <p className="lead">The coach isn't a chatbot bolted onto a video player. It reads the same measurements you see — on this swing and every previous one — and answers like a coach who's been watching all season.</p>
            <ul>
              <li><span className="check">{I.check}</span>Remembers your sessions, so it can tell you what's actually changed</li>
              <li><span className="check">{I.check}</span>Explains in plain language, with the number behind every claim</li>
              <li><span className="check">{I.check}</span>Gives one thing to work on, not a list of ten</li>
            </ul>
          </div>
          <div className="chat">
            <div className="chat-phone">
              <div style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>Coach</div>
              <div style={{ fontSize: 12, color: "var(--faint)", marginTop: -8 }}>Knows your last 51 swings</div>
              <div className="bubble me">Why do I keep pulling the 7 iron?</div>
              <div className="bubble ai">Your hips are opening 0.04 s earlier than your shoulders at transition compared with Tuesday — the club gets stuck and your hands flip it shut. Your tempo is fine (2.9:1).</div>
              <div className="bubble tip"><b>Try this:</b> pause at the top for one count on the next five swings. I'll flag the ones where sequencing holds.</div>
              <div className="chat-input"><span>Ask about this swing…</span><span className="chat-send">{I.up}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* IN PERSON */}
      <section id="inperson" className="wrap section-lg">
        <div className="center">
          <span className="pill">SwingView Live</span>
          <h2 className="h-lg">See it in person.</h2>
          <p className="lead">We bring the full setup to ranges and events across the GTA. Hit a bucket, leave with your numbers.</p>
        </div>
        <div className="live-grid">
          <a href="#waitlist" className="live-card">
            <img src={IMG.liveRange} alt="Covered driving range bay at sunset" />
            <span className="shade" />
            <span className="tag green">Range sessions</span>
            <span className="meta">Mississauga · Oakville · GTA</span>
            <span className="title">Book a SwingView Live session at your range</span>
          </a>
          <a href="#waitlist" className="live-card">
            <img src={IMG.liveEvents} alt="Golfers at a clubhouse event at sunset" />
            <span className="shade" />
            <span className="tag purple">Events</span>
            <span className="meta">Corporate days · Tournaments · Demo days</span>
            <span className="title">Bring 3D swing analysis to your event</span>
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="wrap section-lg">
        <div className="center">
          <span className="pill">Pricing</span>
          <h2 className="h-lg">Start free. Upgrade when it earns it.</h2>
          <p className="lead">Record and review as much as you like for free. Pay only for the analysis and coaching.</p>
        </div>
        <div className="toggle-row">
          <button className="txt" style={{ color: yearly ? "var(--faint)" : "#fff" }} onClick={() => setYearly(false)}>Monthly</button>
          <button className="switch" aria-label="Toggle yearly billing" onClick={() => setYearly((v) => !v)}><span className="knob" style={{ left: yearly ? 35 : 5 }} /></button>
          <button className="txt" style={{ color: yearly ? "#fff" : "var(--faint)" }} onClick={() => setYearly(true)}>Yearly</button>
        </div>
        <div className="plans">
          <div className="plan">
            <div className="plan-name"><span style={{ color: "#4fd1ff" }}>{I.star}</span>Free</div>
            <div className="plan-price">$0<span> /month</span></div>
            <p>Everything you need to see your swing properly. Great for trying before you commit.</p>
            <a href="#waitlist" className="btn btn-ghost">Get the app</a>
            <h5>Features included:</h5>
            <ul>
              {["Unlimited 240 fps recording", "Swing detection and trimming", "Skeleton overlay on replay", "Frame-step and slow motion", "Session history", "3 full analyses a month"].map((x) => <li key={x}><span style={{ color: "#4fd1ff" }}>●</span><b>{x}</b></li>)}
            </ul>
          </div>
          <div className="plan pro">
            <span className="badge">Launch price</span>
            <div className="plan-name"><span style={{ color: "#ffb04a" }}>{I.bolt}</span>Pro</div>
            <div className="plan-price">{yearly ? "$59.99" : "$6.99"}<span> {yearly ? "/year" : "/month"}</span></div>
            <p>Unlimited analysis and a coach that remembers everything.</p>
            <a href="#waitlist" className="btn btn-white">Get the app</a>
            <h5>Features included:</h5>
            <ul>
              {["Everything in Free", "Unlimited full analyses", "Phase timing, tempo and sequencing on every swing", "Coach with full session memory", "Compare against reference swings", "Share cards"].map((x) => <li key={x}><span style={{ color: "#b58cff" }}>●</span><b>{x}</b></li>)}
            </ul>
          </div>
        </div>
        <p className="fine">Prices in CAD. Pro is billed through the App Store and can be cancelled any time.</p>
      </section>

      {/* FAQ */}
      <section id="faq" className="wrap section-lg">
        <div className="faq">
          <h2 className="h-lg" style={{ textAlign: "center" }}>Questions</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={f.q} className="faq-item">
                <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span><span>{open === i ? "×" : "+"}</span>
                </button>
                {open === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="wrap section-lg">
        <div className="waitlist">
          <div className="waitlist-glow" />
          <h2>See what you can't feel.</h2>
          <p>SwingView is coming to the App Store. Leave your email and we'll let you know the day it's live.</p>
          {submitted ? (
            <p className="thanks">You're on the list — we'll email you on launch day.</p>
          ) : (
            <form onSubmit={submit}>
              <label htmlFor="email" className="sr">Email address</label>
              <input id="email" type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="btn">Join the waitlist</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <span className="logo">SwingView</span>
            <p>AI swing analysis and coaching for everyday golfers. Built in Mississauga, Ontario.</p>
          </div>
          <div className="foot-col"><b>Product</b><a href="#how">How it works</a><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div>
          <div className="foot-col"><b>In person</b><a href="#inperson">SwingView Live sessions</a><a href="#inperson">Book a range day</a></div>
          <div className="foot-col"><b>Follow</b><a href="https://www.instagram.com/swingviewai/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.tiktok.com/@swingview.ai" target="_blank" rel="noreferrer">TikTok</a><a href="https://www.youtube.com/@SwingView" target="_blank" rel="noreferrer">YouTube</a></div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} SwingView · Predictive Growth Labs</span>
          <a href="/privacy.html">Privacy policy</a>
        </div>
      </footer>
    </>
  );
}
