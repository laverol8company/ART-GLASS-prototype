"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { SealCheck, Star } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { REVIEWS, REVIEW_RATING } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Reviews (§6.9) — Google rating + count, marquee of UA reviews (master named).
 *  Reduced motion → static scrollable row. Rating not a perfect 5.0 (§16). */
export function Reviews() {
  const reduce = useReducedMotion();
  const marqueeRef = useRef<HTMLDivElement>(null);
  // pause the marquee off-screen — no idle GPU work (§12)
  const inView = useInView(marqueeRef);
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section
      id="reviews"
      data-section="reviews"
      className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden py-12"
    >
      <SectionBg src="/media/bg-reviews.jpg" scrim="full" drift={0} />
      <div className="container-page">
        <Reveal className="mb-12 flex flex-col gap-5">
          <SectionLabel>Відгуки</SectionLabel>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <Star size={22} weight="fill" className="text-rating" />
              <span className="font-display text-3xl font-medium text-bone tabular-nums">
                {REVIEW_RATING.score}
              </span>
            </span>
            <span className="text-muted">{REVIEW_RATING.count} відгуків</span>
            <Badge variant="info">Google</Badge>
            <Badge variant="feature">
              <SealCheck size={11} weight="fill" /> Перевірені
            </Badge>
          </div>
        </Reveal>
      </div>

      <div
        ref={marqueeRef}
        className={cn(
          "relative",
          reduce ? "overflow-x-auto px-6" : "overflow-hidden",
        )}
      >
        <motion.div
          className="flex w-max gap-4 px-6"
          animate={reduce || !inView ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((review, i) => (
            <figure
              key={`${review.id}-${i}`}
              className="flex w-[300px] shrink-0 flex-col gap-4 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:w-[360px]"
            >
              <div className="flex gap-1 text-rating">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} weight="fill" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-muted">
                «{review.text}»
              </blockquote>
              <figcaption className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
                <span className="text-sm text-bone">{review.name}</span>
                <span className="font-mono text-[11px] tracking-wide text-muted-2 uppercase">
                  {review.service}
                </span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
