import "server-only";
import type { Locale } from "../config";
import type { Dictionary } from "./en";

export type { Dictionary };

// Lazily loaded so each locale only pulls in its own strings.
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en").then((m) => m.default),
  ar: () => import("./ar").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
