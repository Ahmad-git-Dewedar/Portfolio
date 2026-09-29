import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { ProjectCard, type ProjectCardLabels } from "../ProjectCard";
import styles from "./ProjectGrid.module.css";

interface ProjectGridProps {
  projects: readonly Project[];
  locale: Locale;
  labels: ProjectCardLabels;
}

export function ProjectGrid({ projects, locale, labels }: ProjectGridProps) {
  return (
    <ul role="list" className={styles.grid}>
      {projects.map((project) => (
        <li key={project.slug} className={project.featured ? styles.featured : undefined}>
          <ProjectCard project={project} locale={locale} labels={labels} className={styles.card} />
        </li>
      ))}
    </ul>
  );
}
