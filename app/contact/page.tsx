"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", roll: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length === 0 || form.message.trim().length === 0) {
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", roll: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main
      style={{
        paddingTop: "clamp(80px, 14vw, 100px)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Purple Aurora */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -70, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "min(420px, 90vw)",
          height: "min(420px, 90vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.22), transparent 70%)",
          filter: "blur(60px)",
          top: -150,
          left: -120,
          pointerEvents: "none",
        }}
      />

      {/* Cyan Aurora */}
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "min(360px, 80vw)",
          height: "min(360px, 80vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)",
          filter: "blur(60px)",
          bottom: -120,
          right: -120,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 16px 80px",
          position: "relative",
          zIndex: 2,
        }}
      >

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: "inline-flex",
              padding: "7px 16px",
              borderRadius: 999,
              marginBottom: 22,
              border: "1px solid rgba(124,58,237,.35)",
              background: "rgba(124,58,237,.12)",
              color: "#A78BFA",
              fontWeight: 600,
              fontSize: "clamp(11px, 2.8vw, 13px)",
            }}
          >
            ✨ Connect with Faculty
          </motion.div>

          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(34px,8vw,70px)",
              fontWeight: 700,
              marginBottom: 14,
              lineHeight: 1.1,
            }}
          >
            Get in <span className="gradient-text">Touch</span>
          </h1>

          <p
            style={{
              maxWidth: 620,
              margin: "auto",
              color: "#9CA3AF",
              lineHeight: 1.8,
              fontSize: "clamp(13.5px, 3.6vw, 16px)",
              padding: "0 8px",
            }}
          >
            Have questions, need resources, or want clarification?
            Send a message directly to your faculty through Nexora.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass"
          style={{ padding: "clamp(22px, 6vw, 40px) clamp(18px, 5vw, 36px)" }}
        >
          {status === "sent" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: "center", padding: "40px 0" }}
            >
              <div style={{ fontSize: 48, marginBottom: 18 }}>✅</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(19px, 4.6vw, 24px)", fontWeight: 700, marginBottom: 12 }}>
                Message Sent!
              </h3>
              <p style={{ color: "#6B7280", fontSize: 14 }}>
                Your faculty will see this message and address it in class or reach out to you directly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn-primary"
                style={{ marginTop: 26 }}
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }} className="contact-form">

              {/* Name + Roll */}
              <div className="form-row-2">
                <div>
                  <label style={{ display: "block", marginBottom: 8, color: "#A5B4FC", fontWeight: 600, fontSize: 13 }}>
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="input-base"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: "14px 16px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: 8, color: "#A5B4FC", fontWeight: 600, fontSize: 13 }}>
                    Roll Number *
                  </label>
                  <input
                    name="roll"
                    value={form.roll}
                    onChange={handleChange}
                    placeholder="23891A0501"
                    className="input-base"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: "14px 16px",
                    }}
                  />
                </div>
              </div>

              {/* Email/Subject + Message */}
              <div className="form-row-split">
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, color: "#A5B4FC", fontWeight: 600, fontSize: 13 }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="student@example.com"
                      className="input-base"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                        padding: "14px 16px",
                        width: "100%",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: 8, color: "#A5B4FC", fontWeight: 600, fontSize: 13 }}>
                      Related Subject *
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="input-base"
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        color: "#EEF2FF",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                        padding: "14px 16px",
                        outline: "none",
                        appearance: "none",
                        WebkitAppearance: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="" style={{ background: "#0B1120", color: "#EEF2FF" }}>Select Subject</option>
                      <option value="Node.js" style={{ background: "#0B1120", color: "#EEF2FF" }}>Node.js</option>
                      <option value="DevOps" style={{ background: "#0B1120", color: "#EEF2FF" }}>DevOps</option>
                      <option value="Java" style={{ background: "#0B1120", color: "#EEF2FF" }}>Java</option>
                      <option value="C" style={{ background: "#0B1120", color: "#EEF2FF" }}>C Programming</option>
                      <option value="C++" style={{ background: "#0B1120", color: "#EEF2FF" }}>C++</option>
                      <option value="Scripting Languages" style={{ background: "#0B1120", color: "#EEF2FF" }}>Scripting Languages</option>
                      <option value="Flutter" style={{ background: "#0B1120", color: "#EEF2FF" }}>Flutter</option>
                      <option value="Python" style={{ background: "#0B1120", color: "#EEF2FF" }}>Python</option>
                      <option value="Machine Learning" style={{ background: "#0B1120", color: "#EEF2FF" }}>Machine Learning</option>
                      <option value="DBMS" style={{ background: "#0B1120", color: "#EEF2FF" }}>DBMS</option>
                      <option value="Data Analytics" style={{ background: "#0B1120", color: "#EEF2FF" }}>Data Analytics</option>
                      <option value="Data Structures" style={{ background: "#0B1120", color: "#EEF2FF" }}>Data Structures</option>
                      <option value="Web Technologies" style={{ background: "#0B1120", color: "#EEF2FF" }}>Web Technologies</option>
                      <option value="Full Stack" style={{ background: "#0B1120", color: "#EEF2FF" }}>Full Stack</option>
                      <option value="Technical Training" style={{ background: "#0B1120", color: "#EEF2FF" }}>Technical Training</option>
                      <option value="Computer Networks" style={{ background: "#0B1120", color: "#EEF2FF" }}>Computer Networks</option>
                      <option value="Operating System" style={{ background: "#0B1120", color: "#EEF2FF" }}>Operating System</option>
                      <option value="Other" style={{ background: "#0B1120", color: "#EEF2FF" }}>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: 8, color: "#A5B4FC", fontWeight: 600, fontSize: 13 }}>
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your doubt or request here..."
                    className="input-base contact-textarea"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: "14px 16px",
                      width: "100%",
                      height: "100%",
                      minHeight: 140,
                      resize: "none",
                      lineHeight: 1.7,
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 40px rgba(124,58,237,.45)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "sending"}
                style={{
                  marginTop: 12,
                  width: "100%",
                  padding: "15px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 18,
                  fontSize: "clamp(14px, 3.6vw, 16px)",
                  fontWeight: 700,
                  color: "#fff",
                  background: "linear-gradient(135deg,#7C3AED 0%,#4F46E5 45%,#06B6D4 100%)",
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </motion.button>

              {status === "error" && (
                <p style={{ color: "#F87171", fontSize: 13, textAlign: "center" }}>
                  Something went wrong. Please try again.
                </p>
              )}

            </form>
          )}
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(180px,100%),1fr))", gap: 14, marginTop: 22 }}
        >
          {[
            { icon: "📬", label: "Messages go directly", sub: "Visible in admin panel" },
            { icon: "⏱️", label: "Response in class", sub: "Or personal follow-up" },
          ].map((card, i) => (
            <div key={i} className="glass" style={{ padding: "18px", textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{card.icon}</div>
              <p style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 4 }}>{card.label}</p>
              <p style={{ fontSize: 12, color: "#6B7280" }}>{card.sub}</p>
            </div>
          ))}
        </motion.div>

      </div>

      <style jsx global>{`
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .form-row-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .form-row-split {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .contact-textarea {
            min-height: 120px !important;
          }
        }
      `}</style>
    </main>
  );
}