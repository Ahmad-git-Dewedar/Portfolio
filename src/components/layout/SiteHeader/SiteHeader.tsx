"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Button, Container, Icon } from "@/components/ui";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";
import { BrandMark } from "../BrandMark";
import { LanguageSwitcher } from "../LanguageSwitcher";
import styles from "./SiteHeader.module.css";

export interface HeaderLink {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  locale: Locale;
  brandName: string;
  homeHref: string;
  links: readonly HeaderLink[];
  cta: HeaderLink;
  labels: {
    home: string;
    primaryNav: string;
    openMenu: string;
    closeMenu: string;
    languageSwitcher: string;
  };
}

const SCROLL_THRESHOLD = 8;

export function SiteHeader({ locale, brandName, homeHref, links, cta, labels }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const sectionIds = useMemo(() => links.map((link) => link.href.replace(/^#/, "")), [links]);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={cn(styles.header, (isScrolled || isMenuOpen) && styles.elevated)}>
      <Container size="wide" className={styles.frame}>
        <div className={styles.bar}>
          <BrandMark href={homeHref} name={brandName} ariaLabel={labels.home} />

          <nav aria-label={labels.primaryNav} className={styles.nav}>
            <ul role="list" className={styles.links}>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.link}
                    aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <LanguageSwitcher currentLocale={locale} label={labels.languageSwitcher} />
            <Button href={cta.href} size="sm" className={styles.cta}>
              {cta.label}
            </Button>
            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              aria-label={isMenuOpen ? labels.closeMenu : labels.openMenu}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <Icon name={isMenuOpen ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>

        <div id={menuId} className={styles.menu} hidden={!isMenuOpen}>
          <nav aria-label={labels.primaryNav}>
            <ul role="list" className={styles.menuLinks}>
              {[...links, cta].map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href} className={styles.menuLink} onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
