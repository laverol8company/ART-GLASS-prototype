"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { ease } from "@/lib/motion-presets";

/* Recent-activity toast (living-details). PLACEHOLDER demo data — honest,
   plausible, never fake urgency. TODO: feed from real bookings. */
const ACTIVITY = [
  "Запис на ремонт скола · щойно",
  "Полірування фар · 2 год тому",
  "Запис на полірування скла · сьогодні",
  "Захисна плівка на фари · вчора",
];

/** One small toast slides in bottom-left every ~14s, holds ~5s. Dismissible;
 *  never covers the bottom-right CTA. Off under reduced motion. */
export function ActivityToast() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(-1);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (reduce || dismissed) return;
    let i = 0;
    let showTimer = 0;
    let hideTimer = 0;

    const cycle = () => {
      setIdx(i % ACTIVITY.length);
      hideTimer = window.setTimeout(() => {
        setIdx(-1);
        i += 1;
        showTimer = window.setTimeout(cycle, 9000);
      }, 5000);
    };
    showTimer = window.setTimeout(cycle, 4500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [reduce, dismissed]);

  return (
    <AnimatePresence>
      {idx >= 0 && !dismissed && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.4, ease: ease.out }}
          className="fixed bottom-4 left-4 z-40 hidden items-center gap-3 rounded-pill border border-line-2 bg-surface/95 py-2.5 pr-3 pl-4 shadow-[var(--shadow-2)] backdrop-blur-sm sm:flex"
        >
          <span className="status-dot dot-feature" aria-hidden />
          <span className="text-xs text-muted">{ACTIVITY[idx]}</span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Сховати"
            className="grid size-6 place-items-center rounded-full text-muted-2 transition-colors hover:text-bone"
          >
            <X size={13} weight="bold" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
