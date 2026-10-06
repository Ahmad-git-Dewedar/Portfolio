import { ScrollScene } from "@/components/scroll";
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

/**
 * Opening scene. While pinned, scrolling lifts the copy away, draws the 3D
 * model to the center as it recedes, and wipes in the statement that bridges
 * into About, so the hero transforms rather than simply scrolling off.
 */
export function Hero({ person, content, modelLabel, direction }: HeroProps) {
  return (
    <ScrollScene
      id={sectionIds.home}
      length={2.3}
      lengthSm={1.9}
      className={styles.hero}
      stageClassName={styles.scene}
      aria-labelledby="hero-title"
    >
      <HeroStage
        label={modelLabel}
        mirrored={direction === "rtl"}
        className={styles.stage}
        contentClassName={styles.layout}
      >
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

          <HeroFocusArea className={styles.focus} />
        </Container>
      </HeroStage>

      {/* Bridge line: wiped in as the hero recedes, then hands over to About. */}
      <p className={styles.statement}>
        <span className={styles.statementInner}>{content.title}</span>
      </p>

      <a href={`#${sectionIds.about}`} className={styles.scrollCue}>
        <span className={styles.mouse} aria-hidden="true">
          <span className={styles.wheel} />
        </span>
        <span>{content.scrollCue}</span>
      </a>
    </ScrollScene>
  );
}
