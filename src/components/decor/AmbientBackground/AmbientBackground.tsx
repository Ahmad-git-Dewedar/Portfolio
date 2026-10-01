import styles from "./AmbientBackground.module.css";

/**
 * Fixed backdrop behind every section: slow-drifting color fields, a faint
 * engineering grid near the top and a fine film grain. Pure CSS, composited on
 * the GPU (only transforms animate), and still under reduced motion.
 */
export function AmbientBackground() {
  return (
    <div className={styles.ambient} aria-hidden="true">
      <div className={`${styles.field} ${styles.fieldA}`} />
      <div className={`${styles.field} ${styles.fieldB}`} />
      <div className={`${styles.field} ${styles.fieldC}`} />
      <div className={styles.grid} />
      <div className={styles.grain} />
    </div>
  );
}
