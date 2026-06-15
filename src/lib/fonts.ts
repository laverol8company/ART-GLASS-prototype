import localFont from "next/font/local";

/**
 * Self-hosted fonts (§3, §4.2) via next/font/local — zero external requests,
 * size-adjusted fallbacks for low CLS. Variable axes, one weight range each.
 *
 *   Display — Clash Display (Fontshare / ITF). Large headings only.
 *   Body    — Geist (Vercel, OFL).
 *   Mono    — Geist Mono (Vercel, OFL). Tabular numerics for stats/prices.
 *
 * Serif lives ONLY in the logo, never in layout (§4.2, §16).
 */

export const clashDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
  preload: true,
  fallback: ["Neue Montreal", "system-ui", "sans-serif"],
});

export const geistSans = localFont({
  src: "../../public/fonts/Geist-Variable.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["Hanken Grotesk", "system-ui", "sans-serif"],
});

export const geistMono = localFont({
  src: "../../public/fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  fallback: ["JetBrains Mono", "ui-monospace", "monospace"],
});
