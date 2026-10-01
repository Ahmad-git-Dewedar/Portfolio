import styles from "./ScrollProgress.module.css";

/**
 * Thin reading-progress line under the header, driven entirely by a CSS
 * scroll timeline (no JavaScript). Hidden where scroll timelines are unsupported.
 */
export function ScrollProgress() {
  return <div className={styles.progress} aria-hidden="true" />;
}
