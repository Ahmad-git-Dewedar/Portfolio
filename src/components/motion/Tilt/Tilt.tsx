"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import styles from "./Tilt.module.css";

interface TiltProps {
  children: ReactNode;
  /** Maximum rotation in degrees. */
  max?: number;
  /** Adds a soft light reflection that follows the pointer. */
  glare?: boolean;
  className?: string;
}

/**
 * Turns its content toward a mouse or pen, like the hero model, with a moving
 * glare. Touch input and reduced motion leave it flat. Styles are written as
 * CSS variables inside one animation frame, so React never re-renders.
 */
export function Tilt({ children, max = 6, glare = true, className }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  const write = (x: number, y: number, active: boolean) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const element = ref.current;
      if (!element) return;
      element.style.setProperty("--tilt-x", `${(-y * max).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${(x * max).toFixed(2)}deg`);
      element.style.setProperty("--glare-x", `${((x + 1) * 50).toFixed(1)}%`);
      element.style.setProperty("--glare-y", `${((y + 1) * 50).toFixed(1)}%`);
      element.dataset.tilting = active ? "true" : "false";
    });
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    write(x, y, true);
  };

  const onPointerLeave = () => write(0, 0, false);

  return (
    <div ref={ref} className={cn(styles.tilt, className)} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className={styles.surface}>
        {children}
        {glare && <span className={styles.glare} aria-hidden="true" />}
      </div>
    </div>
  );
}
