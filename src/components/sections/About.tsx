import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { STUDIO, TRUST } from "@/lib/content";

/**
 * Studio / why us (§6.8) — asymmetric: named master + anchor photo, short
 * trust story, then a divided trust list (NOT three equal cards, §16).
 */
export function About() {
  return (
    <section
      id="about"
      data-section="about"
      className="relative isolate flex min-h-screen flex-col justify-center py-12"
    >
      <SectionBg src="/media/bg-about.jpg" scrim="right" drift={2} />
      <div className="container-page">
        {/* alternating split — photo LEFT (Problem had it right), fits viewport */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-1">
            <Parallax className="h-[30vh] w-full rounded-[var(--radius-lg)] lg:h-[46vh]">
              <MediaPlaceholder
                src="/media/polishing.jpg"
                alt="Майстер студії за роботою"
                className="h-full w-full"
              />
            </Parallax>
          </Reveal>

          <Reveal className="order-2 flex flex-col gap-5" delay={0.1}>
            <SectionLabel>Чому ми</SectionLabel>
            <h2 className="max-w-[18ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
              Зі склом працює майстер, а не конвеєр.
            </h2>
            <div className="measure flex flex-col gap-4 text-muted">
              <p>
                {STUDIO.master} — {STUDIO.masterRole.toLowerCase()}, {STUDIO.experience}.
                Кожне авто оглядає особисто й каже чесно: ремонт врятує скло чи
                вже потрібна заміна.
              </p>
              <p>
                Ми не женемося за кількістю — і показуємо результат під лампою до
                того, як ви заберете авто.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {TRUST.map((point) => (
              <li
                key={point.id}
                className="flex flex-col gap-1.5 border-t border-line pt-4"
              >
                <h3 className="font-display text-lg font-medium text-bone">
                  {point.title}
                </h3>
                <p className="text-sm text-muted">{point.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
