"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TelegramLogo, X } from "@phosphor-icons/react";
import { SECTIONS } from "@/lib/nav";
import { CONTACTS } from "@/lib/contacts";
import { useLenis } from "@/lib/lenis-provider";

/** Fullscreen glass overlay with the section list + counter (§6, §9). */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const lenisRef = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const lenis = lenisRef?.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // focus trap — Tab cycles inside the dialog (§11)
      if (e.key === "Tab") {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const focusables = Array.from(
          overlay.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !overlay.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !overlay.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    lenis?.stop();
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, onClose, lenisRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass fixed inset-0 z-[90] flex flex-col rounded-none lg:hidden"
        >
          <div className="container-page flex h-16 items-center justify-between">
            <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
              Меню
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Закрити меню"
              className="grid size-10 place-items-center rounded-md text-bone hover:bg-surface"
            >
              <X size={22} weight="light" />
            </button>
          </div>

          <nav
            className="container-page flex flex-1 flex-col justify-center"
            aria-label="Розділи"
          >
            {SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={onClose}
                className="group flex items-baseline gap-4 border-b border-line/60 py-3"
              >
                <span className="font-mono text-xs text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl text-bone transition-colors group-hover:text-chrome">
                  {s.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="container-page flex flex-col gap-3 pt-4 pb-8">
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-line-2 py-3 text-sm text-bone"
            >
              <TelegramLogo size={18} weight="light" /> Telegram
            </a>
            <a
              href="#booking"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-pill bg-bone py-3 text-sm font-medium text-bg"
            >
              Записатися
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
