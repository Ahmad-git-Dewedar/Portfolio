import type { Localized } from "@/i18n/localized";

export type ProjectVisualVariant = "browser" | "mobile" | "dashboard";

export interface Project {
  slug: string;
  title: Localized;
  summary: Localized;
  /** Technologies are proper nouns and stay untranslated. */
  stack: readonly string[];
  visual: {
    variant: ProjectVisualVariant;
    /** Two-stop gradient behind the device, as CSS colors. */
    tint: readonly [string, string];
    /** Optional screenshot; the abstract device mock is used when omitted. */
    image?: string;
  };
  /** Live site or repository. Cards without a link render as "coming soon". */
  href?: string;
  /** Featured projects span the full width of the grid. */
  featured?: boolean;
}

/**
 * Placeholder entries that exercise every layout variant.
 * Replace titles, summaries, stack and links with real case studies.
 */
export const projects: readonly Project[] = [
  {
    slug: "project-one",
    title: { en: "Project One", ar: "المشروع الأول" },
    summary: {
      en: "A featured build presented as a full-width product story.",
      ar: "مشروع مميز يُعرض كقصة منتج بعرض كامل.",
    },
    stack: ["Next.js", "TypeScript", "Three.js"],
    visual: { variant: "browser", tint: ["#1b3a6b", "#0a0f1c"] },
    featured: true,
  },
  {
    slug: "project-two",
    title: { en: "Project Two", ar: "المشروع الثاني" },
    summary: {
      en: "A mobile-first experience showcased on a device frame.",
      ar: "تجربة موجهة للجوال تُعرض داخل إطار جهاز.",
    },
    stack: ["React", "CSS"],
    visual: { variant: "mobile", tint: ["#3a2a6b", "#0d0a1c"] },
  },
  {
    slug: "project-three",
    title: { en: "Project Three", ar: "المشروع الثالث" },
    summary: {
      en: "A data-rich interface presented as a dashboard.",
      ar: "واجهة غنية بالبيانات تُعرض كلوحة تحكم.",
    },
    stack: ["React", "TypeScript"],
    visual: { variant: "dashboard", tint: ["#14514a", "#07120f"] },
  },
];
