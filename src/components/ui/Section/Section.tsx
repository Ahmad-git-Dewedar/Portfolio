import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container, type ContainerProps } from "../Container";
import styles from "./Section.module.css";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  /** Background treatment. `raised` separates adjacent sections like Apple's alternating bands. */
  tone?: "base" | "raised";
  containerSize?: ContainerProps["size"];
  children: ReactNode;
}

export function Section({ id, tone = "base", containerSize, className, children, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn(styles.section, styles[tone], className)} {...rest}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
