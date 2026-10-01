"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  labels: { toLight: string; toDark: string };
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f5f5f7" : "#000000");
}

/**
 * Sun/moon switch. The initial theme is set by the inline head script; this
 * component only reads it, toggles it, remembers the choice, and keeps
 * following the OS setting until the visitor picks a theme explicitly.
 */
export function ThemeToggle({ labels }: ThemeToggleProps) {
  const theme = useTheme();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      try {
        if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {
        // Storage unavailable: still follow the OS.
      }
      applyTheme(media.matches ? "light" : "dark");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
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
