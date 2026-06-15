export type NavSection = { id: string; label: string };

/**
 * Page blocks in §6 order (+ the signature «Ремонт» moment) — single source
 * for the section counter, mobile menu, and footer nav. IDs match each
 * section's `id` / `data-section` attribute.
 */
export const SECTIONS: NavSection[] = [
  { id: "hero", label: "Головна" },
  { id: "proof", label: "Цифри" },
  { id: "problem", label: "Проблема" },
  { id: "heal", label: "Ремонт" },
  { id: "before-after", label: "До / Після" },
  { id: "services", label: "Послуги" },
  { id: "process", label: "Процес" },
  { id: "works", label: "Роботи" },
  { id: "about", label: "Студія" },
  { id: "reviews", label: "Відгуки" },
  { id: "faq", label: "FAQ" },
  { id: "location", label: "Контакти" },
  { id: "booking", label: "Запис" },
];

/** Tight top-nav subset (§6 — keep the header restrained). */
const TOP_NAV_IDS = ["services", "works", "process", "reviews", "faq", "location"];

export const NAV_LINKS: NavSection[] = SECTIONS.filter((s) =>
  TOP_NAV_IDS.includes(s.id),
);
