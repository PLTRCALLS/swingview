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
};

const FORMSPREE = "https://formspree.io/f/mqeybpyn";
// Paste the App Store link here on launch day. Until it's set, every "Get the app" button scrolls to the download section.
const APP_STORE_URL = "";
const APP_HREF = APP_STORE_URL || "#get";
const APP_LINK = APP_STORE_URL ? { target: "_blank", rel: "noreferrer" } : {};

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
  .section-xl { padding-top: 160px; }

  .quotes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 40px; }
  .quote { background: #0e0d14; border: 1px solid var(--line); border-radius: 20px; padding: 28px 28px 24px; display: flex; flex-direction: column; gap: 18px; }
  .quote p { font-size: 17px; line-height: 1.5; color: #e4e1ee; letter-spacing: -0.01em; }
  .quote p::before { content: "“"; color: var(--accent); margin-right: 2px; }
  .quote p::after { content: "”"; color: var(--accent); margin-left: 2px; }
  .quote cite { font-style: normal; font-size: 13px; color: var(--faint); margin-top: auto; }
  .quote cite b { color: var(--dim); font-weight: 600; }

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
  .navbar { position: sticky; top: 0; z-index: 50; background: rgba(0,0,0,0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
  .nav {
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    padding-top: 16px; padding-bottom: 16px; flex-wrap: wrap;
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
  .tyga-caption { margin-top: 16px; min-height: 28px; font-size: 18px; max-width: 640px; text-align: center; line-height: 1.4; }
  .tyga-caption .you { color: #d4d0e0; font-style: italic; }
  .tyga-caption .ai { color: #fff; }
  .tyga-caption .soft { color: var(--faint); font-style: italic; }

  /* BUILT AROUND */
  .two-col { display: flex; gap: 64px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
  .two-col .copy { flex: 1 1 460px; min-width: 280px; display: flex; flex-direction: column; gap: 24px; }
  .two-col .copy .strong { font-size: 21px; line-height: 1.4; font-weight: 600; color: #fff; max-width: 440px; }
  .two-col .copy .soft { font-size: 21px; line-height: 1.45; color: #9a97a8; max-width: 600px; }
  .square-photo { flex: 0 0 470px; width: 470px; height: 470px; border-radius: 24px; object-fit: cover; }

  /* TABS */
  .center { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 18px; max-width: 760px; margin: 0 auto; }
  .tabs { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 48px; }
  .tab {
    min-width: 170px; border-radius: 999px; padding: 16px 28px;
    font-size: 20px; font-weight: 600; line-height: 1.25; white-space: nowrap;
    background: transparent; border: 1px solid #2b2a33; color: #b9b5c9; transition: all .2s ease;
  }
  .tab:hover { border-color: #4a4860; color: #fff; }
  .tab.on { background: #fff; border-color: #fff; color: #0b0b10; }

  .panel {
    width: 100%; max-width: 1180px; margin: 48px auto 0; border-radius: 14px;
    background: #03001a;
    border: 1px solid #0c0a24; padding: 20px; display: flex; gap: 64px; align-items: center; flex-wrap: wrap; text-align: left;
  }
  .panel img { flex: 0 1 446px; min-width: 280px; width: 446px; height: 446px; border-radius: 10px; object-fit: cover; object-position: 55% 48%; }
  .panel .copy { flex: 1 1 320px; min-width: 260px; display: flex; flex-direction: column; gap: 14px; padding: 16px 24px 16px 0; }
  .panel h3 { font-size: 26px; letter-spacing: -0.02em; }
  .panel p { font-size: 21px; line-height: 1.45; color: #b3afc4; max-width: 440px; }


  /* STEPS */
  .steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; margin-top: 48px; }
  .step { display: flex; flex-direction: column; gap: 16px; }
  .step-num { width: 44px; height: 44px; border-radius: 999px; background: #1d1c24; color: #fff; font-weight: 700; font-size: 15px; display: inline-flex; align-items: center; justify-content: center; }
  .step h3 { font-size: 26px; letter-spacing: -0.02em; }
  .step p { font-size: 17px; line-height: 1.5; color: #c9c5d9; min-height: 78px; }
  .step-img { position: relative; height: 300px; border-radius: 24px; overflow: hidden; border: 1px solid #2a2250; }
  .step-img img { width: 100%; height: 100%; object-fit: cover; }

  /* STATS */

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


  /* PRICING */
  .pricing-head h2 { font-size: clamp(32px, 3.4vw, 44px); font-weight: 700; letter-spacing: -0.035em; line-height: 1.08; }
  .toggle-row { display: flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 500; margin-top: 40px; justify-content: center; }
  .toggle-row button.txt { background: none; border: 0; font-size: inherit; font-weight: inherit; padding: 8px; }
  .switch { width: 72px; height: 36px; border-radius: 999px; background: #fff; border: 0; position: relative; padding: 0; }
  .switch .knob { position: absolute; top: 4px; width: 28px; height: 28px; border-radius: 50%; background: #0b0b10; transition: left .2s ease; }
  .plans { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: 48px; }
  .plan {
    position: relative; overflow: hidden; background: #111; border: 1px solid #111; border-radius: 20px; padding: 22px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .plan::after {
    content: ""; position: absolute; width: 70%; height: 70%; right: -20%; bottom: -30%; pointer-events: none;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 70%);
    filter: blur(30px);
  }
  .plan > * { position: relative; z-index: 1; }
  .plan.pro { background: #1c1c1c; border: 2px solid #828282; }
  .plan.pro::after { right: auto; left: -20%; }
  .plan-name { display: flex; align-items: center; gap: 7px; font-weight: 700; font-size: 14px; color: #fff; }
  .plan-name svg { width: 14px; height: 14px; }
  .plan-price { font-size: 34px; font-weight: 700; letter-spacing: -0.03em; color: #fff; line-height: 1; }
  .plan-price span { font-size: 15px; color: var(--dim); font-weight: 500; letter-spacing: -0.01em; }
  .plan p { font-size: 15px; color: #999; line-height: 1.45; }
  .plan .btn { width: 100%; padding: 11px; font-size: 15px; }
  .btn-plan-free { background: #262626; color: #fff; }
  .plan h5 { font-weight: 700; font-size: 15px; color: #fff; margin-top: 10px; }
  .plan ul { list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 15px; color: #999; }
  .plan li { display: flex; gap: 12px; align-items: baseline; }
  .plan li::before { content: ""; flex: 0 0 4px; width: 4px; height: 4px; border-radius: 50%; background: #999; position: relative; top: -3px; }
  .plan li b { font-weight: 400; }
  .fine { font-size: 13px; color: var(--faint); text-align: center; margin-top: 24px; }


  /* FAQ */
  .faq { position: relative; display: grid; grid-template-columns: minmax(300px, 520px) minmax(0, 880px); justify-content: space-between; gap: 48px; align-items: start; }
  .faq-glow {
    position: absolute; top: 50%; right: -26%; width: 90%; height: 70%; transform: translateY(-50%); pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.14) 35%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0) 70%);
    filter: blur(56px);
  }
  .faq-intro { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: flex-start; gap: 18px; }
  .faq-intro .pill { padding: 6px 12px; }
  .faq-intro h2 { font-size: clamp(36px, 4vw, 54px); letter-spacing: -0.035em; line-height: 1.04; white-space: nowrap; }
  .faq-help { font-size: 17px; color: #999; line-height: 1.4; }
  .faq-help a { color: #fff; font-weight: 600; margin-left: 5px; }
  .faq-help a:hover { text-decoration: underline; }
  .faq-list { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 13px; }
  .faq-item {
    background: linear-gradient(180deg, #151515 0%, #0e0e0e 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px;
    padding: 0; overflow: hidden; transition: border-color .2s ease;
  }
  .faq-item:hover { border-color: rgba(255,255,255,0.12); }
  .faq-q {
    width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 24px; text-align: left;
    background: none; border: 0; color: #fff; font-size: 20px; font-weight: 600; letter-spacing: -0.015em; padding: 26px 28px;
  }
  .faq-q svg { flex: 0 0 auto; width: 14px; height: 14px; transition: transform .25s ease; color: #d9d6e6; }
  .faq-item.open .faq-q svg { transform: rotate(180deg); }
  .faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
  .faq-item.open .faq-a { grid-template-rows: 1fr; }
  .faq-a > div { overflow: hidden; }
  .faq-a p { font-size: 16px; line-height: 1.55; color: #999; max-width: 620px; padding: 0 22px 22px; }

  /* WAITLIST */
  .waitlist {
    position: relative; padding: 120px 24px 140px; text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 24px;
  }
  .waitlist-glow { position: absolute; left: 50%; top: 40%; width: 900px; height: 500px; transform: translate(-50%, -50%); background: radial-gradient(ellipse at center, rgba(120,80,255,0.16), rgba(0,0,0,0) 65%); pointer-events: none; }
  .waitlist h2 { position: relative; font-size: clamp(40px, 5.5vw, 64px); letter-spacing: -0.035em; line-height: 1.02; }
  .waitlist p { position: relative; max-width: 560px; font-size: 19px; line-height: 1.5; color: var(--muted); }
  .waitlist form { position: relative; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 8px; width: 100%; }
  .waitlist input {
    flex: 1 1 260px; max-width: 360px; font-family: inherit; font-size: 16px; padding: 15px 20px; border-radius: 999px;
    border: 1px solid #2b2a33; background: #0f0e16; color: #fff; outline: none; transition: border-color .15s ease;
  }
  .waitlist input:focus { border-color: #5a5870; }
  .waitlist input::placeholder { color: var(--faint); }
  .waitlist .btn { background: #fff; color: #0b0b10; }
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
  .foot-links { display: flex; gap: 20px; flex-wrap: wrap; }
  .foot-bottom a:hover { color: #fff; }

  /* MOTION */
  .step-img img, .panel img { transition: transform .7s cubic-bezier(.2,.7,.2,1); }
  .step:hover .step-img img { transform: scale(1.04); }
  .plan { transition: border-color .3s ease, transform .3s ease; }
    @media (prefers-reduced-motion: reduce) {
    .step-img img, .panel img, .plan { transition: none; }
    .step:hover .step-img img, .plan:hover { transform: none; }
  }

  /* BELOW-HERO SCALE (reference proportions; hero/orb untouched) */
  .sub { max-width: 1180px; }
  .sub h2, .sub h3 { font-weight: 700; }
  .sub .h-md { font-size: clamp(30px, 3.4vw, 46px); }
  .sub .h-lg { font-size: clamp(32px, 3.6vw, 48px); }
  .sub .lead { font-size: 18px; color: #999; }
  .sub .two-col .copy .strong { font-size: 19px; }
  .sub .two-col .copy .soft { font-size: 19px; }
  .sub .square-photo { flex-basis: 390px; width: 390px; height: 390px; border-radius: 20px; }
  .sub .tabs { margin-top: 32px; gap: 12px; }
  .sub .tab { min-width: 170px; min-height: 80px; font-size: 18px; padding: 16px 26px; }
  .sub .panel { margin-top: 32px; gap: 80px; }
  .sub .panel img { flex-basis: 420px; width: 420px; height: 420px; }
  .sub .panel h3 { font-size: 22px; }
  .sub .panel p { font-size: 18px; max-width: 380px; }
  .sub .steps { margin-top: 48px; gap: 24px; }
  .sub .step { gap: 14px; }
  .sub .step-num { width: 40px; height: 40px; font-size: 14px; background: #1a1a1f; border: 1px solid #3a3942; }
  .sub .step h3 { font-size: 22px; }
  .sub .step p { font-size: 18px; line-height: 1.45; color: #999; min-height: 0; max-width: 260px; }
  .sub .step-img { height: 280px; border-radius: 20px; }
  .sub .coach { padding: 56px; }
  .sub .coach ul { font-size: 16px; }
  .sub .pricing-head h2 { font-size: clamp(32px, 3.6vw, 48px); }
  .sub .faq-intro h2 { font-size: clamp(30px, 3vw, 40px); line-height: 1.02; }
  .sub .faq-help { font-size: 17px; }
  .sub .faq-q { font-size: 17px; padding: 20px 22px; }
  .sub .faq-a p { font-size: 16px; }
  .sub .waitlist h2 { font-size: clamp(36px, 4.5vw, 54px); }
  .sub .waitlist p { font-size: 18px; }

  /* RESPONSIVE */
  @media (max-width: 1100px) {
    .steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .chips { display: none; }
    .square-photo { flex-basis: 100%; width: 100%; max-width: 560px; height: auto; aspect-ratio: 1; }
    .panel { gap: 40px; }
    .panel img { flex-basis: 100%; width: 100%; height: auto; aspect-ratio: 1; }
    .panel .copy { padding: 8px; }
    .coach { padding: 40px; }
    .faq { grid-template-columns: 1fr; gap: 40px; }
    .faq-intro h2 { white-space: normal; }
    .faq-glow { right: -30%; width: 110%; }
    .foot-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 700px) {
    .wrap { padding-left: 16px; padding-right: 16px; }
    .section { padding-top: 80px; }
    .section-lg { padding-top: 104px; }
    .quotes { grid-template-columns: 1fr; }
    .section-xl { padding-top: 104px; }
    .nav-links { display: none; }
    .hero { padding-top: 40px; }
    .stage { margin-top: 40px; padding: 32px 0 0; }
    .tyga-stage { height: 300px; }
    .tyga-player { padding-right: 16px; gap: 10px; }
    .tyga-wave { display: none; }
    .tyga-bar { padding-right: 10px; }
    .tyga-caption { font-size: 16px; min-height: 45px; padding: 0 8px; }
    .steps, .plans, .foot-grid { grid-template-columns: 1fr; }
    .step p, .sub .step p { min-height: 0; }
    .tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .tab { min-width: 0; font-size: 17px; padding: 14px 16px; }
    .coach { padding: 28px 20px; }
    .two-col .copy .strong, .two-col .copy .soft, .panel p { font-size: 18px; }
    .plan { padding: 20px 18px; }
    .plan-price { font-size: 32px; }
    .waitlist { padding: 80px 8px 96px; }
    .faq-q { font-size: 18px; padding: 20px 20px; }
    .faq-a p { font-size: 16px; padding: 0 20px 22px; }
    .faq-help { font-size: 18px; }
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
  { label: "AI Coach", title: "Personalized AI Coach", img: IMG.tabCoach, body: "TYGA is your AI swing coach, using your measurements to answer questions, uncover insights, and guide you toward smarter improvement." },
  { label: "3D Data", title: "In Depth 3D Data", img: IMG.tab3d, body: "Turn a simple video from your phone into detailed swing data, giving you a clearer picture of how your body moves throughout the swing." },
  { label: "Auto Practice", title: "Automated Practice", img: IMG.tabPractice, body: "Set the phone down and hit balls. Every swing is detected, trimmed and measured automatically — nothing to tap between shots." },
  { label: "Compare Swings", title: "Compare Swings", img: IMG.tabCompare, body: "Put today next to last month, or next to a reference swing, frame for frame at the real frame rate." },
];


const STEPS = [
  { n: "01", title: "Record", body: "Lean your iPhone against your bag and hit balls", img: IMG.stepRecord, alt: "SwingView recording a swing at 240 fps" },
  { n: "02", title: "Measure", body: "Every swing tracked and measured at 240 fps", img: IMG.stepMeasure, alt: "Swing analysis with skeleton overlay, tempo, pelvis and chest turn" },
  { n: "03", title: "Review", body: "See your swing on screen the second you finish", img: IMG.stepReview, alt: "Swing review with frame scrubber and TYGA coach tip" },
  { n: "04", title: "Improve", body: "Ask TYGA what to work on and what's changing", img: IMG.stepImprove, alt: "TYGA Coach screen with insights and next drill" },
];

const QUOTES = [
  { text: "It flagged my backswing as too short and showed me exactly what I was missing. Two years of inconsistency fixed in one 20-minute session.", who: "Matthew", meta: "14 handicap" },
  { text: "Having the voice coach in my AirPods is a game changer. I never had to go back to my phone once. I just talked to it whenever I had a question.", who: "Jake", meta: "22 handicap" },
  { text: "It caught my early extension right away and showed me exactly what it should feel like. Fixed it in one session and started pureing irons again.", who: "Ryan", meta: "8 handicap" },
];

const FAQS = [
  { q: "What is SwingView?", a: "SwingView is an AI golf swing coach for iPhone. It records every swing at 240 fps, measures what your body did, and gives you TYGA — a coach that remembers all of it — so you can understand your swing and improve faster." },
  { q: "Do I need special equipment to use SwingView?", a: "No. Lean your iPhone against your bag, face-on or down the line, and hit balls. There's no sensor, no launch monitor and nothing to tap between shots." },
  { q: "How is SwingView different from a launch monitor?", a: "A launch monitor tells you what happened to the ball. SwingView shows you what your body did to create that result. Together they give you a complete picture of every swing." },
  { q: "Is SwingView only for low handicappers?", a: "Not at all. SwingView is built for any golfer who wants to understand their swing — from first season to scratch. TYGA explains in plain language and gives you one thing to work on, not a list of ten." },
  { q: "How accurate is the analysis?", a: "SwingView runs pose tracking on every frame of your 240 fps video to measure tempo, sequencing, turn and a dozen more positions through the swing. It's objective data from your own swing — the same numbers TYGA uses when it coaches you." },
];

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const [yearly, setYearly] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(() => new Set());
  const toggleFaq = (i) => setOpenFaq((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

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
      <div className="navbar"><header className="wrap nav">
        <a href="#top" className="logo">SwingView</a>
        <div className="nav-right">
          <nav className="nav-links">
            <a href="#how">How it works</a><a href="#tyga">Caddie</a>
          </nav>
          <a href={APP_HREF} {...APP_LINK} className="btn btn-white btn-sm">Get the app</a>
        </div>
      </header></div>

      {/* HERO */}
      <section id="top" className="hero wrap">
        <div className="hero-inner">
          <span className="pill"><span className="dot" />Free on the App Store</span>
          <h1 className="h-xl">A swing coach that has actually seen your swing.</h1>
          <p className="lead">Every swing, measured. A coach that remembers all of them.</p>
          <div className="hero-cta">
            <a href={APP_HREF} {...APP_LINK} className="btn btn-white">Get the app</a>
            <a href="#how" className="btn btn-ghost">See how it works</a>
          </div>
          <p className="hero-note">iPhone · Free to start · No extra hardware</p>
        </div>

        <div id="tyga"><TygaOrb /></div>
      </section>

      {/* STEPS */}
      <section id="how" className="wrap sub section-xl">
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

      {/* BUILT AROUND */}
      <section id="features" className="wrap sub section-lg">
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
      <section className="wrap sub section-xl">
        <div className="center">
          <h2 className="h-lg">The smarter way to improve</h2>
          <p className="lead">A data-driven feedback loop that keeps your practice purposeful and shows you when you’re getting better.</p>
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

      </section>

      {/* COACH */}
      <section className="wrap sub section-lg">
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

      {/* QUOTES */}
      <section id="quotes" className="wrap sub section-lg">
        <div className="center">
          <span className="pill">From the beta</span>
          <h2 style={{ marginTop: 18 }}>What testers noticed first.</h2>
        </div>
        <div className="quotes">
          {QUOTES.map((q) => (
            <figure className="quote" key={q.text}>
              <p>{q.text}</p>
              <cite><b>{q.who}</b> · {q.meta}</cite>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="wrap sub section-lg">
        <div className="center pricing-head">
          <span className="pill">Pricing</span>
          <h2>Try Free<br />Upgrade When You're Ready</h2>
        </div>
        <div className="toggle-row">
          <button className="txt" style={{ color: yearly ? "var(--faint)" : "#fff" }} onClick={() => setYearly(false)}>Monthly</button>
          <button className="switch" aria-label="Toggle yearly billing" onClick={() => setYearly((v) => !v)}><span className="knob" style={{ left: yearly ? 45 : 5 }} /></button>
          <button className="txt" style={{ color: yearly ? "#fff" : "var(--faint)" }} onClick={() => setYearly(true)}>Yearly</button>
        </div>
        <div className="plans">
          <div className="plan">
            <div className="plan-name"><span style={{ color: "#4fd1ff" }}>{I.star}</span>Free Plan</div>
            <div className="plan-price">$0<span> /month</span></div>
            <p>See your swing properly. Great for trying before you commit.</p>
            <a href={APP_HREF} {...APP_LINK} className="btn btn-plan-free">Get the app</a>
            <h5>Features Included:</h5>
            <ul>
              {["Unlimited 240 fps recording", "Swing detection and trimming", "Skeleton overlay on replay", "Frame-step and slow motion", "Session history", "3 full analyses a month"].map((x) => <li key={x}><b>{x}</b></li>)}
            </ul>
          </div>
          <div className="plan pro">
            <div className="plan-name"><span style={{ color: "#ffb04a" }}>{I.bolt}</span>Pro</div>
            <div className="plan-price">{yearly ? "$7.99" : "$9.99"}<span> /month</span></div>
            <p>Unlimited analysis and a coach that remembers everything.</p>
            <a href={APP_HREF} {...APP_LINK} className="btn btn-white">Get the app</a>
            <h5>Features Included:</h5>
            <ul>
              {["Everything in Free", "Unlimited full analyses", "Phase timing, tempo and sequencing on every swing", "Coach with full session memory", "Compare against reference swings", "Share cards"].map((x) => <li key={x}><b>{x}</b></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="wrap sub section-lg">
        <div className="faq">
          <div className="faq-glow" />
          <div className="faq-intro">
            <span className="pill">FAQs</span>
            <h2>Frequently<br />Asked Questions</h2>
            <p className="faq-help">Got a specific question?<a href="mailto:support@swingview.ai">Contact us</a></p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => {
              const open = openFaq.has(i);
              return (
                <div key={f.q} className={"faq-item" + (open ? " open" : "")}>
                  <button type="button" className="faq-q" onClick={() => toggleFaq(i)} aria-expanded={open} aria-controls={"faq-a-" + i}>
                    <span>{f.q}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  <div className="faq-a" id={"faq-a-" + i}><div><p>{f.a}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="get" className="wrap sub section-lg">
        <div className="waitlist">
          <div className="waitlist-glow" />
          <h2>See what you can't feel.</h2>
          <p>SwingView is free on the App Store. Leave your email and we'll send the link to your phone.</p>
          {submitted ? (
            <p className="thanks">Sent — check your inbox for the link.</p>
          ) : (
            <form onSubmit={submit}>
              <label htmlFor="email" className="sr">Email address</label>
              <input id="email" type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="btn">Send me the link</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <span className="logo">SwingView</span>
            <p>A swing coach that has actually seen your swing.</p>
          </div>
          <div className="foot-col"><b>Product</b><a href="#how">How it works</a><a href="#features">Features</a><a href="#pricing">Pricing</a></div>
          <div className="foot-col"><b>Company</b><a href="#faq">FAQ</a><a href="mailto:support@swingview.ai">Contact</a><a href="/privacy.html">Privacy policy</a><a href="/terms.html">Terms of use</a></div>
          <div className="foot-col"><b>Follow</b><a href="https://www.instagram.com/swingviewai/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.tiktok.com/@swingview.ai" target="_blank" rel="noreferrer">TikTok</a><a href="https://www.youtube.com/@SwingView" target="_blank" rel="noreferrer">YouTube</a><a href="https://www.linkedin.com/company/swingview-ai/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://x.com/swingviewai" target="_blank" rel="noreferrer">X/Twitter</a></div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} SwingView · Predictive Growth Labs</span>
          <nav className="foot-links">
            <a href="/privacy.html">Privacy policy</a>
            <a href="/terms.html">Terms of use</a>
            <a href="mailto:support@swingview.ai">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
