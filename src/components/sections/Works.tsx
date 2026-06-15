import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WORKS } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Works (§6.7) — masonry gallery, hover-zoom, caption rising from the bottom
 * (gradient scrim, never a plaque over the photo, §16). Captions stay visible
 * on touch where there is no hover.
 */
export function Works() {
  return (
    <section id="works" data-section="works" className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal className="mb-12 flex flex-col gap-4">
          <SectionLabel>Наші роботи</SectionLabel>
          <h2 className="max-w-[20ch] font-display text-3xl leading-[1.05] font-medium tracking-[-0.02em] text-bone sm:text-4xl md:text-5xl">
            Авто, з якими ми працювали.
          </h2>
        </Reveal>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {WORKS.map((w) => (
            <figure
              key={w.id}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[var(--radius-lg)] border border-line"
            >
              <MediaPlaceholder
                src={w.img}
                alt={`${w.title} — ${w.service}`}
                className={cn(
                  "w-full transition-transform duration-500 group-hover:scale-[1.04]",
                  w.tall ? "aspect-[3/4]" : "aspect-[4/3]",
                )}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent p-4 opacity-100 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                <span className="font-display text-base text-bone">
                  {w.title}
                </span>
                <span className="text-xs text-muted">{w.service}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
