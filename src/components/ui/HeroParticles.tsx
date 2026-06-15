import type { CSSProperties } from "react";

/**
 * Faint drifting light motes (living-details ambient) — pure CSS, off under
 * reduced motion (globals). Fixed positions for SSR consistency.
 */
// Kept lean (6) — fewer infinitely-animating elements in the heaviest viewport.
const MOTES = [
  { left: "12%", bottom: "20%", size: 3, dur: "9s", delay: "0s", op: 0.5 },
  { left: "34%", bottom: "12%", size: 4, dur: "8s", delay: "0.8s", op: 0.45 },
  { left: "52%", bottom: "40%", size: 2, dur: "12s", delay: "2.2s", op: 0.35 },
  { left: "67%", bottom: "22%", size: 3, dur: "10s", delay: "0.4s", op: 0.5 },
  { left: "82%", bottom: "44%", size: 2, dur: "11.5s", delay: "1.1s", op: 0.4 },
  { left: "44%", bottom: "66%", size: 2, dur: "13s", delay: "1.6s", op: 0.32 },
];

export function HeroParticles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={
            {
              left: m.left,
              bottom: m.bottom,
              width: m.size,
              height: m.size,
              "--mote-dur": m.dur,
              "--mote-delay": m.delay,
              "--mote-op": m.op,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
