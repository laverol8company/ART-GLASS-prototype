import type { Transition, Variants } from "motion/react";

/**
 * Motion language (§4.5, §7) for `motion/react`. One easing vocabulary,
 * mirrored from the CSS custom properties in globals.css. Durations 0.4–0.9s.
 * Transform/opacity only — we never animate blur or backdrop-filter (§16).
 * Under prefers-reduced-motion these collapse to static via the CSS reset; for
 * JS-driven values prefer the `useReducedMotion()` hook at the call site.
 */

type Bezier = [number, number, number, number];

export const ease = {
  out: [0.22, 1, 0.36, 1] as Bezier, // section entrances
  inOut: [0.76, 0, 0.24, 1] as Bezier, // glass curtain
  glide: [0.4, 0, 0.2, 1] as Bezier, // highlights, sweep
};

export const duration = {
  fast: 0.4,
  base: 0.6,
  slow: 0.9,
};

/** Emphasis follow-through (§4.5). */
export const spring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
};

/** whileInView defaults — fire once, slightly before fully in view. */
export const viewportOnce = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -10% 0px",
} as const;

/* --- Variants -------------------------------------------------------------- */

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.base, ease: ease.out } },
};

/** Rise + focus — default entrance for most sections (§7). */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

/** Cascade — stagger children on entrance (§7). Pair with `cascadeChild`. */
export const cascade: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const cascadeChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

/** Glass curtain — signature transition between key blocks (§7). */
export const glassCurtain: Variants = {
  hidden: { y: 0 },
  show: { y: "-100%", transition: { duration: duration.slow, ease: ease.inOut } },
};
