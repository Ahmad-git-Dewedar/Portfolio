import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: ReactNode;
  /** Optional section number shown before the label, e.g. "01". */
  index?: string;
  className?: string;
}

/** Small uppercase kicker above a heading: optional section number, accent rule, label. */
export function Eyebrow({ children, index, className }: EyebrowProps) {
  return (
    <p className={cn(styles.eyebrow, className)}>
      {index && (
        <span className={styles.index} dir="ltr">
          {index}
        </span>
      )}
      <span className={styles.rule} aria-hidden="true" />
      {children}
    </p>
  );
}
