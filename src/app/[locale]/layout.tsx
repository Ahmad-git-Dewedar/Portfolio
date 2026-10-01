import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { AmbientBackground, ScrollProgress } from "@/components/decor";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/layout";
import { SpotlightTracker } from "@/components/motion";
import { footerNav, primaryNav, sectionIds } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getDirection, isLocale, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/paths";
import { fontVariables } from "@/lib/fonts";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import "@/styles/globals.css";

const MAIN_ID = "main";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: dict.meta.title,
    description: dict.meta.description,
    authors: [{ name: siteConfig.name }],
    alternates: {
      canonical: localizePath("/", locale),
      languages: Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, localizePath("/", l)])),
    },
    openGraph: {
      type: "website",
      title: dict.meta.title,
      description: dict.meta.description,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      siteName: siteConfig.name,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const toLink = (item: (typeof primaryNav)[number]) => ({ label: dict.nav.links[item.key], href: item.href });
  const navLinks = primaryNav.map(toLink);

  return (
    // The theme attribute is finalized by the inline script before paint, so React must not fight it.
    <html
      lang={localeMeta[locale].htmlLang}
      dir={getDirection(locale)}
      className={fontVariables}
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <AmbientBackground />
        <ScrollProgress />
        <SpotlightTracker />
        <SkipLink targetId={MAIN_ID} label={dict.a11y.skipToContent} />
        <SiteHeader
          locale={locale}
          brandName={dict.person.name}
          homeHref={`#${sectionIds.home}`}
          links={navLinks}
          cta={{ label: dict.nav.cta, href: `#${sectionIds.contact}` }}
          labels={{
            home: dict.a11y.homeLink,
            primaryNav: dict.a11y.primaryNav,
            openMenu: dict.a11y.openMenu,
            closeMenu: dict.a11y.closeMenu,
            languageSwitcher: dict.a11y.languageSwitcher,
            themeToLight: dict.a11y.themeToLight,
            themeToDark: dict.a11y.themeToDark,
          }}
        />
        <main id={MAIN_ID} tabIndex={-1}>
          {children}
        </main>
        <SiteFooter
          name={dict.person.name}
          role={dict.person.role}
          homeHref={`#${sectionIds.home}`}
          homeLabel={dict.a11y.homeLink}
          links={footerNav.map(toLink)}
          labels={{
            rights: dict.footer.rights,
            backToTop: dict.footer.backToTop,
            externalLink: dict.a11y.externalLink,
            primaryNav: dict.a11y.footerNav,
          }}
        />
      </body>
    </html>
  );
}
