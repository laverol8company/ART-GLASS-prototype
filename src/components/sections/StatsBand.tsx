import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg } from "@/components/ui/SectionBg";
import { STATS } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Stats band (§6.2) — one row with thin dividers, count-up, tabular numerics.
 *  NOT three cards. Accent only on the unit/suffix (≤5%). */
export function StatsBand() {
  return (
    <section
      id="proof"
      data-section="proof"
      className="relative isolate py-14 sm:py-16"
    >
      <SectionBg src="/media/bg-stats.jpg" scrim="full" drift={0} />
      <div className="container-page">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:flex sm:justify-between sm:gap-0">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col gap-2 sm:flex-1 sm:px-8",
                  i > 0 && "sm:border-l sm:border-line",
                )}
              >
                <dd className="font-display text-4xl leading-none font-medium text-bone sm:text-5xl">
                  <CountUp value={stat.value} className="tabular-nums" />
                  <span className="text-accent">{stat.suffix}</span>
                </dd>
                <dt className="text-sm text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
