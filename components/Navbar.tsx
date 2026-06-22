"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Logo from "@/components/Logo";
const links = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/faculty", label: "Faculty" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function MagLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{
        x: sx,
        y: sy,
        display: "block",
        padding: "10px 22px",
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 500,
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",

        color: active ? "#A78BFA" : "#6B7280",
        background: active ? "rgba(124,58,237,0.1)" : "transparent",
        border: active
          ? "1px solid rgba(124,58,237,0.28)"
          : "1px solid transparent",
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();

        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {/* hover glow */}
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,transparent,rgba(167,139,250,0.08),transparent)",
        }}
        whileHover={{ x: ["-100%", "100%"] }}
        transition={{ duration: 0.5 }}
      />

      {label}

      {/* ACTIVE INDICATOR (CENTERED PROPERLY) */}
      {active && (
        <motion.span
          layoutId="nav-indicator"
          style={{
            position: "absolute",
            bottom: 5,
            left: 12,
            right: 12,
            height: 2,
            borderRadius: 999,
            background: "linear-gradient(90deg,#7C3AED,#06B6D4)",
          }}
        />
      )}
    </motion.a>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );

    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          padding: "0 16px",
          height: 72,

          background: scrolled
            ? "rgba(2,3,10,0.88)"
            : "rgba(2,3,10,0.4)",

          backdropFilter: "blur(24px)",
          borderBottom: scrolled
            ? "1px solid rgba(120,100,255,0.12)"
            : "1px solid transparent",
        }}
      >
        {/* LOGO */}
        <div style={{}}>
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <Logo size="md" />
          </Link>
        </div>

        {/* LINKS */}
        <div
          className="nav-desktop"
          style={{
            display: "flex",
            gap: 22,
            alignItems: "center",
          }}
        >
          {links.map((l) => (
            <MagLink
              key={l.href}
              href={l.href}
              label={l.label}
              active={pathname === l.href}
            />
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div
          className="nav-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#96a3be" }}>
            {time}
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 100,
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10B981",
              }}
            />
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "#10B981" }}>
              LIVE
            </span>
          </div>

          <Link
            href="/resources"
            style={{
              padding: "10px 18px",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg,#7C3AED,#06B6D4)",
              boxShadow: "0 0 20px rgba(124,58,237,0.35)",
              textDecoration: "none",
            }}
          >
            Resources →
          </Link>
        </div>

        {/* MOBILE */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: 8,
            fontSize: 24,
            display: "none",
          }}
        >
          ☰
        </button>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "fixed",
              top: 80,
              left: 12,
              right: 12,
              background: "rgba(10,10,20,0.97)",
              border: "1px solid rgba(120,100,255,0.15)",
              borderRadius: 14,
              padding: 14,
              zIndex: 400,
              backdropFilter: "blur(20px)",
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: 12,
                  color: pathname === l.href ? "#A78BFA" : "#aaa",
                }}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
  .nav-desktop {
    display: flex;
  }

  .nav-mobile-toggle {
    display: none;
  }

  @media (max-width: 768px) {
    .nav-desktop {
      display: none !important;
    }

    .nav-mobile-toggle {
      display: block !important;
    }

    nav {
      padding: 0 16px !important;
      height: 64px !important;
    }
  }
`}</style>
    </>
  );
}