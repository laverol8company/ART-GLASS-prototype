import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Media surface (§0, §10, §13). With `src` it renders an optimized, uniformly
 * graded next/image (+ vignette for cohesion). Without `src` it falls back to a
 * premium placeholder (light + glass streak + vignette + brand line); `damaged`
 * overlays a chip/crack so before/after reads. Stock here is illustrative —
 * replace with real client photos.
 */
export function MediaPlaceholder({
  label,
  className,
  tone = "graphite",
  damaged = false,
  src,
  alt,
  haze = false,
  priority = false,
  children,
}: {
  label?: string;
  className?: string;
  tone?: "graphite" | "warm" | "clean";
  damaged?: boolean;
  src?: string;
  alt?: string;
  haze?: boolean;
  priority?: boolean;
  children?: ReactNode;
}) {
  const toneClass = {
    graphite: "from-surface-2 via-surface to-bg",
    warm: "from-[#241c12] via-surface to-bg",
    clean: "from-[#14191d] via-surface to-bg",
  }[tone];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br",
        toneClass,
        className,
      )}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priority}
            className={cn("object-cover", haze ? "haze" : "graded")}
          />
          {/* oxidized / foggy veil for "before" headlight */}
          {haze && (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(231,199,154,0.22), rgba(255,255,255,0.07))",
              }}
            />
          )}
          {/* vignette to unify all imagery into one grade */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(0,0,0,0.5))",
            }}
          />
        </>
      ) : (
        <>
          {/* soft studio light */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 45% at 28% 22%, rgba(255,255,255,0.08), transparent 60%)",
            }}
          />
          {/* glass reflection streak */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(118deg, transparent 42%, rgba(255,255,255,0.06) 50%, transparent 58%)",
            }}
          />
          {/* faint brand line motif */}
          <svg
            aria-hidden
            viewBox="0 0 400 150"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 size-full opacity-[0.07]"
          >
            <path
              d="M24 112 C40 80 82 71 122 67 L154 45 C172 33 230 33 248 45 L280 67 C330 69 364 81 378 112"
              stroke="var(--color-chrome)"
              strokeWidth="1.5"
            />
            <circle cx="114" cy="114" r="20" stroke="var(--color-chrome-2)" strokeWidth="1.2" />
            <circle cx="286" cy="114" r="20" stroke="var(--color-chrome-2)" strokeWidth="1.2" />
          </svg>
          {/* vignette for depth */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 45%, transparent 52%, rgba(0,0,0,0.55))",
            }}
          />
        </>
      )}

      {/* damage motif (chip + radiating cracks) — over image or placeholder */}
      {damaged && (
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          fill="none"
          className="absolute top-1/2 left-1/2 z-[5] size-24 -translate-x-1/2 -translate-y-1/2 opacity-70"
        >
          <circle cx="50" cy="50" r="4" fill="var(--color-chrome)" opacity="0.5" />
          <path
            d="M50 50 L30 34 M50 50 L72 38 M50 50 L40 74 M50 50 L66 68 M50 50 L24 56"
            stroke="var(--color-chrome-2)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      )}

      {children}

      {label && (
        <span className="absolute bottom-3 left-3 z-10 font-mono text-[10px] tracking-[0.18em] text-muted-2 uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
