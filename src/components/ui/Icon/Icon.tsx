import type { SVGProps } from "react";
import { cn } from "@/lib/cn";
import { icons, type IconName } from "./icons";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  name: IconName;
  size?: number;
  /** Accessible name. Omit for decorative icons, which are hidden from assistive tech. */
  title?: string;
}

export function Icon({ name, size = 20, title, className, ...rest }: IconProps) {
  const icon: (typeof icons)[IconName] & { directional?: boolean } = icons[name];
  const paint =
    icon.kind === "stroke"
      ? { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
      : { fill: "currentColor" };

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      className={cn(icon.directional && "flip-rtl", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...paint}
      {...rest}
    >
      {icon.body}
    </svg>
  );
}
