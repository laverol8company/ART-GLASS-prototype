import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Problem (§6.3) — editorial split, fits one screen: dense text left, colour
 *  macro right (image capped to the viewport so the block never overflows). */
export function Problem() {
  return (
    <section
      id="problem"
      data-section="problem"
      className="relative isolate flex min-h-screen items-center py-20 lg:py-0"
    >
      <SectionBg src="/media/glass-crack-night.jpg" scrim="left" drift={1} />
      <div className="container-page grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="flex flex-col gap-5">
            <SectionLabel>Проблема</SectionLabel>
            <h2 className="max-w-[18ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
              Маленький скол швидко стає тріщиною.
            </h2>
            <div className="measure flex flex-col gap-4 text-muted">
              <p>
                Камінь з-під коліс — і на склі скол. Кілька перепадів температур,
                яма на дорозі — і він повзе тріщиною через усе лобове. Тоді
                ремонт уже не врятує: лише заміна.
              </p>
              <p>
                Мутні жовті фари світять у пів сили — вночі ви бачите дорогу
                гірше, ніж думаєте. А подряпини на склі дають блики від
                зустрічних фар і сонця.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={0.1}>
          <Parallax className="h-[40vh] w-full rounded-[var(--radius-lg)] lg:h-[74vh]">
            <MediaPlaceholder
              src="/media/problem-glass.jpg"
              alt="Погана видимість крізь мокре скло вночі"
              className="h-full w-full"
            />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
