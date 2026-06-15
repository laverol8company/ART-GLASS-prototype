"use client";

import { useEffect, useState } from "react";

type ActiveSection = { id: string; index: number; total: number };

/**
 * Tracks which `[data-section]` is crossing the viewport center (§6 — section
 * counter 01 / 12). Reads the DOM on mount, so it picks up all sections once
 * they exist (added in step 4). `total` is set from the observer's first
 * callback (avoids setState in the effect body).
 */
export function useActiveSection(): ActiveSection {
  const [state, setState] = useState<ActiveSection>({
    id: "",
    index: 0,
    total: 0,
  });

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    if (els.length === 0) return;
    const total = els.length;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = els.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            setState({ id: els[index].id, index, total });
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return state;
}
