"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type CSSProperties } from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { switchLocaleInPath } from "@/i18n/paths";
import styles from "./LanguageSwitcher.module.css";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  label: string;
  className?: string;
}

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

/** Keeps the current in-page section when the language changes. */
function useHash() {
  return useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => "",
  );
}

export function LanguageSwitcher({ currentLocale, label, className }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${currentLocale}`;
  const hash = useHash();
  const activeIndex = locales.indexOf(currentLocale);

  return (
    <nav aria-label={label} className={cn(styles.switcher, className)}>
      <Icon name="globe" size={16} className={styles.globe} />
      <div className={styles.track} style={{ "--active-index": activeIndex } as CSSProperties}>
        <span className={styles.thumb} aria-hidden="true" />
        <ul role="list" className={styles.options}>
        {locales.map((locale) => {
          const meta = localeMeta[locale];
          const isActive = locale === currentLocale;
          return (
            <li key={locale}>
              <Link
                href={`${switchLocaleInPath(pathname, locale)}${hash}`}
                hrefLang={meta.htmlLang}
                lang={meta.htmlLang}
                aria-current={isActive ? "true" : undefined}
                aria-label={meta.label}
                className={cn(styles.option, isActive && styles.active)}
                scroll={false}
              >
                {meta.shortLabel}
              </Link>
            </li>
          );
        })}
        </ul>
      </div>
    </nav>
  );
}
