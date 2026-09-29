"use client";

import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";
import { Tilt } from "@/components/motion";
import { Button, Icon } from "@/components/ui";
import { ProjectFrame } from "../ProjectFrame";
import type { ProjectLabels, ProjectView } from "../types";
import styles from "./ProjectPreviewDialog.module.css";

interface ProjectPreviewDialogProps {
  projects: readonly ProjectView[];
  /** Index of the open project, or null when closed. */
  index: number | null;
  labels: ProjectLabels;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

/**
 * Modal quick view built on the native <dialog>: focus trapping, Escape to close
 * and focus return come from the platform. Arrow keys move between projects and
 * follow the reading direction.
 */
export function ProjectPreviewDialog({ projects, index, labels, onNavigate, onClose }: ProjectPreviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const project = index === null ? null : projects[index];
  const total = projects.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const step = (delta: number) => {
    if (index === null) return;
    onNavigate((index + delta + total) % total);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const forward = document.documentElement.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    event.preventDefault();
    step(event.key === forward ? 1 : -1);
  };

  // A click that lands on the dialog element itself hit the backdrop.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const position = labels.position
    .replace("{current}", String((index ?? 0) + 1))
    .replace("{total}", String(total));

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="project-preview-title"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={onClick}
      style={project ? ({ "--accent": project.accent } as CSSProperties) : undefined}
    >
      {project && (
        <div className={styles.panel}>
          <header className={styles.header}>
            <div>
              <p className={styles.category}>{project.category}</p>
              <h2 id="project-preview-title" className={styles.title}>
                {project.title}
              </h2>
            </div>
            <button type="button" className={styles.iconButton} onClick={onClose} aria-label={labels.close}>
              <Icon name="close" size={20} />
            </button>
          </header>

          <Tilt max={3} className={styles.media}>
            <ProjectFrame key={project.slug} project={project} sizes="(min-width: 1200px) 1100px, 94vw" priority />
          </Tilt>

          <div className={styles.details}>
            <div className={styles.copy}>
              <p className={styles.summary}>{project.summary}</p>
              <ul role="list" className={styles.highlights} aria-label={labels.highlights}>
                {project.highlights.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={16} className={styles.check} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.aside}>
              <Button href={project.href} external size="lg" icon="arrow-up-right" className={styles.visit}>
                {labels.visit}
                <span className="visually-hidden"> ({labels.externalLink})</span>
              </Button>
              <nav className={styles.pager} aria-label={position}>
                <button type="button" className={styles.iconButton} onClick={() => step(-1)} aria-label={labels.previous}>
                  <Icon name="chevron-left" size={20} />
                </button>
                <span className={styles.position} aria-live="polite">
                  {position}
                </span>
                <button type="button" className={styles.iconButton} onClick={() => step(1)} aria-label={labels.next}>
                  <Icon name="chevron-right" size={20} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
