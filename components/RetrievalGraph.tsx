"use client";

import { motion } from "motion/react";

const NODES: [number, number][] = [
  [30, 110], [90, 60], [150, 120], [210, 50], [260, 100], [320, 40], [190, 150], [100, 160],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [4, 5], [2, 6], [6, 4], [0, 7], [7, 2],
];

// Decorative retrieval graph: nodes pulse, edges draw in. No copy, hidden from assistive tech.
export function RetrievalGraph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 190" fill="none" aria-hidden="true" className={className}>
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={NODES[a][0]}
          y1={NODES[a][1]}
          x2={NODES[b][0]}
          y2={NODES[b][1]}
          stroke="var(--a2)"
          strokeOpacity={0.55}
          strokeWidth={1.2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease: "easeOut" }}
        />
      ))}
      {NODES.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={i === 3 ? 7 : 4.5}
          fill={i === 3 ? "var(--a1)" : "var(--a3)"}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.55, 1, 0.55], scale: 1 }}
          transition={{
            scale: { duration: 0.5, delay: 0.5 + i * 0.08 },
            opacity: { duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 },
          }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}
