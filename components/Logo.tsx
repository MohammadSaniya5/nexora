"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────
   NEXORA LOGO
   - Mark: hexagonal "N" knot with orbiting node (knowledge node)
   - Wordmark: letters with a light wave that sweeps across on a loop
───────────────────────────────────────── */

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = {
    sm: { mark: 28, font: 18, gap: 8 },
    md: { mark: 36, font: 24, gap: 10 },
    lg: { mark: 64, font: 44, gap: 16 },
  }[size];

  const letters = "NEXORA".split("");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: dims.gap }}>
      {/* ── MARK ── */}
      <div style={{ width: dims.mark, height: dims.mark, position: "relative", flexShrink: 0 }}>
        <svg viewBox="0 0 48 48" width={dims.mark} height={dims.mark}>
          <defs>
            <linearGradient id="nexora-mark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="55%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* hexagon frame */}
          <motion.path
            d="M24 3 L42 13.5 L42 34.5 L24 45 L6 34.5 L6 13.5 Z"
            fill="none"
            stroke="url(#nexora-mark-grad)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {/* abstract N — two nodes connected by a diagonal knowledge-link */}
          <motion.circle
            cx="17" cy="32" r="3.4"
            fill="url(#nexora-mark-grad)"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          />
          <motion.circle
            cx="31" cy="16" r="3.4"
            fill="url(#nexora-mark-grad)"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: 1.3 }}
          />
          <motion.line
            x1="17" y1="32" x2="31" y2="16"
            stroke="url(#nexora-mark-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          />
          {/* small orbiting spark traveling the link, back and forth */}
          <motion.circle
            r="1.6"
            fill="#EEF0FF"
            animate={{
              cx: [17, 31, 17],
              cy: [32, 16, 32],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 1.6 }}
          />
        </svg>
      </div>

      {/* ── WORDMARK with sweeping wave highlight ── */}
      <div
        style={{
          position: "relative",
          fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: dims.font,
          letterSpacing: "0.02em",
          lineHeight: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              backgroundImage: "linear-gradient(135deg, #A78BFA 0%, #06B6D4 60%, #10B981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {ch}
          </span>
        ))}

        {/* sweeping wave/shine overlay, loops every few seconds */}
        <motion.div
          aria-hidden
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ repeat: Infinity, repeatDelay: 2.2, duration: 1.1, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "40%",
            height: "100%",
            background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.85), transparent)",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
