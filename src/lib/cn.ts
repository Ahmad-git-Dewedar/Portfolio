type ClassValue = string | false | null | undefined;

/** Joins truthy class names. Kept tiny on purpose; swap for clsx if variants grow. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
