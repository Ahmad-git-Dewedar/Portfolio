import { HeroFocusArea, HeroStage } from "@/components/three";
import { Button, Container } from "@/components/ui";
import { sectionIds } from "@/config/navigation";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./Hero.module.css";

interface HeroProps {
  person: Dictionary["person"];
  content: Dictionary["hero"];
  modelLabel: string;
}

export function Hero({ person, content, modelLabel }: HeroProps) {
  return (
    <section id={sectionIds.home} className={styles.hero} aria-labelledby="hero-title">
      <HeroStage label={modelLabel} className={styles.stage} contentClassName={styles.layout}>
        <Container size="wide" className={styles.intro}>
          <h1 id="hero-title" className={styles.heading}>
            <span className={styles.name}>{person.name}</span>
            <span className="visually-hidden">, </span>
            <span className={styles.role}>{person.role}</span>
          </h1>
        </Container>

        <HeroFocusArea className={styles.focus} />

        <Container size="wide" className={styles.caption}>
          <div className={styles.pitch}>
            <p className={styles.tagline}>{content.title}</p>
            <p className={styles.lead}>{content.lead}</p>
          </div>
          <div className={styles.actions}>
            <Button href={`#${sectionIds.work}`} size="lg">
              {content.primaryCta}
            </Button>
            <Button href={`#${sectionIds.contact}`} variant="secondary" size="lg" icon="arrow-right">
              {content.secondaryCta}
            </Button>
          </div>
        </Container>
      </HeroStage>
    </section>
  );
}
