import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./ScrollScene.module.css";

export interface ScrollSceneProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  /** Track length in viewport heights on wide screens (the stage stays pinned for length - 1). */
  length?: number;
  /** Track length on narrow screens. Defaults to `length`. */
  lengthSm?: number;
  /** Class for the pinned stage that fills the viewport. */
  stageClassName?: string;
  children: ReactNode;
}

/**
 * A pinned, scroll-scrubbed scene: a tall track with a viewport-sized stage
 * that sticks while the track scrolls past. Exposes `--p` (0..1) to everything
 * inside. With motion off it renders as an ordinary block in the flow.
 */
export function ScrollScene({
  as: Component = "section",
  length = 2.5,
  lengthSm,
  className,
  stageClassName,
  style,
  children,
  ...rest
}: ScrollSceneProps) {
  const sceneStyle = { "--length": length, "--length-sm": lengthSm ?? length, ...style } as CSSProperties;

  return (
    <Component data-scene="sticky" className={cn(styles.track, className)} style={sceneStyle} {...rest}>
      <div className={cn(styles.stage, stageClassName)}>{children}</div>
    </Component>
  );
}
