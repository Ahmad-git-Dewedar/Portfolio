import styles from "./BrandMark.module.css";

interface BrandMarkProps {
  href: string;
  name: string;
  ariaLabel: string;
}

/** Monogram plus wordmark. The monogram is pure SVG so it stays crisp at any size. */
export function BrandMark({ href, name, ariaLabel }: BrandMarkProps) {
  return (
    <a href={href} className={styles.brand} aria-label={ariaLabel}>
      <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="brand-mark-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#8e8e93" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="9" fill="none" stroke="url(#brand-mark-gradient)" strokeWidth="1.5" />
        <path
          d="M8.5 22 13 10l4.5 12M10.2 17.6h5.6M19.5 10v12h1.8c3 0 4.7-2.3 4.7-6s-1.7-6-4.7-6h-1.8Z"
          fill="none"
          stroke="url(#brand-mark-gradient)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.wordmark}>{name}</span>
    </a>
  );
}
