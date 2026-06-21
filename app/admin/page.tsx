"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

type Material = {
  id: string;
  title: string;
  subject: string;
  category: string;
  url: string;
  description?: string;
  uploadedAt: string;
};

type MessageT = {
  id: string;
  name: string;
  roll?: string;
  email?: string;
  subject?: string;
  message: string;
  createdAt: string;
};

type SubjectT = { id: string; name: string; createdAt: string };

const CATEGORIES = ["PPT", "Notes", "QB", "Material", "Lab Manual", "Other"];
const categoryIcon: Record<string, string> = {
  PPT: "📊", Notes: "📝", QB: "❓", Material: "📁", "Lab Manual": "🧪", Other: "📄",
};
const categoryColor: Record<string, string> = {
  PPT: "#7C3AED", Notes: "#06B6D4", QB: "#10B981", Material: "#F59E0B", "Lab Manual": "#EF4444", Other: "#EC4899",
};

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "balaji7";

type Tab = "upload" | "materials" | "subjects" | "messages";

/* ─────────────────────────────────────────
   REACTIVE ORB BACKGROUND
───────────────────────────────────────── */
function AdminOrbs() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 20 });
  const sy = useSpring(my, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 40);
      my.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <motion.div style={{
        x: sx, y: sy, position: "absolute", top: "-10%", left: "-5%",
        width: "min(500px, 80vw)", height: "min(500px, 80vw)", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%)",
        filter: "blur(50px)",
      }} />
      <motion.div style={{
        x: sx, y: sy, position: "absolute", bottom: "-10%", right: "-5%",
        width: "min(450px, 75vw)", height: "min(450px, 75vw)", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(6,182,212,0.1),transparent 70%)",
        filter: "blur(50px)",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAGNETIC BUTTON — touch-safe
───────────────────────────────────────── */
function MagneticBtn({ children, onClick, primary, danger, type = "button", disabled, style }: {
  children: React.ReactNode; onClick?: () => void; primary?: boolean; danger?: boolean;
  type?: "button" | "submit"; disabled?: boolean; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });
  const MAX_PULL = 10;
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || disabled || isTouch) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, relX * 0.25)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, relY * 0.25)));
  }, [x, y, disabled, isTouch]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref} type={type} disabled={disabled}
      style={{
        x: sx, y: sy,
        padding: "12px 22px", borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif",
        fontWeight: 700, fontSize: "clamp(13px, 3.2vw, 14px)", cursor: disabled ? "not-allowed" : "pointer", border: "none",
        position: "relative", overflow: "hidden",
        background: danger ? "rgba(248,113,113,0.1)" : primary ? "linear-gradient(135deg,#7C3AED,#06B6D4)" : "transparent",
        color: danger ? "#F87171" : primary ? "#fff" : "#A78BFA",
        boxShadow: primary && !disabled ? "0 0 24px rgba(124,58,237,0.35)" : "none",
        opacity: disabled ? 0.6 : 1,
        ...(primary || danger ? {} : { border: "1px solid rgba(120,100,255,0.3)" }),
        ...(danger ? { border: "1px solid rgba(248,113,113,0.3)" } : {}),
        ...style,
      }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ to }: { to: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let frame = 0;
    const total = 30;
    const iv = setInterval(() => {
      frame++;
      setVal(Math.round((frame / total) * to));
      if (frame >= total) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, [to]);

  return <>{val}</>;
}

/* ─────────────────────────────────────────
   GRADIENT WORDMARK
───────────────────────────────────────── */
function Wordmark() {
  return (
    <span style={{
      fontFamily: "'Audiowide','Space Grotesk',sans-serif",
      backgroundImage: "linear-gradient(120deg,#7C3AED 0%,#A78BFA 30%,#06B6D4 70%,#10B981 100%)",
      backgroundSize: "200% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      NEXORA
    </span>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("upload");

  const [form, setForm] = useState({ title: "", subject: "", category: "PPT", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [materials, setMaterials] = useState<Material[]>([]);
  const [messages, setMessages] = useState<MessageT[]>([]);
  const [subjects, setSubjects] = useState<SubjectT[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [addingSubject, setAddingSubject] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const [matRes, msgRes, subRes] = await Promise.all([
        fetch("/api/materials"), fetch("/api/contact"), fetch("/api/subjects"),
      ]);
      const mats = await matRes.json();
      const msgs = await msgRes.json();
      const subs = await subRes.json();
      setMaterials(Array.isArray(mats) ? mats : []);
      setMessages(Array.isArray(msgs) ? msgs : []);
      setSubjects(Array.isArray(subs) ? subs : []);
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    if (loggedIn) { fetchAll(); const t = setInterval(fetchAll, 15000); return () => clearInterval(t); }
  }, [loggedIn, fetchAll]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) { setLoggedIn(true); setLoginError(false); }
    else { setLoginError(true); setPassword(""); }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !form.title || !form.subject) {
      setUploadMsg({ type: "error", text: "Please fill all required fields and select a file." });
      return;
    }
    setUploading(true);
    setUploadMsg(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("title", form.title);
      fd.append("subject", form.subject);
      fd.append("category", form.category);
      fd.append("description", form.description);
      fd.append("uploadedAt", new Date().toISOString());

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        setUploadMsg({ type: "success", text: `"${form.title}" uploaded successfully! Students can see it now.` });
        setForm({ title: "", subject: "", category: "PPT", description: "" });
        setFile(null);
        const input = document.getElementById("file-input") as HTMLInputElement;
        if (input) input.value = "";
        fetchAll();
      } else {
        const err = await res.json();
        setUploadMsg({ type: "error", text: err.message || "Upload failed. Please try again." });
      }
    } catch {
      setUploadMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this material? Students won't be able to access it.")) return;
    try { await fetch(`/api/materials?id=${id}`, { method: "DELETE" }); fetchAll(); } catch { /* silent */ }
  };

  const handleAddSubject = async () => {
    if (!newSubject.trim()) return;
    setAddingSubject(true);
    try {
      await fetch("/api/subjects", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSubject.trim(), createdAt: new Date().toISOString() }),
      });
      setNewSubject("");
      fetchAll();
    } catch { /* silent */ }
    setAddingSubject(false);
  };

  const handleDeleteSubject = async (id: string) => {
    if (!confirm("Remove this subject?")) return;
    await fetch(`/api/subjects?id=${id}`, { method: "DELETE" });
    fetchAll();
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };

  /* ─────────────── LOGIN ─────────────── */
  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, position: "relative", overflow: "hidden" }}>
        <AdminOrbs />
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{ width: "100%", maxWidth: 420, padding: "clamp(32px, 8vw, 48px) clamp(24px, 6vw, 40px)", textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#7C3AED,#06B6D4,transparent)" }}
          />
          <motion.div
            animate={{ boxShadow: ["0 0 20px rgba(124,58,237,0.3)", "0 0 36px rgba(6,182,212,0.45)", "0 0 20px rgba(124,58,237,0.3)"] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{
              width: 60, height: 60, borderRadius: 16, margin: "0 auto 22px",
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
            }}>🔐</motion.div>

          <p style={{ fontSize: 11, color: "#4B5563", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>
            <Wordmark /> · Faculty Portal
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(22px, 5.4vw, 26px)", fontWeight: 700, marginBottom: 8 }}>Admin Login</h1>
          <p style={{ color: "#6B7280", fontSize: 13.5, marginBottom: 28 }}>Mr. V S S P L N Balaji Lanka · CSE</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter admin password"
              className="input-base"
              style={{ textAlign: "center", letterSpacing: "0.1em" }}
              autoFocus
            />
            {loginError && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#F87171", fontSize: 13 }}>
                ❌ Incorrect password. Please try again.
              </motion.p>
            )}
            <MagneticBtn primary onClick={handleLogin} style={{ width: "100%", justifyContent: "center" }}>
              Enter Admin Panel →
            </MagneticBtn>
          </div>
          <p style={{ marginTop: 22, fontSize: 11.5, color: "#374151" }}>Students — use the main site to access resources</p>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: "upload", label: "Upload", icon: "⬆️" },
    { id: "materials", label: "Materials", icon: "📁", count: materials.length },
    { id: "subjects", label: "Subjects", icon: "📚", count: subjects.length },
    { id: "messages", label: "Messages", icon: "💬", count: messages.length },
  ];

  const newThisWeek = materials.filter(m => Date.now() - new Date(m.uploadedAt).getTime() < 7 * 86400000).length;

  /* ─────────────── ADMIN PANEL ─────────────── */
  return (
    <div style={{ minHeight: "100vh", padding: "16px", position: "relative" }}>
      <AdminOrbs />
      <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 1, paddingTop: 8 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 14, paddingTop: 8 }}
        >
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(22px, 5.4vw, 28px)", fontWeight: 700, marginBottom: 4 }}>
              <Wordmark /> <span style={{ color: "#E5E7EB" }}>Admin</span>
            </h1>
            <p style={{ color: "#6B7280", fontSize: 12.5, fontFamily: "monospace" }}>Mr. V S S P L N Balaji Lanka · CSE Department</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#10B981", fontFamily: "monospace" }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
              LIVE
            </motion.div>
            <a href="/resources" target="_blank" style={{ padding: "7px 14px", borderRadius: 10, border: "1px solid rgba(120,100,255,0.3)", color: "#A78BFA", fontSize: 12.5, fontWeight: 500, textDecoration: "none" }}>
              View Site ↗
            </a>
            <MagneticBtn danger onClick={() => setLoggedIn(false)} style={{ padding: "7px 14px", fontSize: 12.5 }}>
              Logout
            </MagneticBtn>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px,100%), 1fr))", gap: 12, marginBottom: 28 }}
        >
          {[
            { label: "Total Materials", value: materials.length, color: "#7C3AED" },
            { label: "Subjects", value: subjects.length, color: "#06B6D4" },
            { label: "Student Messages", value: messages.length, color: "#10B981" },
            { label: "New (7 days)", value: newThisWeek, color: "#F59E0B" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3, borderColor: stat.color + "55" }}
              className="glass"
              style={{ padding: "16px", textAlign: "center", transition: "border-color 0.2s" }}
            >
              <p style={{ fontSize: 11.5, color: "#6B7280", marginBottom: 6 }}>{stat.label}</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(22px, 5.4vw, 30px)", fontWeight: 700, color: stat.color }}>
                <Counter to={stat.value} />
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs — horizontally scrollable on mobile */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid rgba(120,100,255,0.1)", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 16px", background: "transparent", border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #7C3AED" : "2px solid transparent",
                color: activeTab === tab.id ? "#A78BFA" : "#6B7280",
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13.5, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s, border-color 0.2s",
                marginBottom: -1, whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {tab.icon} {tab.label}
              {tab.count !== undefined && (
                <span style={{
                  minWidth: 20, height: 20, borderRadius: 100,
                  background: activeTab === tab.id ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.08)",
                  color: activeTab === tab.id ? "#A78BFA" : "#6B7280",
                  fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 6px",
                }}>{tab.count}</span>
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── UPLOAD TAB ── */}
          {activeTab === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="glass" style={{ padding: "clamp(20px, 5vw, 36px)", position: "relative", overflow: "hidden" }}>
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#7C3AED,#06B6D4,transparent)" }}
                />
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(18px, 4.6vw, 22px)", fontWeight: 600, marginBottom: 6 }}>Upload New Material</h2>
                <p style={{ color: "#6B7280", fontSize: 13.5, marginBottom: 28 }}>Files appear instantly on the student portal with a NEW badge.</p>

                <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: 18 }} className="admin-form">
                  <div className="admin-form-row">
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9CA3AF", marginBottom: 8 }}>Title *</label>
                      <input
                        value={form.title}
                        onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
                        placeholder="e.g. Unit 1 – Introduction to OS"
                        required
                        className="input-base"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9CA3AF", marginBottom: 8 }}>Subject *</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))}
                        required
                        className="input-base"
                      >
                        <option value="">Select subject</option>
                        {subjects.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9CA3AF", marginBottom: 8 }}>Category *</label>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {CATEGORIES.map((c) => (
                          <motion.button
                            key={c}
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setForm(p => ({ ...p, category: c }))}
                            style={{
                              padding: "7px 14px", borderRadius: 100,
                              border: `1px solid ${form.category === c ? categoryColor[c] + "80" : "rgba(255,255,255,0.08)"}`,
                              background: form.category === c ? categoryColor[c] + "20" : "transparent",
                              color: form.category === c ? categoryColor[c] : "#6B7280",
                              fontSize: 12.5, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all 0.2s",
                            }}
                          >
                            {categoryIcon[c]} {c}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9CA3AF", marginBottom: 8 }}>Description</label>
                      <input
                        value={form.description}
                        onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                        placeholder="Short description (optional)"
                        className="input-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9CA3AF", marginBottom: 8 }}>
                      File * (PDF, PPT, PPTX, DOC, DOCX)
                    </label>
                    <motion.div
                      onClick={() => document.getElementById("file-input")?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleFileDrop}
                      style={{
                        border: `2px dashed ${dragOver ? "rgba(124,58,237,0.7)" : "rgba(120,100,255,0.25)"}`,
                        borderRadius: 14, padding: "clamp(22px, 6vw, 32px) 20px", textAlign: "center", cursor: "pointer",
                        transition: "border-color 0.2s, background 0.2s",
                        background: file || dragOver ? "rgba(124,58,237,0.08)" : "transparent",
                      }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 10 }}>{file ? "✅" : "📤"}</div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: file ? "#A78BFA" : "#6B7280", marginBottom: 4, wordBreak: "break-word" }}>
                        {file ? file.name : dragOver ? "Drop it here" : "Tap to select a file"}
                      </p>
                      {file && <p style={{ fontSize: 12, color: "#4B5563" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>}
                      {!file && <p style={{ fontSize: 12.5, color: "#4B5563" }}>PDF, PPT, PPTX, DOC, DOCX up to 50MB</p>}
                    </motion.div>
                    <input
                      id="file-input" type="file" accept=".pdf,.ppt,.pptx,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      style={{ display: "none" }}
                    />
                  </div>

                  {uploadMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: "13px 16px", borderRadius: 12,
                        background: uploadMsg.type === "success" ? "rgba(16,185,129,0.1)" : "rgba(248,113,113,0.1)",
                        border: `1px solid ${uploadMsg.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(248,113,113,0.3)"}`,
                        color: uploadMsg.type === "success" ? "#10B981" : "#F87171", fontSize: 13.5,
                      }}
                    >
                      {uploadMsg.type === "success" ? "✅ " : "❌ "}{uploadMsg.text}
                    </motion.div>
                  )}

                  <MagneticBtn primary type="submit" disabled={uploading} style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px" }}>
                    {uploading ? "Uploading... Please wait" : "Upload to Nexora →"}
                  </MagneticBtn>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── MATERIALS TAB ── */}
          {activeTab === "materials" && (
            <motion.div key="materials" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {materials.length === 0 ? (
                  <div className="glass" style={{ padding: 36, textAlign: "center", color: "#6B7280" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
                    <p style={{ fontSize: 14 }}>No materials uploaded yet. Go to Upload tab to add your first file.</p>
                  </div>
                ) : materials.map((m) => {
                  const color = categoryColor[m.category] || "#7C3AED";
                  return (
                    <motion.div
                      key={m.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ borderColor: color + "55" }}
                      className="glass admin-material-row"
                      style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", transition: "border-color 0.2s" }}
                    >
                      <div style={{
                        fontSize: 20, flexShrink: 0, width: 38, height: 38, borderRadius: 10,
                        background: color + "22", border: `1px solid ${color}44`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{categoryIcon[m.category] || "📄"}</div>
                      <div style={{ flex: 1, minWidth: 160 }}>
                        <p style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 3, wordBreak: "break-word" }}>{m.title}</p>
                        <p style={{ fontSize: 11.5, color: "#6B7280" }}>
                          {m.subject} · {m.category} · {new Date(m.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {Date.now() - new Date(m.uploadedAt).getTime() < 7 * 86400000 && <span className="new-badge">NEW</span>}
                      <div style={{ display: "flex", gap: 8 }}>
                        <a href={m.url} target="_blank" rel="noopener noreferrer"
                          style={{ padding: "6px 13px", borderRadius: 8, border: "1px solid rgba(120,100,255,0.3)", color: "#A78BFA", fontSize: 12.5, textDecoration: "none" }}>
                          View
                        </a>
                        <MagneticBtn danger onClick={() => handleDelete(m.id)} style={{ padding: "6px 13px", fontSize: 12.5 }}>
                          Delete
                        </MagneticBtn>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── SUBJECTS TAB ── */}
          {activeTab === "subjects" && (
            <motion.div key="subjects" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="glass" style={{ padding: "clamp(20px, 5vw, 32px)", marginBottom: 18 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 18 }}>Add New Subject</h3>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }} className="admin-subject-add">
                  <input
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSubject()}
                    placeholder="e.g. Data Structures, Operating Systems..."
                    className="input-base"
                    style={{ flex: 1, minWidth: 200 }}
                  />
                  <MagneticBtn primary onClick={handleAddSubject} disabled={addingSubject}>
                    Add Subject
                  </MagneticBtn>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {subjects.length === 0 ? (
                  <div className="glass" style={{ padding: 28, textAlign: "center", color: "#6B7280", fontSize: 14 }}>
                    Add your first subject above, then you can upload materials for it.
                  </div>
                ) : subjects.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ borderColor: "rgba(124,58,237,0.4)" }}
                    className="glass"
                    style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s", gap: 12, flexWrap: "wrap" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 17 }}>📚</span>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 14.5 }}>{s.name}</p>
                        <p style={{ fontSize: 11.5, color: "#6B7280" }}>
                          {materials.filter(m => m.subject === s.name).length} material(s) · Added {new Date(s.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <MagneticBtn danger onClick={() => handleDeleteSubject(s.id)} style={{ padding: "6px 13px", fontSize: 12.5 }}>
                      Remove
                    </MagneticBtn>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── MESSAGES TAB ── */}
          {activeTab === "messages" && (
            <motion.div key="messages" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {messages.length === 0 ? (
                  <div className="glass" style={{ padding: 36, textAlign: "center", color: "#6B7280" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>📬</div>
                    <p style={{ fontSize: 14 }}>No messages from students yet.</p>
                  </div>
                ) : messages
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.05, 0.4) }}
                      className="glass"
                      style={{ padding: "18px" }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, gap: 14, flexWrap: "wrap" }}>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: 15 }}>{msg.name}</p>
                          <p style={{ fontSize: 11.5, color: "#6B7280" }}>
                            {msg.roll && `Roll: ${msg.roll} · `}
                            {msg.email && `${msg.email} · `}
                            {msg.subject && `Re: ${msg.subject} · `}
                            {new Date(msg.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p style={{ color: "#9CA3AF", fontSize: 13.5, lineHeight: 1.7, padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                        {msg.message}
                      </p>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <style jsx global>{`
        .admin-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .admin-form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .admin-subject-add {
            flex-direction: column;
          }
          .admin-subject-add input {
            min-width: 100% !important;
          }
          .admin-subject-add button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}