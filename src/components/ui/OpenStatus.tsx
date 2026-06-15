"use client";

import { useOpenStatus } from "@/hooks/useOpenStatus";
import { cn } from "@/lib/utils";

/** Live open/closed indicator (§6.11). Green pulse when open, amber when closing
 *  soon, static muted dot when closed. Renders a neutral placeholder pre-mount.
 *  `compact` (e.g. in the header) drops the sub-line and uses a smaller size. */
export function OpenStatus({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const s = useOpenStatus();

  if (!s) {
    return compact ? (
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-pill border border-line-2 bg-surface/60 px-2.5 py-1 text-xs",
          className,
        )}
        aria-hidden
      >
        <span className="size-2 shrink-0 rounded-full bg-muted-2/40" />
        <span className="text-muted-2">Години роботи</span>
      </span>
    ) : (
      <span
        className={cn("inline-flex items-center gap-2.5 text-sm", className)}
        aria-hidden
      >
        <span className="size-2 shrink-0 rounded-full bg-muted-2/40" />
        <span className="text-muted-2">Години роботи</span>
      </span>
    );
  }

  const color =
    s.state === "open"
      ? "text-status"
      : s.state === "closing"
        ? "text-attention"
        : "text-muted";

  // Dot: green pulse (open), amber pulse (closing now), warm static (closed).
  const dot =
    s.state === "open" ? (
      <span className="status-dot" aria-hidden />
    ) : s.state === "closing" ? (
      <span className="status-dot dot-attention" aria-hidden />
    ) : (
      <span className="size-2 shrink-0 rounded-full bg-attention" aria-hidden />
    );

  // Compact (header) — a chip so the state reads at a glance, warm-tinted when
  // not open, with the reopening time spelled out.
  if (compact) {
    const stripped = s.label.replace(/^Зараз\s/, "");
    const shortLabel = stripped.charAt(0).toUpperCase() + stripped.slice(1);
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-pill border px-2.5 py-1 text-xs",
          s.state === "open"
            ? "border-status/30 bg-status/5"
            : "border-attention/40 bg-attention/10",
          className,
        )}
      >
        {dot}
        <span
          className={cn(
            "font-medium",
            s.state === "closed" ? "text-bone" : color,
          )}
        >
          {shortLabel}
        </span>
        <span
          className={s.state === "open" ? "text-muted-2" : "text-attention"}
        >
          · {s.shortSub}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5 text-sm", className)}>
      {dot}
      <span className={color}>{s.label}</span>
      <span className="text-muted-2">· {s.sub}</span>
    </span>
  );
}
