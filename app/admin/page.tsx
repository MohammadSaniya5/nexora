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
   REACTIVE ORB BACKGROUND (matches student site)
───────────────────────────────────────── */
function AdminOrbs() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 20 });
  const sy = useSpring(my, { stiffness: 30, damping: 20 });

  useEffect(() => {
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
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%)",
        filter: "blur(50px)",
      }} />
      <motion.div style={{
        x: useSpring(mx, { stiffness: 30, damping: 20 }), position: "absolute", bottom: "-10%", right: "-5%",
        width: 450, height: 450, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(6,182,212,0.1),transparent 70%)",
        filter: "blur(50px)",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAGNETIC BUTTON (matches student site)
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

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, relX * 0.25)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, relY * 0.25)));
  }, [x, y, disabled]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref} type={type} disabled={disabled}
      style={{
        x: sx, y: sy,
        padding: "12px 26px", borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif",
        fontWeight: 700, fontSize: 14, cursor: disabled ? "not-allowed" : "pointer", border: "none",
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
   ANIMATED COUNTER (matches student site)
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
   GRADIENT WORDMARK (Audiowide-style branding)
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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
        <AdminOrbs />
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{ width: "100%", maxWidth: 420, padding: "48px 40px", textAlign: "center", position: "relative", zIndex: 1 }}
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
              width: 64, height: 64, borderRadius: 16, margin: "0 auto 24px",
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
            }}>🔐</motion.div>

          <p style={{ fontSize: 11, color: "#4B5563", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
            <Wordmark /> · Faculty Portal
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Admin Login</h1>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 32 }}>Mr. V S S P L N Balaji Lanka · CSE</p>

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
          <p style={{ marginTop: 24, fontSize: 12, color: "#374151" }}>Students — use the main site to access resources</p>
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
    <div style={{ minHeight: "100vh", padding: "24px", position: "relative" }}>
      <AdminOrbs />
      <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16, paddingTop: 12 }}
        >
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
              <Wordmark /> <span style={{ color: "#E5E7EB" }}>Admin</span>
            </h1>
            <p style={{ color: "#6B7280", fontSize: 13, fontFamily: "monospace" }}>Mr. V S S P L N Balaji Lanka · CSE Department</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#10B981", fontFamily: "monospace", marginRight: 6 }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
              LIVE
            </motion.div>
            <a href="/resources" target="_blank" style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(120,100,255,0.3)", color: "#A78BFA", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
              View Student Site ↗
            </a>
            <MagneticBtn danger onClick={() => setLoggedIn(false)} style={{ padding: "8px 16px", fontSize: 13 }}>
              Logout
            </MagneticBtn>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 32 }}
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
              style={{ padding: "18px", textAlign: "center", transition: "border-color 0.2s" }}
            >
              <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{stat.label}</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700, color: stat.color }}>
                <Counter to={stat.value} />
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: "1px solid rgba(120,100,255,0.1)", overflowX: "auto" }}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ color: "#A78BFA" }}
              style={{
                padding: "10px 20px", background: "transparent", border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #7C3AED" : "2px solid transparent",
                color: activeTab === tab.id ? "#A78BFA" : "#6B7280",
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s, border-color 0.2s",
                marginBottom: -1, whiteSpace: "nowrap",
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
              {activeTab === tab.id && (
                <motion.div
                  layoutId="admin-tab-glow"
                  style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#7C3AED,#06B6D4)" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── UPLOAD TAB ── */}
          {activeTab === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="glass" style={{ padding: "36px", position: "relative", overflow: "hidden" }}>
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#7C3AED,#06B6D4,transparent)" }}
                />
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Upload New Material</h2>
                <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 32 }}>Files appear instantly on the student portal with a NEW badge.</p>

                <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9CA3AF", marginBottom: 8 }}>Category *</label>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {CATEGORIES.map((c) => (
                          <motion.button
                            key={c}
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setForm(p => ({ ...p, category: c }))}
                            style={{
                              padding: "7px 14px", borderRadius: 100,
                              border: `1px solid ${form.category === c ? categoryColor[c] + "80" : "rgba(255,255,255,0.08)"}`,
                              background: form.category === c ? categoryColor[c] + "20" : "transparent",
                              color: form.category === c ? categoryColor[c] : "#6B7280",
                              fontSize: 13, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all 0.2s",
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
                      whileHover={{ borderColor: "rgba(124,58,237,0.5)" }}
                      style={{
                        border: `2px dashed ${dragOver ? "rgba(124,58,237,0.7)" : "rgba(120,100,255,0.25)"}`,
                        borderRadius: 14, padding: "32px 24px", textAlign: "center", cursor: "pointer",
                        transition: "border-color 0.2s, background 0.2s",
                        background: file || dragOver ? "rgba(124,58,237,0.08)" : "transparent",
                      }}
                    >
                      <div style={{ fontSize: 36, marginBottom: 10 }}>{file ? "✅" : "📤"}</div>
                      <p style={{ fontSize: 15, fontWeight: 500, color: file ? "#A78BFA" : "#6B7280", marginBottom: 4 }}>
                        {file ? file.name : dragOver ? "Drop it here" : "Click or drag a file here"}
                      </p>
                      {file && <p style={{ fontSize: 12, color: "#4B5563" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>}
                      {!file && <p style={{ fontSize: 13, color: "#4B5563" }}>PDF, PPT, PPTX, DOC, DOCX up to 50MB</p>}
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
                        padding: "14px 18px", borderRadius: 12,
                        background: uploadMsg.type === "success" ? "rgba(16,185,129,0.1)" : "rgba(248,113,113,0.1)",
                        border: `1px solid ${uploadMsg.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(248,113,113,0.3)"}`,
                        color: uploadMsg.type === "success" ? "#10B981" : "#F87171", fontSize: 14,
                      }}
                    >
                      {uploadMsg.type === "success" ? "✅ " : "❌ "}{uploadMsg.text}
                    </motion.div>
                  )}

                  <MagneticBtn primary type="submit" disabled={uploading} style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "14px" }}>
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
                  <div className="glass" style={{ padding: 40, textAlign: "center", color: "#6B7280" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
                    <p>No materials uploaded yet. Go to Upload tab to add your first file.</p>
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
                      className="glass"
                      style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", transition: "border-color 0.2s" }}
                    >
                      <div style={{
                        fontSize: 22, flexShrink: 0, width: 40, height: 40, borderRadius: 10,
                        background: color + "22", border: `1px solid ${color}44`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{categoryIcon[m.category] || "📄"}</div>
                      <div style={{ flex: 1, minWidth: 180 }}>
                        <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{m.title}</p>
                        <p style={{ fontSize: 12, color: "#6B7280" }}>
                          {m.subject} · {m.category} · {new Date(m.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {Date.now() - new Date(m.uploadedAt).getTime() < 7 * 86400000 && <span className="new-badge">NEW</span>}
                      <div style={{ display: "flex", gap: 8 }}>
                        <a href={m.url} target="_blank" rel="noopener noreferrer"
                          style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(120,100,255,0.3)", color: "#A78BFA", fontSize: 13, textDecoration: "none" }}>
                          View
                        </a>
                        <MagneticBtn danger onClick={() => handleDelete(m.id)} style={{ padding: "6px 14px", fontSize: 13 }}>
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
              <div className="glass" style={{ padding: "32px", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Add New Subject</h3>
                <div style={{ display: "flex", gap: 12 }}>
                  <input
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSubject()}
                    placeholder="e.g. Data Structures, Operating Systems..."
                    className="input-base"
                    style={{ flex: 1 }}
                  />
                  <MagneticBtn primary onClick={handleAddSubject} disabled={addingSubject}>
                    Add Subject
                  </MagneticBtn>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {subjects.length === 0 ? (
                  <div className="glass" style={{ padding: 32, textAlign: "center", color: "#6B7280" }}>
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
                    style={{ padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 18 }}>📚</span>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</p>
                        <p style={{ fontSize: 12, color: "#6B7280" }}>
                          {materials.filter(m => m.subject === s.name).length} material(s) · Added {new Date(s.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <MagneticBtn danger onClick={() => handleDeleteSubject(s.id)} style={{ padding: "6px 14px", fontSize: 13 }}>
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
                  <div className="glass" style={{ padding: 40, textAlign: "center", color: "#6B7280" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📬</div>
                    <p>No messages from students yet.</p>
                  </div>
                ) : messages
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass"
                      style={{ padding: "22px" }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, gap: 16, flexWrap: "wrap" }}>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: 16 }}>{msg.name}</p>
                          <p style={{ fontSize: 12, color: "#6B7280" }}>
                            {msg.roll && `Roll: ${msg.roll} · `}
                            {msg.email && `${msg.email} · `}
                            {msg.subject && `Re: ${msg.subject} · `}
                            {new Date(msg.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p style={{ color: "#9CA3AF", fontSize: 15, lineHeight: 1.7, padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
                        {msg.message}
                      </p>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}