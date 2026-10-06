import Image from "next/image";
import type { CSSProperties } from "react";
import type { ProjectView } from "@/content/projects";
import { cn } from "@/lib/cn";
import styles from "./ProjectFrame.module.css";

interface ProjectFrameProps {
  project: ProjectView;
  /** Responsive `sizes` hint for the screenshot. */
  sizes: string;
  priority?: boolean;
  /** Use when the same screenshot is already described elsewhere on the page. */
  decorative?: boolean;
  className?: string;
}

/**
 * The project's screenshot inside a browser window, finished in the same
 * aluminium and glass language as the hero display. Rendered with spans so it
 * can sit inside a button.
 */
export function ProjectFrame({ project, sizes, priority, decorative, className }: ProjectFrameProps) {
  return (
    <span className={cn(styles.frame, className)} style={{ "--accent": project.accent } as CSSProperties}>
      <span className={styles.chrome} aria-hidden="true">
        <span className={styles.dots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.address} dir="ltr">
          {project.domain}
        </span>
      </span>
      <span className={styles.viewport}>
        <Image
          src={project.image.src}
          alt={decorative ? "" : project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes={sizes}
          priority={priority}
          className={styles.image}
        />
        <span className={styles.sheen} aria-hidden="true" />
      </span>
    </span>
  );
}
