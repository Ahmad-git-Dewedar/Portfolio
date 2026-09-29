import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase kicker above a heading, led by a short accent rule. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn(styles.eyebrow, className)}>
      <span className={styles.rule} aria-hidden="true" />
      {children}
    </p>
  );
}
