/**
 * PLACEHOLDER contacts (§13) — NOT real. Replace with client data.
 * Single source for header, floating actions, footer, location and the bot.
 */
export const CONTACTS = {
  brand: "Art Glass",
  city: "Київ",
  /* PLACEHOLDER — replace */ phone: "+38 (0XX) XXX-XX-XX",
  /* PLACEHOLDER — replace */ phoneHref: "tel:+380000000000",
  /* PLACEHOLDER — replace */ address: "Київ, вул. —",
  /* PLACEHOLDER — replace */ hours: "Пн–Сб 10:00–20:00 · Нд — вихідний",
  /* PLACEHOLDER — replace */ telegram: "https://t.me/ARTGLASS_PLACEHOLDER",
  /* PLACEHOLDER — replace */ instagram: "https://instagram.com/ARTGLASS_PLACEHOLDER",
  /* PLACEHOLDER — replace */ maps: "https://maps.google.com/?q=Kyiv",
} as const;

/**
 * Booking handoff to Telegram (§8) with an optional pre-filled summary,
 * e.g. "Авто: …; Послуга: …; Бажаний час: …".
 */
export function buildTelegramLink(summary?: string): string {
  if (!summary) return CONTACTS.telegram;
  return `${CONTACTS.telegram}?text=${encodeURIComponent(summary)}`;
}
