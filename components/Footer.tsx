"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: 100,
        borderTop: "1px solid rgba(255, 255, 255, 0.32)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
        
      }}
    >
      <div
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          padding: "60px 24px 30px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: 40,
          }}
        >
          {/* Logo */}

          <div>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 700,
                background:
                  "linear-gradient(135deg,#7C3AED,#06B6D4,#10B981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 14,
              }}
            >
              Nexora
            </h2>

            <p
              style={{
                color: "#9CA3AF",
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              Next Generation • Aurora • Knowledge

              <br />
              One platform for seamless access to academic
              resources, notes, presentations, lab manuals,
              and study materials.
            </p>
          </div>

          {/* Navigation */}

          <div>
            <h3
              style={{
                marginBottom: 18,
                fontSize: 18,
              }}
            >
              Quick Links
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <Link href="/">Home</Link>

              <Link href="/resources">Resources</Link>

              <Link href="/faculty">Faculty</Link>

              <Link href="/about">About</Link>
            </div>
          </div>

          {/* Categories */}

          <div>
            <h3
              style={{
                marginBottom: 18,
                fontSize: 18,
              }}
            >
              Resources
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                color: "#9CA3AF",
              }}
            >
              <span>📊 PPTs</span>

              <span>📝 Notes</span>

              <span>❓ Question Banks</span>

              <span>📁 Materials</span>

              <span>🧪 Lab Manuals</span>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3
              style={{
                marginBottom: 18,
                fontSize: 18,
              }}
            >
              Faculty
            </h3>

            <p
              style={{
                color: "#9CA3AF",
                lineHeight: 1.8,
              }}
            >
              Mr. V S S P L N Balaji Lanka

              <br />

              Assistant Professor

              <br />

              Department of CSE
            </p>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              style={{
                marginTop: 18,
              }}
            >
              <Link
                href="/faculty"
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg,#7C3AED,#06B6D4)",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                View Profile →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}

        <div
          style={{
            marginTop: 50,
            paddingTop: 25,
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 15,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          <span>
            © {year} Nexora. All Rights Reserved.
          </span>

          
        </div>
      </div>
    </footer>
  );
}