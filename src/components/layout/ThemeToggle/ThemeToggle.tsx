"use client";

import { useLayoutEffect } from "react";
import { Icon } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  labels: { toLight: string; toDark: string };
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f5f5f7" : "#000000");
}

/**
 * Sun/moon switch. The initial theme (dark unless the visitor chose light) is
 * set by the inline head script; this component reads it, toggles it and
 * remembers the choice.
 */
export function ThemeToggle({ labels }: ThemeToggleProps) {
  const theme = useTheme();

  // Switching language remounts the root layout, which resets <html> to the
  // default theme; restore the stored choice in the same commit, before paint.
  useLayoutEffect(() => {
    const stored = readStoredTheme();
    if (document.documentElement.dataset.theme !== stored) applyTheme(stored);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  };

  const label = theme === "light" ? labels.toDark : labels.toLight;

  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label={label} title={label}>
      <Icon name="sun" size={18} className={styles.sun} />
      <Icon name="moon" size={18} className={styles.moon} />
    </button>
  );
}
