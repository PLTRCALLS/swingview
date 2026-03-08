import { useState, useEffect, useRef } from "react";

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const C = {
  bg:        "#0D0D0D",
  surface:   "#161616",
  surface2:  "#1E1E1E",
  border:    "rgba(255,255,255,0.07)",
  border2:   "rgba(255,255,255,0.11)",
  green:     "#C8FF00",
  greenDim:  "rgba(200,255,0,0.10)",
  greenGlow: "rgba(200,255,0,0.18)",
  gold:      "#F5C842",
  text:      "#FFFFFF",
  muted:     "#666666",
  dim:       "#2A2A2A",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: ${C.bg};
    color: ${C.text};
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  ::selection { background: ${C.green}; color: ${C.bg}; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.dim}; border-radius: 2px; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.6; transform: scale(0.96); }
  }
  @keyframes scanline {
    0%   { top: -2px; }
    100% { top: 100%; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-8px); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fade-up-1 { animation: fadeUp 0.7s ease both; animation-delay: 0.1s; }
  .fade-up-2 { animation: fadeUp 0.7s ease both; animation-delay: 0.25s; }
  .fade-up-3 { animation: fadeUp 0.7s ease both; animation-delay: 0.4s; }
  .fade-up-4 { animation: fadeUp 0.7s ease both; animation-delay: 0.55s; }
  .fade-up-5 { animation: fadeUp 0.7s ease both; animation-delay: 0.7s; }

  .shimmer-text {
    background: linear-gradient(90deg, ${C.text} 0%, ${C.green} 40%, ${C.text} 60%, ${C.text} 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  .float { animation: float 4s ease-in-out infinite; }

  .phone-glow {
  }

  /* Nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 0 40px;
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(5,12,20,0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; letter-spacing: 3px; color: ${C.text};
    text-decoration: none;
  }

  .nav-logo-mark {
    width: 30px; height: 30px; border-radius: 8px;
    background: ${C.green};
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    box-shadow: 0 0 12px ${C.greenGlow};
  }

  .nav-cta {
    padding: 8px 20px;
    background: ${C.green};
    border: none; border-radius: 8px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 13px; letter-spacing: 2px;
    color: ${C.bg}; cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 16px ${C.greenGlow};
  }
  .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 24px ${C.greenGlow}; }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 100px 40px 80px;
    position: relative; overflow: hidden;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    max-width: 1200px;
    width: 100%;
    align-items: center;
  }

  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr; gap: 60px; }
    .hero-phone-col { order: -1; display: flex; justify-content: center; }
    nav { padding: 0 20px; }
    .hero { padding: 100px 20px 80px; }
    .features-grid { grid-template-columns: 1fr 1fr !important; }
    .testimonials-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 600px) {
    .features-grid { grid-template-columns: 1fr !important; }
    .stats-row { flex-direction: column !important; }
  }

  /* Input */
  .waitlist-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 14px 18px;
    color: ${C.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .waitlist-input::placeholder { color: ${C.muted}; }
  .waitlist-input:focus { border-color: ${C.green}; box-shadow: 0 0 0 3px rgba(200,255,0,0.08); }

  .btn-primary {
    padding: 15px 32px;
    background: ${C.green};
    border: none; border-radius: 10px;
    color: ${C.bg};
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px; letter-spacing: 3px;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 8px 24px ${C.greenGlow};
    white-space: nowrap;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(200,255,0,0.3); }
  .btn-primary:active { transform: translateY(0); }

  .btn-secondary {
    padding: 15px 32px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15); border-radius: 10px;
    color: ${C.muted};
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px; letter-spacing: 3px;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: ${C.green}; color: ${C.green}; }

  /* Section */
  .section {
    padding: 100px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 3px;
    color: ${C.green};
    margin-bottom: 12px;
    display: flex; align-items: center; gap: 8px;
  }
  .section-label::before {
    content: '';
    display: inline-block;
    width: 20px; height: 1px;
    background: ${C.green};
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 5vw, 64px);
    letter-spacing: 2px;
    line-height: 0.95;
    margin-bottom: 16px;
  }

  /* Feature cards */
  .feature-card {
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 16px;
    padding: 28px;
    transition: all 0.3s;
    position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, ${C.green}, transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .feature-card:hover { border-color: rgba(200,255,0,0.2); transform: translateY(-4px); }
  .feature-card:hover::before { opacity: 1; }

  /* Phone mockup */
  .phone-shell {
    width: 260px; height: 540px;
    background: #111111;
    border-radius: 36px;
    border: 6px solid #2A2A2A;
    overflow: hidden;
    position: relative;
    box-shadow: none;
  }

  .phone-notch {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 90px; height: 22px;
    background: #080E1A;
    border-radius: 0 0 14px 14px;
    border: 2px solid rgba(255,255,255,0.08); border-top: none;
    z-index: 10;
  }

  /* Testimonial */
  .testimonial-card {
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 16px;
    padding: 28px;
    transition: border-color 0.3s;
  }
  .testimonial-card:hover { border-color: rgba(200,255,0,0.15); }

  /* Divider */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, ${C.border2}, transparent);
    margin: 0 40px;
  }

  /* Noise texture overlay */
  .noise {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
`;

// ── PHONE MOCKUP COMPONENT ────────────────────────────────────────────────────
function PhoneMockup() {
  const [frame, setFrame] = useState(0);
  const frames = ["onboarding", "home", "report"];

  useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % frames.length), 3500);
    return () => clearInterval(t);
  }, []);

  const green = C.green;

  const slides = [
    { icon: "🎯", headline: ["YOUR AI", "CADDIE"], sub: "Real-time swing analysis powered by Claude AI — like having a PGA coach in your AirPods." },
    { icon: "📡", headline: ["HANDS", "FREE"], sub: "Set your phone up, hit balls. SwingView AI detects every swing automatically." },
    { icon: "🗣️", headline: ["INSTANT", "VOICE"], sub: "Hear personalized coaching cues the moment your follow-through completes." },
  ];
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (frame !== 0) return;
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 2000);
    return () => clearInterval(t);
  }, [frame]);
  const s = slides[slide];

  const phases = [
    { label: "Address",   score: 8, color: green,     obs: "Great posture and alignment." },
    { label: "Takeaway",  score: 7, color: green,     obs: "Club slightly inside ideal path." },
    { label: "Top",       score: 6, color: C.gold,    obs: "Left arm breaking down at top." },
    { label: "Downswing", score: 5, color: "#FF6B6B", obs: "Early extension detected." },
    { label: "Impact",    score: 7, color: green,     obs: "Hands ahead at contact. Good." },
    { label: "Follow",    score: 8, color: green,     obs: "Full rotation, balanced finish." },
  ];
  const overall = Math.round(phases.reduce((a, p) => a + p.score, 0) / phases.length);

  return (
    <div className="phone-shell">
      <div className="phone-notch" />

      {/* Status bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 36,
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        padding: "0 18px 4px", zIndex: 9,
        fontSize: 9, fontFamily: "'DM Sans', sans-serif", color: C.text, fontWeight: 600,
      }}>
        <span>9:41</span>
        <span>●●● 🔋</span>
      </div>

      {/* FRAME 0: Onboarding */}
      {frame === 0 && (
        <div style={{ position: "absolute", inset: 0, background: C.bg, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "44px 20px 0", display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>⛳</div>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 13, color: C.text, letterSpacing: 3 }}>SWINGVIEW AI</span>
          </div>
          <div style={{ textAlign: "center", paddingTop: 24, fontSize: 48 }}>{s.icon}</div>
          <div style={{ padding: "16px 20px 0" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 56, lineHeight: 0.9, letterSpacing: 2 }}>
              <div style={{ color: C.text }}>{s.headline[0]}</div>
              <div style={{ color: green, filter: `drop-shadow(0 0 10px ${green})` }}>{s.headline[1]}</div>
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 11, color: C.muted, lineHeight: 1.5, marginTop: 12, maxWidth: 200 }}>{s.sub}</p>
          </div>
          <div style={{ display: "flex", gap: 5, padding: "16px 20px 0" }}>
            {slides.map((_, i) => (
              <div key={i} style={{ height: 3, borderRadius: 2, width: i === slide ? 20 : 6, background: i === slide ? green : C.dim, transition: "all 0.3s" }} />
            ))}
          </div>
          <div style={{ padding: "16px 20px 0", marginTop: "auto" }}>
            <div style={{ width: "100%", padding: "13px", background: green, borderRadius: 12, color: C.bg, fontFamily: "'Bebas Neue'", fontSize: 14, letterSpacing: 3, textAlign: "center", marginBottom: 8 }}>GET STARTED FREE</div>
            <div style={{ width: "100%", padding: "11px", background: "transparent", border: `1px solid ${C.border2}`, borderRadius: 12, color: C.muted, fontFamily: "'Bebas Neue'", fontSize: 12, letterSpacing: 3, textAlign: "center" }}>SIGN IN</div>
          </div>
        </div>
      )}

      {/* FRAME 1: Home Dashboard */}
      {frame === 1 && (
        <div style={{ position: "absolute", inset: 0, background: C.bg, overflow: "hidden" }}>
          <div style={{ padding: "44px 16px 12px", background: `linear-gradient(180deg, ${C.surface} 0%, transparent 100%)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: C.muted, letterSpacing: 2 }}>GOOD MORNING</div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.text, letterSpacing: 2 }}>AUSTIN</div>
              </div>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: C.surface2, border: `1px solid ${C.border2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🔔</div>
            </div>
          </div>
          <div style={{ padding: "0 16px 10px" }}>
            <div style={{ background: `linear-gradient(135deg, ${C.surface2}, rgba(200,255,0,0.08))`, border: `1px solid rgba(200,255,0,0.2)`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: green, letterSpacing: 2 }}>START SESSION</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: C.muted, marginTop: 3 }}>Hands-free AI coaching</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>▶</div>
            </div>
          </div>
          <div style={{ padding: "0 16px 10px", display: "flex", gap: 6 }}>
            {[{l:"AVG",v:"7.4",u:"/10"},{l:"SESSIONS",v:"12",u:""},{l:"HCP",v:"15",u:""}].map(st => (
              <div key={st.l} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.text }}>{st.v}<span style={{ fontSize: 9, color: C.muted }}>{st.u}</span></div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 7, color: C.muted, letterSpacing: 1 }}>{st.l}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "0 16px 10px" }}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 11, color: C.text, letterSpacing: 2, marginBottom: 8 }}>SCORE TREND</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 36 }}>
                {[5,6,6,7,7,8,7].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: h * 4, background: i === 6 ? green : `rgba(200,255,0,${0.2 + i * 0.08})`, borderRadius: "2px 2px 0 0" }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: "0 16px" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 10, color: C.muted, letterSpacing: 2, marginBottom: 6 }}>TOP SWING FAULTS</div>
            {[{f:"Early Extension",t:"↑",c:C.gold},{f:"Over The Top",t:"↓",c:green},{f:"Hip Slide",t:"→",c:C.muted}].map((f,i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 10px", marginBottom: 5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 2, height: 20, background: f.c, borderRadius: 2 }} />
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: C.text }}>{f.f}</div>
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 15, color: f.c }}>{f.t}</div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 52, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 4 }}>
            {[{l:"Record",a:true},{l:"History",a:false},{l:"Profile",a:false}].map(n => (
              <div key={n.l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 9, color: n.a ? green : C.muted, letterSpacing: 1 }}>{n.l}</div>
                {n.a && <div style={{ width: 4, height: 4, borderRadius: "50%", background: green, margin: "2px auto 0" }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FRAME 2: Session Report */}
      {frame === 2 && (
        <div style={{ position: "absolute", inset: 0, background: C.bg, overflow: "hidden" }}>
          <div style={{ padding: "44px 16px 10px", background: `linear-gradient(180deg, ${C.surface} 0%, transparent 100%)` }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 8, color: C.muted, letterSpacing: 2 }}>TODAY · 2:34 PM</div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.text, letterSpacing: 2 }}>SESSION REPORT</div>
          </div>
          <div style={{ padding: "0 16px 10px" }}>
            <div style={{ background: `linear-gradient(135deg, ${C.surface2}, rgba(200,255,0,0.06))`, border: `1px solid rgba(200,255,0,0.2)`, borderRadius: 14, padding: "14px", display: "flex", alignItems: "center", gap: 14 }}>
              <svg width="64" height="64" viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
                <circle cx="32" cy="32" r="26" fill="none" stroke={C.dim} strokeWidth="4"
                  strokeDasharray={`${2*Math.PI*26*0.75} ${2*Math.PI*26*0.25}`}
                  strokeDashoffset={-2*Math.PI*26*0.125} strokeLinecap="round" />
                <circle cx="32" cy="32" r="26" fill="none" stroke={green} strokeWidth="4"
                  strokeDasharray={`${2*Math.PI*26*0.75*(overall/10)} ${2*Math.PI*26}`}
                  strokeDashoffset={-2*Math.PI*26*0.125} strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 5px ${green})` }} />
                <text x="32" y="36" textAnchor="middle" fill={green} style={{ font: `700 20px 'Bebas Neue'` }}>{overall}</text>
              </svg>
              <div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: green, letterSpacing: 1 }}>SOLID SESSION</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: C.muted, marginTop: 2 }}>18 swings · 7i · 47 min</div>
                <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
                  {[{l:"BEST",v:"8"},{l:"WORST",v:"5"},{l:"TREND",v:"↑"}].map(st => (
                    <div key={st.l} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "2px 6px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 12, color: C.text }}>{st.v}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 6, color: C.muted }}>{st.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: "0 16px 8px" }}>
            <div style={{ background: "rgba(255,107,107,0.07)", border: "1px solid rgba(255,107,107,0.22)", borderRadius: 10, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13 }}>🎯</span>
              <div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 8, color: "#FF6B6B", letterSpacing: 2 }}>PRIORITY FIX</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 9, color: C.text }}>Early Extension · Wall Drill</div>
              </div>
            </div>
          </div>
          <div style={{ padding: "0 16px" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 9, color: C.muted, letterSpacing: 2, marginBottom: 6 }}>PHASE BREAKDOWN</div>
            {phases.map((p, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 2, height: 24, background: p.color, borderRadius: 2, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Bebas Neue'", fontSize: 10, color: C.text, letterSpacing: 1 }}>{p.label.toUpperCase()}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 8, color: C.muted }}>{p.obs}</div>
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: p.color, filter: `drop-shadow(0 0 3px ${p.color})` }}>{p.score}</div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 52, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 4 }}>
            {["Record","History","Profile"].map(n => (
              <div key={n} style={{ fontFamily: "'Bebas Neue'", fontSize: 9, color: C.muted, letterSpacing: 1 }}>{n}</div>
            ))}
          </div>
        </div>
      )}

      {/* Frame indicator dots */}
      <div style={{ position: "absolute", bottom: 58, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4, zIndex: 10 }}>
        {frames.map((_, i) => (
          <div key={i} style={{ width: i === frame ? 16 : 5, height: 5, borderRadius: 3, background: i === frame ? green : "rgba(255,255,255,0.2)", transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(247);

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setCount(c => c + 1);
  };

  const features = [
    {
      icon: "🎙️",
      title: "VOICE AI COACHING",
      desc: "Claude AI delivers personalized coaching cues to your AirPods the moment your follow-through completes. Hear exactly what to fix before your next shot.",
    },
    {
      icon: "📡",
      title: "HANDS-FREE DETECTION",
      desc: "Set your phone up, step back, and swing. SwingView AI automatically detects every swing — no tapping, no setup between shots.",
    },
    {
      icon: "🦴",
      title: "LIVE SKELETON TRACKING",
      desc: "Real-time 19-point body pose detection using Apple's Vision framework. See your swing plane, spine angle, and joint positions overlaid live.",
    },
    {
      icon: "📊",
      title: "SESSION REPORTS",
      desc: "Every session scored across 6 phases with prioritised fault detection, drill recommendations, and trend tracking across time.",
    },
    {
      icon: "🔒",
      title: "ON-DEVICE AI",
      desc: "Analysis runs directly on your iPhone using the Neural Engine. Fast, private, and works without an internet connection at the range.",
    },
    {
      icon: "🏌️",
      title: "BUILT BY A GOLFER",
      desc: "SwingView AI is designed for everyday amateur golfers — not just pros. Clear, conversational coaching that actually makes sense.",
    },
  ];

  const testimonials = [
    {
      name: "Jamie R.",
      hcp: "18 hcp",
      text: "I've tried V1 and Mustard. Neither felt like having an actual coach. SwingView AI talking to me between shots is a completely different experience.",
    },
    {
      name: "Mike T.",
      hcp: "12 hcp",
      text: "The hands-free detection is the killer feature. I just hit balls and it captures everything automatically. My range sessions are finally productive.",
    },
    {
      name: "Sarah K.",
      hcp: "24 hcp",
      text: "The voice coaching is so natural it surprised me. It pointed out my early extension after my very first swing and gave me a drill I could do immediately.",
    },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="noise" />

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">⛳</div>
          SWINGVIEW AI
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "'DM Mono'", fontSize: 11, color: C.muted, letterSpacing: 1 }}>
            iOS · Coming Soon
          </span>
          <button className="nav-cta" onClick={() => document.getElementById("waitlist").scrollIntoView({ behavior: "smooth" })}>
            JOIN WAITLIST
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">


        <div className="hero-grid">
          {/* Left col */}
          <div>
            <div className="fade-up-1" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: C.surface, border: `1px solid rgba(200,255,0,0.2)`,
              borderRadius: 20, padding: "6px 14px", marginBottom: 24,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green,
                animation: "pulse 1.5s infinite", boxShadow: `0 0 6px ${C.green}` }} />
              <span style={{ fontFamily: "'DM Mono'", fontSize: 11, color: C.green, letterSpacing: 2 }}>
                iOS APP · COMING 2026
              </span>
            </div>

            <h1 className="fade-up-2" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(64px, 7vw, 100px)",
              lineHeight: 0.92, letterSpacing: 3,
              marginBottom: 24,
            }}>
              <div style={{ color: C.text }}>YOUR AI</div>
              <div style={{ color: C.green, filter: `drop-shadow(0 0 20px ${C.green})` }}>CADDIE</div>
              <div style={{ color: C.text }}>IN YOUR</div>
              <div className="shimmer-text">AIRPODS</div>
            </h1>

            <p className="fade-up-3" style={{
              fontFamily: "'DM Sans'", fontSize: 16, color: C.muted,
              lineHeight: 1.7, maxWidth: 460, marginBottom: 32,
            }}>
              SwingView AI detects every swing hands-free, then delivers Claude-powered voice coaching instantly — like having a PGA coach at the range, every session.
            </p>

            {/* Waitlist form */}
            <div id="waitlist" className="fade-up-4">
              {!submitted ? (
                <form onSubmit={handleWaitlist} style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                  <input
                    className="waitlist-input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ maxWidth: 280 }}
                    required
                  />
                  <button type="submit" className="btn-primary">JOIN WAITLIST →</button>
                </form>
              ) : (
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "rgba(200,255,0,0.08)", border: `1px solid rgba(200,255,0,0.25)`,
                  borderRadius: 10, padding: "14px 20px", marginBottom: 14, maxWidth: 380,
                  animation: "fadeIn 0.4s ease",
                }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: 14, color: C.green, letterSpacing: 2 }}>YOU'RE ON THE LIST</div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: C.muted, marginTop: 2 }}>
                      We'll email you the moment SwingView AI launches.
                    </div>
                  </div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex" }}>
                  {["🟢","🔵","🟡"].map((c,i) => (
                    <div key={i} style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: C.surface, border: `2px solid ${C.bg}`,
                      marginLeft: i > 0 ? -8 : 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10,
                    }}>{c}</div>
                  ))}
                </div>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.muted }}>
                  <span style={{ color: C.green, fontWeight: 600 }}>{count.toLocaleString()} golfers</span> already on the waitlist
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="fade-up-5" style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
              {["iOS Native", "Claude AI", "Hands-Free", "On-Device"].map(tag => (
                <div key={tag} style={{
                  fontFamily: "'DM Mono'", fontSize: 10, color: C.muted,
                  background: C.surface, border: `1px solid ${C.border2}`,
                  borderRadius: 6, padding: "4px 10px", letterSpacing: 1,
                }}>#{tag.replace(" ","")}</div>
              ))}
            </div>
          </div>

          {/* Right col — phone */}
          <div className="hero-phone-col" style={{ display: "flex", justifyContent: "center" }}>
            <div className="phone-glow">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── STATS ── */}
      <div style={{ padding: "60px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="stats-row" style={{ display: "flex", justifyContent: "space-around", gap: 20 }}>
          {[
            { value: "< 3s", label: "Feedback after each swing" },
            { value: "19", label: "Body joints tracked live" },
            { value: "6", label: "Swing phases analyzed" },
            { value: "0", label: "Taps required per session" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Bebas Neue'", fontSize: 52, color: C.green,
                letterSpacing: 2, lineHeight: 1,
                filter: `drop-shadow(0 0 12px ${C.greenGlow})`,
              }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.muted, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="section-label">FEATURES</div>
        <h2 className="section-title">
          <span style={{ color: C.text }}>BUILT DIFFERENT</span><br />
          <span style={{ color: C.green }}>FROM THE GROUND UP</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: C.muted, maxWidth: 540, marginBottom: 48, lineHeight: 1.7 }}>
          Every other swing analyzer makes you watch a report. SwingView AI talks to you while you practice — the way a real coach would.
        </p>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <div style={{
                fontFamily: "'Bebas Neue'", fontSize: 17, color: C.text,
                letterSpacing: 2, marginBottom: 8,
              }}>{f.title}</div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ── */}
      <section className="section">
        <div className="section-label">HOW IT WORKS</div>
        <h2 className="section-title">
          <span style={{ color: C.text }}>THREE STEPS TO</span><br />
          <span style={{ color: C.green }}>BETTER GOLF</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: 48, position: "relative" }}>
          {/* Connecting line */}
          <div style={{
            position: "absolute", top: 28, left: "16%", right: "16%", height: 1,
            background: `linear-gradient(90deg, ${C.green}, rgba(200,255,0,0.2), ${C.green})`,
            zIndex: 0,
          }} />

          {[
            { step: "01", icon: "📱", title: "PROP & POINT", desc: "Set your phone on a tripod or lean it against your bag. Point at your hitting area and open SwingView AI." },
            { step: "02", icon: "🎧", title: "PUT IN AIRPODS", desc: "Enable Voice Coaching. SwingView AI will detect every swing automatically — no tapping required during your session." },
            { step: "03", icon: "⛳", title: "JUST SWING", desc: "Hit balls normally. After each swing you'll hear Claude's coaching cues. Review your full session report when done." },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, margin: "0 auto 20px",
                background: C.surface, border: `2px solid ${C.green}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24,
                boxShadow: `0 0 20px ${C.greenGlow}`,
              }}>{s.icon}</div>
              <div style={{
                fontFamily: "'DM Mono'", fontSize: 10, color: C.green,
                letterSpacing: 3, marginBottom: 8,
              }}>{s.step}</div>
              <div style={{
                fontFamily: "'Bebas Neue'", fontSize: 18, color: C.text,
                letterSpacing: 2, marginBottom: 10,
              }}>{s.title}</div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── COMPARE ── */}
      <section className="section">
        <div className="section-label">COMPARISON</div>
        <h2 className="section-title">
          <span style={{ color: C.text }}>WHY</span>{" "}
          <span style={{ color: C.green }}>SWINGVIEW AI</span>
        </h2>

        <div style={{ marginTop: 40, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr>
                {["FEATURE", "SWINGVIEW AI", "MUSTARD", "V1 GOLF", "DEEPSWING"].map((h, i) => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: i === 0 ? "left" : "center",
                    fontFamily: "'Bebas Neue'", fontSize: 12, letterSpacing: 2,
                    color: i === 1 ? C.green : C.muted,
                    borderBottom: `1px solid ${i === 1 ? C.green : C.border}`,
                    background: i === 1 ? "rgba(200,255,0,0.04)" : "transparent",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Voice AI coaching",      "✅", "❌", "❌", "❌"],
                ["Hands-free detection",   "✅", "❌", "❌", "Partial"],
                ["Instant feedback",       "✅", "❌", "❌", "✅"],
                ["Face-on + DTL analysis", "✅", "❌", "✅", "✅"],
                ["Unlimited swings",       "✅", "1x/week", "✅", "✅"],
                ["On-device AI",           "✅", "❌", "❌", "✅"],
                ["Price / year",           "$59.99", "$149.99", "$59.99", "TBD"],
              ].map((row, ri) => (
                <tr key={ri} style={{ borderBottom: `1px solid ${C.border}` }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: "12px 16px",
                      textAlign: ci === 0 ? "left" : "center",
                      fontFamily: ci === 0 ? "'DM Sans'" : "'DM Mono'",
                      fontSize: ci === 0 ? 14 : 12,
                      color: ci === 1 ? (cell === "✅" ? C.green : cell === "❌" ? "#FF6B6B" : C.green) : ci === 0 ? C.text : C.muted,
                      background: ci === 1 ? "rgba(200,255,0,0.03)" : "transparent",
                      fontWeight: ci === 0 ? 400 : 500,
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="section-label">EARLY ACCESS</div>
        <h2 className="section-title">
          <span style={{ color: C.text }}>WHAT BETA</span><br />
          <span style={{ color: C.green }}>TESTERS SAY</span>
        </h2>

        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div style={{ display: "flex", gap: 1, marginBottom: 12 }}>
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: C.gold, fontSize: 12 }}>★</span>
                ))}
              </div>
              <p style={{
                fontFamily: "'DM Sans'", fontSize: 13, color: C.text,
                lineHeight: 1.7, marginBottom: 16, fontStyle: "italic",
              }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: C.surface2, border: `1px solid ${C.border2}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                }}>🏌️</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: C.text, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: C.muted }}>{t.hcp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "100px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />

        <div style={{
          fontFamily: "'DM Mono'", fontSize: 11, color: C.green,
          letterSpacing: 3, marginBottom: 16,
        }}>— EARLY ACCESS —</div>

        <h2 style={{
          fontFamily: "'Bebas Neue'", fontSize: "clamp(48px, 6vw, 80px)",
          letterSpacing: 3, lineHeight: 0.95, marginBottom: 20,
        }}>
          <span style={{ color: C.text }}>BE FIRST TO</span><br />
          <span style={{ color: C.green, filter: `drop-shadow(0 0 20px ${C.green})` }}>SWING SMARTER</span>
        </h2>

        <p style={{
          fontFamily: "'DM Sans'", fontSize: 15, color: C.muted,
          maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7,
        }}>
          Join the waitlist for early access and a discounted launch price. We'll notify you the moment SwingView AI hits the App Store.
        </p>

        {!submitted ? (
          <form onSubmit={handleWaitlist} style={{
            display: "flex", gap: 10, justifyContent: "center",
            flexWrap: "wrap", marginBottom: 16,
          }}>
            <input
              className="waitlist-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ maxWidth: 300 }}
              required
            />
            <button type="submit" className="btn-primary">GET EARLY ACCESS →</button>
          </form>
        ) : (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "rgba(200,255,0,0.08)", border: `1px solid rgba(200,255,0,0.25)`,
            borderRadius: 12, padding: "16px 24px", marginBottom: 16,
            animation: "fadeIn 0.4s ease",
          }}>
            <span style={{ fontSize: 24 }}>✅</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.green, letterSpacing: 2 }}>YOU'RE ON THE LIST</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.muted }}>We'll email you at launch with an exclusive discount.</div>
            </div>
          </div>
        )}

        <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.dim }}>
          No spam. No credit card. Unsubscribe anytime.
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${C.border}`,
        padding: "40px 40px",
        maxWidth: 1200, margin: "0 auto",
      }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>⛳</div>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.text, letterSpacing: 3 }}>SWINGVIEW AI</span>
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.muted, lineHeight: 1.6, maxWidth: 240 }}>
              AI-powered golf swing analysis for everyday golfers. Coming to the App Store in 2026.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 12, color: C.muted, letterSpacing: 2, marginBottom: 12 }}>FOLLOW</div>
            {[
              { label: "Instagram", handle: "@swingviewai" },
              { label: "TikTok", handle: "@swingviewai" },
              { label: "YouTube", handle: "SwingView AI" },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.muted }}>{s.label} · </span>
                <span style={{ fontFamily: "'DM Mono'", fontSize: 11, color: C.green }}>{s.handle}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 12, color: C.muted, letterSpacing: 2, marginBottom: 12 }}>BUILT WITH</div>
            {["Swift + SwiftUI", "Apple Vision Framework", "Claude AI (Anthropic)", "AVFoundation"].map(t => (
              <div key={t} style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.muted, marginBottom: 6 }}>· {t}</div>
            ))}
          </div>
        </div>
        <div style={{
          borderTop: `1px solid ${C.border}`, paddingTop: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10,
        }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: C.dim }}>© 2026 SwingView AI. All rights reserved.</span>
          <span style={{ fontFamily: "'DM Mono'", fontSize: 10, color: C.dim, letterSpacing: 1 }}>swingview.ai</span>
        </div>
      </footer>
    </>
  );
}
