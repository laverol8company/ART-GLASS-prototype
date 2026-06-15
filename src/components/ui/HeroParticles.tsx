import type { CSSProperties } from "react";

/**
 * Faint drifting light motes (living-details ambient) — pure CSS, off under
 * reduced motion (globals). Fixed positions for SSR consistency.
 */
const MOTES = [
  { left: "10%", bottom: "18%", size: 3, dur: "9s", delay: "0s", op: 0.5 },
  { left: "22%", bottom: "34%", size: 2, dur: "11s", delay: "1.5s", op: 0.4 },
  { left: "34%", bottom: "12%", size: 4, dur: "8s", delay: "0.8s", op: 0.45 },
  { left: "46%", bottom: "40%", size: 2, dur: "12s", delay: "2.2s", op: 0.35 },
  { left: "58%", bottom: "22%", size: 3, dur: "10s", delay: "0.4s", op: 0.5 },
  { left: "67%", bottom: "46%", size: 2, dur: "13s", delay: "1.1s", op: 0.3 },
  { left: "76%", bottom: "16%", size: 3, dur: "9.5s", delay: "2.6s", op: 0.45 },
  { left: "85%", bottom: "38%", size: 2, dur: "11.5s", delay: "0.2s", op: 0.4 },
  { left: "16%", bottom: "52%", size: 2, dur: "12.5s", delay: "1.9s", op: 0.3 },
  { left: "52%", bottom: "60%", size: 3, dur: "10.5s", delay: "0.6s", op: 0.4 },
  { left: "90%", bottom: "58%", size: 2, dur: "9s", delay: "3s", op: 0.3 },
  { left: "40%", bottom: "70%", size: 2, dur: "13.5s", delay: "1.3s", op: 0.35 },
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
