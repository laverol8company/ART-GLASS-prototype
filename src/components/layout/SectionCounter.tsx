"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ease } from "@/lib/motion-presets";

const pad = (n: number) => String(n).padStart(2, "0");

/** Side section counter (§6) — a scroll-progress RING around the current number,
 *  with a soft turquoise pulse each time you cross into a new section (a small
 *  "milestone" reward). Desktop only; pulse off under reduced motion. */
export function SectionCounter() {
  const { index, total } = useActiveSection();
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  if (total === 0) return null;

  return (
    <div
      aria-hidden
      className="fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 flex-col items-center gap-1.5 lg:flex"
    >
      <div className="relative grid size-12 place-items-center">
        {/* milestone pulse — remounts on section change, so it replays */}
        {!reduce && (
          <motion.span
            key={index}
            className="absolute inset-0 rounded-full border border-feature"
            initial={{ scale: 0.7, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.9, ease: ease.out }}
          />
        )}
        <svg viewBox="0 0 48 48" className="size-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="2"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--color-feature)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
        <span className="absolute font-mono text-xs tabular-nums text-bone">
          {pad(index + 1)}
        </span>
      </div>
      <span className="font-mono text-[10px] tabular-nums text-muted-2">
        {pad(total)}
      </span>
    </div>
  );
}
