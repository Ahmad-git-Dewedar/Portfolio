import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "../Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "start" | "end";
  children: ReactNode;
  className?: string;
}

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
    /** Opens in a new tab with safe `rel` defaults. */
    external?: boolean;
  };

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

export type ButtonProps = AnchorProps | NativeButtonProps;

/**
 * Renders an anchor when given `href`, otherwise a native button, sharing one visual system.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, iconPosition = "end", children, className, ...rest } = props;
  const classes = cn(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      {icon && iconPosition === "start" && <Icon name={icon} size={18} className={styles.icon} />}
      <span>{children}</span>
      {icon && iconPosition === "end" && <Icon name={icon} size={18} className={styles.icon} />}
    </>
  );

  if (rest.href !== undefined) {
    const { external, ...anchorRest } = rest as Omit<AnchorProps, keyof BaseProps>;
    return (
      <a
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as Omit<NativeButtonProps, keyof BaseProps>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
