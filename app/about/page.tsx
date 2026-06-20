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
        {/* Why Nexora Was Built */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass"
          style={{
            padding: "36px",
            marginBottom: 32,
          }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 600,
              marginBottom: 20,
              color: "#06B6D4",
            }}
          >
            Why Nexora was built
          </h3>

          <p
            style={{
              color: "#9CA3AF",
              lineHeight: 1.8,
              fontSize: 15,
              marginBottom: 18,
            }}
          >
            Students often spend valuable time searching through WhatsApp groups,
            personal drives, and old chats just to locate lecture slides, notes,
            or question banks.
          </p>

          <p
            style={{
              color: "#9CA3AF",
              lineHeight: 1.8,
              fontSize: 15,
            }}
          >
            Nexora solves this problem by providing a centralized academic portal
            where resources are uploaded directly by faculty and made instantly
            available to every student.
          </p>
        </motion.div>
        {/* How Nexora Works */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass"
          style={{
            padding: "36px",
            marginBottom: 32,
          }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 600,
              marginBottom: 28,
              color: "#10B981",
            }}
          >
            How Nexora Works
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 20,
            }}
          >
            {[
              {
                title: "Faculty Uploads",
                icon: "⬆️",
              },
              {
                title: "Portal Updates",
                icon: "⚡",
              },
              {
                title: "Students Access",
                icon: "🎓",
              },
              {
                title: "Download Anytime",
                icon: "📥",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  textAlign: "center",
                  padding: 20,
                  borderRadius: 14,
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 34,
                    marginBottom: 10,
                  }}
                >
                  {item.icon}
                </div>

                <div
                  style={{
                    fontWeight: 600,
                    color: "#EEF2FF",
                  }}
                >
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

         
        {/* Mission & Vision */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.5 }}
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: 24,
    marginTop: 32,
  }}
>
  <div
    className="glass"
    style={{
      padding: 30,
    }}
  >
    <h3
      style={{
        color: "#A78BFA",
        marginBottom: 16,
        fontSize: 22,
      }}
    >
      🎯 Mission
    </h3>

    <p
      style={{
        color: "#9CA3AF",
        lineHeight: 1.8,
      }}
    >
      To provide students with instant, organized and reliable access to
      academic resources while simplifying the sharing process for faculty.
    </p>
  </div>

  <div
    className="glass"
    style={{
      padding: 30,
    }}
  >
    <h3
      style={{
        color: "#06B6D4",
        marginBottom: 16,
        fontSize: 22,
      }}
    >
      🚀 Vision
    </h3>

    <p
      style={{
        color: "#9CA3AF",
        lineHeight: 1.8,
      }}
    >
      To become a modern digital academic ecosystem where faculty knowledge
      reaches every learner through a centralized and intelligent platform.
    </p>
  </div>
</motion.div>

      </div>
    </main>
  );
}