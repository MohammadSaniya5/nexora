"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState, useCallback } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const features = [
  { icon: "📊", title: "Lecture Slides", desc: "Full unit-wise PPT decks after every class, organised by subject.", color: "#7C3AED", glow: "rgba(124,58,237,0.35)" },
  { icon: "📝", title: "Study Notes", desc: "Handwritten + digital notes curated directly by Mr. Balaji Lanka.", color: "#06B6D4", glow: "rgba(6,182,212,0.35)" },
  { icon: "❓", title: "Question Banks", desc: "Exam-ready QBs with previous university paper patterns.", color: "#10B981", glow: "rgba(16,185,129,0.35)" },
  { icon: "📁", title: "Study Materials", desc: "References, textbooks, and supplementary reading.", color: "#F59E0B", glow: "rgba(245,158,11,0.35)" },
  { icon: "🔔", title: "Instant Updates", desc: "NEW badge the moment sir uploads anything — never miss a file.", color: "#EC4899", glow: "rgba(236,72,153,0.35)" },
  { icon: "📥", title: "One-Click Download", desc: "No login. No friction. Open and download instantly.", color: "#8B5CF6", glow: "rgba(139,92,246,0.35)" },
];

const steps = [
  { num: "01", title: "Sir Uploads", desc: "Mr. Balaji Lanka logs into the admin panel and uploads with subject & category tags.", icon: "⬆" },
  { num: "02", title: "Instant Live", desc: "Files appear immediately on the portal with a glowing NEW badge.", icon: "⚡" },
  { num: "03", title: "You Access", desc: "Filter by subject, find in seconds, download in one click. Zero login needed.", icon: "🎯" },
];

const WORDS = ["Next Generation", "Aurora", "Knowledge"];

const facultyStats = [
  { label: "Publications", value: 10, suffix: "+", icon: "📄" },
  { label: "Projects Guided", value: 60, suffix: "+", icon: "🎓" },
  { label: "Awards", value: 5, icon: "🏆" },
  { label: "Years Experience", value: 10, icon: "⏳" },
];

const facultyHighlights = [
  { label: "Recent publication", value: "IEEE, 2025", icon: "📄" },
  { label: "Latest award", value: "Best Mentor, 2024", icon: "🏆" },
  { label: "Patents filed", value: "2", icon: "💡" },
  { label: "Department", value: "CSE", icon: "🏛" },
];

