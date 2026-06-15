"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

/**
 * «Скляна завіса» (§7) — a frosted panel lifts to reveal the content when it
 * enters the viewport. Solid frosted look (animating a real backdrop-filter
 * surface would re-filter every frame, §5.4) — pure translateY on the
 * compositor. Skipped entirely under reduced motion.
 */
export function GlassCurtain({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,28,32,0.94), rgba(19,20,23,0.97))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
          initial={{ y: 0 }}
          whileInView={{ y: "-101%" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: ease.inOut }}
        >
          {/* glass bottom edge */}
          <span className="absolute inset-x-0 bottom-0 h-px bg-white/25" />
        </motion.div>
      )}
    </div>
  );
}
