import {
  Clock,
  InstagramLogo,
  MapPin,
  Phone,
  TelegramLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SECTIONS } from "@/lib/nav";
import { CONTACTS } from "@/lib/contacts";

/* Static for the prototype — a runtime Date in a server component risks a
   stale prerender + hydration warnings. Update on handoff. */
const YEAR = 2026;

export function Footer() {
  const navSections = SECTIONS.filter((s) => s.id !== "hero");

  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.2fr_1.3fr_1.1fr] md:gap-10">
        {/* Brand + CTA */}
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="measure text-sm text-muted">
            Студія ремонту й полірування автоскла у Києві. Ловимо скол, поки він
            не став тріщиною.
          </p>
          <a
            href="#booking"
            className="mt-1 inline-flex min-h-11 w-fit items-center rounded-pill bg-bone px-5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Записатися
          </a>
        </div>

        {/* Nav — two tight columns, not one tall strip */}
        <nav aria-label="Розділи" className="flex flex-col gap-4">
          <SectionLabel>Розділи</SectionLabel>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-muted transition-colors hover:text-bone"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacts — PLACEHOLDER (§13) */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Контакти</SectionLabel>

          {/* live open/closed status, synced to the visitor's clock */}
          <OpenStatus />

          <a
            href={CONTACTS.phoneHref}
            className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-bone"
          >
            <Phone size={16} weight="light" /> {CONTACTS.phone}
          </a>
          <span className="inline-flex items-center gap-2.5 text-sm text-muted">
            <MapPin size={16} weight="light" /> {CONTACTS.address}
          </span>
          <span className="inline-flex items-center gap-2.5 text-sm text-muted">
            <Clock size={16} weight="light" /> {CONTACTS.hours}
          </span>

          <div className="mt-1 flex items-center gap-3">
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="grid size-11 place-items-center rounded-md border border-line-2 text-muted transition-colors hover:border-chrome-2 hover:text-bone"
            >
              <TelegramLogo size={18} weight="light" />
            </a>
            <a
              href={CONTACTS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-11 place-items-center rounded-md border border-line-2 text-muted transition-colors hover:border-chrome-2 hover:text-bone"
            >
              <InstagramLogo size={18} weight="light" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {YEAR} {CONTACTS.brand}. Усі права захищені.
          </span>
          <span>
            Прототип — Laverol.{" "}
            <span className="text-muted-2/70">Контакти та ціни — приклад.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
