"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button aria-label="Alternar tema" size="icon" variant="secondary" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      aria-label="Alternar tema"
      size="icon"
      variant="secondary"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title="Alternar tema"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
