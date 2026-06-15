"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQ } from "@/lib/content";
import { ease } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

/** FAQ (§6.10) — accordion. Animated height, accessible button + region. */
export function Faq() {
  const [open, setOpen] = useState<string | null>(FAQ[0].id);

  return (
    <section
      id="faq"
      data-section="faq"
      className="relative isolate flex min-h-screen flex-col justify-center py-12"
    >
      <SectionBg src="/media/bg-faq.jpg" scrim="full" drift={1} />
      <div className="container-page grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
        <Reveal>
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <SectionLabel>Питання</SectionLabel>
            <h2 className="max-w-[14ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
              Коротко про головне.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="border-t border-line">
            {FAQ.map((item) => {
              const isOpen = open === item.id;
              return (
                <li key={item.id} className="border-b border-line">
                  <button
                    type="button"
                    id={`faq-q-${item.id}`}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${item.id}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-lg text-bone">
                      {item.q}
                    </span>
                    <CaretDown
                      size={18}
                      weight="light"
                      className={cn(
                        "shrink-0 text-muted-2 transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-q-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: ease.out }}
                        className="overflow-hidden"
                      >
                        <p className="measure pb-5 text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
