/**
 * Locale-independent identity and contact details.
 * Anything translatable lives in the i18n dictionaries instead.
 */
export const siteConfig = {
  name: "Ahmad Dewedar",
  email: "ahmaddewedar2016@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type SocialId = "github" | "linkedin" | "fiverr";

export interface SocialLink {
  id: SocialId;
  label: string;
  /** Account name as shown on the platform. */
  handle: string;
  href: string;
}

export const socialLinks: readonly SocialLink[] = [
  { id: "github", label: "GitHub", handle: "Ahmad-git-Dewedar", href: "https://github.com/Ahmad-git-Dewedar" },
  { id: "linkedin", label: "LinkedIn", handle: "Ahmad Dewedar", href: "https://www.linkedin.com/in/ahmad-dewedar-706a4339b" },
  { id: "fiverr", label: "Fiverr", handle: "ahmad_dewedar", href: "https://www.fiverr.com/ahmad_dewedar" },
];
