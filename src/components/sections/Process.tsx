"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionBg } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROCESS } from "@/lib/content";

/**
 * Process (§6.6) — horizontal scroll-pan. On desktop the section pins and the
 * track travels sideways with scroll (GSAP, gsap.matchMedia for cleanup +
 * reduced-motion опт-аут). On mobile / reduced motion it's a native snap
 * carousel. No "Step N" labels — the action is the label (§6.6, §16).
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => track.scrollWidth - window.innerWidth + 96;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.4,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      data-section="process"
      className="relative isolate overflow-hidden py-16 sm:py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <SectionBg src="/media/bg-process.jpg" scrim="full" drift={1} />
      <div className="container-page mb-10 lg:mb-14">
        <div className="flex flex-col gap-4">
          <SectionLabel>Процес</SectionLabel>
          <h2 className="max-w-[22ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
            Від огляду до контролю під світлом.
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:snap-none lg:overflow-visible lg:px-[8vw] lg:pb-0"
      >
        {PROCESS.map((step) => (
          <article
            key={step.id}
            className="flex min-w-[78vw] shrink-0 snap-center flex-col gap-4 rounded-[var(--radius-lg)] border border-line-2 bg-surface/60 p-8 shadow-[var(--shadow-1)] sm:min-w-[380px] lg:min-w-[420px]"
          >
            <span aria-hidden className="h-px w-10 bg-chrome-2/60" />
            <h3 className="font-display text-2xl font-medium tracking-[-0.01em] text-bone">
              {step.title}
            </h3>
            <p className="text-muted">{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
