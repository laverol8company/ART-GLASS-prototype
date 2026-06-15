import type { Metadata, Viewport } from "next";
import { clashDisplay, geistMono, geistSans } from "@/lib/fonts";
import { SmoothScroll } from "@/lib/lenis-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { SectionCounter } from "@/components/layout/SectionCounter";
import { SkipLink } from "@/components/layout/SkipLink";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { ActivityToast } from "@/components/layout/ActivityToast";
import { cn } from "@/lib/utils";
import "./globals.css";

const SITE_DESCRIPTION =
  "Ремонт сколів і тріщин, полірування скла та фар, захисна плівка. " +
  "Ловимо скол, поки він не став тріщиною — у Києві.";

export const metadata: Metadata = {
  // PLACEHOLDER domain — replace with the real deployed URL.
  metadataBase: new URL("https://artglass-placeholder.vercel.app"),
  title: "Art Glass — ремонт і полірування автоскла у Києві",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Art Glass — автоскло у Києві",
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "uk_UA",
    siteName: "Art Glass",
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Glass — автоскло у Києві",
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0E",
  colorScheme: "dark",
};

/** Local SEO — JSON-LD AutomotiveBusiness (NAP/hours/areaServed/offers).
 *  PLACEHOLDER values (§13) — sync with the real Google Business Profile.
 *  aggregateRating intentionally omitted: prototype reviews are fictional. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Art Glass",
  description:
    "Ремонт сколів і тріщин, полірування скла та фар, захисна плівка у Києві.",
  url: "https://artglass-placeholder.vercel.app",
  telephone: "+380000000000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Київ",
    addressCountry: "UA",
    streetAddress: "вул. —",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  areaServed: { "@type": "City", name: "Київ" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Послуги Art Glass",
    itemListElement: [
      "Ремонт сколів і тріщин",
      "Полірування автоскла",
      "Полірування фар",
      "Захисна плівка",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      className={cn(
        clashDisplay.variable,
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <IntroLoader />
        <SkipLink />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
          <FloatingActions />
          <SectionCounter />
          <ActivityToast />
        </SmoothScroll>
        {/* Film grain over the whole page — texture only, never interactive. */}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
