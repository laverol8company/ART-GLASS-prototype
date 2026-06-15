"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Cinematic section backdrop (§5, §10) — a graded thematic photo behind a
 * block's content. Strong legibility scrim keeps text ≥AA (§5.4/§11); a
 * top/bottom seam-fade blends every section into one continuous film so the
 * page never reads as separate stacked boxes. A slow ken-burns drift adds life
 * (transform-only, compositor-safe) and PAUSES off-screen for perf (§12) and
 * under prefers-reduced-motion.
 *
 * Sits at -z-10 inside an `isolate` section, so it stays behind the content
 * without touching the flow (no effect on snap heights). PLACEHOLDER imagery —
 * swap for the client's real graded photos.
 */
const SCRIMS = {
  // uniform, for centred content / bands
  full: "linear-gradient(0deg, rgba(11,12,14,0.9), rgba(11,12,14,0.82))",
  // heavier on the text side of editorial splits
  left: "linear-gradient(90deg, rgba(11,12,14,0.95) 28%, rgba(11,12,14,0.74) 66%, rgba(11,12,14,0.58))",
  right:
    "linear-gradient(270deg, rgba(11,12,14,0.95) 28%, rgba(11,12,14,0.74) 66%, rgba(11,12,14,0.58))",
} as const;

const SEAM =
  "linear-gradient(180deg, var(--color-bg), transparent 14%, transparent 85%, var(--color-bg))";

// a few drift paths so adjacent sections don't move in lock-step
const DRIFTS = [
  { scale: [1.06, 1.13], x: [0, -16], y: [0, 10] },
  { scale: [1.12, 1.05], x: [0, 14], y: [0, -8] },
  { scale: [1.05, 1.12], x: [0, 10], y: [0, 14] },
];

export function SectionBg({
  src,
  position = "center",
  scrim = "full",
  drift = 0,
}: {
  src: string;
  position?: string;
  scrim?: keyof typeof SCRIMS;
  drift?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "10% 0px" });
  const d = DRIFTS[drift % DRIFTS.length];
  const animate =
    reduce || !inView
      ? { scale: 1.08, x: 0, y: 0 }
      : { scale: d.scale, x: d.x, y: d.y };

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={animate}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="graded object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
      {/* legibility scrim */}
      <div className="absolute inset-0" style={{ background: SCRIMS[scrim] }} />
      {/* seam fade — section dissolves into the page top & bottom */}
      <div className="absolute inset-0" style={{ background: SEAM }} />
    </div>
  );
}
