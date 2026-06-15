"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * SIGNATURE MOMENT (one per site): «світловий змах» (§6.4 "протирання", §7).
 * A warm light band travels across a real macro photo as the user scrolls a
 * pinned section — behind it the damaged glass turns clear. clip-path inset +
 * x-transform scrubbed by ScrollTrigger; no blur animation.
 *
 * PLACEHOLDER imagery — swap both frames for the client's real before/after
 * macro of the same shot for the full effect.
 *
 * Reduced motion: static repaired state, no pin (gsap.matchMedia).
 */
export function HealCrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const cleanRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const captionBeforeRef = useRef<HTMLParagraphElement>(null);
  const captionAfterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const clean = cleanRef.current;
    const bar = barRef.current;
    if (!section || !clean || !bar) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(clean, { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(bar, { xPercent: 0, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // the light enters, sweeps across revealing the clean glass, exits
      tl.to(bar, { opacity: 1, duration: 0.06 }, 0)
        .to(
          bar,
          {
            x: () => {
              const w = section.querySelector("[data-pane]")?.clientWidth ?? 0;
              return w;
            },
            duration: 0.82,
          },
          0.02,
        )
        .to(clean, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.82 }, 0.02)
        .to(bar, { opacity: 0, duration: 0.08 }, 0.86)
        .to(captionBeforeRef.current, { opacity: 0, y: -10, duration: 0.08 }, 0.8)
        .to(captionAfterRef.current, { opacity: 1, y: 0, duration: 0.12 }, 0.86);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(clean, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(bar, { opacity: 0 });
      gsap.set(captionBeforeRef.current, { opacity: 0 });
      gsap.set(captionAfterRef.current, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="heal"
      data-section="heal"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12"
    >
      {/* ambient depth behind the pane */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 30%, #131417, #0B0C0E 78%)",
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-4 text-center">
        <SectionLabel>Ремонт</SectionLabel>
        <h2 className="max-w-[16ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
          Ми зупиняємо тріщину.
        </h2>

        {/* the pane: damaged photo below, clean photo revealed by the light */}
        <div className="relative mt-1 w-[min(84vw,520px)]">
          <div
            data-pane
            className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] border border-line shadow-[var(--shadow-2)]"
          >
            {/* damaged — base layer */}
            <Image
              src="/media/glass-chip.jpg"
              alt="Скол і тріщини на лобовому склі"
              fill
              sizes="(max-width: 1024px) 92vw, 860px"
              className="object-cover"
              style={{
                filter: "saturate(0.7) contrast(0.92) brightness(0.85)",
              }}
            />
            {/* haze over the damage */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 55% at 50% 45%, rgba(255,255,255,0.07), transparent 70%)",
              }}
            />

            {/* clean — revealed by the sweep */}
            <div ref={cleanRef} className="absolute inset-0">
              <Image
                src="/media/glass-dusk.jpg"
                alt="Чисте скло без тріщини після ремонту"
                fill
                sizes="(max-width: 1024px) 92vw, 860px"
                className="graded object-cover"
              />
            </div>

            {/* travelling warm light band */}
            <div
              ref={barRef}
              aria-hidden
              className="absolute inset-y-0 -left-[14%] w-[14%]"
              style={{
                background:
                  "linear-gradient(100deg, transparent, rgba(45,212,191,0.34) 45%, rgba(255,255,255,0.26) 50%, rgba(45,212,191,0.18) 55%, transparent)",
              }}
            />

            {/* scrim for captions area */}
            <div className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-1/4" />
          </div>

          {/* swapping captions */}
          <div className="relative mt-5 h-10">
            <p
              ref={captionBeforeRef}
              className="absolute inset-x-0 text-sm text-muted"
            >
              Гортайте — світло проявляє результат.
            </p>
            <p
              ref={captionAfterRef}
              className="absolute inset-x-0 translate-y-2 text-sm text-bone opacity-0"
            >
              Скол зник, скло знову прозоре.{" "}
              <a
                href="#booking"
                className="text-feature underline-offset-4 hover:underline"
              >
                Записатися на ремонт
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
