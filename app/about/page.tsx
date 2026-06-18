"use client";

import { motion } from "framer-motion";

const subjects = [
  { name: "Node.js", color: "#7C3AED" },
  { name: "DevOps", color: "#06B6D4" },
  { name: "Java", color: "#10B981" },
  { name: "C Programming", color: "#F59E0B" },
  { name: "C++", color: "#EC4899" },
  { name: "Scripting Languages", color: "#8B5CF6" },
  { name: "Flutter", color: "#0EA5E9" },
  { name: "Python", color: "#22C55E" },
  { name: "Machine Learning", color: "#F97316" },
  { name: "Database Management Systems", color: "#14B8A6" },
  { name: "Data Analytics", color: "#D946EF" },
  { name: "Data Structures", color: "#6366F1" },
  { name: "Web Technologies", color: "#3B82F6" },
  { name: "Full Stack Development", color: "#EAB308" },
  { name: "Technical Training", color: "#EF4444" },
  { name: "Computer Networks", color: "#84CC16" },
  { name: "Operating Systems", color: "#06B6D4" },
  { name: "And More...", color: "#A78BFA" },
];

export default function AboutPage() {
  return (
    <main style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 100px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div className="section-divider" />
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            About <span className="gradient-text">Nexora</span>
          </h1>
          <p style={{ color: "#6B7280", fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            Built with purpose — a single hub where faculty knowledge reaches every student, instantly.
          </p>
        </motion.div>

        {/* Faculty Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass"
          style={{ padding: "40px 36px", marginBottom: 32, display: "flex", gap: 36, flexWrap: "wrap", alignItems: "center" }}
        >
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: 100, height: 100, borderRadius: "50%",
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
                color: "white",
              }}
            >
              B
            </div>
            <div
              style={{
                position: "absolute", bottom: 4, right: 4,
                width: 18, height: 18, borderRadius: "50%",
                background: "#10B981",
                border: "3px solid #02030A",
              }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{
              display: "inline-block", padding: "3px 12px",
              background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: 100, fontSize: 11, fontWeight: 600, color: "#A78BFA",
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12,
            }}>
              Faculty · Computer Science
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>
               Mr. V S S P L N Balaji Lanka
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 15, marginBottom: 4 }}>
              Assistant Professor · Department of CSE
            </p>
            <p style={{ color: "#6B7280", fontSize: 14 }}>
              M.Tech 
            </p>
          </div>
        </motion.div>

        {/* About Nexora */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass"
          style={{ padding: "36px", marginBottom: 32 }}
        >
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600, marginBottom: 20, color: "#A78BFA" }}>
            What is Nexora?
          </h3>
          <p style={{ color: "#9CA3AF", lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            Nexora is a dedicated academic resource portal built for students. The name combines <strong style={{ color: "#EEF0FF" }}>Next Generation</strong>, <strong style={{ color: "#EEF0FF" }}>Aurora</strong>, and <strong style={{ color: "#EEF0FF" }}>Knowledge</strong> — representing the dawn of a new, smarter way to access course materials.
          </p>
          <p style={{ color: "#9CA3AF", lineHeight: 1.8, fontSize: 15 }}>
            No logins, no complexity. The faculty uploads — students access. Instantly. Every PPT, note, question bank, and study material is organized by subject and category, with NEW badges highlighting fresh uploads.
          </p>
        </motion.div>

        {/* Subjects */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="glass"
  style={{ padding: "36px" }}
>
  <h3
    style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 22,
      fontWeight: 700,
      marginBottom: 10,
      color: "#A78BFA",
    }}
  >
    Subjects Covered
  </h3>

  <p
    style={{
      color: "#6B7280",
      marginBottom: 28,
      fontSize: 14,
      lineHeight: 1.7,
    }}
  >
    A wide range of technologies and computer science domains taught
    through academic courses, practical sessions, and technical
    training.
  </p>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
    }}
  >
    {subjects.map((s, i) => (
      <motion.div
        key={s.name}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 0.35 + i * 0.04,
          type: "spring",
          stiffness: 180,
        }}
        whileHover={{
          scale: 1.08,
          y: -4,
          boxShadow: `0 0 22px ${s.color}55`,
        }}
        style={{
          padding: "12px 18px",
          borderRadius: 999,
          background: `${s.color}15`,
          border: `1px solid ${s.color}55`,
          color: "#fff",
          fontWeight: 600,
          fontSize: 14,
          cursor: "default",
          transition: "0.25s",
        }}
      >
        {s.name}
      </motion.div>
    ))}
  </div>

  <p
    style={{
      marginTop: 28,
      textAlign: "center",
      color: "#4B5563",
      fontSize: 13,
    }}
  >
    Topics continue to expand with evolving technologies and industry
    requirements.
  </p>
</motion.div>

      </div>
    </main>
  );
}