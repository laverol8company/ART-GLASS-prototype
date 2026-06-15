import { SERVICES, type Service } from "@/lib/content";

/**
 * Bot qualifier — deterministic layer 1 (§8). Frontend only: no API call.
 *
 * Logical, consultative flow (problem-led, like a real diagnosis):
 *   1. problem  — what brought you in (drives the recommendation)
 *   2. detail   — a follow-up whose options DEPEND on the problem (severity /
 *                 scope) — feels attentive and qualifies the job for the master
 *   3. carType  — the vehicle (logistics / price band)
 *   4. timeline — when it suits (logistics; pre-opens a slot day)
 *
 * Every path is exactly 4 steps, so the stepper stays clean. The detail step is
 * resolved from the chosen problem via getSteps().
 */

export type BotOption = {
  value: string;
  label: string;
  serviceId?: Service["id"];
  /** icon key — mapped to a Phosphor glyph in BotQualifier (keeps this file JSX-free). */
  icon: string;
  /** optional honest note surfaced on the result card (e.g. "maybe replacement"). */
  note?: string;
};

export type BotStep = { id: string; question: string; options: BotOption[] };

/* 1 — the reason they're here. Leads, because it's what the visitor came for,
   and the chosen serviceId drives the recommendation. */
const PROBLEM_STEP: BotStep = {
  id: "problem",
  question: "З чим до нас?",
  options: [
    { value: "chip", label: "Скол або тріщина на склі", serviceId: "repair", icon: "warning" },
    { value: "glass", label: "Подряпини чи каламуть скла", serviceId: "glass-polish", icon: "drop" },
    { value: "headlights", label: "Тьмяні або жовті фари", serviceId: "headlights", icon: "lightbulb" },
    { value: "protect", label: "Захист скла та фар плівкою", serviceId: "ppf", icon: "shield" },
  ],
};

/* 2 — problem-specific follow-up. Same step slot, different questions/options
   depending on what was chosen above. Refines the brief (and adds honesty where
   a repair might turn into a replacement). */
const DETAIL_STEPS: Record<string, BotStep> = {
  chip: {
    id: "detail",
    question: "Наскільки велике пошкодження?",
    options: [
      { value: "small", label: "Невеликий скол (до 2 см)", icon: "ruler" },
      { value: "crack", label: "Тріщина до 30 см", icon: "path" },
      {
        value: "big",
        label: "Велика тріщина або біля краю скла",
        icon: "warning",
        note: "Можлива заміна скла — майстер оцінить, чи візьме ремонт.",
      },
    ],
  },
  glass: {
    id: "detail",
    question: "Що саме зі склом?",
    options: [
      { value: "wiper", label: "Подряпини від двірників і піску", icon: "path" },
      { value: "haze", label: "Каламуть, відблиски у контр-світлі", icon: "eye" },
      { value: "deep", label: "Глибокі подряпини", icon: "warning" },
    ],
  },
  headlights: {
    id: "detail",
    question: "У якому стані фари?",
    options: [
      { value: "dim", label: "Трохи потьмяніли", icon: "sun" },
      { value: "yellow", label: "Сильно пожовтіли або каламутні", icon: "lightbulb" },
      {
        value: "cracked",
        label: "Є тріщини на склі фари",
        icon: "warning",
        note: "Після полірування варто захистити фари плівкою — підкажемо на місці.",
      },
    ],
  },
  protect: {
    id: "detail",
    question: "Що захищаємо плівкою?",
    options: [
      { value: "ppf-head", label: "Фари", icon: "lightbulb" },
      { value: "ppf-windshield", label: "Лобове скло", icon: "drop" },
      { value: "ppf-all", label: "Фари та зони ризику", icon: "shield" },
    ],
  },
};

/* fallback if the detail step is ever rendered before a problem is set. */
const FALLBACK_DETAIL: BotStep = {
  id: "detail",
  question: "Уточніть деталі",
  options: [
    { value: "minor", label: "Незначне", icon: "info" },
    { value: "serious", label: "Помітне", icon: "warning" },
  ],
};

/* 3 — the vehicle (price band / PPF area). */
const CAR_TYPE_STEP: BotStep = {
  id: "carType",
  question: "Який у вас автомобіль?",
  options: [
    { value: "sedan", label: "Седан", icon: "car" },
    { value: "suv", label: "Кросовер або SUV", icon: "jeep" },
    { value: "premium", label: "Преміум", icon: "crown" },
    { value: "other", label: "Інше", icon: "dots" },
  ],
};

/* 4 — logistics; pre-opens the matching slot day. */
const TIMELINE_STEP: BotStep = {
  id: "timeline",
  question: "Коли зручно підʼїхати?",
  options: [
    { value: "asap", label: "Якомога швидше", icon: "lightning" },
    { value: "weekend", label: "Цими вихідними", icon: "calendar" },
    { value: "info", label: "Спершу хочу ціну та деталі", icon: "info" },
  ],
};

/** Ordered step list with the detail step resolved from the chosen problem. */
export function getSteps(problem?: string): BotStep[] {
  return [
    PROBLEM_STEP,
    (problem && DETAIL_STEPS[problem]) || FALLBACK_DETAIL,
    CAR_TYPE_STEP,
    TIMELINE_STEP,
  ];
}

/** Car brands for the booking-form picker — common in Kyiv + premium segment.
 *  Optional field; helps the master prep before the call. "Інша" = free case. */
export const CAR_BRANDS = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Porsche",
  "Volkswagen",
  "Toyota",
  "Lexus",
  "Nissan",
  "Mazda",
  "Honda",
  "Land Rover",
  "Tesla",
  "Volvo",
  "Hyundai",
  "Kia",
  "Škoda",
  "Renault",
  "Ford",
  "Mitsubishi",
  "Peugeot",
  "Інша",
] as const;

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
  const option = PROBLEM_STEP.options.find((o) => o.value === problemValue);
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
