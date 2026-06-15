import { cn } from "@/lib/utils";
import { CONTACTS } from "@/lib/contacts";

/**
 * Brand lockup (§1): black circle + silver line-art wedge car + ARTGLASS
 * wordmark. PLACEHOLDER — swap for the client's official logo SVG (and a serif
 * wordmark, the one place serif is allowed, §4.2) when supplied.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#hero"
      aria-label={`${CONTACTS.brand} — на початок`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-full border border-line-2 bg-bg transition-colors group-hover:border-chrome-2"
      >
        <svg viewBox="0 0 32 32" className="size-7" fill="none">
          <circle cx="16" cy="16" r="11.5" stroke="var(--color-line-2)" strokeWidth="1" />
          {/* wedge car silhouette */}
          <path
            d="M7 19.2 C8.6 16.4 11.6 15.4 14 15.2 L16.4 12.9 C17.6 11.9 20.8 12 22 13.4 L24.4 16"
            stroke="var(--color-chrome)"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.4 19.2 L23.6 19.2"
            stroke="var(--color-chrome-2)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="12" cy="19.4" r="1.7" stroke="var(--color-chrome-2)" strokeWidth="1" />
          <circle cx="20.2" cy="19.4" r="1.7" stroke="var(--color-chrome-2)" strokeWidth="1" />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-[-0.02em] text-bone">
        ARTGLASS
      </span>
    </a>
  );
}
