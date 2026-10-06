import { useEffect, useState } from "react";
import "./styles.css";

const FORMSPREE = "https://formspree.io/f/mqeybpyn";
const APP_STORE_URL = "#waitlist"; // swap for the App Store link at launch
const EVENTS_URL = "https://events.swingview.ai";

/* ------------------------------------------------------------------ */
/*  Icons (inline, 1.5px stroke)                                        */
/* ------------------------------------------------------------------ */
const I = {
  logo: (
    <svg className="brand-mark" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect width="26" height="26" rx="7" fill="#fff" />
      <path d="M7 18.5c3.5-1 7-6.5 8.5-11.5" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17.5" cy="18.5" r="2" fill="#34c759" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  plus: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  camera: (
    <svg className="feature-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 11l4-2.5v11L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  skeleton: (
    <svg className="feature-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 7.5v8M14 10l-6 3M14 10l6-3M14 15.5l-4 8M14 15.5l4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="13" r="1.3" fill="currentColor" /><circle cx="20" cy="7" r="1.3" fill="currentColor" />
      <circle cx="10" cy="23.5" r="1.3" fill="currentColor" /><circle cx="18" cy="23.5" r="1.3" fill="currentColor" />
    </svg>
  ),
  chat: (
    <svg className="feature-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M5 6.5h18a2 2 0 012 2v10a2 2 0 01-2 2h-9l-6 4v-4H5a2 2 0 01-2-2v-10a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 12h12M8 15.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  phases: (
    <svg className="feature-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="12" width="7" height="4" rx="1.5" fill="currentColor" opacity=".5" />
      <rect x="11.5" y="12" width="5" height="4" rx="1.5" fill="currentColor" />
      <rect x="18" y="12" width="7" height="4" rx="1.5" fill="currentColor" opacity=".5" />
      <path d="M3 21h22M3 7h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
    </svg>
  ),
  history: (
    <svg className="feature-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 8v6l4 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  compare: (
    <svg className="feature-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="9.5" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15.5" y="5" width="9.5" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 17l3.5-6M18.5 17l3.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Phone mockup — cycles through three real screens of the app         */
/* ------------------------------------------------------------------ */
function Skeleton() {
  // Simplified golfer at the top of the backswing, face-on.
  const j = {
    head: [118, 40], neck: [118, 58], hipL: [104, 118], hipR: [132, 118],
    shL: [96, 66], shR: [140, 66], elL: [78, 84], elR: [150, 52],
    wrL: [96, 44], wrR: [128, 36], knL: [100, 160], knR: [136, 160], anL: [96, 200], anR: [140, 200],
  };
  const L = ([a, b]) => `${a},${b}`;
  const bones = [
    ["neck", "shL"], ["neck", "shR"], ["shL", "elL"], ["elL", "wrL"], ["shR", "elR"], ["elR", "wrR"],
    ["shL", "hipL"], ["shR", "hipR"], ["hipL", "hipR"], ["hipL", "knL"], ["knL", "anL"], ["hipR", "knR"], ["knR", "anR"], ["neck", "head"],
  ];
  return (
    <svg viewBox="0 0 236 230" aria-hidden="true">
      <defs>
        <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity=".06" />
        </linearGradient>
      </defs>
      <rect x="0" y="150" width="236" height="80" fill="url(#floor)" />
      <path d="M112 40 L160 10" stroke="#8a8f98" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      {bones.map(([a, b]) => (
        <line key={a + b} x1={j[a][0]} y1={j[a][1]} x2={j[b][0]} y2={j[b][1]} stroke="#34c759" strokeWidth="2.2" strokeLinecap="round" />
      ))}
      {Object.values(j).map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === 0 ? 7 : 3.2} fill={i === 0 ? "none" : "#fff"} stroke="#fff" strokeWidth={i === 0 ? 2.2 : 0} />
      ))}
      <polyline points={[L([96, 44]), L([70, 70]), L([62, 110]), L([80, 150]), L([116, 172])].join(" ")} fill="none" stroke="#fff" strokeWidth="1.2" strokeDasharray="3 4" opacity=".55" />
    </svg>
  );
}

