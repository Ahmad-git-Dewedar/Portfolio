import styles from "./SkipLink.module.css";

export function SkipLink({ targetId, label }: { targetId: string; label: string }) {
  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      {label}
    </a>
  );
}
