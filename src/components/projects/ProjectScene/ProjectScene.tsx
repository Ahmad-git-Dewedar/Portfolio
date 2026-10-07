import Image from "next/image";
import type { CSSProperties } from "react";
import { ScrollScene } from "@/components/scroll";
import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";
import { hexToRgbChannels } from "@/lib/color";
import { ProjectFrame } from "../ProjectFrame";
import type { ProjectLabels, ProjectView } from "../types";
import styles from "./ProjectScene.module.css";

interface ProjectSceneProps {
  project: ProjectView;
  total: number;
  labels: ProjectLabels;
}

/**
 * One project as a pinned, full-screen scene. Scrolling plays it like a shot:
 * the visual grows from a small start into the frame, the title and details
 * rise in, a framed copy of the interface slides into place beside them, and a
 * variant-specific exit hands the screen to the next scene's color. Pure CSS
 * driven by the scene's `--p`; with motion off it is a calm, stacked case study.
 */
export function ProjectScene({ project, total, labels }: ProjectSceneProps) {
  const headingId = `project-${project.slug}-title`;
  const counter = `${String(project.position).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const style = {
    "--accent": project.accent,
    "--spot-rgb": hexToRgbChannels(project.accent),
    "--bg": project.scene.background,
    "--bg-next": project.nextBackground ?? "var(--color-bg)",
    // Lets the giant outlined title size itself to always fit the screen width.
    "--chars": Math.max(6, project.title.length),
  } as CSSProperties;

  return (
    <ScrollScene
      as="article"
      length={3.4}
      lengthSm={2.8}
      className={cn(styles.scene, styles[project.scene.variant], project.scene.tone === "light" && styles.light)}
      stageClassName={styles.stage}
      style={style}
      aria-labelledby={headingId}
    >
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.backdropNext} />
      </div>

      <p className={styles.ghost} aria-hidden="true">
        {project.title}
      </p>

      <div className={styles.media}>
        <div className={styles.mediaFrame}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="100vw"
            className={styles.mediaImage}
          />
        </div>
        {/* Click-anywhere shortcut; the labelled link in the details is the accessible one. */}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mediaLink}
          tabIndex={-1}
          aria-hidden="true"
          data-cursor={labels.cursor}
        />
      </div>

      <span className={styles.scrim} aria-hidden="true" />

      <div className={styles.side} aria-hidden="true">
        <ProjectFrame
          project={project}
          sizes="(min-width: 1024px) 32vw, 1px"
          decorative
          className={styles.frame}
        />
      </div>

      <div className={styles.info}>
        <p className={styles.meta}>
          <span className={styles.counter} dir="ltr">
            {counter}
          </span>
          {project.featured && <span className={styles.badge}>{labels.featured}</span>}
          <span className={styles.category}>{project.category}</span>
        </p>
        <h3 id={headingId} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <ul role="list" className={styles.highlights} aria-label={labels.highlights}>
          {project.highlights.map((item) => (
            <li key={item}>
              <Icon name="check" size={16} className={styles.check} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <ul role="list" className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a href={project.href} target="_blank" rel="noopener noreferrer" className={styles.visit}>
          <span>{labels.visit}</span>
          <span className="visually-hidden">
            {" "}
            {project.title} ({labels.externalLink})
          </span>
          <Icon name="arrow-up-right" size={18} />
        </a>
      </div>

      <span className={styles.exit} aria-hidden="true" />
    </ScrollScene>
  );
}