function ScreenReview() {
  return (
    <div className="screen-body screen-fade">
      <div className="screen-title">Swing review</div>
      <div className="screen-sub">7-iron · today 2:34 PM</div>
      <div className="skel-wrap">
        <Skeleton />
        <div className="badge"><b>●</b> 240 fps</div>
      </div>
      <div className="glass">
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8a8f98", marginBottom: 8 }}>
          <span>Backswing</span><span>Downswing</span><span>Follow-through</span>
        </div>
        <div className="phase-bar">
          <span style={{ flex: 0.74, background: "#34c759" }} />
          <span style={{ flex: 0.26, background: "#fff" }} />
          <span style={{ flex: 0.4, background: "rgba(255,255,255,.35)" }} />
        </div>
        <div className="mono" style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12 }}>
          <span>0.74s</span><span>0.26s</span><span>2.8 : 1</span>
        </div>
      </div>
      <div className="coach-msg">
        Good width at the top. Your hips start forward 90 ms before your hands drop — keep that. The one thing: trail elbow drifts behind you in transition.
      </div>
    </div>
  );
}

function ScreenCoach() {
  return (
    <div className="screen-body screen-fade">
      <div className="screen-title">Coach</div>
      <div className="screen-sub">Knows your last 12 swings</div>
      <div className="coach-msg">Your tempo has tightened from 3.4:1 to 2.8:1 over the last three sessions. Hip lead at impact is up 11°.</div>
      <div className="user-msg">Why do I keep pulling the 7-iron?</div>
      <div className="coach-msg">
        In 4 of your last 5 swings the club path was 3–4° left of your shoulder line at impact, with the face slightly closed to it. That combination starts the ball left and keeps it there.
        <br /><br />
        Try this at your next session: feel the trail elbow stay in front of your hip through transition. One ball at a time, half speed.
      </div>
      <div className="glass" style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px" }}>
        <span style={{ color: "#8a8f98" }}>Ask about your swing…</span>
        <span style={{ width: 24, height: 24, borderRadius: 12, background: "#34c759", display: "inline-block" }} />
      </div>
    </div>
  );
}

function ScreenSessions() {
  const rows = [
    { d: "Today", club: "7-iron", n: 14, tempo: "2.8 : 1", on: true },
    { d: "Sat", club: "Driver", n: 9, tempo: "3.0 : 1" },
    { d: "Thu", club: "Pitching wedge", n: 22, tempo: "3.3 : 1" },
    { d: "Mon", club: "7-iron", n: 11, tempo: "3.4 : 1" },
  ];
  return (
    <div className="screen-body screen-fade">
      <div className="screen-title">Sessions</div>
      <div className="screen-sub">56 swings this month</div>
      {rows.map((r) => (
        <div className="glass" key={r.d} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{r.d} · {r.club}</div>
            <div style={{ color: "#8a8f98", fontSize: 11, marginTop: 2 }}>{r.n} swings</div>
            <div className="phase-bar" style={{ marginTop: 8, width: 120 }}>
              <span style={{ flex: 0.7, background: r.on ? "#34c759" : "rgba(255,255,255,.5)" }} />
              <span style={{ flex: 0.25, background: "#fff" }} />
              <span style={{ flex: 0.35, background: "rgba(255,255,255,.3)" }} />
            </div>
          </div>
          <div className="mono" style={{ fontSize: 14 }}>{r.tempo}</div>
        </div>
      ))}
    </div>
  );
}

