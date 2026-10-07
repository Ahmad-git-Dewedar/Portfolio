import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import styles from "./SplitText.module.css";

interface SplitTextProps {
  text: string;
  as?: "p" | "h2" | "h3" | "span";
  /**
   * highlight: words brighten one by one as `--p` advances (scrubbed reading).
   * mask: words rise into place, fading and sharpening (never clipped).
   */
  variant?: "highlight" | "mask";
  /** Portion of the scene's `--p` the reveal spans. */
  from?: number;
  to?: number;
  id?: string;
  className?: string;
}

/**
 * Splits text into words (never letters, so Arabic keeps its joined forms)
 * and reveals them from the nearest scene's `--p`. Screen readers get the
 * sentence once, via a hidden copy; the animated words are decorative.
 */
export function SplitText({ text, as: Component = "p", variant = "highlight", from = 0, to = 1, id, className }: SplitTextProps) {
  const words = text.split(/\s+/).filter(Boolean);
  const style = { "--from": from, "--span": to - from, "--n": words.length } as CSSProperties;

  return (
    <Component id={id} className={cn(styles.text, styles[variant], className)} style={style}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          // The space lives outside the inline-block word, or it collapses away.
          <Fragment key={index}>
            <span className={styles.word} style={{ "--i": index } as CSSProperties}>
              <span className={styles.inner}>{word}</span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </Component>
  );
}
