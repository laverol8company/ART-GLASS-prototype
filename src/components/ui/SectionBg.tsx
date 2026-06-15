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

// a few drift paths so adjacent sections don't move in lock-step.
// Low amplitude keeps the layer small (cheaper compositing).
const DRIFTS = [
  { scale: [1.04, 1.09], x: [0, -12], y: [0, 8] },
  { scale: [1.08, 1.04], x: [0, 10], y: [0, -6] },
  { scale: [1.04, 1.09], x: [0, 8], y: [0, 10] },
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
  // negative margin → only the genuinely on-screen backdrop drifts (never 2 at once)
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const moving = !reduce && inView;
  const d = DRIFTS[drift % DRIFTS.length];
  const animate = moving
    ? { scale: d.scale, x: d.x, y: d.y }
    : { scale: 1.06, x: 0, y: 0 };

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
        // transform-only layer (no filter here) stays on the fast GPU path;
        // release the compositor layer when idle/off-screen
        style={{ willChange: moving ? "transform" : "auto" }}
      >
        <Image
          src={src}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
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
