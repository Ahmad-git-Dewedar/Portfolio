import { Icon } from "@/components/ui";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/localized";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "../ProjectVisual";
import styles from "./ProjectCard.module.css";

export interface ProjectCardLabels {
  comingSoon: string;
  viewProject: string;
  externalLink: string;
}

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  labels: ProjectCardLabels;
  className?: string;
}

export function ProjectCard({ project, locale, labels, className }: ProjectCardProps) {
  const title = pick(project.title, locale);
  const headingId = `project-${project.slug}`;

  return (
    <article
      className={cn(styles.card, project.featured && styles.featured, className)}
      aria-labelledby={headingId}
      data-hover-root
    >
      <ProjectVisual visual={project.visual} alt={title} className={styles.visual} />

      <div className={styles.body}>
        <h3 id={headingId} className={styles.title}>
          {title}
        </h3>
        <p className={styles.summary}>{pick(project.summary, locale)}</p>

        <ul role="list" className={styles.stack} dir="ltr">
          {project.stack.map((tech) => (
            <li key={tech} className={styles.tag}>
              {tech}
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          {project.href ? (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span>{labels.viewProject}</span>
              <span className="visually-hidden">
                {" "}
                {title} ({labels.externalLink})
              </span>
              <Icon name="arrow-up-right" size={16} />
            </a>
          ) : (
            <span className={styles.status}>{labels.comingSoon}</span>
          )}
        </div>
      </div>
    </article>
  );
}
