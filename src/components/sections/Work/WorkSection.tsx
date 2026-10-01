import { Reveal } from "@/components/motion";
import { ProjectShowcase, type ProjectLabels } from "@/components/projects";
import { Section, SectionHeading } from "@/components/ui";
import { sectionIds } from "@/config/navigation";
import { getProjectViews } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./WorkSection.module.css";

interface WorkSectionProps {
  locale: Locale;
  content: Dictionary["work"];
  externalLinkLabel: string;
}

export function WorkSection({ locale, content, externalLinkLabel }: WorkSectionProps) {
  const labels: ProjectLabels = {
    featured: content.featured,
    visit: content.visit,
    highlights: content.highlights,
    externalLink: externalLinkLabel,
  };

  return (
    <Section id={sectionIds.work} containerSize="wide" className={styles.section} aria-labelledby="work-title">
      <Reveal>
        <SectionHeading id="work-title" index="01" eyebrow={content.eyebrow} title={content.title} lead={content.lead} />
      </Reveal>
      <div className={styles.showcase}>
        <ProjectShowcase projects={getProjectViews(locale)} labels={labels} />
      </div>
    </Section>
  );
}
