"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";

/* Representative car-care brands (§6.8 trust). TODO: confirm which the studio
   actually uses before launch. */
const BRANDS = ["XPEL", "SunTek", "Gtechniq", "3M", "LLumar", "Ceramic Pro"];

/** Brand-logo marquee (living-details) — a slow, paused-off-screen trust strip.
 *  Decorative (no data-section), reduced-motion → static row. */
export function BrandsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section
      aria-label="Матеріали, з якими працюємо"
      className="relative overflow-hidden border-y border-line py-8"
    >
      <div className="container-page mb-5">
        <SectionLabel>Матеріали, яким довіряємо</SectionLabel>
      </div>
      <div
        ref={ref}
        className={reduce ? "overflow-x-auto px-6" : "overflow-hidden"}
      >
        <motion.div
          className="flex w-max items-center gap-12 px-6 sm:gap-16"
          animate={reduce || !inView ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-xl whitespace-nowrap text-muted-2 transition-colors hover:text-bone sm:text-2xl"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
