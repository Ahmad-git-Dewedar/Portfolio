export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export type Direction = "ltr" | "rtl";

export const defaultLocale: Locale = "en";

interface LocaleMeta {
  /** Native language name, shown in the language switcher. */
  label: string;
  /** Compact label for tight UI (e.g. the header switcher). */
  shortLabel: string;
  dir: Direction;
  /** BCP 47 tag used for formatting and `hreflang`. */
  htmlLang: string;
  /** Open Graph locale. */
  ogLocale: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { label: "English", shortLabel: "EN", dir: "ltr", htmlLang: "en", ogLocale: "en_US" },
  ar: { label: "العربية", shortLabel: "عربي", dir: "rtl", htmlLang: "ar", ogLocale: "ar_EG" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): Direction {
  return localeMeta[locale].dir;
}
