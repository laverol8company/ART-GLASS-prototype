"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  CalendarCheck,
  Car,
  Check,
  Checks,
  Crown,
  DotsThree,
  Drop,
  Eye,
  Info,
  Jeep,
  Lightbulb,
  Lightning,
  SealCheck,
  ShieldCheck,
  Sparkle,
  Sun,
  Warning,
} from "@phosphor-icons/react";
import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { CountUp } from "@/components/ui/CountUp";
import { BotMotif } from "@/components/bot/BotMotif";
import {
  BOT_STEPS,
  SERVICE_ACCENT,
  SLOT_DAYS,
  TIMELINE_DAY,
  getRecommendation,
  type BotOption,
} from "@/lib/bot";
import { useOpenStatus } from "@/hooks/useOpenStatus";
import { ease } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

/* Option-icon registry — keeps bot.ts JSX-free (§3 single thin icon set). */
const ICONS: Record<
  string,
  React.ComponentType<{ size?: number; weight?: "light" | "fill" | "bold" }>
> = {
  car: Car,
  jeep: Jeep,
  crown: Crown,
  dots: DotsThree,
  warning: Warning,
  drop: Drop,
  lightbulb: Lightbulb,
  shield: ShieldCheck,
  checks: Checks,
  eye: Eye,
  sun: Sun,
  lightning: Lightning,
  calendar: CalendarBlank,
  info: Info,
};

/* Per-service accent → text / border classes (status-colour system). */
const ACCENT_TEXT = {
  premium: "text-accent",
  feature: "text-feature",
  info: "text-info",
  sale: "text-sale",
  attention: "text-attention",
} as const;
const ACCENT_BORDER = {
  premium: "border-accent",
  feature: "border-feature",
  info: "border-info",
  sale: "border-sale",
  attention: "border-attention",
} as const;

const TAP = { scale: 0.97 };
const SPRING = { type: "spring", stiffness: 420, damping: 26 } as const;
// fixed spark vectors so the burst is deterministic (no Math.random)
const SPARKS = [
  [0, -34],
  [30, -18],
  [32, 16],
  [0, 34],
  [-32, 16],
  [-30, -18],
];

const ACCENT_BG = {
  premium: "bg-accent",
  feature: "bg-feature",
  info: "bg-info",
  sale: "bg-sale",
  attention: "bg-attention",
} as const;
// soft radial glow rgba per accent (card recolours to the chosen service)
const ACCENT_GLOW = {
  premium: "rgba(45,212,191,0.16)",
  feature: "rgba(45,212,191,0.16)",
  info: "rgba(111,168,220,0.16)",
  sale: "rgba(232,165,107,0.16)",
  attention: "rgba(224,147,90,0.16)",
} as const;
// completed-step dot, tinted to the service
const ACCENT_DOT = {
  premium: "border-accent bg-accent/15 text-accent",
  feature: "border-feature bg-feature/15 text-feature",
  info: "border-info bg-info/15 text-info",
  sale: "border-sale bg-sale/15 text-sale",
  attention: "border-attention bg-attention/15 text-attention",
} as const;

// staggered entrance for the option list
const OPT_LIST = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const OPT_ITEM = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

type Answer = { value: string; label: string };
type Slot = { dayId: string; dayLabel: string; time: string };

/** Deterministic qualifier (§8): steps → recommendation → concrete time slot →
 *  Telegram handoff. Frontend-only. Rich: per-step icons, a check stepper, a
 *  photo result card tinted to the service, tap micro-rewards, and a booking
 *  celebration. `embedded` drops the glass shell when it already sits in glass. */
