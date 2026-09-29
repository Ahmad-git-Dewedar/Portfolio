import { Reveal } from "@/components/motion";
import { ProjectCard } from "../ProjectCard";
import type { ProjectLabels, ProjectView } from "../types";
import styles from "./ProjectShowcase.module.css";

interface ProjectShowcaseProps {
  projects: readonly ProjectView[];
  labels: ProjectLabels;
}

/** Featured project first at full width, the rest in a grid below. */
export function ProjectShowcase({ projects, labels }: ProjectShowcaseProps) {
  return (
    <ul role="list" className={styles.grid}>
      {projects.map((project, index) => (
        <li key={project.slug} className={project.featured ? styles.featured : undefined}>
          <Reveal delay={project.featured ? 0 : (index % 3) * 90} className={styles.item}>
            <ProjectCard project={project} labels={labels} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
