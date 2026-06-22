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
const items = [
  {
    id: "publications",
    title: "📖 Publications",
    description:
      "View all journal publications, conference papers, and academic contributions authored by Mr. V S S P L N Balaji Lanka.",
    link: "https://www.researchgate.net/scientific-contributions/V-S-S-P-L-N-Balaji-Lanka-2280687410",
  },
  {
    id: "scholar",
    title: "🎓 Google Scholar",
    description:
      "Explore citations, h-index, i10-index, and research metrics on Google Scholar.",
    link: "https://scholar.google.com/citations?user=a02aCJwAAAAJ&hl=en",
  },
  {
    id: "research",
    title: "🧪 Research Projects",
    description:
      "Discover ongoing and completed research projects, innovations, and collaborations.",
    link: "https://ijisae.org/index.php/IJISAE/article/view/5713",
  },
  {
    id: "papers",
    title: "📄 Technical Papers",
    description:
      "Browse technical papers and conference presentations published over the years.",
    link: "https://icdlair2023.iaasse.org/Session3.pdf",
  },
  {
    id: "awards",
    title: "🏆 Achievements & Awards",
    description:
      "Academic achievements, recognitions, certifications, and professional milestones.",
    link: "https://pencilbitz.com/assets/img/event-certificate/vignan_Certificates.pdf",
  },

  {
    id: "researchgate",
    title: "🌐 ResearchGate",
    description:
      "ResearchGate profile containing publications, citations, and collaborations.",
    link: "https://www.researchgate.net/scientific-contributions/Mr-Vsspln-Balaji-Lanka-2351395103",
  },
];

// Extra publication links that don't fit into a single card above
const morePublications = [
  {
    title: "Secure Pay: Blockchain Based UPI Payment System",
    link: "https://www.ijraset.com/research-paper/secure-pay-blockchain-based-upi-payment-system",
  },
  {
    title:
      "Fundamentals of AI & Machine Learning: Specific Examples & Application in Agriculture",
    link: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003485179-10/fundamentals-ai-machine-learning-specific-examples-application-agriculture-manoj-kumar-mahto-laxmikanth-balaji-lanka",
  },
  {
    title: "Enhanced Security and Robustness of Data Using Steganography",
    link: "https://www.springerprofessional.de/en/enhanced-security-and-robustness-of-data-using-steganography/50591390",
  },
];

