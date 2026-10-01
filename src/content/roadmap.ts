import type { Localized } from "@/i18n/localized";

export interface Milestone {
  year: string;
  title: Localized;
  description: Localized;
  /** Technologies picked up that year; names stay untranslated. */
  skills: readonly string[];
  /** Marks the milestone in progress now. */
  current?: boolean;
}

/** The learning journey, oldest first. Add a year to extend the timeline. */
export const roadmap: readonly Milestone[] = [
  {
    year: "2021",
    title: { en: "Where it started", ar: "نقطة البداية" },
    description: {
      en: "Learned programming logic by snapping blocks together to build small games and animations.",
      ar: "تعلّمت منطق البرمجة بتركيب المكعبات لبناء ألعاب ورسوم متحركة صغيرة.",
    },
    skills: ["Scratch"],
  },
  {
    year: "2024",
    title: { en: "Writing real code", ar: "كتابة الكود الحقيقي" },
    description: {
      en: "Moved from blocks to text: variables, functions and solving problems step by step.",
      ar: "انتقلت من المكعبات إلى الكود المكتوب: المتغيرات والدوال وحل المشكلات خطوة بخطوة.",
    },
    skills: ["Python"],
  },
  {
    year: "2025",
    title: { en: "Building for the web", ar: "البناء للويب" },
    description: {
      en: "Started structuring and styling web pages, and sharing every project on GitHub.",
      ar: "بدأت في بناء صفحات الويب وتنسيقها، ومشاركة كل مشروع على GitHub.",
    },
    skills: ["HTML", "CSS", "GitHub"],
  },
  {
    year: "2026",
    title: { en: "Interactive apps", ar: "تطبيقات تفاعلية" },
    description: {
      en: "Building interactive, responsive web apps from the interface to the server.",
      ar: "أبني تطبيقات ويب تفاعلية ومتجاوبة من الواجهة حتى الخادم.",
    },
    skills: ["JavaScript", "Node.js", "React", "Tailwind CSS", "Responsive design"],
    current: true,
  },
];
