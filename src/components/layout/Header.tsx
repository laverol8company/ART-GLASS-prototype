"use client";

import { useCallback, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { List } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Sticky header: transparent over the hero → frosted glass on scroll (§6, §9). */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
          scrolled
            ? "border-b border-line/80 bg-bg/95 backdrop-blur-md supports-[backdrop-filter]:bg-bg/65"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Розділи">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="py-3 text-sm text-muted transition-colors hover:text-bone"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="mr-1 hidden lg:inline-flex">
              <OpenStatus compact />
            </span>
            <a
              href="#booking"
              className="hidden min-h-11 items-center rounded-pill bg-bone px-4 text-sm font-medium text-bg transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Записатися
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Відкрити меню"
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center rounded-md text-bone transition-colors hover:bg-surface lg:hidden"
            >
              <List size={22} weight="light" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
