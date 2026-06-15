import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Дякуємо — Art Glass",
  robots: { index: false },
};

export default function ThankYou() {
  return (
    <main className="grid min-h-[80svh] place-items-center px-6 py-32 text-center">
      <div className="flex flex-col items-center gap-6">
        <CheckCircle size={48} weight="light" className="text-accent" />
        <h1 className="max-w-[16ch] font-display text-4xl font-medium tracking-[-0.02em] text-bone sm:text-5xl">
          Дякуємо! Ми на звʼязку.
        </h1>
        <p className="measure text-muted">
          Отримали вашу заявку — майстер напише в Telegram найближчим часом. Якщо
          зручніше, телефонуйте просто зараз.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-bone px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Відкрити Telegram
          </a>
          <a
            href={CONTACTS.phoneHref}
            className="rounded-pill border border-line-2 px-6 py-3.5 text-sm text-bone transition-colors hover:border-chrome-2"
          >
            Зателефонувати
          </a>
          <Link
            href="/"
            className="rounded-pill px-6 py-3.5 text-sm text-muted transition-colors hover:text-bone"
          >
            На головну
          </Link>
        </div>
      </div>
    </main>
  );
}
