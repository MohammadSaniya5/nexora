"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState, useCallback } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const features = [
  { icon: "📊", title: "Lecture Slides", desc: "Full unit-wise PPT decks after every class, organised by subject.", color: "#7C3AED", glow: "rgba(124,58,237,0.35)" },
  { icon: "📝", title: "Study Notes",    desc: "Handwritten + digital notes curated directly by Mr. Balaji Lanka.",      color: "#06B6D4", glow: "rgba(6,182,212,0.35)"  },
  { icon: "❓", title: "Question Banks", desc: "Exam-ready QBs with previous university paper patterns.",         color: "#10B981", glow: "rgba(16,185,129,0.35)" },
  { icon: "📁", title: "Study Materials",desc: "References, textbooks, and supplementary reading.",               color: "#F59E0B", glow: "rgba(245,158,11,0.35)" },
  { icon: "🔔", title: "Instant Updates",desc: "NEW badge the moment sir uploads anything — never miss a file.", color: "#EC4899", glow: "rgba(236,72,153,0.35)" },
  { icon: "📥", title: "One-Click Download", desc: "No login. No friction. Open and download instantly.",        color: "#8B5CF6", glow: "rgba(139,92,246,0.35)" },
];

const steps = [
  { num: "01", title: "Sir Uploads", desc: "Mr. Balaji Lanka logs into the admin panel and uploads with subject & category tags.", icon: "⬆" },
  { num: "02", title: "Instant Live", desc: "Files appear immediately on the portal with a glowing NEW badge.",             icon: "⚡" },
  { num: "03", title: "You Access",  desc: "Filter by subject, find in seconds, download in one click. Zero login needed.", icon: "🎯" },
];

const WORDS = ["NEXORA", "KNOWLEDGE", "RESOURCES", "YOUR VAULT"];

/* ─────────────────────────────────────────
   FLOATING PARTICLE
───────────────────────────────────────── */
function Particle({ i }: { i: number }) {
  const size   = 2 + Math.random() * 3;
  const startX = Math.random() * 100;
  const delay  = Math.random() * 8;
  const dur    = 12 + Math.random() * 16;
  const colors = ["#7C3AED","#06B6D4","#10B981","#EC4899","#F59E0B","#8B5CF6"];
  const col    = colors[i % colors.length];
  return (
    <motion.div
      style={{
        position:"absolute", bottom:"-10px",
        left:`${startX}%`,
        width: size, height: size,
        borderRadius:"50%",
        background: col,
        boxShadow:`0 0 ${size*3}px ${col}`,
        pointerEvents:"none",
      }}
      animate={{ y:[0,-window.innerHeight-20], opacity:[0,1,1,0], x:[0,(Math.random()-0.5)*120] }}
      transition={{ duration:dur, delay, repeat:Infinity, ease:"linear" }}
    />
  );
}

