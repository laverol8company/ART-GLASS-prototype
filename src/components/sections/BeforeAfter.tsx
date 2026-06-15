"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowsLeftRight } from "@phosphor-icons/react";
import { GlassCurtain } from "@/components/ui/GlassCurtain";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BEFORE_AFTER } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Before / After (§6.4) — the interactive nail. Drag/keyboard reveal via a
 * transparent range input (free a11y); the clip-path & handle track a
 * useMotionValue (no per-frame React state, §6.4).
 */
export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const pair = BEFORE_AFTER[active];

  const progress = useMotionValue(0.5);
  const clip = useTransform(progress, (p) => `inset(0 ${(1 - p) * 100}% 0 0)`);
  const handleLeft = useTransform(progress, (p) => `${p * 100}%`);

  return (
    <section
      id="before-after"
      data-section="before-after"
      className="relative isolate flex min-h-screen flex-col justify-center py-12"
    >
      <SectionBg src="/media/glass-dusk.jpg" scrim="full" drift={2} />
      <div className="container-page flex flex-col gap-6">
        <Reveal className="flex flex-col gap-4">
          <SectionLabel>До / Після</SectionLabel>
          <h2 className="max-w-[20ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
            Перетягни — і побач різницю.
          </h2>
        </Reveal>

        {/* glass curtain lifts off the proof — frosted → clear (§7) */}
        <GlassCurtain className="rounded-[var(--radius-lg)]">
          <div className="ba-frame relative mx-auto aspect-[16/9] max-h-[52vh] w-full max-w-[1000px] select-none overflow-hidden rounded-[var(--radius-lg)] border border-line">
            {/* after — bottom layer */}
            <MediaPlaceholder
              src={pair.afterImg}
              alt={pair.after}
              className="absolute inset-0 size-full"
            />

            {/* before — top layer, clipped */}
            <motion.div style={{ clipPath: clip }} className="absolute inset-0">
              <MediaPlaceholder
                src={pair.beforeImg}
                alt={pair.before}
                haze={pair.beforeHaze}
                className="size-full"
              />
            </motion.div>

            {/* before / after tags */}
            <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-pill bg-bg/60 px-2.5 py-1 font-mono text-[10px] tracking-wide text-bone uppercase">
              До
            </span>
            <span className="pointer-events-none absolute top-3 right-3 z-10 rounded-pill bg-bg/60 px-2.5 py-1 font-mono text-[10px] tracking-wide text-bone uppercase">
              Після
            </span>

            {/* divider + glass handle */}
            <motion.div
              style={{ left: handleLeft }}
              className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-chrome/70"
            >
              <div className="liquid-glass absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-feature">
                <ArrowsLeftRight size={18} weight="light" />
              </div>
            </motion.div>

            {/* control: drag + click + keyboard + a11y */}
            <input
              key={pair.id}
              type="range"
              min={0}
              max={100}
              defaultValue={50}
              aria-label={`Порівняння до і після: ${pair.caption}`}
              onChange={(e) => progress.set(Number(e.target.value) / 100)}
              className="absolute inset-0 z-30 size-full cursor-ew-resize opacity-0"
            />
          </div>
        </GlassCurtain>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">{pair.caption}</p>
          <div className="flex flex-wrap gap-2">
            {BEFORE_AFTER.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActive(i);
                  progress.set(0.5);
                }}
                aria-pressed={i === active}
                className={cn(
                  "rounded-pill border px-3.5 py-1.5 text-xs transition-colors",
                  i === active
                    ? "border-chrome bg-surface text-bone"
                    : "border-line-2 text-muted hover:text-bone",
                )}
              >
                {p.tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
