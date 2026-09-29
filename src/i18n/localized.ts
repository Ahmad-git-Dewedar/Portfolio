import type { Locale } from "./config";

/** A value authored once per locale, used for content that lives outside the dictionaries. */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
