import { notFound } from "next/navigation";
import { AboutSection, ContactSection, Hero, SkillsSection, WorkSection } from "@/components/sections";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero person={dict.person} content={dict.hero} modelLabel={dict.a11y.heroModel} />
      <WorkSection locale={locale} content={dict.work} externalLinkLabel={dict.a11y.externalLink} />
      <AboutSection content={dict.about} />
      <SkillsSection locale={locale} content={dict.skills} />
      <ContactSection content={dict.contact} externalLinkLabel={dict.a11y.externalLink} />
    </>
  );
}
