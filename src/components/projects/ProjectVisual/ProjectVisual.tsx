import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import styles from "./ProjectVisual.module.css";

interface ProjectVisualProps {
  visual: Project["visual"];
  /** Alt text, only used when a real screenshot is provided. */
  alt: string;
  className?: string;
}

/**
 * A small product-style stage for a project: a tinted backdrop with a tilted device.
 * Pure CSS, so a grid of them costs nothing compared to extra WebGL contexts.
 */
export function ProjectVisual({ visual, alt, className }: ProjectVisualProps) {
  const style = { "--tint-a": visual.tint[0], "--tint-b": visual.tint[1] } as CSSProperties;

  return (
    <div className={cn(styles.stage, className)} style={style}>
      <div className={cn(styles.device, styles[visual.variant])}>
        <div className={styles.screen}>
          {visual.image ? (
            <Image src={visual.image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className={styles.image} />
          ) : (
            <ScreenSkeleton variant={visual.variant} />
          )}
        </div>
      </div>
    </div>
  );
}

function ScreenSkeleton({ variant }: { variant: Project["visual"]["variant"] }) {
  const rows = variant === "mobile" ? 4 : 3;
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <span className={styles.skTitle} />
      <span className={styles.skLine} />
      <div className={styles.skGrid}>
        {Array.from({ length: rows }, (_, i) => (
          <span key={i} className={styles.skCard} />
        ))}
      </div>
      {variant !== "mobile" && <span className={styles.skChart} />}
    </div>
  );
}
