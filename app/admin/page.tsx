"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Material = {
  id: string;
  title: string;
  subject: string;
  category: string;
  url: string;
  description?: string;
  uploadedAt: string;
};

type Message = {
  id: string;
  name: string;
  roll?: string;
  email?: string;
  subject?: string;
  message: string;
  createdAt: string;
};

type Subject = { id: string; name: string; createdAt: string };

const CATEGORIES = ["PPT", "Notes", "QB", "Material", "Other"];
const categoryIcon: Record<string, string> = { PPT: "📊", Notes: "📝", QB: "❓", Material: "📁", Other: "📄" };

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "nexora@admin2024";

type Tab = "upload" | "materials" | "subjects" | "messages";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("upload");

  // Upload form
  const [form, setForm] = useState({ title: "", subject: "", category: "PPT", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Data
  const [materials, setMaterials] = useState<Material[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [addingSubject, setAddingSubject] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const [matRes, msgRes, subRes] = await Promise.all([
        fetch("/api/materials"),
        fetch("/api/contact"),
        fetch("/api/subjects"),
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
    try {
      await fetch(`/api/materials?id=${id}`, { method: "DELETE" });
      fetchAll();
    } catch { /* silent */ }
  };

  const handleAddSubject = async () => {
    if (!newSubject.trim()) return;
    setAddingSubject(true);
    try {
      await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // ─── LOGIN ───
  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass"
          style={{ width: "100%", maxWidth: 400, padding: "48px 40px", textAlign: "center" }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: 16, margin: "0 auto 24px",
            background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28,
          }}>🔐</div>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Admin Login</h1>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 32 }}>Nexora Faculty Portal</p>

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
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: "#F87171", fontSize: 13 }}
              >
                ❌ Incorrect password. Please try again.
              </motion.p>
            )}

            <button onClick={handleLogin} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Enter Admin Panel →
            </button>
          </div>

          <p style={{ marginTop: 24, fontSize: 12, color: "#374151" }}>
            Students — use the main site to access resources
          </p>
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

  // ─── ADMIN PANEL ───
  return (
    <div style={{ minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16, paddingTop: 12 }}
        >
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
              <span className="gradient-text">Nexora</span> Admin
            </h1>
            <p style={{ color: "#6B7280", fontSize: 14 }}>Faculty Resource Management Panel</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a
              href="/resources"
              target="_blank"
              style={{
                padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(120,100,255,0.3)",
                color: "#A78BFA", fontSize: 13, fontWeight: 500, textDecoration: "none",
              }}
            >
              View Student Site ↗
            </a>
            <button
              onClick={() => setLoggedIn(false)}
              style={{
                padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(248,113,113,0.3)",
                background: "transparent", color: "#F87171", fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}
        >
          {[
            { label: "Total Materials", value: materials.length, color: "#7C3AED" },
            { label: "Subjects", value: subjects.length, color: "#06B6D4" },
            { label: "Student Messages", value: messages.length, color: "#10B981" },
            { label: "New (7 days)", value: materials.filter(m => Date.now() - new Date(m.uploadedAt).getTime() < 7 * 86400000).length, color: "#F59E0B" },
          ].map((stat, i) => (
            <div key={i} className="glass" style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>{stat.label}</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, borderBottom: "1px solid rgba(120,100,255,0.1)", paddingBottom: 0 }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #7C3AED" : "2px solid transparent",
                color: activeTab === tab.id ? "#A78BFA" : "#6B7280",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "color 0.2s",
                marginBottom: -1,
              }}
            >
              {tab.icon} {tab.label}
              {tab.count !== undefined && (
                <span style={{
                  minWidth: 20, height: 20, borderRadius: 100,
                  background: activeTab === tab.id ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.08)",
                  color: activeTab === tab.id ? "#A78BFA" : "#6B7280",
                  fontSize: 11, fontWeight: 600,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  padding: "0 6px",
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── UPLOAD TAB ── */}
          {activeTab === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="glass" style={{ padding: "36px" }}>
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
                        {subjects.map((s) => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9CA3AF", marginBottom: 8 }}>Category *</label>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {CATEGORIES.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setForm(p => ({ ...p, category: c }))}
                            style={{
                              padding: "7px 14px", borderRadius: 100,
                              border: `1px solid ${form.category === c ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
                              background: form.category === c ? "rgba(124,58,237,0.2)" : "transparent",
                              color: form.category === c ? "#A78BFA" : "#6B7280",
                              fontSize: 13, cursor: "pointer", fontFamily: "'Inter',sans-serif",
                              transition: "all 0.2s",
                            }}
                          >
                            {categoryIcon[c]} {c}
                          </button>
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
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9CA3AF", marginBottom: 8 }}>File * (PDF, PPT, PPTX, DOC, DOCX)</label>
                    <div
                      onClick={() => document.getElementById("file-input")?.click()}
                      style={{
                        border: "2px dashed rgba(120,100,255,0.25)",
                        borderRadius: 14,
                        padding: "32px 24px",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                        background: file ? "rgba(124,58,237,0.08)" : "transparent",
                      }}
                    >
                      <div style={{ fontSize: 36, marginBottom: 10 }}>{file ? "✅" : "📤"}</div>
                      <p style={{ fontSize: 15, fontWeight: 500, color: file ? "#A78BFA" : "#6B7280", marginBottom: 4 }}>
                        {file ? file.name : "Click to select a file"}
                      </p>
                      {file && <p style={{ fontSize: 12, color: "#4B5563" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>}
                      {!file && <p style={{ fontSize: 13, color: "#4B5563" }}>PDF, PPT, PPTX, DOC, DOCX up to 50MB</p>}
                    </div>
                    <input
                      id="file-input"
                      type="file"
                      accept=".pdf,.ppt,.pptx,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      style={{ display: "none" }}
                    />
                  </div>

                  {uploadMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: "14px 18px",
                        borderRadius: 12,
                        background: uploadMsg.type === "success" ? "rgba(16,185,129,0.1)" : "rgba(248,113,113,0.1)",
                        border: `1px solid ${uploadMsg.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(248,113,113,0.3)"}`,
                        color: uploadMsg.type === "success" ? "#10B981" : "#F87171",
                        fontSize: 14,
                      }}
                    >
                      {uploadMsg.type === "success" ? "✅ " : "❌ "}{uploadMsg.text}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={uploading}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", opacity: uploading ? 0.7 : 1, fontSize: 16, padding: "14px" }}
                  >
                    {uploading ? "Uploading... Please wait" : "Upload to Nexora →"}
                  </button>
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
                ) : materials.map((m) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass"
                    style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
                  >
                    <div style={{ fontSize: 24, flexShrink: 0 }}>{categoryIcon[m.category] || "📄"}</div>
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{m.title}</p>
                      <p style={{ fontSize: 12, color: "#6B7280" }}>
                        {m.subject} · {m.category} · {new Date(m.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    {Date.now() - new Date(m.uploadedAt).getTime() < 7 * 86400000 && (
                      <span className="new-badge">NEW</span>
                    )}
                    <div style={{ display: "flex", gap: 8 }}>
                      <a href={m.url} target="_blank" rel="noopener noreferrer"
                        style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(120,100,255,0.3)", color: "#A78BFA", fontSize: 13, textDecoration: "none" }}>
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(m.id)}
                        style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(248,113,113,0.3)", background: "transparent", color: "#F87171", fontSize: 13, cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
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
                  <button
                    onClick={handleAddSubject}
                    disabled={addingSubject}
                    className="btn-primary"
                    style={{ flexShrink: 0, opacity: addingSubject ? 0.7 : 1 }}
                  >
                    Add Subject
                  </button>
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
                    className="glass"
                    style={{ padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
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
                    <button
                      onClick={() => handleDeleteSubject(s.id)}
                      style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(248,113,113,0.3)", background: "transparent", color: "#F87171", fontSize: 13, cursor: "pointer" }}
                    >
                      Remove
                    </button>
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
                ) : messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((msg, i) => (
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