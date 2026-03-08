import { useState, useEffect, useRef } from "react";

const COLORS = {
  black: "#0a0a0a",
  dark: "#141414",
  darkGray: "#1c1c1c",
  midGray: "#2a2a2a",
  textMuted: "#8a8a8a",
  textLight: "#b0b0b0",
  white: "#f5f5f0",
  cream: "#e8e4db",
  accent: "#c8ff00",
  accentDark: "#a8d600",
  gold: "#c9a84c",
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible];
};

const FadeIn = ({ children, delay = 0, direction = "up", style = {} }) => {
  const [ref, isVisible] = useInView();
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", none: "none" };
  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "none" : transforms[direction],
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

// --- NAV ---
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(200,255,0,0.08)" : "none",
      transition: "all 0.4s ease", padding: "16px 0",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{
            width: 42, height: 42, background: COLORS.accent, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 15, color: COLORS.black, letterSpacing: "-0.5px",
          }}>SV</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.2rem", color: COLORS.white, letterSpacing: "-0.5px" }}>SwingView</div>
            <div style={{ fontSize: "0.65rem", color: COLORS.textMuted, letterSpacing: "2px", textTransform: "uppercase" }}>Video Swing Analysis</div>
          </div>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {["process", "pricing", "locations", "faq"].map(id => (
            <span key={id} onClick={() => scrollTo(id)} style={{
              color: COLORS.textLight, fontSize: "0.85rem", fontWeight: 500,
              cursor: "pointer", letterSpacing: "0.5px", textTransform: "uppercase",
              transition: "color 0.2s",
            }} onMouseEnter={e => e.target.style.color = COLORS.accent}
               onMouseLeave={e => e.target.style.color = COLORS.textLight}>
              {id === "process" ? "How It Works" : id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          ))}
          <button onClick={() => scrollTo("booking")} style={{
            background: COLORS.accent, color: COLORS.black, border: "none",
            padding: "10px 24px", borderRadius: 8, fontWeight: 800, fontSize: "0.85rem",
            cursor: "pointer", letterSpacing: "0.5px", textTransform: "uppercase",
            transition: "transform 0.2s, box-shadow 0.2s",
          }} onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = `0 4px 20px ${COLORS.accent}35`; }}
             onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}>
            Book Now
          </button>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer", padding: 8,
          flexDirection: "column", gap: 5,
        }} className="mobile-menu-btn">
          <span style={{ display: "block", width: 24, height: 2, background: COLORS.white, transition: "0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 2, background: COLORS.white, opacity: menuOpen ? 0 : 1, transition: "0.3s" }} />
          <span style={{ display: "block", width: 24, height: 2, background: COLORS.white, transition: "0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>
      {menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(10,10,10,0.98)", backdropFilter: "blur(20px)",
          padding: "24px", borderTop: `1px solid ${COLORS.midGray}`,
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          {["process", "pricing", "locations", "faq", "booking"].map(id => (
            <span key={id} onClick={() => scrollTo(id)} style={{
              color: id === "booking" ? COLORS.accent : COLORS.textLight,
              fontSize: "1rem", fontWeight: id === "booking" ? 800 : 500,
              cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px",
            }}>
              {id === "process" ? "How It Works" : id === "booking" ? "Book Now →" : id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

// --- HERO ---
const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `radial-gradient(ellipse at 30% 20%, rgba(200,255,0,0.04) 0%, transparent 50%), 
                   radial-gradient(ellipse at 70% 80%, rgba(200,255,0,0.03) 0%, transparent 50%),
                   ${COLORS.black}`,
      position: "relative", overflow: "hidden", padding: "120px 24px 80px",
    }}>
      {/* Grid pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `linear-gradient(${COLORS.white} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.white} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn delay={0.1}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(200,255,0,0.08)", border: "1px solid rgba(200,255,0,0.15)",
            borderRadius: 50, padding: "8px 20px", marginBottom: 32,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accent, animation: "pulse 2s infinite" }} />
            <span style={{ color: COLORS.accent, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Now Booking — Mississauga & Oakville
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <h1 style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900, lineHeight: 1.05,
            color: COLORS.white, letterSpacing: "-2px", marginBottom: 24,
          }}>
            See What You<br />
            <span style={{ color: COLORS.accent }}>Can't Feel</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: COLORS.textMuted,
            maxWidth: 550, margin: "0 auto 40px", lineHeight: 1.7,
          }}>
            Professional video swing analysis at your local range. Two camera angles, 
            slow-motion breakdown, and take-home drills — all for <span style={{ color: COLORS.white, fontWeight: 700 }}>$45</span>.
          </p>
        </FadeIn>
        <FadeIn delay={0.55}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("booking")} style={{
              background: COLORS.accent, color: COLORS.black, border: "none",
              padding: "16px 40px", borderRadius: 12, fontWeight: 800, fontSize: "1rem",
              cursor: "pointer", letterSpacing: "0.5px",
              transition: "transform 0.2s, box-shadow 0.2s",
            }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 30px ${COLORS.accent}30`; }}
               onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}>
              Book Your Session →
            </button>
            <button onClick={() => scrollTo("process")} style={{
              background: "transparent", color: COLORS.textLight, 
              border: `1px solid ${COLORS.midGray}`, padding: "16px 32px", borderRadius: 12,
              fontWeight: 600, fontSize: "1rem", cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }} onMouseEnter={e => { e.target.style.borderColor = COLORS.textMuted; e.target.style.color = COLORS.white; }}
               onMouseLeave={e => { e.target.style.borderColor = COLORS.midGray; e.target.style.color = COLORS.textLight; }}>
              See How It Works
            </button>
          </div>
        </FadeIn>
        <FadeIn delay={0.7}>
          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
            {[
              ["35-45", "Minutes"],
              ["2", "Camera Angles"],
              ["100%", "Take-Home Video"],
            ].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: COLORS.white }}>{num}</div>
                <div style={{ fontSize: "0.75rem", color: COLORS.textMuted, letterSpacing: "1px", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
};

// --- PROCESS ---
const Process = () => {
  const steps = [
    { num: "01", title: "Record", desc: "I capture your swing from face-on and down-the-line using high-frame-rate video. 3-5 swings from each angle.", icon: "🎥" },
    { num: "02", title: "Analyze", desc: "We review together in slow motion. I annotate swing plane, posture, impact position, and key checkpoints.", icon: "📐" },
    { num: "03", title: "Improve", desc: "You leave with annotated videos, a clear summary of findings, and specific drills tailored to your swing.", icon: "📋" },
  ];
  return (
    <section id="process" style={{ padding: "120px 24px", background: COLORS.dark }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: COLORS.accent }} />
            <span style={{ color: COLORS.accent, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>The Process</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: COLORS.white, letterSpacing: "-1px", marginBottom: 60 }}>
            Three steps to a<br />better swing.
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.15 * i}>
              <div style={{
                background: COLORS.darkGray, borderRadius: 16, padding: "40px 32px",
                border: `1px solid ${COLORS.midGray}`, transition: "border-color 0.3s, transform 0.3s",
                cursor: "default", height: "100%",
              }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,255,0,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.midGray; e.currentTarget.style.transform = "none"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <span style={{ fontSize: "2.5rem" }}>{step.icon}</span>
                  <span style={{ color: "rgba(200,255,0,0.2)", fontSize: "3rem", fontWeight: 900, lineHeight: 1 }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: COLORS.white, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: COLORS.textMuted, lineHeight: 1.7, fontSize: "0.95rem" }}>{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- PRICING ---
const Pricing = () => {
  const plans = [
    { name: "Intro Special", price: "$35", sub: "First time only", features: ["Full analysis session", "Two camera angles", "Annotated video review", "Take-home clips & drills", "Limited time offer"], tag: "TRY IT" },
    { name: "Single Session", price: "$45", sub: "Per session", features: ["35-45 minute session", "Two camera angles", "Slow-motion annotated review", "Take-home video clips", "Personalized drill plan"], featured: true, tag: "MOST POPULAR" },
    { name: "3-Pack", price: "$115", sub: "Save $20", features: ["Everything in Single", "Track progress over time", "Side-by-side comparisons", "Priority booking", "Best value"], tag: "BEST VALUE" },
  ];
  return (
    <section id="pricing" style={{ padding: "120px 24px", background: COLORS.black }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: COLORS.accent }} />
              <span style={{ color: COLORS.accent, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Pricing</span>
              <div style={{ width: 40, height: 1, background: COLORS.accent }} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: COLORS.white, letterSpacing: "-1px" }}>
              Simple, honest pricing.
            </h2>
            <p style={{ color: COLORS.textMuted, marginTop: 12, fontSize: "1.05rem" }}>No memberships. No upsells. Just great analysis.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 960, margin: "0 auto" }}>
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={0.12 * i}>
              <div style={{
                background: plan.featured ? `linear-gradient(135deg, ${COLORS.darkGray}, rgba(200,255,0,0.05))` : COLORS.darkGray,
                borderRadius: 16, padding: "36px 28px", position: "relative",
                border: plan.featured ? `2px solid ${COLORS.accent}` : `1px solid ${COLORS.midGray}`,
                height: "100%", display: "flex", flexDirection: "column",
              }}>
                <div style={{
                  position: "absolute", top: -1, left: 28, 
                  background: plan.featured ? COLORS.accent : COLORS.midGray,
                  color: plan.featured ? COLORS.black : COLORS.textMuted,
                  padding: "4px 14px", borderRadius: "0 0 8px 8px",
                  fontSize: "0.65rem", fontWeight: 800, letterSpacing: "1.5px",
                }}>{plan.tag}</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: COLORS.textLight, marginTop: 16, marginBottom: 8 }}>{plan.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: "3rem", fontWeight: 900, color: plan.featured ? COLORS.accent : COLORS.white, letterSpacing: "-2px" }}>{plan.price}</span>
                </div>
                <span style={{ fontSize: "0.85rem", color: COLORS.textMuted, marginBottom: 24 }}>{plan.sub}</span>
                <div style={{ flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: j === 0 ? `1px solid ${COLORS.midGray}` : "none", borderBottom: `1px solid ${COLORS.midGray}` }}>
                      <span style={{ color: COLORS.accent, fontWeight: 700, fontSize: "0.85rem" }}>✓</span>
                      <span style={{ color: COLORS.textLight, fontSize: "0.9rem" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })} style={{
                  marginTop: 24, width: "100%", padding: "14px",
                  background: plan.featured ? COLORS.accent : "transparent",
                  color: plan.featured ? COLORS.black : COLORS.textLight,
                  border: plan.featured ? "none" : `1px solid ${COLORS.midGray}`,
                  borderRadius: 10, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                  transition: "all 0.2s",
                }} onMouseEnter={e => { if (!plan.featured) { e.target.style.borderColor = COLORS.accent; e.target.style.color = COLORS.accent; } else { e.target.style.boxShadow = `0 4px 20px ${COLORS.accent}30`; } }}
                   onMouseLeave={e => { if (!plan.featured) { e.target.style.borderColor = COLORS.midGray; e.target.style.color = COLORS.textLight; } else { e.target.style.boxShadow = "none"; } }}>
                  {plan.featured ? "Book Now →" : "Select"}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- TESTIMONIALS ---
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const testimonials = [
    { name: "Mark T.", handicap: "16 handicap", text: "I've taken lessons before but never actually understood what was happening in my swing until I saw it on video. The slow-motion breakdown was eye-opening. Left with two drills and dropped 3 strokes in a month.", rating: 5 },
    { name: "Sarah K.", handicap: "Beginner", text: "I was nervous about being judged as a beginner, but the session was super chill and encouraging. He showed me exactly where my grip was causing my slice. The take-home video is something I still reference at the range every week.", rating: 5 },
    { name: "Dave R.", handicap: "22 handicap", text: "Way more useful than a traditional lesson for me. Seeing my swing plane compared to where it should be made everything click. The annotated video alone is worth more than the $45. Already booked my second session.", rating: 5 },
    { name: "Jason L.", handicap: "12 handicap", text: "I thought my backswing was solid but turns out I was way too steep. The side-by-side comparison with a pro swing was humbling but incredibly helpful. This is what every golfer needs before spending money on new clubs.", rating: 5 },
  ];
  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section style={{ padding: "120px 24px", background: COLORS.dark }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: COLORS.accent }} />
              <span style={{ color: COLORS.accent, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Reviews</span>
              <div style={{ width: 40, height: 1, background: COLORS.accent }} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: COLORS.white, letterSpacing: "-1px" }}>
              What golfers are saying.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", minHeight: 220 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                position: i === active ? "relative" : "absolute", top: 0, left: 0, right: 0,
                opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease", pointerEvents: i === active ? "auto" : "none",
                background: COLORS.darkGray, borderRadius: 16, padding: "36px 32px",
                border: `1px solid ${COLORS.midGray}`,
              }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} style={{ color: COLORS.accent, fontSize: "1.1rem" }}>★</span>
                  ))}
                </div>
                <p style={{ color: COLORS.textLight, fontSize: "1.05rem", lineHeight: 1.8, fontStyle: "italic", marginBottom: 20 }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}30, ${COLORS.midGray})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: COLORS.accent, fontWeight: 800, fontSize: "0.9rem",
                  }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ color: COLORS.white, fontWeight: 700, fontSize: "0.95rem" }}>{t.name}</div>
                    <div style={{ color: COLORS.textMuted, fontSize: "0.8rem" }}>{t.handicap}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                  background: i === active ? COLORS.accent : COLORS.midGray,
                  border: "none", cursor: "pointer", transition: "all 0.3s",
                }} />
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{
            display: "flex", justifyContent: "center", gap: 48, marginTop: 60, flexWrap: "wrap",
            padding: "32px 0", borderTop: `1px solid ${COLORS.midGray}`,
          }}>
            {[
              ["50+", "Swings Analyzed"],
              ["4.9★", "Average Rating"],
              ["93%", "Book Again"],
            ].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: COLORS.accent }}>{num}</div>
                <div style={{ fontSize: "0.75rem", color: COLORS.textMuted, letterSpacing: "1px", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// --- LOCATIONS ---
const Locations = () => {
  const locs = [
    { name: "Tee Zone Golf", area: "Oakville", address: "4105 Hwy 25, Oakville", note: "Large facility, open until 10pm", emoji: "⛳" },
    { name: "Bathgate Golf Centre", area: "Mississauga", address: "Mississauga", note: "Accessible, great amenities", emoji: "🏌️" },
    { name: "Your Range", area: "Mobile", address: "Mississauga / Oakville area", note: "I come to you — any local range", emoji: "📍" },
  ];
  return (
    <section id="locations" style={{ padding: "120px 24px", background: COLORS.dark }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: COLORS.accent }} />
            <span style={{ color: COLORS.accent, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Locations</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: COLORS.white, letterSpacing: "-1px", marginBottom: 60 }}>
            Where we meet.
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {locs.map((loc, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div style={{
                background: COLORS.darkGray, borderRadius: 16, padding: "32px 28px",
                border: `1px solid ${COLORS.midGray}`, transition: "border-color 0.3s",
              }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(200,255,0,0.15)"}
                 onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.midGray}>
                <span style={{ fontSize: "2rem" }}>{loc.emoji}</span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: COLORS.white, marginTop: 12, marginBottom: 4 }}>{loc.name}</h3>
                <div style={{ color: COLORS.accent, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>{loc.area}</div>
                <p style={{ color: COLORS.textMuted, fontSize: "0.9rem", marginBottom: 4 }}>{loc.address}</p>
                <p style={{ color: COLORS.textMuted, fontSize: "0.85rem" }}>{loc.note}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- BOOKING ---
const Booking = () => {
  const [form, setForm] = useState({ name: "", contact: "", location: "", package: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const FORMSPREE_ID = "YOUR_FORMSPREE_ID"; // Replace with your Formspree form ID
  const handleSubmit = async () => {
    if (!form.name || !form.contact) { setError("Please fill in your name and contact info."); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name, contact: form.contact, location: form.location,
          "package": form.package, message: form.message,
          _subject: `SwingView Booking — ${form.name}`,
        }),
      });
      if (res.ok) { setSubmitted(true); }
      else { setError("Something went wrong. Try texting or emailing directly."); }
    } catch (err) { setError("Connection error. Try again or reach out directly."); }
    setSubmitting(false);
  };
  const inputStyle = {
    width: "100%", padding: "14px 16px", background: COLORS.midGray, border: `1px solid ${COLORS.midGray}`,
    borderRadius: 10, color: COLORS.white, fontSize: "0.95rem", outline: "none",
    fontFamily: "inherit", transition: "border-color 0.2s",
  };
  if (submitted) return (
    <section id="booking" style={{ padding: "120px 24px", background: COLORS.black }}>
      <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: COLORS.white, marginBottom: 12 }}>Request Sent!</h2>
        <p style={{ color: COLORS.textMuted, lineHeight: 1.7 }}>I'll confirm availability and send payment details within a few hours. Looking forward to checking your swing.</p>
      </div>
    </section>
  );
  return (
    <section id="booking" style={{ padding: "120px 24px", background: COLORS.black }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: COLORS.accent }} />
              <span style={{ color: COLORS.accent, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Book</span>
              <div style={{ width: 40, height: 1, background: COLORS.accent }} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, color: COLORS.white, letterSpacing: "-1px" }}>
              Ready to fix your swing?
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ background: COLORS.darkGray, borderRadius: 20, padding: "40px 32px", border: `1px solid ${COLORS.midGray}` }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: COLORS.textMuted, fontSize: "0.8rem", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Name</label>
                <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  onFocus={e => e.target.style.borderColor = COLORS.accent} onBlur={e => e.target.style.borderColor = COLORS.midGray} />
              </div>
              <div>
                <label style={{ display: "block", color: COLORS.textMuted, fontSize: "0.8rem", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Phone or Email</label>
                <input style={inputStyle} placeholder="Best way to reach you" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}
                  onFocus={e => e.target.style.borderColor = COLORS.accent} onBlur={e => e.target.style.borderColor = COLORS.midGray} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", color: COLORS.textMuted, fontSize: "0.8rem", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Location</label>
                  <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                    onFocus={e => e.target.style.borderColor = COLORS.accent} onBlur={e => e.target.style.borderColor = COLORS.midGray}>
                    <option value="" style={{ background: COLORS.midGray }}>Select...</option>
                    <option value="tee-zone" style={{ background: COLORS.midGray }}>Tee Zone — Oakville</option>
                    <option value="bathgate" style={{ background: COLORS.midGray }}>Bathgate — Mississauga</option>
                    <option value="other" style={{ background: COLORS.midGray }}>Other Range</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: COLORS.textMuted, fontSize: "0.8rem", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Package</label>
                  <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.package} onChange={e => setForm({...form, package: e.target.value})}
                    onFocus={e => e.target.style.borderColor = COLORS.accent} onBlur={e => e.target.style.borderColor = COLORS.midGray}>
                    <option value="" style={{ background: COLORS.midGray }}>Select...</option>
                    <option value="intro" style={{ background: COLORS.midGray }}>Intro — $35</option>
                    <option value="single" style={{ background: COLORS.midGray }}>Single — $45</option>
                    <option value="3-pack" style={{ background: COLORS.midGray }}>3-Pack — $115</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: COLORS.textMuted, fontSize: "0.8rem", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>What's bugging your swing? (Optional)</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 80 }} placeholder="Slice? Inconsistency? Topping it?" value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  onFocus={e => e.target.style.borderColor = COLORS.accent} onBlur={e => e.target.style.borderColor = COLORS.midGray} />
              </div>
              <button onClick={handleSubmit} disabled={submitting} style={{
                width: "100%", padding: "16px", background: submitting ? COLORS.midGray : COLORS.accent, color: COLORS.black,
                border: "none", borderRadius: 10, fontWeight: 800, fontSize: "1rem",
                cursor: submitting ? "wait" : "pointer", marginTop: 8, transition: "transform 0.2s, box-shadow 0.2s",
                opacity: submitting ? 0.7 : 1,
              }} onMouseEnter={e => { if (!submitting) { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 6px 24px ${COLORS.accent}30`; } }}
                 onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}>
                {submitting ? "Sending..." : "Request Booking →"}
              </button>
              {error && <p style={{ textAlign: "center", color: "#ef4444", fontSize: "0.85rem", marginTop: 8 }}>{error}</p>}
              <p style={{ textAlign: "center", color: COLORS.textMuted, fontSize: "0.8rem", marginTop: 4 }}>
                I'll confirm availability and send payment details via text or email.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// --- FAQ ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const items = [
    { q: "Are you a certified golf instructor?", a: "I specialize in video swing analysis using professional software. I provide technical breakdowns, visual analysis, and practice suggestions. For hands-on swing coaching, I can recommend certified instructors I work with." },
    { q: "What if I'm a complete beginner?", a: "Perfect! Video analysis is actually ideal for beginners — it helps you see what you're actually doing vs. what you think you're doing. I keep the feedback simple and focused on fundamentals that'll have the biggest impact." },
    { q: "How long does a session take?", a: "Plan for 35-45 minutes. About 10 minutes recording your swing from different angles, then 20-25 minutes reviewing the video together with annotations and discussing what to practice." },
    { q: "What do I need to bring?", a: "Just your clubs and range balls. I bring all the video equipment and analysis software. A medium bucket is usually enough for a session." },
    { q: "What software do you use?", a: "I use V1 Golf — the same professional analysis software used by PGA Tour coaches. It allows frame-by-frame playback, swing plane lines, angle measurements, and side-by-side comparison." },
  ];
  return (
    <section id="faq" style={{ padding: "120px 24px", background: COLORS.dark }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: COLORS.accent }} />
              <span style={{ color: COLORS.accent, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>FAQ</span>
              <div style={{ width: 40, height: 1, background: COLORS.accent }} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, color: COLORS.white, letterSpacing: "-1px" }}>
              Common questions.
            </h2>
          </div>
        </FadeIn>
        {items.map((item, i) => (
          <FadeIn key={i} delay={0.06 * i}>
            <div style={{ borderBottom: `1px solid ${COLORS.midGray}` }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
              }}>
                <span style={{ color: COLORS.white, fontSize: "1.05rem", fontWeight: 600, paddingRight: 16 }}>{item.q}</span>
                <span style={{
                  color: COLORS.accent, fontSize: "1.5rem", fontWeight: 300,
                  transform: openIndex === i ? "rotate(45deg)" : "none",
                  transition: "transform 0.3s", flexShrink: 0,
                }}>+</span>
              </button>
              <div style={{
                maxHeight: openIndex === i ? 200 : 0, overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}>
                <p style={{ color: COLORS.textMuted, lineHeight: 1.7, paddingBottom: 24, fontSize: "0.95rem" }}>{item.a}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

// --- APP PROMO ---
const AppPromo = () => (
  <section style={{
    padding: "120px 24px", position: "relative", overflow: "hidden",
    background: `radial-gradient(ellipse at 50% 0%, rgba(200,255,0,0.05) 0%, transparent 60%), ${COLORS.black}`,
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Left: Text */}
        <FadeIn>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: COLORS.accent }} />
              <span style={{ color: COLORS.accent, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>The App</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: COLORS.white, letterSpacing: "-1px", marginBottom: 20, lineHeight: 1.15 }}>
              AI swing analysis<br />in your pocket.
            </h2>
            <p style={{ color: COLORS.textMuted, fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 32, maxWidth: 440 }}>
              Film your swing, get instant AI-powered feedback. The SwingView app analyzes your setup, backswing, downswing, impact, and follow-through — then gives you a score, priority fixes, and personalized drills.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              {[
                ["📱", "Upload any swing video for instant analysis"],
                ["🎯", "Get scored on 5 key swing phases"],
                ["📋", "Personalized drills based on your weaknesses"],
                ["📈", "Track your progress over time"],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: "1.1rem", width: 24, textAlign: "center" }}>{icon}</span>
                  <span style={{ color: COLORS.textLight, fontSize: "0.95rem" }}>{text}</span>
                </div>
              ))}
            </div>
            {/* App Store Buttons */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 24px",
                background: COLORS.white, borderRadius: 12, textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer",
              }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)"; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div style={{ fontSize: "0.6rem", color: "#666", letterSpacing: "0.5px" }}>Download on the</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#000", marginTop: -2 }}>App Store</div>
                </div>
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 24px",
                background: COLORS.white, borderRadius: 12, textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer",
              }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)"; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
                  <path d="M1.22.56L12.62 12 1.22 23.44C.86 23.08.64 22.53.64 21.87V2.13C.64 1.47.86.92 1.22.56z" fill="#4285F4"/>
                  <path d="M16.45 8.17L12.62 12l3.83 3.83 4.34-2.5c.79-.46.79-1.2 0-1.66l-4.34-2.5z" fill="#FBBC04"/>
                  <path d="M1.22 23.44c.2.2.44.36.72.44l10.68-7.05L8.79 13l-7.57 10.44z" fill="#EA4335"/>
                  <path d="M1.94 1c-.28.08-.52.24-.72.44L8.79 11l3.83-3.83L1.94 1z" fill="#34A853"/>
                </svg>
                <div>
                  <div style={{ fontSize: "0.6rem", color: "#666", letterSpacing: "0.5px" }}>Get it on</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#000", marginTop: -2 }}>Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Right: Phone mockup */}
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 280, height: 560, borderRadius: 40, padding: 12,
              background: `linear-gradient(145deg, ${COLORS.midGray}, ${COLORS.darkGray})`,
              boxShadow: `0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
              position: "relative",
            }}>
              {/* Notch */}
              <div style={{
                position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
                width: 100, height: 28, background: COLORS.darkGray, borderRadius: 14, zIndex: 2,
              }} />
              {/* Screen */}
              <div style={{
                width: "100%", height: "100%", borderRadius: 30, overflow: "hidden",
                background: COLORS.black, position: "relative",
              }}>
                {/* App content preview */}
                <div style={{ padding: "48px 20px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                    <div style={{
                      width: 28, height: 28, background: COLORS.accent, borderRadius: 7,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, fontSize: 10, color: COLORS.black,
                    }}>SV</div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: COLORS.white }}>SwingView</span>
                  </div>

                  {/* Score ring */}
                  <div style={{
                    display: "flex", justifyContent: "center", padding: "20px 0",
                    background: COLORS.darkGray, borderRadius: 16, marginBottom: 14,
                    border: `1px solid ${COLORS.midGray}`,
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
                        <circle cx="40" cy="40" r="32" fill="none" stroke={COLORS.midGray} strokeWidth="5" />
                        <circle cx="40" cy="40" r="32" fill="none" stroke={COLORS.accent} strokeWidth="5"
                          strokeDasharray={201} strokeDashoffset={201 - (78 / 100) * 201} strokeLinecap="round" />
                      </svg>
                      <div style={{ marginTop: -56, marginBottom: 30 }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.white }}>78</div>
                        <div style={{ fontSize: 8, color: COLORS.textMuted, letterSpacing: "1px", textTransform: "uppercase" }}>Overall</div>
                      </div>
                    </div>
                  </div>

                  {/* Mini score bars */}
                  {[
                    ["Setup", 82, COLORS.accent],
                    ["Backswing", 74, COLORS.gold],
                    ["Impact", 78, COLORS.accent],
                  ].map(([label, score, color]) => (
                    <div key={label} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 10, color: COLORS.textMuted }}>{label}</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color }}>{score}</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: COLORS.midGray }}>
                        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}

                  {/* Priority card */}
                  <div style={{
                    marginTop: 14, padding: "12px", borderRadius: 12,
                    background: `${COLORS.accent}10`, border: `1px solid ${COLORS.accent}20`,
                  }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: COLORS.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4 }}>⚡ #1 Priority</div>
                    <div style={{ fontSize: 10, color: COLORS.white, lineHeight: 1.4 }}>Lead with your hips in the downswing transition</div>
                  </div>
                </div>

                {/* Bottom tab bar */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "rgba(10,15,13,0.95)", borderTop: `1px solid ${COLORS.midGray}`,
                  padding: "8px 0 16px", display: "flex", justifyContent: "space-around",
                }}>
                  {["Home", "Analyze", "History"].map((t, i) => (
                    <div key={t} style={{ textAlign: "center" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: i === 0 ? COLORS.accent : "transparent", margin: "0 auto 4px" }} />
                      <span style={{ fontSize: 8, color: i === 0 ? COLORS.accent : COLORS.textMuted, fontWeight: 600 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Responsive override for mobile */}
      <style>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  </section>
);

// --- FOOTER ---
const Footer = () => (
  <footer style={{ padding: "48px 24px", background: COLORS.black, borderTop: `1px solid ${COLORS.midGray}` }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, background: COLORS.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: COLORS.black }}>SV</div>
          <span style={{ fontWeight: 800, color: COLORS.white, fontSize: "1rem" }}>SwingView</span>
        </div>
        <p style={{ color: COLORS.textMuted, fontSize: "0.8rem" }}>Professional Golf Video Analysis</p>
        <p style={{ color: COLORS.textMuted, fontSize: "0.8rem" }}>Mississauga & Oakville</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginBottom: 10 }}>
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" style={{
            fontSize: "0.75rem", color: COLORS.textMuted, textDecoration: "none",
            padding: "6px 14px", border: `1px solid ${COLORS.midGray}`, borderRadius: 6,
            transition: "color 0.2s, border-color 0.2s",
          }}>App Store</a>
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" style={{
            fontSize: "0.75rem", color: COLORS.textMuted, textDecoration: "none",
            padding: "6px 14px", border: `1px solid ${COLORS.midGray}`, borderRadius: 6,
            transition: "color 0.2s, border-color 0.2s",
          }}>Google Play</a>
        </div>
        <p style={{ color: COLORS.textMuted, fontSize: "0.8rem" }}>© 2026 SwingView. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- APP ---
export default function SwingView() {
  return (
    <div style={{ background: COLORS.black, fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: COLORS.white, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Process />
      <Pricing />
      <Testimonials />
      <Locations />
      <Booking />
      <FAQ />
      <AppPromo />
      <Footer />
    </div>
  );
}
