import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small status badge (living-details). Colour = meaning, drawn from the status
 * system: premium/ТОП (champagne), feature/clarity (cyan), info/NEW (blue),
 * sale/акція (amber), attention/limited (orange). Muted to the base, small mark
 * only — pair with a label, never colour-alone. Animates in via the section's
 * Reveal, then rests (no nagging loop).
 */
const VARIANTS = {
  premium: "border-accent/40 text-accent",
  feature: "border-feature/45 text-feature",
  info: "border-info/45 text-info",
  sale: "border-sale/45 text-sale",
  attention: "border-attention/45 text-attention",
} as const;

export function Badge({
  children,
  variant = "premium",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill border bg-surface/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
