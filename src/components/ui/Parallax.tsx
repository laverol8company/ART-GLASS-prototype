"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll-parallax frame (premium-motion depth). The child (an image) drifts
 * within a fixed, overflow-clipped frame as the section scrolls — subtle depth,
 * transform-only. Off under reduced motion. Give the frame its size via
 * className; the child fills it.
 */
export function Parallax({
  children,
  className,
  amount = 8,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`-${amount}%`, `${amount}%`],
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        style={{ y }}
        className="h-[calc(100%+var(--p,16%))] w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
