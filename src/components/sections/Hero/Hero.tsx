import { Button, Container } from "@/components/ui";
import { sectionIds } from "@/config/navigation";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./Hero.module.css";

interface HeroProps {
  person: Dictionary["person"];
  content: Dictionary["hero"];
}

/**
 * Opening section. The copy holds the reading-start side; the 3D model (in the
 * journey's pinned layer behind) holds the other. Scrolling lifts the copy away
 * while the same scroll carries the model onward, so nothing ever cuts.
 */
export function Hero({ person, content }: HeroProps) {
  return (
    <section id={sectionIds.home} className={styles.hero} data-scene="view" aria-labelledby="hero-title">
      {/* Static stand-in where the model sits, until (or unless) the 3D scene is live. */}
      <div className={styles.poster} aria-hidden="true">
        <div className={styles.posterDevice} />
      </div>

      <Container size="wide" className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.badge}>
            <span className={styles.pulse} aria-hidden="true" />
            {content.badge}
          </p>
          <h1 id="hero-title" className={styles.heading}>
            <span className={styles.name}>{person.name}</span>
            <span className="visually-hidden">, </span>
            <span className={styles.role}>{person.role}</span>
          </h1>
          <p className={styles.lead}>{content.lead}</p>
          <div className={styles.actions}>
            <Button href={`#${sectionIds.work}`} size="lg">
              {content.primaryCta}
            </Button>
            <Button href={`#${sectionIds.contact}`} variant="secondary" size="lg" icon="arrow-right">
              {content.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>

      <a href={`#${sectionIds.about}`} className={styles.scrollCue}>
        <span className={styles.mouse} aria-hidden="true">
          <span className={styles.wheel} />
        </span>
        <span>{content.scrollCue}</span>
      </a>
    </section>
  );
}
