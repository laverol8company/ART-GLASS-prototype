"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Image from "next/image";
import {
  ArrowUp,
  CalendarCheck,
  ChatCircleDots,
  Clock,
  ShieldCheck,
  Star,
  Tag,
  TelegramLogo,
  X,
} from "@phosphor-icons/react";
import { BotQualifier } from "@/components/bot/BotQualifier";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACTS } from "@/lib/contacts";
import { REVIEW_RATING, STUDIO } from "@/lib/content";
import { ease } from "@/lib/motion-presets";
import { useLenis } from "@/lib/lenis-provider";

const WINDOW_POINTS = [
  { icon: Clock, text: "Заявки 24/7 — навіть коли зачинено" },
  { icon: ShieldCheck, text: "Чесна рекомендація під вашу ситуацію" },
  { icon: Tag, text: "Орієнтовна ціна одразу" },
  { icon: CalendarCheck, text: "Конкретний вільний час" },
];

/**
 * Floating actions + fullscreen bot modal (§6, §8, §9). Appears after the hero.
 * A pulsing launcher (turquoise ring, one loop per viewport) opens a fullscreen
 * qualifier modal — roomy, no cramped scroll. Telegram + back-to-top share the
 * cluster. Modal: body lock + Esc + focus trap (§11).
 */
export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [botOpen, setBotOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const lenisRef = useLenis();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));

  useEffect(() => {
    if (!botOpen) return;
    const lenis = lenisRef?.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBotOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const f = Array.from(
          overlay.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !overlay.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !overlay.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    lenis?.stop();
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [botOpen, lenisRef]);

  const toTop = () => {
    const lenis = lenisRef?.current;
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0 });
  };

  const closeBot = () => {
    setBotOpen(false);
    launcherRef.current?.focus();
  };

  return (
    <>
      {/* fullscreen bot modal */}
      <AnimatePresence>
        {botOpen && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Підбір послуги"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="fixed inset-0 z-[95] isolate flex flex-col overflow-hidden bg-bg"
          >
            {/* cinematic living aurora — drifting turquoise + deep-blue light */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <motion.div
                className="absolute -top-1/3 -left-1/4 size-[70%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(45,212,191,0.18), transparent 65%)",
                }}
                animate={
                  reduceMotion ? undefined : { x: [0, 50, 0], y: [0, 36, 0] }
                }
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -right-1/4 -bottom-1/3 size-[65%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(56,132,222,0.16), transparent 62%)",
                }}
                animate={
                  reduceMotion ? undefined : { x: [0, -40, 0], y: [0, -28, 0] }
                }
                transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* floating close — no header bar, more room for content */}
            <button
              ref={closeRef}
              type="button"
              onClick={closeBot}
              aria-label="Закрити"
              className="absolute top-4 right-4 z-20 grid size-11 place-items-center rounded-full border border-line-2 bg-bg/60 text-muted backdrop-blur-sm transition-colors hover:border-chrome-2 hover:text-bone sm:top-5 sm:right-5"
            >
              <X size={20} weight="light" />
            </button>

            <div className="flex min-h-0 flex-1">
              {/* brand panel — desktop only */}
              <div className="relative hidden w-1/2 overflow-hidden lg:block">
                <Image
                  src="/media/hero-car.jpg"
                  alt=""
                  fill
                  sizes="50vw"
                  className="graded object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(11,12,14,0.45), rgba(11,12,14,0.93))",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-between gap-4 overflow-y-auto p-7 xl:p-9">
                  {/* top — live status + always-on booking */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <OpenStatus compact />
                    <span className="inline-flex items-center gap-1.5 rounded-pill border border-feature/30 bg-feature/10 px-2.5 py-1 text-xs text-feature">
                      <Clock size={13} weight="light" /> Онлайн-запис 24/7
                    </span>
                  </div>

                  {/* middle — promise + clock-aware reassurance + points */}
                  <div className="flex flex-col gap-4">
                    <SectionLabel>
                      {CONTACTS.brand} · {CONTACTS.city}
                    </SectionLabel>
                    <h3 className="max-w-[15ch] font-display text-3xl leading-[1.04] font-medium tracking-[-0.02em] text-bone">
                      Запис працює прямо зараз.
                    </h3>
                    <ul className="flex flex-col gap-3 text-sm text-muted">
                      {WINDOW_POINTS.map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-start gap-2.5">
                          <Icon
                            size={18}
                            weight="light"
                            className="mt-0.5 shrink-0 text-feature"
                          />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* bottom — named master (real person) + proof */}
                  <div className="flex flex-col gap-4 border-t border-line/60 pt-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-2 bg-surface font-display text-sm text-bone">
                        {STUDIO.master.charAt(0)}
                      </span>
                      <span className="text-sm text-muted">
                        Заявку підтвердить{" "}
                        <strong className="font-medium text-bone">
                          {STUDIO.master}
                        </strong>
                        , {STUDIO.masterRole.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <Star size={15} weight="fill" className="text-rating" />
                        <strong className="font-medium text-bone tabular-nums">
                          {REVIEW_RATING.score}
                        </strong>
                        <span className="text-muted-2">
                          · {REVIEW_RATING.count} відгуків
                        </span>
                      </span>
                      <span aria-hidden className="text-line-2">
                        ·
                      </span>
                      <span className="text-muted">
                        <strong className="font-medium text-bone tabular-nums">
                          1 240+
                        </strong>{" "}
                        авто
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* qualifier */}
              {/* flex + m-auto: centred when it fits, fully scrollable when not
                  (items-center would clip the top of tall content) */}
              <div className="flex flex-1 overflow-y-auto px-6 py-5">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: ease.out, delay: 0.05 }}
                  className="m-auto w-full max-w-2xl"
                >
                  <LiquidGlass specular sheen className="p-5 sm:p-6">
                    <BotQualifier embedded />
                  </LiquidGlass>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating cluster */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: ease.out }}
            className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
          >
            <button
              type="button"
              onClick={toTop}
              aria-label="Нагору"
              className="liquid-glass grid size-11 place-items-center rounded-full text-chrome"
            >
              <ArrowUp size={18} weight="light" />
            </button>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-sm text-bone"
            >
              <TelegramLogo size={18} weight="light" /> Telegram
            </a>
            <button
              ref={launcherRef}
              type="button"
              onClick={() => setBotOpen(true)}
              aria-haspopup="dialog"
              aria-label="Підібрати послугу"
              className="pulse-ring relative isolate inline-flex min-h-12 items-center gap-2 rounded-pill bg-bone px-5 text-sm font-medium text-bg shadow-[var(--shadow-2)] transition-opacity hover:opacity-90"
            >
              <ChatCircleDots size={18} weight="light" />
              <span className="hidden sm:inline">Підібрати послугу</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
