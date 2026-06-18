"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Material = {
  id: string;
  title: string;
  subject: string;
  category: string;
  url: string;
  description?: string;
  uploadedAt: string;
  isNew?: boolean;
};

const CATEGORIES = ["All", "PPT", "Notes", "QB", "Material", "Other"];

const categoryColor: Record<string, string> = {
  PPT: "#7C3AED",
  Notes: "#06B6D4",
  QB: "#10B981",
  Material: "#F59E0B",
  Other: "#EC4899",
  All: "#9CA3AF",
};

const categoryIcon: Record<string, string> = {
  PPT: "📊", Notes: "📝", QB: "❓", Material: "📁", Other: "📄", All: "✨",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function isNewUpload(dateStr: string) {
  return Date.now() - new Date(dateStr).getTime() < 7 * 24 * 3600000;
}

export default function ResourcesPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [activeSubject, setActiveSubject] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [matRes, subRes] = await Promise.all([
        fetch("/api/materials"),
        fetch("/api/subjects"),
      ]);
      const mats = await matRes.json();
      const subs = await subRes.json();
      setMaterials(Array.isArray(mats) ? mats : []);
      setSubjects(["All", ...(Array.isArray(subs) ? subs.map((s: { name: string }) => s.name) : [])]);
    } catch {
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const filtered = materials.filter((m) => {
    const matchSubject = activeSubject === "All" || m.subject === activeSubject;
    const matchCat = activeCategory === "All" || m.category.toUpperCase() === activeCategory;
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchCat && matchSearch;
  });

  const newCount = materials.filter((m) => isNewUpload(m.uploadedAt)).length;

  return (
    <main style={{ paddingTop: 90, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            padding: "32px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(124,58,237,.2)",
            backdropFilter: "blur(20px)",
            marginBottom: 40,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)",
            }}
          />

          <h1
            style={{
              fontSize: 52,
              fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            Resource Vault
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginTop: 12,
              maxWidth: 500,
            }}
          >
            Browse lecture slides, notes, question banks and study materials.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          whileFocus={{
            scale: 1.02,
          }}
          style={{
            padding: 3,
            borderRadius: 18,
            background:
              "linear-gradient(135deg,rgba(124,58,237,.4),rgba(6,182,212,.4))",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              background: "#050816",
              borderRadius: 14,
              padding: 12,
            }}
          >
            <input
              placeholder="Search resources..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: 16,
              }}
            />
          </div>
        </motion.div>

        {/* Subject filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 18,
            marginBottom: 32,
          }}
        >
          {/* ...stats cards... */}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#4B5563", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Subject</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {subjects.map((s) => (
              <motion.button
                key={s}
                onClick={() => setActiveSubject(s)}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                animate={
                  activeSubject === s
                    ? {
                      scale: [1, 1.04, 1],
                    }
                    : {}
                }
                transition={{
                  duration: 0.3,
                }}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  cursor: "pointer",
                  border:
                    activeSubject === s
                      ? "1px solid rgba(124,58,237,.5)"
                      : "1px solid rgba(255,255,255,.08)",

                  background:
                    activeSubject === s
                      ? "linear-gradient(135deg,#7C3AED,#06B6D4)"
                      : "rgba(255,255,255,.03)",

                  color: activeSubject === s ? "#fff" : "#9CA3AF",

                  fontWeight: 600,

                  transition: "all .25s",

                  boxShadow:
                    activeSubject === s
                      ? "0 0 25px rgba(124,58,237,.35)"
                      : "none",
                }}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#4B5563", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Category</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <motion.button
                key={c}
                onClick={() => setActiveCategory(c)}
                whileHover={{
                  y: -5,
                  scale: 1.08,
                  rotate: -1,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                animate={
                  activeCategory === c
                    ? {
                      boxShadow: [
                        `0 0 10px ${categoryColor[c]}55`,
                        `0 0 28px ${categoryColor[c]}99`,
                        `0 0 10px ${categoryColor[c]}55`,
                      ],
                    }
                    : {}
                }

                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  cursor: "pointer",
                  border: `1px solid ${activeCategory === c
                      ? categoryColor[c]
                      : "rgba(255,255,255,.08)"
                    }`,


                  color:
                    activeCategory === c
                      ? categoryColor[c]
                      : "#9CA3AF",

                  fontWeight: 600,
                }}
              >
                <motion.span
                  animate={{
                    rotate: activeCategory === c ? [0, 12, -12, 0] : 0,
                  }}

                  style={{
                    display: "inline-block",
                    marginRight: 6,
                  }}
                >
                  {categoryIcon[c]}
                </motion.span>

                {c}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass" style={{ height: 180, animation: "pulse-glow 2s infinite", opacity: 0.4 }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "80px 0", color: "#4B5563" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📭</div>
            <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>No materials found</p>
            <p style={{ fontSize: 14 }}>Try adjusting your filters or search term</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}
          >
            <AnimatePresence>
              {filtered.map((item, i) => {
                const fresh = isNewUpload(item.uploadedAt);
                const color = categoryColor[item.category.toUpperCase()] || "#7C3AED";
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      rotateX: 4,
                    }}
                    className="glass"
                    style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 12, cursor: "default" }}
                  >
                    {/* Top row */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                      <div
                        style={{
                          width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                          background: color + "22", border: `1px solid ${color}44`,
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                        }}
                      >
                        {categoryIcon[item.category.toUpperCase()] || "📄"}
                      </div>
                      {fresh && <span className="new-badge">● NEW</span>}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.4, marginBottom: 6 }}>
                        {item.title}
                      </h3>
                      {item.description && (
                        <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{item.description}</p>
                      )}
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600,
                        background: color + "20", color: color, border: `1px solid ${color}40`,
                      }}>
                        {item.category.toUpperCase()}
                      </span>
                      <span style={{
                        padding: "3px 10px", borderRadius: 100, fontSize: 11,
                        background: "rgba(255,255,255,0.05)", color: "#6B7280",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}>
                        {item.subject}
                      </span>
                    </div>

                    {/* Footer */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{ fontSize: 12, color: "#4B5563" }}>{timeAgo(item.uploadedAt)}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ padding: "7px 16px", fontSize: 13 }}
                      >
                        Download ↓
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </main>
  );
}