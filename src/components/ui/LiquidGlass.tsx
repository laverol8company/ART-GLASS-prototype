"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Liquid-glass surface (§5). Apply pointwise. `specular` follows the cursor
 * (writes --mx/--my); `sheen` sweeps a highlight on hover. Both are no-ops
 * under prefers-reduced-transparency (handled in globals.css).
 */
export function LiquidGlass({
  children,
  className,
  specular = false,
  sheen = false,
}: {
  children: ReactNode;
  className?: string;
  specular?: boolean;
  sheen?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  const onMouseMove = specular
    ? (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        // batch CSS var writes to one per frame
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${clientX - r.left}px`);
          el.style.setProperty("--my", `${clientY - r.top}px`);
        });
      }
    : undefined;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn("liquid-glass", className)}
    >
      {specular && <span aria-hidden className="liquid-glass__specular" />}
      {sheen && <span aria-hidden className="liquid-glass__sheen" />}
      {children}
    </div>
  );
}
