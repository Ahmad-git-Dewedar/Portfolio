"use client";

import type { CSSProperties } from "react";
import { Tilt } from "@/components/motion";
import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ProjectFrame } from "../ProjectFrame";
import type { ProjectLabels, ProjectView } from "../types";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: ProjectView;
  labels: ProjectLabels;
  onPreview: () => void;
  className?: string;
}

export function ProjectCard({ project, labels, onPreview, className }: ProjectCardProps) {
  const headingId = `project-${project.slug}-title`;
  const featured = project.featured;

  return (
    <article
      className={cn(styles.card, featured && styles.featured, className)}
      style={{ "--accent": project.accent } as CSSProperties}
      aria-labelledby={headingId}
      data-hover-root
    >
      <Tilt max={featured ? 4 : 6} className={styles.media}>
        <button
          type="button"
          className={styles.previewTrigger}
          onClick={onPreview}
          aria-label={`${labels.preview}: ${project.title}`}
          aria-haspopup="dialog"
        >
          <ProjectFrame
            project={project}
            sizes={featured ? "(min-width: 1100px) 760px, 100vw" : "(min-width: 1100px) 420px, (min-width: 760px) 50vw, 100vw"}
          />
          <span className={styles.previewHint} aria-hidden="true">
            <Icon name="eye" size={16} />
            {labels.preview}
          </span>
        </button>
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
          <button type="button" className={styles.previewLink} onClick={onPreview} aria-haspopup="dialog">
            <Icon name="eye" size={16} />
            <span>{labels.preview}</span>
            <span className="visually-hidden"> {project.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