function Phone({ cycle = true, start = 0 }) {
  const screens = [ScreenReview, ScreenCoach, ScreenSessions];
  const [i, setI] = useState(start);
  useEffect(() => {
    if (!cycle) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % screens.length), 4200);
    return () => clearInterval(t);
  }, [cycle]);
  const Screen = screens[i];
  const tabs = ["Record", "Sessions", "Coach", "Replay", "Me"];
  const active = [3, 2, 1][i];
  return (
    <div className="phone" aria-label="SwingView app preview">
      <div className="phone-island" />
      <div className="screen">
        <div className="screen-status"><span>9:41</span><span className="mono" style={{ fontSize: 11 }}>240fps</span></div>
        <Screen key={i} />
        <div className="tabbar">
          {tabs.map((t, k) => (
            <span key={t} className={k === active ? "on" : ""}><i />{t}</span>
          ))}
        </div>
      </div>
      {cycle && (
        <div className="screen-dots">{screens.map((_, k) => <i key={k} className={k === i ? "on" : ""} />)}</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Waitlist form                                                       */
/* ------------------------------------------------------------------ */
function Waitlist({ cta = "Join the waitlist" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch(FORMSPREE, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email }) });
    } catch (err) { console.error(err); }
    setDone(true);
  };
  if (done) {
    return (
      <div className="form-ok">{I.check}<span><b>You're on the list.</b> We'll email you when SwingView is on the App Store.</span></div>
    );
  }
  return (
    <form className="form" onSubmit={submit}>
      <input className="input" type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
      <button className="btn btn-white" type="submit">{cta}</button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */
const FAQS = [
  ["Do I need any equipment?", "Just your iPhone and something to lean it on. SwingView records at 240 fps from the back camera and runs pose tracking on-device, so there's no sensor, no launch monitor and no subscription hardware."],
  ["How is this different from a launch monitor?", "A launch monitor tells you what the ball did. SwingView tells you what your body did to make it do that — tempo, hip lead, sequencing, club path — and then a coach that remembers your history tells you what to work on."],
  ["Is the coaching generic?", "No. The coach only talks about measurements from your own swings. It can see your last sessions, so it can tell you whether a change actually stuck, not just whether this one swing looked good."],
  ["How long does an analysis take?", "Your swing video is viewable the moment you stop recording. The full breakdown and coaching land under a minute later, and you can keep hitting balls while it processes."],
  ["Is it only for good golfers?", "It's built for everyday golfers. If you can set your phone down and hit a ball, it works. Skill level only changes what the coach prioritises."],
  ["What about my video and data?", "Videos stay on your phone unless you choose to share. Analysis clips are trimmed to the swing and processed securely; we never sell data. Details are in the privacy policy."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {FAQS.map(([q, a], k) => (
        <div className="faq-item" key={q} data-open={open === k}>
          <button className="faq-q" onClick={() => setOpen(open === k ? -1 : k)} aria-expanded={open === k}>
            <span>{q}</span>{I.plus}
          </button>
          <div className="faq-a"><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <>
      <header className="nav">
        <div className="wrap">
          <a href="#top" className="brand">{I.logo}<span>SwingView</span></a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href={EVENTS_URL}>In person</a>
          </nav>
          <div className="nav-right">
            <a className="btn btn-white btn-sm" href={APP_STORE_URL}>Get the app</a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap">
            <h1>A swing coach that has actually seen your swing.</h1>
            <p className="lede">
              SwingView records every swing at 240 frames per second, measures what your body did, and gives you a coach that remembers all of it.
            </p>
            <div className="hero-actions">
              <a className="btn btn-white" href={APP_STORE_URL}>Get the app</a>
              <a className="btn btn-ghost" href="#how">See how it works</a>
            </div>
            <div className="hero-note">iPhone · Free to start · No extra hardware</div>
          </div>
          <div className="hero-stage">
            <Phone />
          </div>
        </section>

        {/* STATEMENT + FEATURES */}
        <section className="section" id="features">
          <div className="wrap">
            <div className="section-head">
              <h2>Measurement first. Advice second.</h2>
              <p>Most swing apps hand you a video and a generic tip. SwingView measures the swing first, then coaches from the numbers — so the advice is about your move, not the average golfer's.</p>
            </div>
            <div className="features">
              {[
                [I.camera, "240 fps capture", "High-frame-rate video from your iPhone's back camera, so the downswing is dozens of frames instead of three."],
                [I.skeleton, "Skeleton tracking", "Full-body pose on every frame, overlaid on your replay so you can see hip, shoulder and hand positions instead of guessing."],
                [I.phases, "Phase breakdown", "Backswing, downswing and follow-through timed to the millisecond. Tempo, hip lead and sequencing on each swing."],
                [I.chat, "A coach with memory", "Ask anything about your swing. The coach reads your measurements and your history, and answers in plain language."],
                [I.history, "Sessions that add up", "Every swing is saved and trimmed. Watch a tendency change over weeks, not just within one bucket of balls."],
                [I.compare, "Replay and compare", "Frame-step at the real frame rate, slow to a quarter speed, and compare against a reference swing side by side."],
              ].map(([icon, h, p]) => (
                <div className="feature" key={h}>{icon}<h3>{h}</h3><p>{p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section" id="how">
          <div className="wrap">
            <div className="section-head">
              <h2>Set your phone down. Hit balls.</h2>
              <p>There's nothing to tap between shots. The whole loop fits inside a normal range session.</p>
            </div>
            <div className="steps">
              {[
                ["Record", "Lean your iPhone against your bag, face-on or down the line. SwingView records at 240 fps and detects each swing automatically."],
                ["Measure", "Pose tracking runs on every frame. Tempo, hip lead, club path and a dozen more measurements are pulled from the video."],
                ["Review", "Your swing is on screen the second you finish — scrub it, slow it, see the skeleton. Coaching fills in below while you keep hitting."],
                ["Improve", "Ask the coach what to work on. It knows this swing and the last fifty, so it can tell you what's changing and what isn't."],
              ].map(([h, p], k) => (
                <div className="step" key={h}>
                  <div className="n">0{k + 1}</div>
                  <h3>{h}</h3><p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="section">
          <div className="wrap">
            <div className="metrics">
              {[
                ["240", "fps", "Capture rate on supported iPhones"],
                ["133", "", "Body keypoints tracked per frame"],
                ["19", "", "Swing measurements per analysis"],
                ["<60", "s", "From swing to full coaching"],
              ].map(([v, u, l]) => (
                <div className="metric" key={l}>
                  <div className="v">{v}{u && <small>{u}</small>}</div>
                  <div className="l">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COACH SPLIT */}
        <section className="section">
          <div className="wrap split">
            <div className="copy">
              <h2>Ask it why the ball went left.</h2>
              <p>The coach isn't a chatbot bolted onto a video player. It reads the same measurements you see — on this swing and every previous one — and answers like a coach who's been watching all season.</p>
              <ul>
                <li>Remembers your sessions, so it can tell you what's actually changed</li>
                <li>Explains in plain language, with the number behind every claim</li>
                <li>Gives one thing to work on, not a list of ten</li>
              </ul>
            </div>
            <div className="visual"><Phone cycle={false} start={1} /></div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <div className="wrap">
            <div className="section-head center">
              <h2>Start free. Upgrade when it earns it.</h2>
              <p>Record and review as much as you like for free. Pay only for the analysis and coaching.</p>
            </div>
            <div className="plans">
              <div className="plan">
                <div className="name">Free</div>
                <div className="price">$0</div>
                <div className="blurb">Everything you need to see your swing properly.</div>
                <ul>
                  {["Unlimited 240 fps recording", "Swing detection and trimming", "Skeleton overlay on replay", "Frame-step and slow motion", "Session history", "3 full analyses a month"].map((f) => <li key={f}>{I.check}<span>{f}</span></li>)}
                </ul>
                <a className="btn btn-ghost" href={APP_STORE_URL}>Get the app</a>
              </div>
              <div className="plan featured">
                <div className="name"><span>Pro</span><span className="tag">Launch price</span></div>
                <div className="price">$59.99<small>/ year</small></div>
                <div className="blurb">Unlimited analysis and a coach that remembers everything.</div>
                <ul>
                  {["Everything in Free", "Unlimited full analyses", "Phase timing, tempo and sequencing on every swing", "Coach with full session memory", "Compare against reference swings", "Share cards"].map((f) => <li key={f}>{I.check}<span>{f}</span></li>)}
                </ul>
                <a className="btn btn-white" href={APP_STORE_URL}>Get the app</a>
              </div>
            </div>
            <div className="pricing-note">Prices in CAD. Pro is billed annually through the App Store and can be cancelled any time.</div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head center">
              <h2>Questions</h2>
            </div>
            <Faq />
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="waitlist">
          <div className="wrap">
            <h2>See what you can't feel.</h2>
            <p>SwingView is coming to the App Store. Leave your email and we'll let you know the day it's live.</p>
            <Waitlist />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <a href="#top" className="brand">{I.logo}<span>SwingView</span></a>
              <p>AI swing analysis and coaching for everyday golfers. Built in Mississauga, Ontario.</p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="#how">How it works</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>In person</h4>
              <ul>
                <li><a href={EVENTS_URL}>SwingView Live sessions</a></li>
                <li><a href={EVENTS_URL}>Book a range day</a></li>
              </ul>
            </div>
            <div>
              <h4>Follow</h4>
              <ul>
                <li><a href="https://www.instagram.com/swingviewai" rel="noreferrer">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@swingviewai" rel="noreferrer">TikTok</a></li>
                <li><a href="https://www.youtube.com/@swingviewai" rel="noreferrer">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} SwingView · Predictive Growth Labs</span>
            <span><a href="/privacy.html">Privacy policy</a></span>
          </div>
        </div>
      </footer>
    </>
  );
}
