import { Alan_Sans, Martel } from "next/font/google";

/** English display and body face. */
export const martel = Martel({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
  variable: "--font-martel",
});

/**
 * Arabic face. next/font only exposes the Latin subsets for preloading, but the
 * generated stylesheet still ships the Arabic unicode-range, so glyphs load on demand.
 */
export const alanSans = Alan_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-alan-sans",
  preload: false,
  adjustFontFallback: false,
});

export const fontVariables = `${martel.variable} ${alanSans.variable}`;