/* ─────────────────────────────────────────
   FLOATING PARTICLE (client-only safe, fewer + smaller on mobile)
───────────────────────────────────────── */
function Particle({ i, count }: { i: number; count: number }) {
  const [travel, setTravel] = useState(0);
  useEffect(() => { setTravel(window.innerHeight + 20); }, []);

  const size = 2 + Math.random() * 3;
  const startX = Math.random() * 100;
  const delay = Math.random() * 8;
  const dur = 12 + Math.random() * 16;
  const colors = ["#7C3AED", "#06B6D4", "#10B981", "#EC4899", "#F59E0B", "#8B5CF6"];
  const col = colors[i % colors.length];

  if (!travel || i >= count) return null;

  return (
    <motion.div
      style={{
        position: "absolute", bottom: "-10px",
        left: `${startX}%`,
        width: size, height: size,
        borderRadius: "50%",
        background: col,
        boxShadow: `0 0 ${size * 3}px ${col}`,
        pointerEvents: "none",
      }}
      animate={{ y: [0, -travel], opacity: [0, 1, 1, 0], x: [0, (Math.random() - 0.5) * 120] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─────────────────────────────────────────
   MAGNETIC BUTTON — disables magnetism on touch devices
───────────────────────────────────────── */
function MagneticBtn({ children, onClick, primary }: { children: React.ReactNode; onClick?: () => void; primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.4 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  const MAX_PULL = 14;

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const clampedX = Math.max(-MAX_PULL, Math.min(MAX_PULL, relX * 0.3));
    const clampedY = Math.max(-MAX_PULL, Math.min(MAX_PULL, relY * 0.3));
    x.set(clampedX);
    y.set(clampedY);
  }, [x, y, isTouch]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      className="magnetic-btn"
      style={{
        x: sx, y: sy,
        padding: "15px 32px",
        borderRadius: 12,
        fontFamily: "'Space Grotesk',sans-serif",
        fontWeight: 700,
        fontSize: "clamp(14px, 3.6vw, 16px)",
        cursor: "pointer",
        border: "none",
        position: "relative",
        overflow: "hidden",
        background: primary ? "linear-gradient(135deg,#7C3AED,#06B6D4)" : "transparent",
        color: primary ? "#fff" : "#A78BFA",
        boxShadow: primary ? "0 0 32px rgba(124,58,237,0.5)" : "none",
        ...(primary ? {} : { border: "1px solid rgba(120,100,255,0.35)" }),
      }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {primary && (
        <motion.div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg,rgba(255,255,255,0.15),transparent)",
            borderRadius: 12,
          }}
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
      )}
      <span style={{ position: "relative", zIndex: 1, whiteSpace: "nowrap" }}>{children}</span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────
   HIGHLIGHT TEXT — sweeping gradient shine
───────────────────────────────────────── */
function HighlightText({ text }: { text: string }) {
  return (
    <motion.span
      style={{
        display: "inline-block",
        fontFamily: "'Cinzel', serif",
        fontWeight: 700,
        letterSpacing: "0.01em",
        backgroundImage: "linear-gradient(120deg,#7C3AED 0%,#A78BFA 22%,#ffffff 42%,#06B6D4 62%,#10B981 100%)",
        backgroundSize: "260% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      {text}
    </motion.span>
  );
}

/* ─────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────── */
function Typewriter({ words }: { words: string[] }) {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [disp, setDisp] = useState("");

  useEffect(() => {
    const word = words[wi];
    if (!del && ci < word.length) {
      const t = setTimeout(() => { setDisp(word.slice(0, ci + 1)); setCi(ci + 1); }, 70);
      return () => clearTimeout(t);
    }
    if (!del && ci === word.length) {
      const t = setTimeout(() => setDel(true), 1500);
      return () => clearTimeout(t);
    }
    if (del && ci > 0) {
      const t = setTimeout(() => { setDisp(word.slice(0, ci - 1)); setCi(ci - 1); }, 35);
      return () => clearTimeout(t);
    }
    if (del && ci === 0) {
      setDel(false);
      setWi((wi + 1) % words.length);
    }
  }, [ci, del, wi, words]);

  return (
    <span style={{ color: "#A78BFA" }}>
      {disp}
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ repeat: Infinity, duration: 0.9, times: [0, 0.5, 0.5, 1], ease: "linear" }}
        style={{ borderRight: "3px solid #7C3AED", marginLeft: 2 }}
      />
    </span>
  );
}

/* ─────────────────────────────────────────
   3D ORBS (mouse reactive — disabled movement on touch)
───────────────────────────────────────── */
function ReactiveOrbs() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 20 });
  const sy = useSpring(my, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 60);
      my.set((e.clientY / window.innerHeight - 0.5) * 60);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const sx2 = useTransform(sx, v => -v * 0.7);
  const sy2 = useTransform(sy, v => -v * 0.7);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <motion.div style={{
        x: sx, y: sy, position: "absolute", top: "10%", left: "5%",
        width: "min(500px, 70vw)", height: "min(500px, 70vw)", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(124,58,237,0.18),transparent 70%)",
        filter: "blur(40px)",
      }} />
      <motion.div style={{
        x: sx2, y: sy2,
        position: "absolute", bottom: "10%", right: "5%",
        width: "min(400px, 60vw)", height: "min(400px, 60vw)", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(6,182,212,0.15),transparent 70%)",
        filter: "blur(40px)",
      }} />
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "40%", left: "40%",
          width: "min(300px, 50vw)", height: "min(300px, 50vw)", borderRadius: "50%",
          background: "radial-gradient(circle,rgba(236,72,153,0.1),transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: "min(700px, 110vw)", height: "min(700px, 110vw)",
          transform: "translate(-50%,-50%)",
          border: "1px solid rgba(124,58,237,0.06)",
          borderRadius: "50%",
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: "min(500px, 90vw)", height: "min(500px, 90vw)",
          transform: "translate(-50%,-50%)",
          border: "1px solid rgba(6,182,212,0.05)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 50;
    const iv = setInterval(() => {
      frame++;
      setVal(Math.round((frame / total) * to));
      if (frame >= total) clearInterval(iv);
    }, 22);
    return () => clearInterval(iv);
  }, [started, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────────────────────────
   FACULTY PANEL — formal, professional, fully responsive
───────────────────────────────────────── */
function FacultyPanel({ router }: { router: ReturnType<typeof useRouter> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      style={{
        background: "rgba(14,20,40,0.75)",
        border: "1px solid rgba(124,58,237,0.22)",
        borderRadius: 22,
        padding: "clamp(16px, 4vw, 26px)",
        backdropFilter: "blur(20px)",
        position: "relative",
        overflow: "hidden",
        maxWidth: 490,
        width: "100%",
      }}
    >
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg,transparent,#7C3AED,#06B6D4,transparent)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 18, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.07)", textAlign: "center", flexWrap: "wrap" }}>
        <motion.div
          animate={{ boxShadow: ["0 0 16px rgba(124,58,237,0.3)", "0 0 32px rgba(6,182,212,0.45)", "0 0 16px rgba(124,58,237,0.3)"] }}
          transition={{ repeat: Infinity, duration: 3 }}
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "linear-gradient(135deg,#7C3AED,#06B6D4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff",
            border: "2px solid rgba(124,58,237,0.35)", flexShrink: 0,
          }}
        >B</motion.div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>
            Mr. V S S P L N Balaji Lanka
          </div>
          <div style={{ color: "#06B6D4", fontSize: 12.5, fontWeight: 500, marginTop: 2, fontFamily: "monospace", letterSpacing: "0.03em" }}>
            Associate Professor · CSE
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 16 }}>
        {facultyStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.45 }}
            whileHover={{ borderColor: "rgba(124,58,237,0.45)", y: -2 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, padding: "10px 8px",
              transition: "border-color 0.2s",
              minWidth: 0,
            }}
          >
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              gap: 6, fontSize: 11, color: "#6B7280", marginBottom: 4, textAlign: "center",
            }}>
              <span style={{ fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
            </div>
            <div style={{
              fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(17px, 4.5vw, 22px)", fontWeight: 700, textAlign: "center",
              background: "linear-gradient(135deg,#A78BFA,#06B6D4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              <Counter to={s.value} suffix={s.suffix || ""} />
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {facultyHighlights.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 + i * 0.08 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "9px 4px", fontSize: 13, gap: 8,
              borderBottom: i < facultyHighlights.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            <span style={{ color: "#9CA3AF", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{h.icon}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.label}</span>
            </span>
            <span style={{ color: "#E5E7EB", fontWeight: 500, flexShrink: 0 }}>{h.value}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => router.push("/faculty")}
        whileHover={{ background: "rgba(124,58,237,0.14)" }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%", marginTop: 20, padding: "11px",
          background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.25)",
          borderRadius: 10, color: "#A78BFA",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
          fontFamily: "'Inter',sans-serif", transition: "background 0.2s",
        }}
      >
        Explore Faculty Profile →
      </motion.button>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          marginTop: 14, padding: "7px 12px",
          background: "rgba(16,185,129,0.08)",
          border: "1px solid rgba(16,185,129,0.22)",
          borderRadius: 8, fontSize: 11.5, color: "#10B981",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "monospace",
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
        Profile synced · Portal live
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heroYDesktop = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpDesktop = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScaleDesktop = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const heroY = isMobile ? 0 : heroYDesktop;
  const heroOp = isMobile ? 1 : heroOpDesktop;
  const heroScale = isMobile ? 1 : heroScaleDesktop;

  const [particleCount, setParticleCount] = useState(30);

  useEffect(() => {
    const setCount = () => setParticleCount(window.innerWidth < 640 ? 12 : window.innerWidth < 1024 ? 20 : 30);
    setCount();
    window.addEventListener("resize", setCount);
    return () => window.removeEventListener("resize", setCount);
  }, []);

  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <>
      <main style={{ minHeight: "100vh", overflowX: "hidden", width: "100%" }}>

        {/* ═══════════════ HERO ═══════════════ */}
        <section
          ref={heroRef}
          style={{
            minHeight: "100svh",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "100px 16px 48px",
            position: "relative", overflow: "hidden",
            width: "100%",
          }}
        >
          <ReactiveOrbs />

          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            {particles.map(i => <Particle key={i} i={i} count={particleCount} />)}
          </div>

          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)",
          }} />

          <motion.div
            style={{
              y: heroY, opacity: heroOp, scale: heroScale,
              position: "relative", zIndex: 10,
              width: "100%", maxWidth: 1080, margin: "0 auto",
            }}
          >
            <div className="hero-grid">
              {/* LEFT SIDE */}
              <div className="hero-left">

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="hero-badge"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "7px 16px",
                    border: "1px solid rgba(120,100,255,0.3)",
                    borderRadius: 100,
                    background: "rgba(124,58,237,0.08)",
                    fontSize: "clamp(10px, 2.6vw, 12px)", fontWeight: 600,
                    color: "#A78BFA", letterSpacing: "0.08em", textTransform: "uppercase",
                    marginBottom: 24,
                    backdropFilter: "blur(8px)",
                    maxWidth: "100%",
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block", boxShadow: "0 0 8px #10B981", flexShrink: 0 }}
                  />
                  <span style={{ overflowWrap: "break-word" }}>Mr. V S S P L N Balaji Lanka · CSE · Live</span>
                </motion.div>

                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-h1"
                    style={{
                      fontSize: "clamp(44px, 13vw, 108px)",
                      letterSpacing: "0.01em",
                      lineHeight: 1.02,
                      marginBottom: 22,
                    }}
                  >
                    <HighlightText text="NEXORA" />
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="hero-typewriter"
                    style={{ fontSize: "clamp(15px, 4vw, 24px)", marginBottom: 16, fontFamily: "monospace", minHeight: 32 }}
                  >
                    <Typewriter words={WORDS} />
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="hero-desc"
                  style={{ fontSize: "clamp(13.5px, 3.6vw, 16px)", color: "#6B7280", maxWidth: 480, marginBottom: 36, lineHeight: 1.75 }}
                >
                  Your faculty&apos;s complete academic resource hub. Lecture slides, notes, question banks and more — uploaded live by{" "}
                  <span style={{ color: "#A78BFA", fontWeight: 600 }}>Mr. V S S P L N Balaji Lanka</span>, CSE Department.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="hero-cta-row"
                  style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}
                >
                  <MagneticBtn primary onClick={() => router.push("/resources")}>
                    Explore Resources →
                  </MagneticBtn>
                  <MagneticBtn onClick={() => router.push("/about")}>
                    About Nexora
                  </MagneticBtn>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="hero-stats"
                  style={{
                    display: "flex", gap: 0,
                    border: "1px solid rgba(124,58,237,0.15)",
                    borderRadius: 16, overflow: "hidden",
                    backdropFilter: "blur(12px)",
                    background: "rgba(14,20,40,0.4)",
                    maxWidth: 460,
                  }}
                >
                  {[
                    { n: 50, suf: "+", label: "Resources" },
                    { n: 5, suf: "+", label: "Subjects" },
                    { n: 24, suf: "/7", label: "Access" },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ background: "rgba(124,58,237,0.1)" }}
                      style={{
                        flex: 1, padding: "14px 8px", textAlign: "center",
                        borderRight: i < 2 ? "1px solid rgba(124,58,237,0.12)" : "none",
                        transition: "background 0.2s", minWidth: 0,
                      }}
                    >
                      <div style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontSize: "clamp(18px, 5vw, 26px)", fontWeight: 700, letterSpacing: "-1px",
                        background: "linear-gradient(135deg,#A78BFA,#06B6D4)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      }}>
                        <Counter to={s.n} suffix={s.suf} />
                      </div>
                      <div style={{ fontSize: "clamp(9px, 2.4vw, 11.5px)", color: "#4B5563", marginTop: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT SIDE — faculty panel */}
              <div className="hero-right">
                <FacultyPanel router={router} />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════ FEATURES ═══════════════ */}
        <section style={{ padding: "80px 16px", maxWidth: 1160, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <div className="section-divider" />
            <h2 style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(26px, 6.5vw, 52px)",
              fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.15,
            }}>
              Everything your studies need
            </h2>
            <p style={{ color: "#6B7280", fontSize: "clamp(14px, 3.6vw, 16px)", maxWidth: 440, margin: "0 auto", padding: "0 8px" }}>
              Organised, searchable, always updated by Mr. Balaji Lanka after every class.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px, 100%),1fr))", gap: 16 }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, borderColor: f.color + "66", boxShadow: `0 20px 60px ${f.glow}` }}
                className="glass"
                style={{ padding: "24px 22px", cursor: "default", transition: "box-shadow 0.3s,border-color 0.3s", position: "relative", overflow: "hidden" }}
              >
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    position: "absolute", top: 0, bottom: 0, width: "60%",
                    background: `linear-gradient(90deg,transparent,${f.color}10,transparent)`,
                    pointerEvents: "none",
                  }}
                />
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: f.color + "22", border: `1px solid ${f.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, marginBottom: 16, transition: "all 0.3s",
                  }}
                >
                  {f.icon}
                </motion.div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 17, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: "#6B7280", fontSize: 13.5, lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════ WHY NEXORA EXISTS ═══════════════ */}
        <section style={{
          padding: "72px 16px",
          background: "rgba(14,20,40,0.35)",
          borderTop: "1px solid rgba(120,100,255,0.08)",
          borderBottom: "1px solid rgba(120,100,255,0.08)",
          overflow: "hidden",
        }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div className="why-grid">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="section-divider why-divider" />
                <h2 style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "clamp(24px, 6vw, 46px)",
                  fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.15,
                }}>
                  Why<br />
                  <span style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Nexora
                  </span> exists
                </h2>
                <p style={{ color: "#6B7280", fontSize: "clamp(13.5px, 3.6vw, 15px)", lineHeight: 1.8, marginBottom: 18 }}>
                  Lost lecture slides. Notes shared once on WhatsApp and never seen again. Question banks that exist only in someone&apos;s downloads folder. That&apos;s the problem Nexora was built to solve.
                </p>
                <p style={{ color: "#6B7280", fontSize: "clamp(13.5px, 3.6vw, 15px)", lineHeight: 1.8, marginBottom: 28 }}>
                  One place, always <span style={{ color: "#10B981", fontWeight: 600 }}>current</span>, always <span style={{ color: "#06B6D4", fontWeight: 600 }}>accessible</span> — so studying starts the moment you open the page, not after a search through five chat groups.
                </p>
                {[
                  { icon: "🎯", text: "Zero login friction — open and download" },
                  { icon: "⚡", text: "Live sync — no refresh, no waiting" },
                  { icon: "🗂", text: "Organised by subject and category" },
                  { icon: "🔔", text: "Never miss an upload — NEW badges flag it" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}
                  >
                    <span style={{ fontSize: 16, width: 22, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontSize: 13.5, color: "#9CA3AF" }}>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div style={{
                  padding: "16px 18px", borderRadius: 14,
                  background: "rgba(248,113,113,0.06)",
                  border: "1px solid rgba(248,113,113,0.18)",
                  opacity: 0.85,
                }}>
                  <div style={{ fontSize: 10.5, color: "#F87171", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>Before</div>
                  <div style={{ fontSize: 13.5, color: "#9CA3AF" }}>&ldquo;Bro do you have last week&apos;s PPT? I missed class…&rdquo;</div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", fontSize: 18, color: "#4B5563" }}>↓</div>
                <motion.div
                  whileHover={{ borderColor: "rgba(16,185,129,0.4)" }}
                  style={{
                    padding: "18px", borderRadius: 14,
                    background: "rgba(16,185,129,0.06)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{ fontSize: 10.5, color: "#10B981", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>With Nexora</div>
                  <div style={{ fontSize: 13.5, color: "#D1D5DB" }}>Open Nexora → Resources → filter by subject → download. Done in seconds.</div>
                </motion.div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  {["📊 PPTs", "📝 Notes", "❓ QBs"].map((t, i) => (
                    <motion.div
                      key={t}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      style={{
                        flex: 1, textAlign: "center", padding: "9px 4px",
                        borderRadius: 10, background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        fontSize: 11, color: "#9CA3AF",
                      }}
                    >{t}</motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ HOW IT WORKS ═══════════════ */}
        <section style={{ padding: "80px 16px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: 56 }}
            >
              <div className="section-divider" />
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px, 6vw, 50px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                How Nexora works
              </h2>
            </motion.div>

            <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px, 100%),1fr))", gap: 32, position: "relative" }}>
              <motion.div
                className="steps-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
                style={{
                  position: "absolute", top: "52px", left: "16%", right: "16%", height: 1,
                  background: "linear-gradient(90deg,#7C3AED,#06B6D4,#10B981)",
                  transformOrigin: "left",
                }}
              />
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: "center", position: "relative" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 8 }}
                    animate={{ boxShadow: ["0 0 0px rgba(124,58,237,0)", "0 0 30px rgba(124,58,237,0.4)", "0 0 0px rgba(124,58,237,0)"] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 1 }}
                    style={{
                      width: 64, height: 64, borderRadius: "50%",
                      background: "linear-gradient(135deg,rgba(124,58,237,0.25),rgba(6,182,212,0.25))",
                      border: "1px solid rgba(124,58,237,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 26, margin: "0 auto 20px", position: "relative", zIndex: 1,
                    }}
                  >
                    {s.icon}
                  </motion.div>
                  <div style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: "clamp(34px, 8vw, 48px)", fontWeight: 700, lineHeight: 1,
                    background: "linear-gradient(135deg,rgba(124,58,237,0.25),rgba(6,182,212,0.25))",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    marginBottom: 12,
                  }}>
                    {s.num}
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "#6B7280", fontSize: 13.5, lineHeight: 1.75, padding: "0 8px" }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ FINAL CTA ═══════════════ */}
        <section style={{ padding: "90px 16px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "min(600px, 130vw)", height: "min(600px, 130vw)", borderRadius: "50%",
              background: "radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{
                width: 70, height: 70, borderRadius: "50%",
                border: "1px solid rgba(124,58,237,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px", fontSize: 28,
              }}
            >
              🚀
            </motion.div>
            <h2 style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(28px, 8vw, 66px)",
              fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.1,
            }}>
              Ready to study smarter?
            </h2>
            <p style={{ color: "#6B7280", fontSize: "clamp(14px, 3.8vw, 17px)", marginBottom: 40, maxWidth: 400, margin: "0 auto 40px", lineHeight: 1.7, padding: "0 8px" }}>
              All materials from Mr. Balaji Lanka — always up to date, always accessible.
            </p>
            <motion.div
              style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MagneticBtn primary onClick={() => router.push("/resources")}>
                Open Nexora Resources →
              </MagneticBtn>
              <MagneticBtn onClick={() => router.push("/contact")}>
                Message
              </MagneticBtn>
            </motion.div>
          </motion.div>
        </section>

      </main>

      <style jsx global>{`
        @keyframes glitch1 { 0%{transform:translateX(0)} 50%{transform:translateX(-4px)} 100%{transform:translateX(2px)} }
        @keyframes glitch2 { 0%{transform:translateX(0)} 50%{transform:translateX(4px)}  100%{transform:translateX(-2px)} }
        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 32px;
        }
        .hero-left { text-align: left; min-width: 0; }
        .hero-right { display: flex; justify-content: center; align-items: center; width: 100%; min-width: 0; }
        .hero-h1 { text-align: left; }
        .hero-typewriter { text-align: left; }
        .hero-cta-row > * { flex: 0 0 auto; }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .hero-left, .hero-h1, .hero-typewriter {
            text-align: center;
          }
          .hero-badge {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-desc {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-cta-row {
            justify-content: center;
          }
          .hero-stats {
            margin-left: auto;
            margin-right: auto;
          }
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 40px;
          }
        }

        @media (min-width: 901px) {
          .why-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
          }
          .why-divider {
            margin-left: 0;
          }
        }

        @media (max-width: 640px) {
          .hero-cta-row {
            flex-direction: column;
            width: 100%;
          }
          .hero-cta-row > * {
            width: 100%;
            max-width: 100%;
          }
          .steps-line { display: none; }
        }

        @media (max-width: 480px) {
          .hero-stats {
            max-width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}