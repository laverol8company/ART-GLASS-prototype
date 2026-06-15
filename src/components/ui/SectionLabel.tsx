import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Eyebrow label — used sparingly (§6). Mono, wide tracking, muted, with a
 *  short bright cyan accent line that carries the brand colour through the page. */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-muted-2 uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-feature/70" />
      {children}
    </span>
  );
}
