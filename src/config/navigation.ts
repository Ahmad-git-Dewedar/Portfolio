import type { Dictionary } from "@/i18n/dictionaries/en";

/** In-page sections. Add an entry here and a label in the dictionaries to extend the nav. */
export const sectionIds = {
  home: "top",
  work: "work",
  about: "about",
  skills: "skills",
  contact: "contact",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export interface NavItem {
  key: keyof Dictionary["nav"]["links"];
  href: `#${string}`;
}

export const primaryNav: readonly NavItem[] = [
  { key: "work", href: `#${sectionIds.work}` },
  { key: "about", href: `#${sectionIds.about}` },
  { key: "skills", href: `#${sectionIds.skills}` },
  { key: "contact", href: `#${sectionIds.contact}` },
];
