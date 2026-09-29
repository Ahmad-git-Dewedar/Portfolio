import { HeroFocusArea, HeroStage } from "@/components/three";
import { Button, Container } from "@/components/ui";
import { sectionIds } from "@/config/navigation";
import type { Direction } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./Hero.module.css";

interface HeroProps {
  person: Dictionary["person"];
  content: Dictionary["hero"];
  modelLabel: string;
  direction: Direction;
}

/** Copy on the reading-start side, the 3D model beside it on the other. */
export function Hero({ person, content, modelLabel, direction }: HeroProps) {
  return (
    <section id={sectionIds.home} className={styles.hero} aria-labelledby="hero-title">
      <HeroStage
        label={modelLabel}
        mirrored={direction === "rtl"}
        className={styles.stage}
        contentClassName={styles.layout}
      >
        <Container size="wide" className={styles.grid}>
          <div className={styles.copy}>
            <h1 id="hero-title" className={styles.heading}>
              <span className={styles.name}>{person.name}</span>
              <span className="visually-hidden">, </span>
              <span className={styles.role}>{person.role}</span>
            </h1>
            <p className={styles.tagline}>{content.title}</p>
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

          <HeroFocusArea className={styles.focus} />
        </Container>
      </HeroStage>
    </section>
  );
}
