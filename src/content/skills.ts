import type { IconName } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import type { Localized } from "@/i18n/localized";

export interface SkillGroup {
  id: string;
  icon: IconName;
  title: Localized;
  description: Localized;
  /** Tool and technology names are proper nouns; practices are localized. */
  items: readonly (string | Localized)[];
}

/**
 * Skills grouped by discipline. Edit freely: groups and items render in order.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "languages",
    icon: "code",
    title: { en: "Languages", ar: "اللغات" },
    description: {
      en: "Semantic, typed foundations for every interface.",
      ar: "أساس دلالي ومحدد الأنواع لكل واجهة.",
    },
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
  },
  {
    id: "frameworks",
    icon: "layers",
    title: { en: "Frameworks", ar: "الأطر والأدوات" },
    description: {
      en: "Component-driven apps that stay fast as they grow.",
      ar: "تطبيقات قائمة على المكونات تبقى سريعة مع نموها.",
    },
    items: ["React", "Next.js", "Node.js", "Tailwind CSS"],
  },
  {
    id: "3d-motion",
    icon: "cube",
    title: { en: "3D and motion", ar: "ثلاثي الأبعاد والحركة" },
    description: {
      en: "Real-time 3D scenes and motion that guide attention.",
      ar: "مشاهد ثلاثية الأبعاد لحظية وحركة توجّه الانتباه.",
    },
    items: ["Three.js", "React Three Fiber", "WebGL", { en: "CSS animation", ar: "حركة CSS" }],
  },
  {
    id: "craft",
    icon: "sparkle",
    title: { en: "Interface craft", ar: "إتقان الواجهات" },
    description: {
      en: "The details that make a product feel finished.",
      ar: "التفاصيل التي تجعل المنتج يبدو مكتملًا.",
    },
    items: [
      { en: "Responsive design", ar: "التصميم المتجاوب" },
      { en: "Accessibility", ar: "سهولة الوصول" },
      { en: "RTL and localization", ar: "دعم RTL والتعريب" },
      { en: "Web performance", ar: "أداء الويب" },
    ],
  },
  {
    id: "workflow",
    icon: "rocket",
    title: { en: "Workflow", ar: "سير العمل" },
    description: {
      en: "From first commit to a live, shareable link.",
      ar: "من أول تعديل برمجي إلى رابط مباشر قابل للمشاركة.",
    },
    items: ["Git", "GitHub", "Netlify", "Render"],
  },
];

/** Every skill as a flat, localized list, e.g. for the marquee band. */
export function getAllSkills(locale: Locale): string[] {
  return skillGroups.flatMap((group) => group.items.map((item) => (typeof item === "string" ? item : item[locale])));
}
