"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const FINE = "(pointer: fine) and (hover: hover)";
const CALM = "(prefers-reduced-motion: reduce)";

function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

type Particle = { id: number; x: number; y: number; dx: number; dy: number; color: string; r: number; round: boolean; size: number };
const COLORS = ["var(--pink)", "var(--yellow)", "var(--blue)", "var(--mint)", "var(--orange)", "var(--violet)"];
let uid = 0;

type Mode = "idle" | "link" | "text";

// Reactive cursor ring (fine pointers only) plus the confetti layer used by clicks.
export function Cursor() {
  const fine = useMedia(FINE);
  const calm = useMedia(CALM);
  const active = fine && !calm;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 520, damping: 30, mass: 0.5 });
  const [mode, setMode] = useState<Mode>("idle");
  const [down, setDown] = useState(false);
  const [seen, setSeen] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const spawn = (px: number, py: number, count: number) => {
      const made: Particle[] = Array.from({ length: count }, () => {
        const a = Math.random() * Math.PI * 2;
        const dist = (count > 10 ? 70 : 36) + Math.random() * (count > 10 ? 110 : 50);
        return {
          id: uid++,
          x: px,
          y: py,
          dx: Math.cos(a) * dist,
          dy: Math.sin(a) * dist,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          r: (Math.random() - 0.5) * 540,
          round: Math.random() > 0.5,
          size: 7 + Math.random() * 6,
        };
      });
      setParticles((p) => [...p, ...made]);
      window.setTimeout(() => {
        const gone = new Set(made.map((m) => m.id));
        setParticles((p) => p.filter((q) => !gone.has(q.id)));
      }, 1100);
    };

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setSeen(true);
      const t = e.target as Element | null;
      if (t?.closest?.("input,textarea,select")) setMode("text");
      else if (t?.closest?.("a,button,summary,label,[role=button],[data-cursor=link]")) setMode("link");
      else setMode("idle");
    };
    const onDown = (e: PointerEvent) => {
      setDown(true);
      spawn(e.clientX, e.clientY, 7);
    };
    const onUp = () => setDown(false);
    const onLeave = () => setSeen(false);
    const onBurst = (e: Event) => {
      const d = (e as CustomEvent<{ x: number; y: number; count: number }>).detail;
      spawn(d.x, d.y, d.count);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("playful:burst", onBurst);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("playful:burst", onBurst);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <motion.div style={{ x: sx, y: sy }} className="absolute top-0 left-0">
        <motion.div
          className="-mt-4 -ml-4 size-8 rounded-full border-[2.5px]"
          style={{ borderColor: "var(--line)" }}
          animate={{
            opacity: seen ? 1 : 0,
            scale: down ? 0.6 : mode === "link" ? 1.9 : mode === "text" ? 0.5 : 1,
            backgroundColor: mode === "link" ? "rgba(255, 92, 154, 0.45)" : "rgba(255, 212, 59, 0)",
          }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
        />
      </motion.div>

      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute block border-2"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: p.color,
              borderColor: "var(--ink)",
              borderRadius: p.round ? "999px" : "2px",
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: p.dx,
              y: [0, p.dy, p.dy + 90],
              scale: [0, 1.2, 0.8],
              opacity: [1, 1, 0],
              rotate: p.r,
            }}
            transition={{ duration: 1, ease: "easeOut", times: [0, 0.45, 1] }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
