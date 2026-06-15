"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease, viewportOnce } from "@/lib/motion-presets";

/** Rise + focus on scroll — default section entrance (§7). Transform/opacity only. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: duration.slow, ease: ease.out, delay },
      }}
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}
