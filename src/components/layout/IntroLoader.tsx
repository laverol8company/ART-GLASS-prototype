"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CONTACTS } from "@/lib/contacts";
import { ease } from "@/lib/motion-presets";

/**
 * Intro loader (§10 authorial signature) — a speedometer "accelerating" 0→100
 * while the page preloads, then a curtain lifts to reveal the site. Once per
 * session (sessionStorage); skipped under reduced motion. SVG transforms only.
 */

const START = -135; // needle angle at 0
const SWEEP = 270; // total degrees to 100
const R = 82;
const TICKS = Array.from({ length: 11 }, (_, i) => {
  const a = ((START + (i / 10) * SWEEP) * Math.PI) / 180;
  const major = i % 5 === 0;
  const r1 = major ? 64 : 70;
  return {
    x1: 100 + r1 * Math.sin(a),
    y1: 100 - r1 * Math.cos(a),
    x2: 100 + R * Math.sin(a),
    y2: 100 - R * Math.cos(a),
    major,
  };
});
// 270° arc track length on r=88
const C = 2 * Math.PI * 88;
const ARC = (SWEEP / 360) * C;

export function IntroLoader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    let raf = 0;
    let failsafe = 0;
    let liftTimer = 0;
    let cancelled = false;

    const dismiss = () => {
      if (cancelled) return;
      setShow(false);
      document.body.style.overflow = "";
    };

    // Already seen this session, or reduced motion → no intro. Driven by a
    // timeout (not a synchronous setState in the effect body), and NOT by rAF —
    // rAF can be fully paused in a background/throttled renderer.
    if (reduce || sessionStorage.getItem("ag-intro")) {
      failsafe = window.setTimeout(dismiss, 0);
      return () => {
        cancelled = true;
        window.clearTimeout(failsafe);
      };
    }

    sessionStorage.setItem("ag-intro", "1");
    document.body.style.overflow = "hidden";

    // Failsafe: the curtain ALWAYS lifts, even if rAF stalls — never trap page.
    failsafe = window.setTimeout(dismiss, 3600);

    const start = performance.now();
    const DUR = 2000;
    const tick = (t: number) => {
      if (cancelled) return;
      // ease-out so it "revs" fast then settles at 100
      const p = Math.min(1, (t - start) / DUR);
      setCount(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLifting(true);
        window.clearTimeout(failsafe);
        liftTimer = window.setTimeout(dismiss, 780);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.clearTimeout(liftTimer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  const needleAngle = START + (count / 100) * SWEEP;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ y: 0 }}
          animate={{ y: lifting ? "-100%" : 0 }}
          transition={{ duration: 0.78, ease: ease.inOut }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-10 bg-bg px-6"
        >
          <span className="absolute top-8 left-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted-2 uppercase sm:left-10">
            <span className="status-dot" />
            {CONTACTS.brand} · {CONTACTS.city}
          </span>

          <div className="relative">
            <svg
              viewBox="0 0 200 200"
              className="w-[min(64vw,300px)]"
              fill="none"
            >
              {/* track */}
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="var(--color-line-2)"
                strokeWidth="2"
                strokeDasharray={`${ARC} ${C}`}
                strokeLinecap="round"
                transform="rotate(135 100 100)"
              />
              {/* progress */}
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="var(--color-feature)"
                strokeWidth="3"
                strokeDasharray={`${(count / 100) * ARC} ${C}`}
                strokeLinecap="round"
                transform="rotate(135 100 100)"
              />
              {/* ticks */}
              {TICKS.map((t, i) => (
                <line
                  key={i}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke={t.major ? "var(--color-chrome)" : "var(--color-chrome-2)"}
                  strokeWidth={t.major ? 1.6 : 1}
                  strokeLinecap="round"
                  opacity={t.major ? 0.9 : 0.5}
                />
              ))}
              {/* needle */}
              <line
                x1="100"
                y1="106"
                x2="100"
                y2="40"
                stroke="var(--color-feature)"
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${needleAngle} 100 100)`}
              />
              <circle cx="100" cy="100" r="5" fill="var(--color-bone)" />
            </svg>

            {/* readout */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-10">
              <span className="font-display text-5xl leading-none font-medium text-bone tabular-nums sm:text-6xl">
                {String(count).padStart(3, "0")}
              </span>
              <span className="mt-1 font-mono text-[11px] tracking-[0.2em] text-muted-2 uppercase">
                км / год
              </span>
            </div>
          </div>

          <span className="font-display text-xl font-semibold tracking-[-0.02em] text-bone">
            Прототип
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
