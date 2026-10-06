/** Attribute on <html> that switches scroll-driven scenes on. Absent = static layout. */
export const SCROLL_ATTRIBUTE = "data-scroll";

/**
 * Inlined in <head>: enables cinematic scroll layouts before first paint, so
 * the page never jumps from a static to a pinned layout during hydration.
 * Without JavaScript, or with reduced motion, the static layout stays.
 */
export const motionInitScript = `(function(){try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("${SCROLL_ATTRIBUTE}","on")}catch(e){}})();`;
