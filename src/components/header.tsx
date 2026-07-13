"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/70 bg-background/90 shadow-[0_14px_40px_rgba(2,8,23,0.18)] backdrop-blur-xl"
          : "border-transparent bg-background/55 backdrop-blur-md"
      )}
    >
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          <a className="flex items-center gap-3 font-display font-semibold" href="#inicio" aria-label="Ir para o inicio">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary font-detail text-[0.72rem] text-primary-foreground">
              AM
            </span>
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegacao principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              className="lg:hidden"
              size="icon"
              variant="secondary"
              aria-label="Abrir menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "grid overflow-hidden border-t border-border/70 transition-all lg:hidden",
            open ? "max-h-96 py-2" : "max-h-0 border-transparent py-0 opacity-0"
          )}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
