"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion-presets";

/**
 * Brand motif (§6.1, §10): a sleek wedge-car silhouette that "draws itself".
 * Abstract by design — used as a faint hero backdrop and as a divider accent.
 * PLACEHOLDER — refine the path against the real logo line-art.
 */
export function CarLine({
  className,
  draw = true,
}: {
  className?: string;
  draw?: boolean;
}) {
  const drawAnim = (delay: number) => ({
    initial: draw ? { pathLength: 0, opacity: 0 } : false,
    animate: draw ? { pathLength: 1, opacity: 1 } : undefined,
    transition: { duration: 1.6, ease: ease.out, delay },
  });

  return (
    <svg viewBox="0 0 400 150" fill="none" aria-hidden className={cn(className)}>
      {/* body silhouette */}
      <motion.path
        d="M24 112 C40 80 82 71 122 67 L154 45 C172 33 230 33 248 45 L280 67 C330 69 364 81 378 112"
        stroke="var(--color-chrome)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...drawAnim(0.1)}
      />
      {/* under-body lines */}
      <motion.path
        d="M60 112 L150 112 M256 112 L342 112"
        stroke="var(--color-chrome-2)"
        strokeWidth="1.2"
        strokeLinecap="round"
        {...drawAnim(0.7)}
      />
      {/* wheels */}
      {[114, 286].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="114"
          r="20"
          stroke="var(--color-chrome-2)"
          strokeWidth="1.2"
          {...drawAnim(0.95 + i * 0.12)}
        />
      ))}
    </svg>
  );
}
