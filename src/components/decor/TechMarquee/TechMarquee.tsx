import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";
import styles from "./TechMarquee.module.css";

interface TechMarqueeProps {
  items: readonly string[];
  /** Accessible name for the list (the visual band is decorative motion). */
  label: string;
  className?: string;
}

/**
 * An endless, gently scrolling band of skills. The list is rendered twice and
 * shifted by exactly half its width, so the loop has no seam. It pauses on
 * hover, reverses for right-to-left pages and stands still under reduced motion.
 */
export function TechMarquee({ items, label, className }: TechMarqueeProps) {
  const row = (hidden: boolean) => (
    <ul role="list" className={styles.row} aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <Icon name="sparkle" size={14} className={styles.mark} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn(styles.marquee, className)}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
