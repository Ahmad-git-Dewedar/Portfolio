import { notFound } from "next/navigation";
import { TechMarquee } from "@/components/decor";
import {
  AboutDetails,
  AboutScene,
  Bridge,
  ContactSection,
  FaqSection,
  Hero,
  Journey,
  RoadmapSection,
  SkillsSection,
  WorkSection,
  YouTubeSection,
} from "@/components/sections";
import { getAllSkills } from "@/content/skills";
import { getDirection, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Journey label={dict.a11y.heroModel} direction={getDirection(locale)} typeText={dict.hero.title}>
        <Hero person={dict.person} content={dict.hero} />
        <Bridge text={dict.hero.title} />
        <AboutScene content={dict.about} />
      </Journey>
      <AboutDetails content={dict.about} stats={dict.hero.stats} />
      <WorkSection
        locale={locale}
        content={dict.work}
        externalLinkLabel={dict.a11y.externalLink}
        cursorLabel={dict.cursor.view}
      />
      <RoadmapSection locale={locale} content={dict.roadmap} />
      <SkillsSection locale={locale} content={dict.skills} cursorLabel={dict.cursor.explore} />
      <TechMarquee items={getAllSkills(locale)} label={dict.a11y.skillsBand} />
      <YouTubeSection
        name={dict.person.name}
        content={dict.youtube}
        externalLinkLabel={dict.a11y.externalLink}
        cursorLabel={dict.cursor.watch}
      />
      <FaqSection locale={locale} content={dict.faq} />
      <ContactSection content={dict.contact} externalLinkLabel={dict.a11y.externalLink} cursorLabel={dict.cursor.open} />
    </>
  );
}
