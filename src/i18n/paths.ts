import { isLocale, type Locale } from "./config";

/** Prefixes an app-relative path with a locale segment: ("/work", "ar") -> "/ar/work". */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Replaces the locale segment of a pathname, preserving the rest of the route. */
export function switchLocaleInPath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }
  return localizePath(pathname, locale);
}
