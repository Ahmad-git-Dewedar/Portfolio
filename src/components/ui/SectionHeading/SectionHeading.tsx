import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "../Eyebrow";
import styles from "./SectionHeading.module.css";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  /** Heading level. Sections default to h2 so the page keeps a single h1. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "start",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn(styles.heading, styles[align], className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
