"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ───────────────── STAR CANVAS ───────────────── */
function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    const COLORS = ["#A78BFA", "#06B6D4", "#10B981", "#ffffff", "#EC4899"];

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.12 + 0.02,
      twinkle: Math.random() * 0.02 + 0.005,
      offset: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      stars.forEach((s) => {
        const alpha =
          0.3 + 0.7 * Math.abs(Math.sin(t * 60 * s.twinkle + s.offset));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.floor(alpha * 255).toString(16);
        ctx.fill();

        s.y -= s.speed;
        if (s.y < -2) {
          s.y = H + 2;
          s.x = Math.random() * W;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
}

/* ───────────────── MOUSE ORB ───────────────── */
function MouseOrb() {
  const orbRef = useRef<HTMLDivElement | null>(null);
  let raf: number;

  const onMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      if (!orbRef.current) return;
      orbRef.current.style.left = `${e.clientX}px`;
      orbRef.current.style.top = `${e.clientY}px`;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <div
      ref={orbRef}
      style={{
        position: "fixed",
        zIndex: 0,
        width: 500,
        height: 500,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(124,58,237,0.08), transparent 60%)",
        transform: "translate(-50%, -50%)",
        filter: "blur(30px)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ───────────────── GRID ───────────────── */
function Grid() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(120,100,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(120,100,255,0.02) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
      }}
    />
  );
}

/* ───────────────── SCAN LINE (VERY LIGHT) ───────────────── */
function ScanLine() {
  return (
    <motion.div
      animate={{ y: ["-10%", "110%"] }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        height: 2,
        zIndex: 0,
        background:
          "linear-gradient(90deg,transparent,rgba(124,58,237,0.25),rgba(6,182,212,0.25),transparent)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ───────────────── AURORA ORBS (FIXED) ───────────────── */
function AuroraOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          top: -200,
          left: -200,
          background: "radial-gradient(circle,#7C3AED55,transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          bottom: -150,
          right: -150,
          background: "radial-gradient(circle,#06B6D455,transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          top: "40%",
          left: "40%",
          background: "radial-gradient(circle,#10B98133,transparent 70%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}

/* ───────────────── NOISE ───────────────── */
function Noise() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.25,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/* ───────────────── MAIN EXPORT ───────────────── */
export default function AuroraBg() {
  return (
    <>
      <AuroraOrbs />
      <Grid />
      <StarCanvas />
      <MouseOrb />
      <ScanLine />
      <Noise />
    </>
  );
}