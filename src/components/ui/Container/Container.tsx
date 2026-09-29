import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./Container.module.css";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "header" | "footer" | "nav" | "article";
  size?: "narrow" | "default" | "wide";
}

export function Container({ as: Component = "div", size = "default", className, ...rest }: ContainerProps) {
  return <Component className={cn(styles.container, styles[size], className)} {...rest} />;
}
