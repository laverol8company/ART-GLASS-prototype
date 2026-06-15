"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/Badge";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SERVICES } from "@/lib/content";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Services (§6.5) — sticky media synced to a scrolling list with an 01/04
 * counter (Radian move). Price band + warranty on each card; quote-driven CTA
 * to the bot (§9). On mobile it degrades to stacked strips with inline media.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // sticky media sync is desktop-only (lg+); skip the observer on mobile
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="services"
      data-section="services"
      className="relative isolate py-16 sm:py-24"
    >
      <SectionBg src="/media/bg-services.jpg" scrim="right" drift={0} />
      <div className="container-page">
        <Reveal className="mb-12 flex flex-col gap-4">
          <SectionLabel>Послуги</SectionLabel>
          <h2 className="max-w-[20ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
            Що ми робимо зі склом і фарами.
          </h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* sticky media (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-line">
                {SERVICES.map((s, i) => (
                  <motion.div
                    key={s.id}
                    aria-hidden={i !== active}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <MediaPlaceholder
                      src={s.img}
                      alt={s.title}
                      className="size-full"
                    />
                  </motion.div>
                ))}
                <div
                  role="status"
                  aria-live="polite"
                  className="absolute top-4 right-4 font-mono text-xs text-muted tabular-nums"
                >
                  <span aria-hidden>
                    {pad(active + 1)} / {pad(SERVICES.length)}
                  </span>
                  <span className="sr-only">{SERVICES[active].title}</span>
                </div>
              </div>
            </div>
          </div>

          {/* list */}
          <div className="flex flex-col">
            {SERVICES.map((s, i) => (
              <div
                key={s.id}
                data-idx={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="flex flex-col gap-4 border-b border-line py-10 lg:min-h-[58vh] lg:justify-center"
              >
                <MediaPlaceholder
                  src={s.img}
                  alt={s.title}
                  className="aspect-[16/10] w-full lg:hidden"
                />
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-display text-2xl font-medium tracking-[-0.01em] text-bone sm:text-3xl">
                    {s.title}
                    {s.tag && (
                      <Badge variant={s.tag.variant}>{s.tag.label}</Badge>
                    )}
                  </h3>
                  <a
                    href="#booking"
                    className="font-mono text-base whitespace-nowrap text-accent tabular-nums underline-offset-4 transition-colors hover:text-bone hover:underline"
                  >
                    {s.priceFrom}
                  </a>
                </div>
                <p className="measure text-muted">{s.desc}</p>
                <span className="text-xs text-muted-2">{s.warranty}</span>
                <a
                  href="#booking"
                  className="group inline-flex w-fit items-center gap-2 text-sm text-bone transition-colors hover:text-chrome"
                >
                  Розрахувати вартість
                  <ArrowRight
                    size={16}
                    weight="light"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
