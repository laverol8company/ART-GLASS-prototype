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

    return () => {
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
