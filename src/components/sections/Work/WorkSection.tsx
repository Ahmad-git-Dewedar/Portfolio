import { ProjectGrid } from "@/components/projects";
import { Section, SectionHeading } from "@/components/ui";
import { sectionIds } from "@/config/navigation";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./WorkSection.module.css";

interface WorkSectionProps {
  locale: Locale;
  content: Dictionary["work"];
  externalLinkLabel: string;
}

export function WorkSection({ locale, content, externalLinkLabel }: WorkSectionProps) {
  return (
    <Section id={sectionIds.work} containerSize="wide" aria-labelledby="work-title">
      <SectionHeading id="work-title" eyebrow={content.eyebrow} title={content.title} lead={content.lead} />
      <div className={styles.grid}>
        <ProjectGrid
          projects={projects}
          locale={locale}
          labels={{
            comingSoon: content.comingSoon,
            viewProject: content.viewProject,
            externalLink: externalLinkLabel,
          }}
        />
      </div>
    </Section>
  );
}
