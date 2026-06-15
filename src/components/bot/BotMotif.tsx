/**
 * Bot card watermark (§5/§10) — a single-weight line-art motif of a squeegee
 * sweeping a glass pane that has a star-crack chip: the studio's exact craft
 * (auto-glass), drawn in the logo's thin chrome language. Used as a faint,
 * pointer-none backdrop behind the qualifier — niche, not a stock car photo.
 */
export function BotMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* glass pane */}
      <rect x="44" y="58" width="152" height="124" rx="14" />
      {/* clarity band left behind the blade */}
      <path d="M70 150 C 104 140, 142 116, 170 86" strokeWidth={2.5} opacity={0.85} />
      {/* squeegee blade across the pane */}
      <line x1="62" y1="170" x2="178" y2="70" />
      {/* squeegee channel/body above the blade */}
      <line x1="70" y1="180" x2="186" y2="80" />
      {/* handle stem + grip */}
      <line x1="178" y1="86" x2="206" y2="60" />
      <rect x="196" y="40" width="26" height="14" rx="7" transform="rotate(-42 209 47)" />
      {/* star-crack chip, lower-left of the pane */}
      <circle cx="86" cy="142" r="3.4" />
      <line x1="86" y1="142" x2="74" y2="136" />
      <line x1="86" y1="142" x2="96" y2="132" />
      <line x1="86" y1="142" x2="80" y2="156" />
      <line x1="86" y1="142" x2="98" y2="150" />
    </svg>
  );
}