export function BotQualifier({
  embedded = false,
}: {
  embedded?: boolean;
} = {}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [activeDay, setActiveDay] = useState(SLOT_DAYS[0].id);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [booked, setBooked] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const status = useOpenStatus();
  const reduce = useReducedMotion();
  const total = BOT_STEPS.length;
  const isResult = step >= total;

  const choose = (stepId: string, opt: BotOption) => {
    setAnswers((a) => ({ ...a, [stepId]: { value: opt.value, label: opt.label } }));
    // timeline answer pre-opens the matching slot day — no double-asking time
    if (stepId === "timeline" && TIMELINE_DAY[opt.value]) {
      setActiveDay(TIMELINE_DAY[opt.value]);
    }
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));
  const restart = () => {
    setAnswers({});
    setSlot(null);
    setBooked(false);
    setName("");
    setPhone("");
    setActiveDay(SLOT_DAYS[0].id);
    setStep(0);
  };

  const rec = getRecommendation(answers.problem?.value ?? "");
  const accent = SERVICE_ACCENT[rec.id] ?? "feature";
  const priceNum = Number(rec.priceFrom.replace(/[^\d]/g, "")) || 0;
  const day = SLOT_DAYS.find((d) => d.id === activeDay) ?? SLOT_DAYS[0];
  const timeLabel = slot
    ? `${slot.dayLabel}, ${slot.time}`
    : (answers.timeline?.label ?? "узгодимо");

  // Booking → send the qualifier result (answers + recommendation + slot +
  // contact) to the studio's CRM, then show the celebration.
  const phoneOk = phone.replace(/\D/g, "").length >= 7;
  const book = async () => {
    if (sending || !phoneOk) return;
    setSending(true);
    const payload: Record<string, string> = {
      name: name.trim() || "Заявка з квізу",
      phone: phone.trim(),
      service: rec.title,
      price: rec.priceFrom,
      preferred_time: timeLabel,
      source: "ART GLASS — сайт",
    };
    for (const [k, v] of Object.entries(answers)) payload[k] = v.label;
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* заявку все одно підтверджуємо — майстер передзвонить */
    }
    setSending(false);
    setBooked(true);
  };

  /* ---- booking celebration ("свято") -------------------------------------- */
  const celebration = (
    <motion.div
      key="celebration"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: ease.out }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative grid size-20 place-items-center">
        {/* radial glow flash */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute size-28 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(45,212,191,0.28), transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0.35], scale: 1.5 }}
            transition={{ duration: 1, delay: 0.2, ease: ease.out }}
          />
        )}
        {/* spark burst */}
        {!reduce &&
          SPARKS.map(([x, y], i) => (
            <motion.span
              key={i}
              aria-hidden
              className={cn("absolute size-1.5 rounded-full", ACCENT_BG[accent])}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x, y, opacity: [0, 1, 0], scale: [0, 1, 0.4] }}
              transition={{ duration: 0.8, delay: 0.25, ease: ease.out }}
            />
          ))}
        <svg viewBox="0 0 52 52" className={cn("size-20", ACCENT_TEXT[accent])}>
          <motion.circle
            cx="26"
            cy="26"
            r="23"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.4"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: ease.out }}
          />
          <motion.path
            d="M16 27l7 7 13-15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.35, ease: ease.out }}
          />
        </svg>
      </div>

      <h3 className="mt-4 font-display text-2xl font-medium text-bone">
        Ви записані!
      </h3>
      <p className="measure mt-2 text-sm text-muted">
        {rec.title} · {timeLabel}. Майстер звʼяжеться найближчим часом, щоб
        підтвердити деталі. Чекаємо вас!
      </p>
      <button
        type="button"
        onClick={restart}
        className="mt-6 min-h-11 text-sm text-muted transition-colors hover:text-bone"
      >
        Записатися ще раз
      </button>
    </motion.div>
  );

  /* ---- shared header: closed-aware note + check stepper -------------------- */
  const header = !booked && (
    <>
      {status && status.state !== "open" && (
        <div className="mb-4 flex items-start gap-2.5 rounded-[var(--radius-md)] border border-attention/30 bg-attention/5 px-3 py-2.5 text-xs leading-relaxed text-muted">
          {status.state === "closed" ? (
            <span
              className="mt-1 size-2 shrink-0 rounded-full bg-attention"
              aria-hidden
            />
          ) : (
            <span className="status-dot dot-attention mt-1" aria-hidden />
          )}
          <span>
            {status.state === "closed"
              ? "Зараз зачинено — але запис працює 24/7. Майстер підтвердить, щойно відчинимось."
              : "Скоро зачиняємось — заявку ще приймемо. Оберіть час нижче."}
          </span>
        </div>
      )}

      {Object.keys(answers).length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {BOT_STEPS.map((s, i) =>
            answers[s.id] ? (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(i)}
                className="inline-flex items-center rounded-pill border border-line-2 bg-surface/60 px-2.5 py-1 text-xs text-muted transition-colors hover:border-chrome-2 hover:text-bone"
              >
                {answers[s.id].label}
              </button>
            ) : null,
          )}
        </div>
      )}

      <div className="mb-5 flex items-center justify-between">
        {/* check stepper */}
        <div className="flex items-center gap-2" aria-hidden>
          {Array.from({ length: total }).map((_, i) => {
            const done = i < step;
            const active = i === step && !isResult;
            return (
              <span
                key={i}
                className={cn(
                  "grid size-5 place-items-center rounded-full border text-[10px] transition-colors duration-300",
                  done
                    ? ACCENT_DOT[accent]
                    : active
                      ? "border-chrome text-bone"
                      : "border-line-2 text-muted-2",
                )}
              >
                {done ? (
                  <Check size={11} weight="bold" />
                ) : (
                  <span className="tabular-nums">{i + 1}</span>
                )}
              </span>
            );
          })}
        </div>

        {step > 0 && !isResult && (
          <button
            type="button"
            onClick={back}
            className="inline-flex min-h-11 items-center gap-1.5 text-xs text-muted transition-colors hover:text-bone"
          >
            <ArrowLeft size={14} weight="light" /> Назад
          </button>
        )}
        {isResult && (
          <button
            type="button"
            onClick={restart}
            className="inline-flex min-h-11 items-center text-xs text-muted transition-colors hover:text-bone"
          >
            Почати спочатку
          </button>
        )}
      </div>
    </>
  );

  const inner = (
    <>
      {/* niche line-art watermark (squeegee + chipped glass) — the studio's
          craft, in the logo's thin chrome language; faint, zero height cost */}
      {!booked && !isResult && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        >
          <BotMotif className="absolute -right-6 bottom-1 h-[78%] w-auto text-chrome opacity-[0.08]" />
        </div>
      )}
      {/* service-tinted ambient glow — recolours as the user picks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-44"
        style={{
          background: `radial-gradient(78% 80% at 50% 0%, ${ACCENT_GLOW[accent]}, transparent 72%)`,
          transition: "background 0.6s ease",
        }}
      />
      <div className="relative">
        {header}

        <AnimatePresence mode="wait" initial={false}>
        {booked ? (
          celebration
        ) : !isResult ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            <h3 className="font-display text-xl font-medium text-bone sm:text-2xl">
              {BOT_STEPS[step].question}
            </h3>
            <motion.div
              variants={OPT_LIST}
              initial="initial"
              animate="animate"
              className="mt-4 grid gap-2"
            >
              {BOT_STEPS[step].options.map((opt) => {
                const Icon = ICONS[opt.icon] ?? Info;
                return (
                  <motion.button
                    key={opt.value}
                    type="button"
                    variants={OPT_ITEM}
                    whileHover={{ y: -2 }}
                    whileTap={TAP}
                    transition={SPRING}
                    onClick={() => choose(BOT_STEPS[step].id, opt)}
                    className="group relative flex min-h-12 items-center gap-3 overflow-hidden rounded-[var(--radius-md)] border border-line-2 bg-gradient-to-br from-white/[0.04] to-transparent px-3 py-2.5 text-left text-sm text-bone transition-colors hover:border-feature/40"
                  >
                    {/* light sweep on hover (transform only) */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    />
                    <span className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-line-2 bg-bg/40 text-muted-2 transition-colors group-hover:border-feature/50 group-hover:bg-feature/10 group-hover:text-feature">
                      <Icon size={18} weight="light" />
                    </span>
                    <span className="flex-1">{opt.label}</span>
                    <ArrowRight
                      size={16}
                      weight="light"
                      className="shrink-0 text-muted-2 transition-transform group-hover:translate-x-1 group-hover:text-bone"
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: ease.out }}
            className="grid gap-6 sm:grid-cols-2 sm:gap-8 sm:items-start"
          >
            {/* LEFT — the recommendation */}
            <div>
            {/* photo banner, tinted to the service */}
            <div className="relative h-24 w-full overflow-hidden rounded-[var(--radius-lg)] border border-line">
              <motion.div
                initial={reduce ? false : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7, ease: ease.out }}
                className="absolute inset-0"
              >
                <Image
                  src={rec.img}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 90vw, 440px"
                  className="graded object-cover"
                />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(11,12,14,0.85), rgba(11,12,14,0.35))",
                }}
              />
              <span
                className={cn(
                  "absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-pill border bg-surface/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase",
                  ACCENT_BORDER[accent],
                  ACCENT_TEXT[accent],
                )}
              >
                <Sparkle size={11} weight="fill" /> Рекомендація
              </span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-medium text-bone">
              {rec.title}
            </h3>
            <motion.span
              aria-hidden
              className={cn(
                "mt-2.5 block h-0.5 w-12 origin-left rounded-pill",
                ACCENT_BG[accent],
              )}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: ease.out }}
            />
            <p className="measure mt-2 text-sm text-muted">{rec.desc}</p>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className={cn(
                  "font-mono text-base tabular-nums",
                  ACCENT_TEXT[accent],
                )}
              >
                від <CountUp value={priceNum} className="tabular-nums" /> ₴
              </span>
              <span className="text-xs text-muted-2">
                точна ціна — після огляду авто
              </span>
            </div>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted">
              <SealCheck
                size={14}
                weight="light"
                className={cn("shrink-0", ACCENT_TEXT[accent])}
              />
              {rec.warranty}
            </p>
            </div>

            {/* RIGHT — concrete time + CTA */}
            <div className="flex flex-col">
            {/* slot picker — concrete time (§9). Demo windows, TODO real calendar. */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5">
                <span className="text-sm text-bone">Оберіть час</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-attention">
                  <span className="status-dot dot-attention" aria-hidden />2 вільні
                  вікна цього тижня
                </span>
              </div>

              <div className="mt-3 flex gap-2" role="tablist" aria-label="День">
                {SLOT_DAYS.map((d) => (
                  <motion.button
                    key={d.id}
                    type="button"
                    role="tab"
                    whileTap={TAP}
                    transition={SPRING}
                    aria-selected={d.id === activeDay}
                    onClick={() => setActiveDay(d.id)}
                    className={cn(
                      "min-h-11 rounded-pill border px-4 text-xs transition-colors",
                      d.id === activeDay
                        ? "border-chrome bg-surface text-bone"
                        : "border-line-2 text-muted hover:text-bone",
                    )}
                  >
                    {d.label}
                  </motion.button>
                ))}
              </div>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {day.times.map((time) => {
                  const selected =
                    slot?.dayId === day.id && slot?.time === time;
                  return (
                    <motion.button
                      key={time}
                      type="button"
                      whileTap={TAP}
                      transition={SPRING}
                      aria-pressed={selected}
                      onClick={() =>
                        setSlot({ dayId: day.id, dayLabel: day.label, time })
                      }
                      className={cn(
                        "min-h-11 rounded-[var(--radius-sm)] border px-4 font-mono text-sm tabular-nums transition-colors",
                        selected
                          ? cn(
                              "bg-surface",
                              ACCENT_BORDER[accent],
                              ACCENT_TEXT[accent],
                            )
                          : "border-line-2 text-bone hover:border-chrome-2",
                      )}
                    >
                      {time}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* contact — потрібен телефон, щоб майстер передзвонив */}
            <div className="mt-4 grid gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше імʼя (необовʼязково)"
                autoComplete="name"
                className="min-h-11 rounded-[var(--radius-sm)] border border-line-2 bg-bg/40 px-3.5 text-sm text-bone outline-none transition-colors placeholder:text-muted-2 focus:border-chrome-2"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+380 __ ___ __ __"
                className="min-h-11 rounded-[var(--radius-sm)] border border-line-2 bg-bg/40 px-3.5 text-sm text-bone outline-none transition-colors placeholder:text-muted-2 focus:border-chrome-2"
              />
            </div>

            <motion.button
              type="button"
              whileTap={TAP}
              transition={SPRING}
              onClick={book}
              disabled={sending || !phoneOk}
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-pill bg-bone px-5 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <CalendarCheck size={18} weight="light" />
              {sending
                ? "Надсилаємо…"
                : slot
                  ? `Записатися на ${slot.time}`
                  : "Записатися"}
            </motion.button>
            <p className="mt-2 text-center text-xs text-muted-2">
              Заявка піде майстру — він підтвердить час і деталі.
            </p>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </>
  );

  if (embedded) return inner;
  return (
    <LiquidGlass specular className="p-5 sm:p-6">
      {inner}
    </LiquidGlass>
  );
}
