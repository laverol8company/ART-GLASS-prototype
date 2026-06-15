"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, Star } from "@phosphor-icons/react";
import { HeroParticles } from "@/components/ui/HeroParticles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACTS } from "@/lib/contacts";
import { ease } from "@/lib/motion-presets";

/* "на" is glued to "дорогу." with a non-breaking space — no orphan (§4.2). */
const WORDS = ["Чистий", "погляд", "на дорогу."];

/** Hero — full-bleed cinematic (§6.1). Dark car frame + scrim, kinetic headline,
 *  one magnetic CTA + Telegram, parallax + fade on scroll, scroll cue. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // cursor-parallax depth (desktop; off under reduced motion)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.4 });
  const bgX = useTransform(sx, [-1, 1], [-24, 24]);
  const bgYc = useTransform(sy, [-1, 1], [-18, 18]);
  const moteX = useTransform(sx, [-1, 1], [18, -18]);
  const moteY = useTransform(sy, [-1, 1], [14, -14]);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const resetPointer = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={ref}
      id="hero"
      data-section="hero"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* background photo — outer: scroll parallax; inner: cursor parallax */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        <motion.div style={{ x: bgX, y: bgYc }} className="absolute inset-0 scale-[1.12]">
          {/* optimized poster carries the LCP; the video overlays once it can
              play, and is skipped entirely under reduced motion (§6.1, §12) */}
          <Image
            src="/media/hero-car.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="graded object-cover"
          />
          {!reduce && (
            <video
              aria-hidden
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/media/hero-car.jpg"
              className="graded absolute inset-0 size-full object-cover"
            >
              <source src="/media/hero.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
      </motion.div>

      {/* cinematic colour wash — turquoise + deep blue light (on-brand, no red);
          the teal blob drifts slowly = ambient life */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(58% 55% at 12% 26%, rgba(45,212,191,0.24), transparent 62%)",
        }}
        initial={{ x: 0, y: 0 }}
        animate={reduce ? undefined : { x: [0, 34, 0], y: [0, -22, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(52% 50% at 92% 80%, rgba(56,132,222,0.18), transparent 60%)",
        }}
      />

      {/* scrims for legibility (AA, §5.4/§11) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,12,14,0.5), rgba(11,12,14,0.2) 28%, rgba(11,12,14,0.5) 66%, rgba(11,12,14,0.97))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, rgba(11,12,14,0.5), transparent 72%)",
        }}
      />

      {/* glass pane reflections — «крізь скло» (static, compositor-free) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 28%, rgba(255,255,255,0.035) 37%, rgba(255,255,255,0.07) 41%, transparent 51%), linear-gradient(115deg, transparent 57%, rgba(255,255,255,0.03) 63%, transparent 71%)",
        }}
      />

      {/* specular sweep — once on load */}
      <motion.div
        aria-hidden
        initial={{ x: "-130%" }}
        animate={reduce ? undefined : { x: "130%" }}
        transition={{ duration: 2.6, ease: ease.glide, delay: 0.7 }}
        className="pointer-events-none absolute inset-y-0 w-1/3"
        style={{
          background:
            "linear-gradient(100deg, transparent, rgba(255,255,255,0.05), transparent)",
        }}
      />

      {/* ambient light motes — cursor parallax (opposite, gentler) */}
      <motion.div
        aria-hidden
        style={{ x: moteX, y: moteY }}
        className="absolute inset-0"
      >
        <HeroParticles />
      </motion.div>

      {/* content — centered on mobile, editorial left on desktop (§4.3) */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-page relative z-10 flex w-full flex-col items-center text-center lg:items-start lg:text-left"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ease.out }}
        >
          <SectionLabel>Автоскло · {CONTACTS.city}</SectionLabel>
        </motion.div>

        <h1
          className="mt-6 flex max-w-[16ch] flex-wrap justify-center gap-x-[0.25em] font-display text-[clamp(2.6rem,8vw,6rem)] leading-[0.92] font-medium tracking-[-0.03em] text-bone lg:justify-start"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.55)" }}
        >
          {WORDS.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pb-[0.05em]">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: ease.out, delay: 0.15 + i * 0.09 }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.5 }}
          className="measure mt-6 text-balance text-base text-bone/80 sm:text-lg"
        >
          Ремонт сколів і тріщин, полірування скла та фар, захисна плівка. Ловимо
          скол, поки він не став тріщиною — у Києві.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.62 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
        >
          <MagneticButton
            href="#booking"
            className="rounded-pill bg-bone px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Записатися
          </MagneticButton>
          <a
            href={CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill border border-bone/25 bg-bg/30 px-6 py-3.5 text-sm text-bone backdrop-blur-sm transition-colors hover:border-bone/50"
          >
            Telegram
          </a>
        </motion.div>

        {/* inline trust — instant credibility above the fold */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.74 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted lg:justify-start"
        >
          <span>
            <strong className="font-medium text-bone tabular-nums">
              1{" "}240+
            </strong>{" "}
            авто
          </span>
          <span aria-hidden className="text-line-2">
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star size={15} weight="fill" className="text-rating" />
            <strong className="font-medium text-bone tabular-nums">4.9</strong>
          </span>
          <span aria-hidden className="text-line-2">
            ·
          </span>
          <span>
            <strong className="font-medium text-bone tabular-nums">
              36{" "}міс
            </strong>{" "}
            гарантії
          </span>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#proof"
        aria-label="Гортати далі"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-feature/80 transition-colors hover:text-feature"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={22} weight="light" />
        </motion.span>
      </motion.a>
    </section>
  );
}
