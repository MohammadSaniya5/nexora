"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main style={{ paddingTop: "clamp(80px, 14vw, 100px)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 80px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 72px)" }}
        >
          <div className="section-divider" />
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 8vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            About <span className="gradient-text">Nexora</span>
          </h1>
          <p style={{ color: "#6B7280", fontSize: "clamp(14px, 3.6vw, 17px)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto", padding: "0 8px" }}>
            Built with purpose — a single hub where faculty knowledge reaches every student, instantly.
          </p>
        </motion.div>

        {/* About Nexora */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass"
          style={{ padding: "clamp(24px, 5vw, 36px)", marginBottom: 24 }}
        >
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(18px, 4.5vw, 22px)", fontWeight: 600, marginBottom: 18, color: "#A78BFA" }}>
            What is Nexora?
          </h3>
          <p style={{ color: "#9CA3AF", lineHeight: 1.8, fontSize: "clamp(13.5px, 3.6vw, 15px)", marginBottom: 16 }}>
            Nexora is a dedicated academic resource portal built for students. The name combines <strong style={{ color: "#EEF0FF" }}>Next Generation</strong>, <strong style={{ color: "#EEF0FF" }}>Aurora</strong>, and <strong style={{ color: "#EEF0FF" }}>Knowledge</strong> — representing the dawn of a new, smarter way to access course materials.
          </p>
          <p style={{ color: "#9CA3AF", lineHeight: 1.8, fontSize: "clamp(13.5px, 3.6vw, 15px)" }}>
            No logins, no complexity. The faculty uploads — students access. Instantly. Every PPT, note, question bank, and study material is organized by subject and category, with NEW badges highlighting fresh uploads.
          </p>
        </motion.div>

        {/* Why Nexora Was Built */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass"
          style={{ padding: "clamp(24px, 5vw, 36px)", marginBottom: 24 }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(18px, 4.5vw, 22px)",
              fontWeight: 600,
              marginBottom: 18,
              color: "#06B6D4",
            }}
          >
            Why Nexora was built
          </h3>

          <p
            style={{
              color: "#9CA3AF",
              lineHeight: 1.8,
              fontSize: "clamp(13.5px, 3.6vw, 15px)",
              marginBottom: 16,
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
              fontSize: "clamp(13.5px, 3.6vw, 15px)",
            }}
          >
            Nexora solves this problem by providing a centralized academic portal
            where resources are uploaded directly by faculty and made instantly
            available to every student.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(280px, 100%),1fr))",
            gap: 20,
            marginTop: 24,
          }}
        >
          <div
            className="glass"
            style={{ padding: "clamp(22px, 5vw, 30px)" }}
          >
            <h3
              style={{
                color: "#A78BFA",
                marginBottom: 14,
                fontSize: "clamp(18px, 4.5vw, 22px)",
              }}
            >
              🎯 Mission
            </h3>

            <p
              style={{
                color: "#9CA3AF",
                lineHeight: 1.8,
                fontSize: "clamp(13.5px, 3.6vw, 15px)",
              }}
            >
              To provide students with instant, organized and reliable access to
              academic resources while simplifying the sharing process for faculty.
            </p>
          </div>

          <div
            className="glass"
            style={{ padding: "clamp(22px, 5vw, 30px)" }}
          >
            <h3
              style={{
                color: "#06B6D4",
                marginBottom: 14,
                fontSize: "clamp(18px, 4.5vw, 22px)",
              }}
            >
              🚀 Vision
            </h3>

            <p
              style={{
                color: "#9CA3AF",
                lineHeight: 1.8,
                fontSize: "clamp(13.5px, 3.6vw, 15px)",
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