/* ─────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────── */
function MagneticBtn({ children, onClick, primary }: { children: React.ReactNode; onClick?: () => void; primary?: boolean }) {
  const ref  = useRef<HTMLButtonElement>(null);
  const x    = useMotionValue(0);
  const y    = useMotionValue(0);
  const sx   = useSpring(x, { stiffness:200, damping:15 });
  const sy   = useSpring(y, { stiffness:200, damping:15 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width/2) * 0.35);
    y.set((e.clientY - rect.top  - rect.height/2) * 0.35);
  }, [x, y]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy,
        padding:"15px 38px", borderRadius:12, fontFamily:"'Space Grotesk',sans-serif",
        fontWeight:700, fontSize:16, cursor:"pointer", border:"none", position:"relative",
        overflow:"hidden",
        background: primary
          ? "linear-gradient(135deg,#7C3AED,#06B6D4)"
          : "transparent",
        color: primary ? "#fff" : "#A78BFA",
        boxShadow: primary ? "0 0 32px rgba(124,58,237,0.5)" : "none",
        ...(primary ? {} : { border:"1px solid rgba(120,100,255,0.35)" }),
      }}
      whileHover={{ scale:1.05 }}
      whileTap={{ scale:0.96 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {primary && (
        <motion.div
          style={{
            position:"absolute",inset:0,
            background:"linear-gradient(135deg,rgba(255,255,255,0.15),transparent)",
            borderRadius:12,
          }}
          initial={{ x:"-100%" }}
          whileHover={{ x:"100%" }}
          transition={{ duration:0.5 }}
        />
      )}
      {children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────
   GLITCH TEXT
───────────────────────────────────────── */
function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <span style={{ position:"relative", display:"inline-block" }}>
      <span className="gradient-text">{text}</span>
      {glitch && (
        <>
          <span style={{
            position:"absolute",top:0,left:"2px",
            color:"#06B6D4",clipPath:"polygon(0 20%,100% 20%,100% 40%,0 40%)",
            fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",
            mixBlendMode:"screen",animation:"glitch1 0.15s steps(2) forwards",
          }}>{text}</span>
          <span style={{
            position:"absolute",top:0,left:"-2px",
            color:"#EC4899",clipPath:"polygon(0 60%,100% 60%,100% 80%,0 80%)",
            fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",
            mixBlendMode:"screen",animation:"glitch2 0.15s steps(2) forwards",
          }}>{text}</span>
        </>
      )}
    </span>
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
      const t = setTimeout(() => { setDisp(word.slice(0,ci+1)); setCi(ci+1); }, 80);
      return () => clearTimeout(t);
    }
    if (!del && ci === word.length) {
      const t = setTimeout(() => setDel(true), 2000);
      return () => clearTimeout(t);
    }
    if (del && ci > 0) {
      const t = setTimeout(() => { setDisp(word.slice(0,ci-1)); setCi(ci-1); }, 40);
      return () => clearTimeout(t);
    }
    if (del && ci === 0) {
      setDel(false);
      setWi((wi+1) % words.length);
    }
  }, [ci, del, wi, words]);

  return (
    <span style={{ color:"#A78BFA" }}>
      {disp}
      <motion.span
        animate={{ opacity:[1,0] }}
        transition={{ repeat:Infinity, duration:0.6, ease:"steps(1)" }}
        style={{ borderRight:"3px solid #7C3AED", marginLeft:2 }}
      />
    </span>
  );
}

