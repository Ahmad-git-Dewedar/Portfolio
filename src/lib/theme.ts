export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

/**
 * Runs in <head> before first paint: applies the stored choice, else the OS
 * preference, so the page never flashes the wrong theme. Kept tiny and
 * dependency-free because it is inlined into every page.
 */
export const themeInitScript = `(function(){var d=document.documentElement;try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");d.dataset.theme=s==="light"||s==="dark"?s:matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}catch(e){d.dataset.theme="${DEFAULT_THEME}"}})();`;
