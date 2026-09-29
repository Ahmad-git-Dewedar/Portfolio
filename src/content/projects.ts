import type { Locale } from "@/i18n/config";
import { pick, type Localized } from "@/i18n/localized";

export interface ProjectImage {
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
  alt: Localized;
}

export interface Project {
  slug: string;
  title: Localized;
  category: Localized;
  summary: Localized;
  /** Short feature highlights shown on the featured card and in the preview. */
  highlights: Localized<readonly string[]>;
  tags: Localized<readonly string[]>;
  /** Live deployment. */
  href: string;
  image: ProjectImage;
  /** Brand color of the project, used for hover glows and accents. */
  accent: string;
  /** Featured projects get the large, full-width card. */
  featured?: boolean;
}

export const projects: readonly Project[] = [
  {
    slug: "ultimate-xi",
    title: { en: "Ultimate XI", ar: "Ultimate XI" },
    category: { en: "Web game", ar: "لعبة ويب" },
    summary: {
      en: "A football squad-building game in the browser. Open packs, build a chemistry-driven starting XI, trade on the market and play matches against a bot to earn coins and gems.",
      ar: "لعبة كرة قدم لبناء الفريق داخل المتصفح. افتح الحزم، وكوّن تشكيلة أساسية مبنية على الانسجام، وتداول في السوق، والعب مباريات ضد الكمبيوتر لتربح العملات والجواهر.",
    },
    highlights: {
      en: [
        "Pack opening with a free daily pack",
        "Squad builder with team rating and chemistry",
        "Matches against a bot with coin and gem rewards",
        "Player market, collection and level progression",
      ],
      ar: [
        "فتح الحزم مع حزمة مجانية يومية",
        "بناء التشكيلة مع تقييم الفريق والانسجام",
        "مباريات ضد الكمبيوتر بمكافآت من العملات والجواهر",
        "سوق اللاعبين والمجموعة ونظام المستويات",
      ],
    },
    tags: { en: ["Game UI", "Web app", "Dashboard"], ar: ["واجهة لعبة", "تطبيق ويب", "لوحة تحكم"] },
    href: "https://ultimate-xi-1zky.onrender.com",
    image: {
      src: "/projects/ultimate-xi.webp",
      width: 1887,
      height: 892,
      alt: {
        en: "Ultimate XI home screen showing the Squad Ready panel, team stats and the daily free pack",
        ar: "الشاشة الرئيسية للعبة Ultimate XI وتظهر لوحة جاهزية الفريق وإحصاءاته والحزمة المجانية اليومية",
      },
    },
    accent: "#ffc72c",
    featured: true,
  },
  {
    slug: "iphone-17-pro-max",
    title: { en: "iPhone 17 Pro Max", ar: "iPhone 17 Pro Max" },
    category: { en: "Product experience", ar: "تجربة منتج" },
    summary: {
      en: "A cinematic product launch page with bold typography and a scroll-driven story across experience, design, performance and camera.",
      ar: "صفحة إطلاق منتج سينمائية بخطوط جريئة وقصة تتكشف مع التمرير عبر التجربة والتصميم والأداء والكاميرا.",
    },
    highlights: {
      en: ["Scroll-driven storytelling", "Editorial, large-scale typography", "English and Arabic versions"],
      ar: ["سرد قصصي يتفاعل مع التمرير", "طباعة تحريرية بأحجام كبيرة", "نسختان بالإنجليزية والعربية"],
    },
    tags: { en: ["Landing page", "Motion", "Bilingual"], ar: ["صفحة هبوط", "حركة", "ثنائية اللغة"] },
    href: "https://iphone17promax-project.netlify.app",
    image: {
      src: "/projects/iphone-17-pro-max.webp",
      width: 1893,
      height: 835,
      alt: {
        en: "iPhone 17 Pro Max landing page hero with oversized white and orange headline",
        ar: "واجهة صفحة iPhone 17 Pro Max بعنوان ضخم باللونين الأبيض والبرتقالي",
      },
    },
    accent: "#ff7a1a",
  },
  {
    slug: "ps5-3d",
    title: { en: "PS5 3D", ar: "PS5 3D" },
    category: { en: "3D showcase", ar: "عرض ثلاثي الأبعاد" },
    summary: {
      en: "An immersive PlayStation 5 showcase that presents the console, the DualSense controller and the tech specs in a moody 3D scene.",
      ar: "عرض غامر لجهاز PlayStation 5 يقدّم الجهاز ويد التحكم DualSense والمواصفات التقنية داخل مشهد ثلاثي الأبعاد.",
    },
    highlights: {
      en: ["3D product presentation", "Console, controller and specs chapters", "English and Arabic versions"],
      ar: ["تقديم المنتج بتقنية ثلاثية الأبعاد", "أقسام للجهاز ويد التحكم والمواصفات", "نسختان بالإنجليزية والعربية"],
    },
    tags: { en: ["3D", "Product page", "Bilingual"], ar: ["ثلاثي الأبعاد", "صفحة منتج", "ثنائية اللغة"] },
    href: "https://ps5-3d.netlify.app",
    image: {
      src: "/projects/ps5-3d.webp",
      width: 1895,
      height: 837,
      alt: {
        en: "PlayStation 5 console and DualSense controller on a table in a dark room with blue light",
        ar: "جهاز PlayStation 5 ويد التحكم DualSense على طاولة في غرفة داكنة بإضاءة زرقاء",
      },
    },
    accent: "#2f6bff",
  },
  {
    slug: "mizan",
    title: { en: "Mizan", ar: "ميزان" },
    category: { en: "Fintech landing page", ar: "صفحة هبوط مالية" },
    summary: {
      en: "An Arabic-first personal finance product that helps people see their money more clearly, with a calm, focused landing experience.",
      ar: "منتج للإدارة المالية الشخصية مصمم للعربية أولًا، يساعد الناس على رؤية أموالهم بوضوح، بتجربة هبوط هادئة ومركزة.",
    },
    highlights: {
      en: ["Arabic-first, right-to-left design", "Clear calls to action for web and app", "Features, pricing and sign-in flows"],
      ar: ["تصميم للعربية أولًا من اليمين إلى اليسار", "دعوات واضحة لاتخاذ إجراء للويب والتطبيق", "أقسام للمميزات والأسعار وتسجيل الدخول"],
    },
    tags: { en: ["Fintech", "RTL", "Landing page"], ar: ["تقنية مالية", "من اليمين لليسار", "صفحة هبوط"] },
    href: "https://mizan-project.netlify.app",
    image: {
      src: "/projects/mizan.webp",
      width: 1883,
      height: 773,
      alt: {
        en: "Mizan landing page in Arabic with a green logo and the headline about making money more logical",
        ar: "صفحة هبوط ميزان بالعربية مع شعار أخضر وعنوان يدعو لجعل الأموال أكثر منطقية",
      },
    },
    accent: "#3ddc97",
  },
];

/** A project with every localized field resolved, ready to pass to client components. */
export interface ProjectView {
  slug: string;
  title: string;
  category: string;
  summary: string;
  highlights: readonly string[];
  tags: readonly string[];
  href: string;
  /** Host name shown in the browser-frame address bar. */
  domain: string;
  image: { src: string; width: number; height: number; alt: string };
  accent: string;
  featured: boolean;
}

export function toProjectView(project: Project, locale: Locale): ProjectView {
  return {
    slug: project.slug,
    title: pick(project.title, locale),
    category: pick(project.category, locale),
    summary: pick(project.summary, locale),
    highlights: pick(project.highlights, locale),
    tags: pick(project.tags, locale),
    href: project.href,
    domain: new URL(project.href).host,
    image: { ...project.image, alt: pick(project.image.alt, locale) },
    accent: project.accent,
    featured: Boolean(project.featured),
  };
}

export function getProjectViews(locale: Locale): ProjectView[] {
  return projects.map((project) => toProjectView(project, locale));
}
