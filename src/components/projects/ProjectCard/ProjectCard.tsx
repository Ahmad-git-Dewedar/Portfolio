import type { CSSProperties } from "react";
import { Tilt } from "@/components/motion";
import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { hexToRgbChannels } from "@/lib/color";
import { ProjectFrame } from "../ProjectFrame";
import type { ProjectLabels, ProjectView } from "../types";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: ProjectView;
  labels: ProjectLabels;
  className?: string;
}

export function ProjectCard({ project, labels, className }: ProjectCardProps) {
  const headingId = `project-${project.slug}-title`;
  const featured = project.featured;

  return (
    <article
      className={cn(styles.card, featured && styles.featured, className)}
      style={{ "--accent": project.accent, "--spot-rgb": hexToRgbChannels(project.accent) } as CSSProperties}
      aria-labelledby={headingId}
      data-hover-root
      data-spotlight
    >
      <Tilt max={featured ? 4 : 6} className={styles.media}>
        {/* The image also opens the live site. It duplicates the text link below, so it stays out of the tab order. */}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mediaLink}
          tabIndex={-1}
          aria-hidden="true"
        >
          <ProjectFrame
            project={project}
            sizes={featured ? "(min-width: 1100px) 760px, 100vw" : "(min-width: 1100px) 420px, (min-width: 760px) 50vw, 100vw"}
          />
          <span className={styles.visitHint}>
            <span>{labels.visit}</span>
            <Icon name="arrow-up-right" size={16} />
          </span>
        </a>
      </Tilt>

      <div className={styles.body}>
        <p className={styles.meta}>
          {featured && <span className={styles.badge}>{labels.featured}</span>}
          <span className={styles.category}>{project.category}</span>
        </p>
        <h3 id={headingId} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.summary}>{project.summary}</p>

        {featured && (
          <ul role="list" className={styles.highlights} aria-label={labels.highlights}>
            {project.highlights.map((item) => (
              <li key={item}>
                <Icon name="check" size={16} className={styles.check} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <ul role="list" className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.visit}>
            <span>{labels.visit}</span>
            <span className="visually-hidden">
              {" "}
              {project.title} ({labels.externalLink})
            </span>
            <Icon name="arrow-up-right" size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
