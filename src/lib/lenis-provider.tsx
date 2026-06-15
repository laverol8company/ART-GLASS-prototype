"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/**
 * Smooth scroll (§3) driven off the GSAP ticker so Lenis and ScrollTrigger
 * stay in lockstep. `anchors` gives every in-page `<a href="#id">` smooth
 * scroll with a header offset. Disabled under prefers-reduced-motion (§11) —
 * anchor clicks then fall back to native instant jumps. The instance lives in
 * a ref (no render-time state) and is read at call time via useLenis().
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -72 },
    });
    lenisRef.current = instance;

    instance.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    /* Section snap — every full-viewport block "clicks into place" so the page
       never rests on a half-and-half view. Proximity (not mandatory) with a
       half-viewport threshold: because each editorial block is exactly one
       screen tall, any resting point is always within reach of a block's top,
       so it always settles on a whole block — yet the threshold leaves the
       deep middle of tall sections free to scroll.

       Deliberately NOT snapped:
       • pinned full-height sections (Heal sweep, Process pan) — they already
         fill the viewport for their whole pin, so they never show a half-block,
         and snapping would fight the GSAP scrub;
       • the short ribbons (stats, brand marquee) and the masonry gallery —
         meant to be scrolled through, not dwelled on.
       Services is a tall sticky list, so each list item snaps to centre. */
    let snap: Snap | null = null;
    const snapRaf = requestAnimationFrame(() => {
      snap = new Snap(instance, {
        type: "proximity",
        lerp: 0.1,
        distanceThreshold: "50%",
        debounce: 250,
      });

      /* Snap to the TOP of every block — editorial one-screen sections, the
         tall list/gallery sections, AND the GSAP pin-spacers (Heal sweep,
         Process pan). Including the pin entries is what brackets the *bottom*
         half of the block above them, so a block is never left half-on-screen
         from either side. */
      const startEls = [
        ...[
          "hero",
          "problem",
          "before-after",
          "services",
          "works",
          "about",
          "reviews",
          "faq",
          "location",
          "booking",
        ]
          .map((id) => document.getElementById(id))
          .filter((el): el is HTMLElement => el !== null),
        ...Array.from(document.querySelectorAll<HTMLElement>(".pin-spacer")),
      ];
      snap.addElements(startEls, { align: "start" });

      /* Services is a tall sticky list — snap each item to centre too, so you
         can't rest on half an item between the section's top and its end. */
      const serviceItems = Array.from(
        document.querySelectorAll<HTMLElement>("#services [data-idx]"),
      );
      if (serviceItems.length) {
        snap.addElements(serviceItems, { align: "center" });
      }
    });

    return () => {
      cancelAnimationFrame(snapRaf);
      snap?.destroy();
      gsap.ticker.remove(onTick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}

/** Ref to the Lenis instance (null under reduced motion / before mount). */
export function useLenis() {
  return useContext(LenisContext);
}
