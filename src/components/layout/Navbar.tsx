"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Buraya kendi linklerini koy
const navLinks = [
  { label: "Link 1", href: "#" },
  { label: "Link 2", href: "#" },
  { label: "Link 3", href: "#" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-neutral-200/60 bg-white/70 backdrop-blur-md dark:border-neutral-800/60 dark:bg-neutral-950/70">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo — kendi logonu buraya koy */}
        <Link href="/" className="text-sm font-semibold tracking-tight">
          LOGO
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {link.label}
            </Link>
          ))}
          {/* CTA butonu */}
          <Button size="sm">Başla</Button>
        </div>

        <button
          type="button"
          aria-label="Menüyü aç"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-neutral-200/60 bg-white/95 px-4 py-4 md:hidden dark:border-neutral-800/60 dark:bg-neutral-950/95">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-neutral-600 dark:text-neutral-400"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="mt-2 w-full">
              Başla
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
