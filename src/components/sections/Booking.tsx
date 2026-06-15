import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { BotQualifier } from "@/components/bot/BotQualifier";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Booking (§6.12) — qualifier card + handoff. Quote-driven, no phone-only path. */
export function Booking() {
  return (
    <section
      id="booking"
      data-section="booking"
      className="relative isolate flex min-h-screen flex-col justify-center py-12"
    >
      <SectionBg src="/media/bg-booking.jpg" scrim="full" drift={0} />
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="flex flex-col gap-5">
          <SectionLabel>Запис</SectionLabel>
          <h2 className="max-w-[16ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
            Підберемо послугу за 30 секунд.
          </h2>
          <p className="measure text-muted">
            Кілька кроків — і ви отримаєте рекомендацію, орієнтовну ціну та
            вільні вікна. Без дзвінків і очікування на лінії.
          </p>
          <ul className="mt-2 flex flex-col gap-4 text-sm text-muted">
            {[
              "Чесна рекомендація під вашу ситуацію",
              "Орієнтовна ціна одразу, точна — після огляду",
              "Майстер передзвонить і підтвердить зручний час",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <ShieldCheck
                  size={18}
                  weight="light"
                  className="mt-0.5 shrink-0 text-accent"
                />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <BotQualifier />
        </Reveal>
      </div>
    </section>
  );
}
