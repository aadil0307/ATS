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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[9990] transition-colors duration-300",
        scrolled ? "bg-void/70 backdrop-blur-xl" : "bg-transparent",
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
          onClick={() => setOpen((v) => !v)}
          className="relative z-[9992] grid h-10 w-10 place-items-center rounded-md md:hidden"
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

      {/* Mobile full-screen overlay — clip-path circle reveal */}
      <div
        className={cn(
          "fixed inset-0 z-[9991] bg-void/95 backdrop-blur-2xl transition-[clip-path] duration-500 [transition-timing-function:cubic-bezier(0.77,0,0.175,1)] md:hidden",
          open
            ? "clip-path-[circle(150%_at_100%_0%)]"
            : "pointer-events-none clip-path-[circle(0%_at_100%_0%)]",
        )}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-10">
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
