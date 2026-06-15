import { Clock, MapPin, NavigationArrow, Phone } from "@phosphor-icons/react/dist/ssr";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACTS } from "@/lib/contacts";

/**
 * Location + contacts (§6.11) — split. Real Google Maps embed darkened with a
 * CSS filter (no API key); live open/closed status; tap-to-call & tap-to-route.
 * PLACEHOLDER data (§13) — replace the map query with the exact address.
 */
export function Location() {
  return (
    <section
      id="location"
      data-section="location"
      className="relative isolate flex min-h-screen flex-col justify-center py-14"
    >
      <SectionBg src="/media/bg-location.jpg" scrim="right" drift={2} />
      <div className="container-page">
        <Reveal className="mb-8 flex flex-col gap-4">
          <SectionLabel>Локація</SectionLabel>
          <h2 className="max-w-[20ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
            Знайти нас у Києві.
          </h2>
        </Reveal>

        <div className="grid items-stretch gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          {/* real Google map, darkened to fit the theme */}
          <Reveal>
            <div className="relative h-[300px] w-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface lg:h-[54vh]">
              <iframe
                title="Карта — Art Glass, Київ"
                src="https://www.google.com/maps?q=%D0%9A%D0%B8%D1%97%D0%B2&z=12&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full"
                style={{
                  border: 0,
                  filter:
                    "invert(0.92) hue-rotate(180deg) brightness(0.9) contrast(0.95) saturate(0.6)",
                }}
              />
              <span className="pointer-events-none absolute bottom-3 left-3 rounded-pill bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-muted-2 uppercase">
                replace with exact address
              </span>
            </div>
          </Reveal>

          {/* contact panel */}
          <Reveal delay={0.05} className="flex flex-col justify-center gap-6">
            <OpenStatus />

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-muted">
                <MapPin size={20} weight="light" className="mt-0.5 shrink-0" />
                <span>{CONTACTS.address}</span>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <Clock size={20} weight="light" className="mt-0.5 shrink-0" />
                <span>{CONTACTS.hours}</span>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <Phone size={20} weight="light" className="mt-0.5 shrink-0" />
                <a
                  href={CONTACTS.phoneHref}
                  className="transition-colors hover:text-bone"
                >
                  {CONTACTS.phone}
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={CONTACTS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-bone px-5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                <NavigationArrow size={16} weight="light" /> Прокласти маршрут
              </a>
              <a
                href={CONTACTS.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-line-2 px-5 text-sm text-bone transition-colors hover:border-chrome-2"
              >
                <Phone size={16} weight="light" /> Зателефонувати
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
