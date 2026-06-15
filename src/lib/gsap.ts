"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once on the client. GSAP (incl. ScrollTrigger) is fully free —
// no Club token needed. Used for pinned sections, horizontal pan, scroll-sync.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