/* ─────────────────────────────────────────
   3D ORBS (mouse reactive)
───────────────────────────────────────── */
function ReactiveOrbs() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness:30, damping:20 });
  const sy = useSpring(my, { stiffness:30, damping:20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - 0.5) * 60);
      my.set((e.clientY / window.innerHeight - 0.5) * 60);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div style={{ position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none" }}>
      {/* Orb 1 */}
      <motion.div style={{ x:sx, y:sy, position:"absolute", top:"10%", left:"5%",
        width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(124,58,237,0.18),transparent 70%)",
        filter:"blur(40px)",
      }} />
      {/* Orb 2 — moves opposite */}
      <motion.div style={{ x:useTransform(sx,v=>-v*0.7), y:useTransform(sy,v=>-v*0.7),
        position:"absolute", bottom:"10%", right:"5%",
        width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(6,182,212,0.15),transparent 70%)",
        filter:"blur(40px)",
      }} />
      {/* Orb 3 — slow diagonal */}
      <motion.div
        animate={{ x:[0,40,-20,0], y:[0,-30,20,0] }}
        transition={{ repeat:Infinity, duration:18, ease:"easeInOut" }}
        style={{ position:"absolute", top:"40%", left:"40%",
          width:300, height:300, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(236,72,153,0.1),transparent 70%)",
          filter:"blur(30px)",
        }}
      />
      {/* Rotating ring */}
      <motion.div
        animate={{ rotate:360 }}
        transition={{ repeat:Infinity, duration:30, ease:"linear" }}
        style={{
          position:"absolute",top:"50%",left:"50%",
          width:700,height:700,
          transform:"translate(-50%,-50%)",
          border:"1px solid rgba(124,58,237,0.06)",
          borderRadius:"50%",
        }}
      />
      <motion.div
        animate={{ rotate:-360 }}
        transition={{ repeat:Infinity, duration:22, ease:"linear" }}
        style={{
          position:"absolute",top:"50%",left:"50%",
          width:500,height:500,
          transform:"translate(-50%,-50%)",
          border:"1px solid rgba(6,182,212,0.05)",
          borderRadius:"50%",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ to, suffix="" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting && !started) setStarted(true); }, { threshold:0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 60;
    const iv = setInterval(() => {
      frame++;
      setVal(Math.round((frame/total)*to));
      if(frame >= total) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, [started, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

 

/* ─────────────────────────────────────────
   FACULTY CARD (animated)
───────────────────────────────────────── */
function FacultyCard() {
  return (
    <motion.div
      initial={{ opacity:0, x:60 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.8, ease:"easeOut" }}
      whileHover={{ y:-8 }}
      style={{
        background:"rgba(14,20,40,0.8)",
        border:"1px solid rgba(124,58,237,0.25)",
        borderRadius:20,
        padding:32,
        backdropFilter:"blur(20px)",
        position:"relative",
        overflow:"hidden",
        maxWidth:340,
      }}
    >
      {/* top accent line */}
      <motion.div
        animate={{ x:["-100%","100%"] }}
        transition={{ repeat:Infinity, duration:3, ease:"linear" }}
        style={{
          position:"absolute",top:0,left:0,right:0,height:2,
          background:"linear-gradient(90deg,transparent,#7C3AED,#06B6D4,transparent)",
        }}
      />
      {/* avatar */}
      <motion.div
        animate={{ boxShadow:["0 0 20px rgba(124,58,237,0.3)","0 0 40px rgba(6,182,212,0.5)","0 0 20px rgba(124,58,237,0.3)"] }}
        transition={{ repeat:Infinity, duration:3 }}
        style={{
          width:72, height:72, borderRadius:"50%",
          background:"linear-gradient(135deg,#7C3AED,#06B6D4)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:28,marginBottom:16,
          border:"2px solid rgba(124,58,237,0.4)",
        }}
      >👨‍💻</motion.div>

      <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,marginBottom:4 }}>
        Mr. V S S P L N Balaji Lanka
      </div>
      <div style={{ color:"#06B6D4",fontSize:13,fontWeight:600,marginBottom:16,fontFamily:"monospace",letterSpacing:"0.05em" }}>
        CSE Department
      </div>

      {["Lecture Slides","Notes & QBs","Lab Manuals","References"].map((item,i)=>(
        <motion.div
          key={item}
          initial={{ opacity:0,x:-20 }}
          whileInView={{ opacity:1,x:0 }}
          viewport={{ once:true }}
          transition={{ delay:0.3+i*0.1 }}
          style={{
            display:"flex",alignItems:"center",gap:8,
            fontSize:13,color:"#9CA3AF",marginBottom:8,
          }}
        >
          <motion.div
            animate={{ scale:[1,1.4,1] }}
            transition={{ repeat:Infinity, duration:2, delay:i*0.5 }}
            style={{ width:6,height:6,borderRadius:"50%",background:"#10B981",flexShrink:0 }}
          />
          {item}
        </motion.div>
      ))}

      <motion.div
        animate={{ opacity:[0.5,1,0.5] }}
        transition={{ repeat:Infinity,duration:2 }}
        style={{
          marginTop:20,padding:"8px 14px",
          background:"rgba(16,185,129,0.1)",
          border:"1px solid rgba(16,185,129,0.25)",
          borderRadius:8,
          fontSize:12,color:"#10B981",
          display:"flex",alignItems:"center",gap:8,
          fontFamily:"monospace",
        }}
      >
        <span style={{ width:6,height:6,borderRadius:"50%",background:"#10B981",display:"inline-block" }}/>
        Portal Live · Real-time Updates
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function Home() {
  const router    = useRouter();
  const heroRef   = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroY     = useTransform(scrollYProgress,[0,1],[0,140]);
  const heroOp    = useTransform(scrollYProgress,[0,0.75],[1,0]);
  const heroScale = useTransform(scrollYProgress,[0,1],[1,0.92]);

  const [particles]  = useState(() => Array.from({length:30},(_,i)=>i));
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── GLOBAL GLITCH KEYFRAMES ── */}
      <style>{`
        @keyframes glitch1 { 0%{transform:translateX(0)} 50%{transform:translateX(-4px)} 100%{transform:translateX(2px)} }
        @keyframes glitch2 { 0%{transform:translateX(0)} 50%{transform:translateX(4px)}  100%{transform:translateX(-2px)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 6px #10B981} 50%{box-shadow:0 0 14px #10B981} }
        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>

      <main style={{ minHeight:"100vh", overflowX:"hidden" }}>

        {/* ═══════════════ HERO ═══════════════ */}
        <section
          ref={heroRef}
          style={{
            minHeight:"100vh",
            display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",
            textAlign:"center",padding:"0 24px",
            position:"relative",overflow:"hidden",
          }}
        >
          {/* Reactive orbs */}
          <ReactiveOrbs />

          {/* Floating particles */}
          <div style={{ position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden" }}>
            {particles.map(i=><Particle key={i} i={i} />)}
          </div>

           

          {/* Grid overlay */}
          <div style={{
            position:"absolute",inset:0,
            backgroundImage:"linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)",
            backgroundSize:"60px 60px",
            pointerEvents:"none",
            maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)",
          }}/>

          <motion.div style={{ y:heroY, opacity:heroOp, scale:heroScale, position:"relative",zIndex:10, width:"100%", maxWidth:900 }}>

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity:0, y:-20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6 }}
              style={{
                display:"inline-flex",alignItems:"center",gap:10,
                padding:"8px 20px",
                border:"1px solid rgba(120,100,255,0.3)",
                borderRadius:100,
                marginTop: "110px",
                background:"rgba(124,58,237,0.08)",
                fontSize:12,fontWeight:600,
                color:"#A78BFA",letterSpacing:"0.12em",textTransform:"uppercase",
                marginBottom:25,
                animation:"float-badge 3s ease-in-out infinite",
                backdropFilter:"blur(8px)",
              }}
            >
              <motion.span
                animate={{ scale:[1,1.5,1], opacity:[1,0.5,1] }}
                transition={{ repeat:Infinity,duration:2 }}
                style={{ width:6,height:6,borderRadius:"50%",background:"#10B981",display:"inline-block",boxShadow:"0 0 8px #10B981" }}
              />
              Mr. V S S P L N Balaji Lanka · CSE · Live Portal
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity:0, y:60 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.8, delay:0.1, ease:[0.16,1,0.3,1] }}
              style={{
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(60px,11vw,120px)",
                fontWeight:700,letterSpacing:"-0.04em",
                lineHeight:0.92,marginBottom:28,
              }}
            >
              <GlitchText text="NEXORA" />
            </motion.h1>

            {/* Typewriter subtitle */}
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.6, delay:0.4 }}
              style={{ fontSize:"clamp(18px,3vw,28px)", marginBottom:16, fontFamily:"monospace", minHeight:40 }}
            >
              <Typewriter words={WORDS} />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.55 }}
              style={{ fontSize:16,color:"#6B7280",maxWidth:480,margin:"0 auto 52px",lineHeight:1.75 }}
            >
              Your faculty's complete academic resource hub. Lecture slides, notes, question banks and more — uploaded live by{"   "}<br></br>
              <span style={{ color:"#A78BFA", fontWeight:600 }}>   Mr. V S S P L N Balaji Lanka</span>, CSE Department.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.65 }}
              style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",marginBottom:72 }}
            >
              <MagneticBtn primary onClick={()=>router.push("/resources")}>
                Explore Resources →
              </MagneticBtn>
              <MagneticBtn onClick={()=>router.push("/about")}>
                About the Faculty
              </MagneticBtn>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.8 }}
              style={{
                display:"flex",gap:0,justifyContent:"center",
                border:"1px solid rgba(124,58,237,0.15)",
                borderRadius:16,overflow:"hidden",
                backdropFilter:"blur(12px)",
                background:"rgba(14,20,40,0.4)",
                maxWidth:500,margin:"0 auto",
              }}
            >
              {[
                { n:50, suf:"+", label:"Resources" },
                { n:5,   suf:"+",  label:"Subjects"  },
                { n:24,  suf:"/7",label:"Access"    },
              ].map((s,i)=>(
                <motion.div
                  key={i}
                  whileHover={{ background:"rgba(124,58,237,0.1)" }}
                  style={{
                    flex:1,padding:"20px 24px",textAlign:"center",
                    borderRight:i<2?"1px solid rgba(124,58,237,0.12)":"none",
                    transition:"background 0.2s",
                  }}
                >
                  <div style={{
                    fontFamily:"'Space Grotesk',sans-serif",
                    fontSize:28,fontWeight:700,letterSpacing:"-1px",
                    background:"linear-gradient(135deg,#A78BFA,#06B6D4)",
                    WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                  }}>
                    <Counter to={s.n} suffix={s.suf} />
                  </div>
                  <div style={{ fontSize:12,color:"#4B5563",marginTop:4,letterSpacing:"0.08em",textTransform:"uppercase" }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

           
        </section>

        {/* ═══════════════ FEATURES ═══════════════ */}
        <section style={{ padding:"120px 24px",maxWidth:1160,margin:"0 auto" }}>
          <motion.div
            initial={{ opacity:0,y:30 }}
            whileInView={{ opacity:1,y:0 }}
            viewport={{ once:true,margin:"-80px" }}
            transition={{ duration:0.6 }}
            style={{ textAlign:"center",marginBottom:72 }}
          >
            <div className="section-divider" />
            <h2 style={{
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(30px,4.5vw,52px)",
              fontWeight:700,letterSpacing:"-0.03em",marginBottom:14,
            }}>
              Everything your studies need
            </h2>
            <p style={{ color:"#6B7280",fontSize:16,maxWidth:440,margin:"0 auto" }}>
              Organised, searchable, always updated by Mr. Balaji Lanka after every class.
            </p>
          </motion.div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20 }}>
            {features.map((f,i)=>(
              <motion.div
                key={i}
                initial={{ opacity:0,y:40 }}
                whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true,margin:"-40px" }}
                transition={{ duration:0.55,delay:i*0.08,ease:[0.16,1,0.3,1] }}
                whileHover={{ y:-8,borderColor:f.color+"66",boxShadow:`0 20px 60px ${f.glow}` }}
                className="glass"
                style={{ padding:"30px 26px",cursor:"default",transition:"box-shadow 0.3s,border-color 0.3s",position:"relative",overflow:"hidden" }}
              >
                {/* card glow sweep on hover */}
                <motion.div
                  initial={{ x:"-100%",opacity:0 }}
                  whileHover={{ x:"100%",opacity:1 }}
                  transition={{ duration:0.6 }}
                  style={{
                    position:"absolute",top:0,bottom:0,width:"60%",
                    background:`linear-gradient(90deg,transparent,${f.color}10,transparent)`,
                    pointerEvents:"none",
                  }}
                />
                <motion.div
                  whileHover={{ rotate:8,scale:1.1 }}
                  style={{
                    width:52,height:52,borderRadius:14,
                    background:f.color+"22",border:`1px solid ${f.color}44`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:24,marginBottom:18,transition:"all 0.3s",
                  }}
                >
                  {f.icon}
                </motion.div>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:18,marginBottom:10 }}>{f.title}</h3>
                <p style={{ color:"#6B7280",fontSize:14,lineHeight:1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════ FACULTY SPOTLIGHT ═══════════════ */}
        <section style={{
          padding:"100px 24px",
          background:"rgba(14,20,40,0.35)",
          borderTop:"1px solid rgba(120,100,255,0.08)",
          borderBottom:"1px solid rgba(120,100,255,0.08)",
          overflow:"hidden",
        }}>
          <div style={{ maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center" }}>
            <motion.div
              initial={{ opacity:0,x:-50 }}
              whileInView={{ opacity:1,x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.8,ease:[0.16,1,0.3,1] }}
            >
              <div className="section-divider" />
              <h2 style={{
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:"clamp(28px,4vw,46px)",
                fontWeight:700,letterSpacing:"-0.03em",marginBottom:20,lineHeight:1.1,
              }}>
                Built by your<br/>
                <span style={{ background:"linear-gradient(135deg,#7C3AED,#06B6D4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
                  Professor
                </span>
              </h2>
              <p style={{ color:"#6B7280",fontSize:15,lineHeight:1.8,marginBottom:20 }}>
                Mr. V S S P L N Balaji Lanka, CSE Department, built Nexora so that no student is ever left without the materials they need.
              </p>
              <p style={{ color:"#6B7280",fontSize:15,lineHeight:1.8,marginBottom:32 }}>
                Every file uploaded by sir appears <span style={{ color:"#10B981",fontWeight:600 }}>instantly</span> on the portal — marked as NEW so you never miss anything.
              </p>
              {["10+ Years Teaching Experience","20+ Research Publications","60+ Student Projects Guided","CSE Dept."].map((item,i)=>(
                <motion.div
                  key={item}
                  initial={{ opacity:0,x:-20 }}
                  whileInView={{ opacity:1,x:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:i*0.1 }}
                  style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}
                >
                  <motion.div
                    animate={{ scale:[1,1.3,1] }}
                    transition={{ repeat:Infinity,duration:2.5,delay:i*0.4 }}
                    style={{ width:7,height:7,borderRadius:"50%",background:"#7C3AED",flexShrink:0,boxShadow:"0 0 8px #7C3AED" }}
                  />
                  <span style={{ fontSize:14,color:"#9CA3AF" }}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
            <div style={{ display:"flex",justifyContent:"center" }}>
              <FacultyCard />
            </div>
          </div>
        </section>

        {/* ═══════════════ HOW IT WORKS ═══════════════ */}
        <section style={{ padding:"120px 24px" }}>
          <div style={{ maxWidth:960,margin:"0 auto" }}>
            <motion.div
              initial={{ opacity:0,y:30 }}
              whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.6 }}
              style={{ textAlign:"center",marginBottom:80 }}
            >
              <div className="section-divider" />
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,4vw,50px)",fontWeight:700,letterSpacing:"-0.03em" }}>
                How Nexora works
              </h2>
            </motion.div>

            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:40,position:"relative" }}>
              {/* Connecting line */}
              <motion.div
                initial={{ scaleX:0 }}
                whileInView={{ scaleX:1 }}
                viewport={{ once:true }}
                transition={{ duration:1.2,delay:0.3 }}
                style={{
                  position:"absolute",top:"60px",left:"16%",right:"16%",height:1,
                  background:"linear-gradient(90deg,#7C3AED,#06B6D4,#10B981)",
                  transformOrigin:"left",
                }}
              />
              {steps.map((s,i)=>(
                <motion.div
                  key={i}
                  initial={{ opacity:0,y:40 }}
                  whileInView={{ opacity:1,y:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.6,delay:i*0.2,ease:[0.16,1,0.3,1] }}
                  style={{ textAlign:"center",position:"relative" }}
                >
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale:1.12,rotate:8 }}
                    animate={{ boxShadow:["0 0 0px rgba(124,58,237,0)","0 0 30px rgba(124,58,237,0.4)","0 0 0px rgba(124,58,237,0)"] }}
                    transition={{ repeat:Infinity,duration:3,delay:i*1 }}
                    style={{
                      width:72,height:72,borderRadius:"50%",
                      background:"linear-gradient(135deg,rgba(124,58,237,0.25),rgba(6,182,212,0.25))",
                      border:"1px solid rgba(124,58,237,0.35)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:28,margin:"0 auto 24px",position:"relative",zIndex:1,
                    }}
                  >
                    {s.icon}
                  </motion.div>
                  <div style={{
                    fontFamily:"'Space Grotesk',sans-serif",
                    fontSize:48,fontWeight:700,lineHeight:1,
                    background:"linear-gradient(135deg,rgba(124,58,237,0.25),rgba(6,182,212,0.25))",
                    WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                    marginBottom:14,
                  }}>
                    {s.num}
                  </div>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:20,marginBottom:10 }}>{s.title}</h3>
                  <p style={{ color:"#6B7280",fontSize:14,lineHeight:1.75 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ FINAL CTA ═══════════════ */}
        <section style={{ padding:"130px 24px",textAlign:"center",position:"relative",overflow:"hidden" }}>
          {/* Big background glow */}
          <motion.div
            animate={{ scale:[1,1.2,1],opacity:[0.3,0.6,0.3] }}
            transition={{ repeat:Infinity,duration:6,ease:"easeInOut" }}
            style={{
              position:"absolute",top:"50%",left:"50%",
              transform:"translate(-50%,-50%)",
              width:600,height:600,borderRadius:"50%",
              background:"radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%)",
              pointerEvents:"none",
            }}
          />
          <motion.div
            initial={{ opacity:0,scale:0.9 }}
            whileInView={{ opacity:1,scale:1 }}
            viewport={{ once:true }}
            transition={{ duration:0.7,ease:[0.16,1,0.3,1] }}
            style={{ position:"relative",zIndex:1 }}
          >
            <motion.div
              animate={{ rotate:[0,360] }}
              transition={{ repeat:Infinity,duration:20,ease:"linear" }}
              style={{
                width:80,height:80,borderRadius:"50%",
                border:"1px solid rgba(124,58,237,0.25)",
                display:"flex",alignItems:"center",justifyContent:"center",
                margin:"0 auto 32px",fontSize:32,
              }}
            >
              🚀
            </motion.div>
            <h2 style={{
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:"clamp(32px,5.5vw,66px)",
              fontWeight:700,letterSpacing:"-0.03em",marginBottom:20,lineHeight:1.05,
            }}>
              Ready to study smarter?
            </h2>
            <p style={{ color:"#6B7280",fontSize:17,marginBottom:48,maxWidth:400,margin:"0 auto 48px",lineHeight:1.7 }}>
              All materials from Mr. Balaji Lanka — always up to date, always accessible.
            </p>
            <motion.div
              style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap" }}
              initial={{ opacity:0,y:20 }}
              whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5,delay:0.2 }}
            >
              <MagneticBtn primary onClick={()=>router.push("/resources")}>
                Open Nexora Resources →
              </MagneticBtn>
              <MagneticBtn onClick={()=>router.push("/contact")}>
                Message Sir
              </MagneticBtn>
            </motion.div>
          </motion.div>
        </section>

      </main>
    </>
  );
}