import { SERVICES, type Service } from "@/lib/content";

/**
 * Bot qualifier — deterministic layer 1 (§8). Frontend only: no API call.
 * Steps: car type → problem → desired result → timeline. The problem choice
 * carries a serviceId that drives the recommendation. Booking = Telegram
 * handoff with a pre-filled summary.
 */

export type BotOption = {
  value: string;
  label: string;
  serviceId?: Service["id"];
  /** icon key — mapped to a Phosphor glyph in BotQualifier (keeps this file JSX-free). */
  icon: string;
};

export type BotStep = { id: string; question: string; options: BotOption[] };

export const BOT_STEPS: BotStep[] = [
  {
    id: "carType",
    question: "Який у вас автомобіль?",
    options: [
      { value: "sedan", label: "Седан", icon: "car" },
      { value: "suv", label: "Кросовер / SUV", icon: "jeep" },
      { value: "premium", label: "Преміум", icon: "crown" },
      { value: "other", label: "Інше", icon: "dots" },
    ],
  },
  {
    id: "problem",
    question: "Що турбує?",
    options: [
      { value: "chip", label: "Скол / тріщина на лобовому", serviceId: "repair", icon: "warning" },
      { value: "glass", label: "Подряпини / помутніння скла", serviceId: "glass-polish", icon: "drop" },
      { value: "headlights", label: "Мутні / жовті фари", serviceId: "headlights", icon: "lightbulb" },
      { value: "protect", label: "Захист фар і зон ризику", serviceId: "ppf", icon: "shield" },
    ],
  },
  {
    id: "timeline",
    question: "Коли зручно?",
    options: [
      { value: "asap", label: "Якомога швидше", icon: "lightning" },
      { value: "weekend", label: "Цими вихідними", icon: "calendar" },
      { value: "info", label: "Поки лише дізнаюся", icon: "info" },
    ],
  },
];

/** Timeline answer → which slot day to pre-open (so we don't ask for time twice). */
export const TIMELINE_DAY: Record<string, string> = {
  asap: "today",
  weekend: "saturday",
  info: "tomorrow",
};

/** Per-service accent (status-colour system) — each service reads as its own
 *  colour on the result card, "more colour" done as meaning, not a rainbow. */
export const SERVICE_ACCENT: Record<
  string,
  "premium" | "feature" | "info" | "sale" | "attention"
> = {
  repair: "feature",
  "glass-polish": "info",
  headlights: "sale",
  ppf: "attention",
};

export function getRecommendation(problemValue: string): Service {
  const problemStep = BOT_STEPS.find((s) => s.id === "problem");
  const option = problemStep?.options.find((o) => o.value === problemValue);
  const serviceId = option?.serviceId ?? "repair";
  return SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0];
}

/**
 * Booking slots (§8, §9 slot picker) — PLACEHOLDER demo windows, plausible but
 * static. TODO: wire to the studio's real calendar / mini-CRM in production.
 */
export type SlotDay = { id: string; label: string; times: string[] };

export const SLOT_DAYS: SlotDay[] = [
  { id: "today", label: "Сьогодні", times: ["16:00", "18:30"] },
  { id: "tomorrow", label: "Завтра", times: ["10:00", "13:00", "17:00"] },
  { id: "saturday", label: "Субота", times: ["11:00", "14:30"] },
];

/** First available window — honest "nearest slot" hint for the result step. */
export const NEAREST_SLOT = `${SLOT_DAYS[0].label}, ${SLOT_DAYS[0].times[0]}`;
