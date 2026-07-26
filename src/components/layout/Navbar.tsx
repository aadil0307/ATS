"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Logo from "@/components/layout/Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Stop Lenis from hijacking scroll/touch while the mobile menu is open
    const lenis = (
      window as unknown as { lenis?: { stop: () => void; start: () => void } }
    ).lenis;
    if (lenis) open ? lenis.stop() : lenis.start();
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [open]);

  // Close the menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu if the viewport grows back to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[9990] transition-colors duration-300",
        scrolled && !open ? "bg-void/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 sm:h-20 sm:px-10">
        <Logo variant="full" />

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-pill px-4 py-2 text-sm font-medium text-silver transition-colors hover:text-ice"
            >
              {l.label}
            </Link>
          ))}
          <Button href="/contact" className="ml-3 px-5 py-2.5">
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[9992] grid h-11 w-11 touch-manipulation place-items-center rounded-md md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-6 bg-ice transition-transform duration-300",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-ice transition-opacity duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-6 bg-ice transition-transform duration-300",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </span>
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className={cn(
          "fixed inset-0 z-[9991] bg-void/95 backdrop-blur-xl md:hidden transition-all duration-300 ease-out",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none hidden",
        )}
      >
        <div
          className={cn(
            "flex h-full flex-col justify-center gap-2 overflow-y-auto px-8 py-20 transition-transform duration-500",
            open ? "translate-y-0" : "translate-y-8",
          )}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-bold text-ice transition-colors hover:text-blue-bright"
            >
              {l.label}
            </Link>
          ))}
          <Button href="/contact" className="mt-8 self-start px-7 py-3.5">
            Let&apos;s Talk
          </Button>
        </div>
      </div>
    </header>
  );
}
