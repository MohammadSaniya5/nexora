"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="footer-root"
      style={{
        marginTop: 100,
        borderTop: "1px solid rgba(255, 255, 255, 0.32)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",

      }}
    >
      <div
        className="footer-inner"
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          padding: "60px 24px 30px",
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: 40,
          }}
        >
          {/* Logo */}

          <div className="footer-col footer-col-logo">
            <h2
              className="footer-logo"
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
              className="footer-p"
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

          <div className="footer-col footer-col-links">
            <h3
              className="footer-h3"
              style={{
                marginBottom: 18,
                fontSize: 18,
              }}
            >
              Quick Links
            </h3>

            <div
              className="footer-links"
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

          <div className="footer-col footer-col-resources">
            <h3
              className="footer-h3"
              style={{
                marginBottom: 18,
                fontSize: 18,
              }}
            >
              Resources
            </h3>

            <div
              className="footer-tags"
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

          <div className="footer-col footer-col-faculty">
            <h3
              className="footer-h3"
              style={{
                marginBottom: 18,
                fontSize: 18,
              }}
            >
              Faculty
            </h3>

            <p
              className="footer-p"
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
              className="footer-cta-wrap"
              whileHover={{
                scale: 1.05,
              }}
              style={{
                marginTop: 18,
              }}
            >
              <Link
                href="/faculty"
                className="footer-cta"
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg,#7C3AED,#06B6D4)",
                  color: "#fff",
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                View Profile →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="footer-bottom"
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

      <style jsx>{`
        /* ════════════════════════════════════════
           TABLET / SMALL LAPTOP — below 900px
           (everything above 900px is untouched)
        ════════════════════════════════════════ */
        @media (max-width: 900px) {
          .footer-inner {
            padding: 48px 20px 26px !important;
          }

          .footer-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            grid-template-areas:
              "logo logo"
              "links resources"
              "faculty faculty" !important;
            gap: 32px !important;
          }

          .footer-col-logo { grid-area: logo !important; }
          .footer-col-links { grid-area: links !important; }
          .footer-col-resources { grid-area: resources !important; }
          .footer-col-faculty { grid-area: faculty !important; }
        }

        /* ════════════════════════════════════════
           MAIN MOBILE BREAKPOINT — below 768px
        ════════════════════════════════════════ */
        @media (max-width: 768px) {
          .footer-root {
            margin-top: 70px !important;
          }

          .footer-inner {
            padding: 40px 18px 24px !important;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-areas:
              "logo logo"
              "links resources"
              "faculty faculty" !important;
            gap: 28px 20px !important;
          }

          .footer-logo {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }

          .footer-p {
            font-size: 13px !important;
            line-height: 1.7 !important;
          }

          .footer-h3 {
            font-size: 16px !important;
            margin-bottom: 14px !important;
          }

          .footer-links,
          .footer-tags {
            gap: 10px !important;
            font-size: 14px !important;
          }

          .footer-cta {
            padding: 9px 16px !important;
            font-size: 14px !important;
          }

          .footer-bottom {
            margin-top: 36px !important;
            padding-top: 18px !important;
            font-size: 12px !important;
            text-align: center !important;
          }
        }

        /* ════════════════════════════════════════
           SMALL PHONES — below 480px
        ════════════════════════════════════════ */
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-areas:
              "logo logo"
              "links resources"
              "faculty faculty" !important;
            gap: 24px 16px !important;
          }

          .footer-col-logo,
          .footer-col-faculty {
            text-align: center !important;
          }

          .footer-links,
          .footer-tags {
            align-items: flex-start !important;
            font-size: 13px !important;
          }

          .footer-cta-wrap {
            display: flex !important;
            justify-content: center !important;
          }

          .footer-logo {
            font-size: 26px !important;
          }

          .footer-p br {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}