export default function FacultyPage() {
  return (
    <main
      className="faculty-main"
      style={{
        minHeight: "100vh",
        padding: "120px 24px 80px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: "center",
          marginBottom: 70,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: 999,
            border: "1px solid rgba(124,58,237,.3)",
            background: "rgba(124,58,237,.08)",
            color: "#A78BFA",
            fontSize: 12,
            letterSpacing: "0.12em",
            marginBottom: 20,
          }}
        >
          FACULTY PROFILE
        </div>

        <h1
          className="faculty-h1"
          style={{
            fontSize: "clamp(40px,7vw,70px)",
            fontWeight: 700,
            marginBottom: 18,
            background: "linear-gradient(135deg,#7C3AED,#06B6D4,#10B981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Mr. V S S P L N Balaji Lanka
        </h1>

        <p
          className="faculty-p"
          style={{
            maxWidth: 700,
            margin: "0 auto",
            color: "#9CA3AF",
            lineHeight: 1.8,
            fontSize: 16,
          }}
        >
          Explore publications, research contributions, technical papers,
          academic achievements, and professional profiles from one place.
        </p>
      </motion.div>
      {/* Hero Card */}

      <motion.div
        className="hero-card"
        style={{
          background: "rgba(15,20,40,.65)",
          border: "1px solid rgba(124,58,237,.18)",
          borderRadius: 24,
          backdropFilter: "blur(20px)",
          padding: 36,
          marginBottom: 32,
          display: "flex",
          gap: 28,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          className="hero-avatar"
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7C3AED,#06B6D4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 44,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          B
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="faculty-p" style={{ color: "#06B6D4" }}>
            Assistant Professor • Department of CSE
          </p>
          <p className="faculty-p" style={{ color: "#9CA3AF", marginTop: 4 }}>
            M.Tech • 5+ Years Experience
          </p>
        </div>
      </motion.div>

      {/* Biography */}

      <motion.div
        className="glass"
        style={{
          padding: 32,
          marginBottom: 32,
        }}
      >
        <h3
          className="faculty-h3"
          style={{
            color: "#A78BFA",
            marginBottom: 18,
            fontSize: 24,
          }}
        >
          Biography
        </h3>

        <p
          className="faculty-p"
          style={{
            color: "#9CA3AF",
            lineHeight: 1.9,
          }}
        >
          Mr. V S S P L N Balaji Lanka serves as an Assistant Professor in the
          Department of Computer Science and Engineering with expertise in
          Full Stack Development, Programming Languages, DevOps, Machine
          Learning, Data Analytics, and Technical Training.
        </p>
      </motion.div>

      {/* Areas of Expertise */}

      <motion.div
        className="glass"
        style={{
          padding: 32,
          marginBottom: 32,
        }}
      >
        <h3
          className="faculty-h3"
          style={{
            color: "#10B981",
            marginBottom: 24,
            fontSize: 24,
          }}
        >
          Areas of Expertise
        </h3>

        <div
          className="subjects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 12,
            marginTop: 24,
          }}
        >
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              className="subject-pill"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: `0 0 18px ${subject.color}55`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                background: `${subject.color}18`,
                border: `1px solid ${subject.color}55`,
                color: subject.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: 1.3,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {subject.name}
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Research Metrics */}

      <motion.div
        className="glass"
        style={{
          padding: 32,
          marginBottom: 40,
        }}
      >
        <h3
          className="faculty-h3"
          style={{
            color: "#F59E0B",
            marginBottom: 24,
            fontSize: 24,
          }}
        >
          Research Metrics
        </h3>

        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 20,
          }}
        >
          {[
            ["25+", "Publications"],
            ["30+", "Projects Guided"],
            ["10+", "Awards"],
            ["3", "Patents filled"],
            ["1", "Patents Granted"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="stat-box"
              style={{
                textAlign: "center",
                padding: 20,
                borderRadius: 14,
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              <div
                className="stat-value"
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#A78BFA",
                }}
              >
                {value}
              </div>

              <div
                className="faculty-p"
                style={{
                  color: "#9CA3AF",
                  marginTop: 6,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cards */}

      <div
        className="cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: 24,
        }}
      >
        {items.map((item, index) => (
          <motion.a
            key={item.id}
            id={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="research-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
              duration: 0.6,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            style={{
              textDecoration: "none",

              background: "rgba(15,20,40,.65)",

              border: "1px solid rgba(124,58,237,.18)",

              backdropFilter: "blur(20px)",

              borderRadius: 20,

              padding: 28,

              color: "white",

              transition: "0.3s",

              position: "relative",

              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{
                x: ["-100%", "120%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "50%",
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)",
              }}
            />

            <h2
              className="card-title"
              style={{
                fontSize: 24,
                marginBottom: 14,
                position: "relative",
                zIndex: 2,
              }}
            >
              {item.title}
            </h2>

            <p
              className="faculty-p"
              style={{
                color: "#9CA3AF",
                lineHeight: 1.7,
                fontSize: 14,
                marginBottom: 22,
                position: "relative",
                zIndex: 2,
              }}
            >
              {item.description}
            </p>

            <div
              style={{
                color: "#06B6D4",
                fontWeight: 600,
                position: "relative",
                zIndex: 2,
              }}
            >
              Open →
            </div>
          </motion.a>
        ))}
      </div>

      {/* More Publications (links not tied to a single card above) */}

      <motion.div
        className="glass"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          padding: 32,
          marginTop: 32,
        }}
      >
        <h3
          className="faculty-h3"
          style={{
            color: "#EC4899",
            marginBottom: 24,
            fontSize: 24,
          }}
        >
          More Publications
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {morePublications.map((pub, index) => (
            <a
              key={index}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="publication-link"
              style={{
                textDecoration: "none",
                color: "white",
                padding: "16px 20px",
                borderRadius: 14,
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                className="publication-title"
                style={{ fontWeight: 600, fontSize: 15, minWidth: 0 }}
              >
                {pub.title}
              </div>
              <div style={{ color: "#06B6D4", fontWeight: 600, flexShrink: 0 }}>
                View →
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        /* ════════════════════════════════════════
           TABLET / SMALL LAPTOP — below 900px
           (everything above 900px is untouched)
        ════════════════════════════════════════ */
        @media (max-width: 900px) {
          .faculty-main {
            padding: 100px 20px 60px !important;
          }

          .cards-grid {
            grid-template-columns: repeat(
              auto-fit,
              minmax(260px, 1fr)
            ) !important;
            gap: 18px !important;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
        }

        /* ════════════════════════════════════════
           MAIN MOBILE BREAKPOINT — below 768px
        ════════════════════════════════════════ */
        @media (max-width: 768px) {
          .faculty-main {
            padding: 90px 16px 50px !important;
          }

          .faculty-h1 {
            font-size: 34px !important;
            line-height: 1.15 !important;
          }

          .faculty-p {
            font-size: 14px !important;
          }

          .faculty-h3 {
            font-size: 20px !important;
            margin-bottom: 18px !important;
          }

          .card-title {
            font-size: 20px !important;
          }

          /* Hero Card → stack + center on mobile */
          .hero-card {
            flex-direction: column !important;
            text-align: center !important;
            padding: 24px !important;
            gap: 16px !important;
          }

          .hero-avatar {
            width: 84px !important;
            height: 84px !important;
            font-size: 34px !important;
          }

          /* Glass sections — tighter padding */
          .glass {
            padding: 20px !important;
          }

          /* Subjects — clean 2-column grid, no more ragged wrap */
          .subjects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            margin-top: 16px !important;
          }
          .subject-pill {
            padding: 10px 12px !important;
            font-size: 13px !important;
          }

          /* Stats — 2 columns on mobile, never overflow */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .stat-box {
            padding: 16px !important;
          }
          .stat-value {
            font-size: 28px !important;
          }

          /* Research cards — single column */
          .cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .research-card {
            padding: 22px !important;
          }

          /* Publication links — stack title and "View" link */
          .publication-link {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            padding: 14px 16px !important;
          }
          .publication-title {
            font-size: 14px !important;
          }
        }

        /* ════════════════════════════════════════
           SMALL PHONES — below 480px
        ════════════════════════════════════════ */
        @media (max-width: 480px) {
          .faculty-h1 {
            font-size: 26px !important;
          }

          .faculty-h3 {
            font-size: 18px !important;
          }

          .card-title {
            font-size: 18px !important;
          }

          .glass {
            padding: 16px !important;
          }

          /* On very small phones, stats become single column
             so numbers never feel cramped */
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
          .stat-value {
            font-size: 24px !important;
          }

          .cards-grid {
            gap: 14px !important;
          }

          .subject-pill {
            padding: 7px 12px !important;
            font-size: 12px !important;
          }

          .hero-avatar {
            width: 72px !important;
            height: 72px !important;
            font-size: 28px !important;
          }
        }
      `}</style>
    </main>
  );
}