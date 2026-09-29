import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/layout";
import { primaryNav, sectionIds } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getDirection, isLocale, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/paths";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

const MAIN_ID = "main";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
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

  return (
    <html lang={localeMeta[locale].htmlLang} dir={getDirection(locale)} className={fontVariables}>
      <body>
        <SkipLink targetId={MAIN_ID} label={dict.a11y.skipToContent} />
        <SiteHeader
          locale={locale}
          brandName={dict.person.name}
          homeHref={`#${sectionIds.home}`}
          links={primaryNav.map((item) => ({ label: dict.nav.links[item.key], href: item.href }))}
          cta={{ label: dict.nav.cta, href: `#${sectionIds.contact}` }}
          labels={{
            home: dict.a11y.homeLink,
            primaryNav: dict.a11y.primaryNav,
            openMenu: dict.a11y.openMenu,
            closeMenu: dict.a11y.closeMenu,
            languageSwitcher: dict.a11y.languageSwitcher,
          }}
        />
        <main id={MAIN_ID} tabIndex={-1}>
          {children}
        </main>
        <SiteFooter
          name={dict.person.name}
          role={dict.person.role}
          rightsLabel={dict.footer.rights}
          externalLinkLabel={dict.a11y.externalLink}
        />
      </body>
    </html>
  );
}
