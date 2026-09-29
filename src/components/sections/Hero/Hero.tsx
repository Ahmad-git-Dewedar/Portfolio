import { HeroStage } from "@/components/three";
import { Button, Container, Icon } from "@/components/ui";
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
      <Container size="wide" className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1 id="hero-title" className={styles.name}>
            {person.name}
          </h1>
          <p className={styles.tagline}>{content.title}</p>
          <div className={styles.actions}>
            <Button href={`#${sectionIds.work}`} size="lg">
              {content.primaryCta}
            </Button>
            <Button href={`#${sectionIds.contact}`} variant="secondary" size="lg" icon="arrow-right">
              {content.secondaryCta}
            </Button>
          </div>
        </div>

        <HeroStage label={modelLabel} className={styles.stage} />

        <div className={styles.caption}>
          <p className={styles.lead}>{content.lead}</p>
          <a href={`#${sectionIds.work}`} className={styles.scrollHint}>
            <span>{content.scrollHint}</span>
            <span className={styles.scrollIcon}>
              <Icon name="arrow-down" size={16} />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
