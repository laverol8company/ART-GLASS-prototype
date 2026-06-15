import { Hero } from "@/components/sections/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { Problem } from "@/components/sections/Problem";
import { HealCrack } from "@/components/sections/HealCrack";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Works } from "@/components/sections/Works";
import { BrandsMarquee } from "@/components/sections/BrandsMarquee";
import { About } from "@/components/sections/About";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { Booking } from "@/components/sections/Booking";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <StatsBand />
      <Problem />
      <HealCrack />
      <BeforeAfter />
      <Services />
      <Process />
      <Works />
      <BrandsMarquee />
      <About />
      <Reviews />
      <Faq />
      <Location />
      <Booking />
    </main>
  );
}
