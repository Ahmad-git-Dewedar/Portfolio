import type { CSSProperties } from "react";
import { ProjectScene, type ProjectLabels } from "@/components/projects";
import { ScrollScene, SplitText } from "@/components/scroll";
import { Container, Eyebrow } from "@/components/ui";
import { sectionIds, sectionNumbers } from "@/config/navigation";
import { getProjectViews } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./WorkSection.module.css";

interface WorkSectionProps {
  locale: Locale;
  content: Dictionary["work"];
  externalLinkLabel: string;
  cursorLabel: string;
}

/**
 * An opening title scene, then one full-screen scene per project. Each scene
 * ends in the next one's color, so the whole showcase plays as one sequence.
 */
export function WorkSection({ locale, content, externalLinkLabel, cursorLabel }: WorkSectionProps) {
  const projects = getProjectViews(locale);
  const labels: ProjectLabels = {
    featured: content.featured,
    visit: content.visit,
    highlights: content.highlights,
    externalLink: externalLinkLabel,
    cursor: cursorLabel,
  };
  const introStyle = { "--bg-next": projects[0]?.scene.background ?? "var(--color-bg)" } as CSSProperties;

  return (
    <section id={sectionIds.work} className={styles.work} aria-labelledby="work-title">
      <ScrollScene as="div" length={1.9} lengthSm={1.7} className={styles.intro} stageClassName={styles.introStage} style={introStyle}>
        <span className={styles.introNext} aria-hidden="true" />
        <Container size="wide" className={styles.introInner}>
          <Eyebrow index={sectionNumbers.work}>{content.eyebrow}</Eyebrow>
          <SplitText as="h2" id="work-title" text={content.title} variant="mask" from={0.02} to={0.3} className={styles.title} />
          <p className={styles.lead}>{content.lead}</p>
          <p className={styles.count}>
            <span className={styles.countValue} dir="ltr">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span>{content.count}</span>
          </p>
        </Container>
      </ScrollScene>

      {projects.map((project) => (
        <ProjectScene key={project.slug} project={project} total={projects.length} labels={labels} />
      ))}
    </section>
  );
}
