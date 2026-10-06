import type { Dictionary } from "@/i18n/dictionaries/en";

/** In-page sections. Add an entry here and a label in the dictionaries to extend the nav. */
export const sectionIds = {
  home: "top",
  work: "work",
  about: "about",
  roadmap: "roadmap",
  skills: "skills",
  youtube: "youtube",
  faq: "faq",
  contact: "contact",
} as const;

/** Section numbers shown in the eyebrows, in page order. Reorder sections here. */
export const sectionNumbers = {
  about: "01",
  work: "02",
  roadmap: "03",
  skills: "04",
  youtube: "05",
  faq: "06",
  contact: "07",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export interface NavItem {
  key: keyof Dictionary["nav"]["links"];
  href: `#${string}`;
}

/** Header navigation: the main stops, kept short so it fits the capsule. */
export const primaryNav: readonly NavItem[] = [
  { key: "about", href: `#${sectionIds.about}` },
  { key: "work", href: `#${sectionIds.work}` },
  { key: "roadmap", href: `#${sectionIds.roadmap}` },
  { key: "youtube", href: `#${sectionIds.youtube}` },
  { key: "contact", href: `#${sectionIds.contact}` },
];

/** Footer navigation: every section. */
export const footerNav: readonly NavItem[] = [
  { key: "about", href: `#${sectionIds.about}` },
  { key: "work", href: `#${sectionIds.work}` },
  { key: "roadmap", href: `#${sectionIds.roadmap}` },
  { key: "skills", href: `#${sectionIds.skills}` },
  { key: "youtube", href: `#${sectionIds.youtube}` },
  { key: "faq", href: `#${sectionIds.faq}` },
  { key: "contact", href: `#${sectionIds.contact}` },
];
