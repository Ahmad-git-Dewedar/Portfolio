import type { Localized } from "@/i18n/localized";

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

/** Frequently asked questions, in display order. */
export const faq: readonly FaqItem[] = [
  {
    id: "projects",
    question: { en: "What kind of projects do you take on?", ar: "ما نوع المشاريع التي تعمل عليها؟" },
    answer: {
      en: "Websites and web apps: landing pages, product showcases, interactive 3D experiences and app interfaces, built with React and Next.js.",
      ar: "مواقع وتطبيقات ويب: صفحات هبوط، وعروض منتجات، وتجارب ثلاثية الأبعاد تفاعلية، وواجهات تطبيقات، مبنية بـ React و Next.js.",
    },
  },
  {
    id: "bilingual",
    question: { en: "Can you build in both Arabic and English?", ar: "هل يمكنك البناء بالعربية والإنجليزية؟" },
    answer: {
      en: "Yes. I build bilingual sites with proper right-to-left layouts for Arabic, not a mirrored afterthought. This portfolio is an example.",
      ar: "نعم. أبني مواقع ثنائية اللغة مع تخطيط حقيقي من اليمين إلى اليسار للعربية، لا مجرد انعكاس متأخر. وهذا الموقع مثال على ذلك.",
    },
  },
  {
    id: "responsive",
    question: { en: "Will my site work on phones and tablets?", ar: "هل سيعمل موقعي على الجوال والأجهزة اللوحية؟" },
    answer: {
      en: "Every build is responsive and checked on desktop, laptop, tablet and mobile before it goes live.",
      ar: "كل مشروع متجاوب ويتم فحصه على الحاسوب المكتبي والمحمول والأجهزة اللوحية والجوال قبل إطلاقه.",
    },
  },
  {
    id: "3d",
    question: { en: "Can you add 3D or animation to an existing site?", ar: "هل يمكنك إضافة رسوم ثلاثية الأبعاد أو حركة لموقع موجود؟" },
    answer: {
      en: "Yes. I add WebGL scenes with Three.js and motion that stays smooth and respects visitors who prefer reduced motion.",
      ar: "نعم. أضيف مشاهد WebGL باستخدام Three.js وحركة تبقى سلسة وتحترم من يفضّلون تقليل الحركة.",
    },
  },
  {
    id: "start",
    question: { en: "How do we start working together?", ar: "كيف نبدأ العمل معًا؟" },
    answer: {
      en: "Send me an email or reach me on Fiverr with your idea. We agree on the scope and timeline before any work starts.",
      ar: "أرسل لي بريدًا إلكترونيًا أو تواصل معي عبر Fiverr بفكرتك. نتفق على النطاق والجدول الزمني قبل بدء أي عمل.",
    },
  },
  {
    id: "more",
    question: { en: "Where can I see more of your work?", ar: "أين يمكنني رؤية المزيد من أعمالك؟" },
    answer: {
      en: "Browse the projects above, my code on GitHub, and the videos on my YouTube channel.",
      ar: "تصفّح المشاريع أعلاه، والكود على GitHub، والفيديوهات على قناتي في YouTube.",
    },
  },
];
