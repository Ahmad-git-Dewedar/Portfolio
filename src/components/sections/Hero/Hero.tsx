import { HeroFocusArea, HeroStage } from "@/components/three";
import { Button, Container } from "@/components/ui";
import { sectionIds } from "@/config/navigation";
import { projects } from "@/content/projects";
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
  // Values are language-neutral; labels come from the dictionary.
  const stats = [
    { value: String(projects.length).padStart(2, "0"), label: content.stats.projects },
    { value: "EN·AR", label: content.stats.languages },
    { value: "3D", label: content.stats.realtime },
  ];

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
            <p className={styles.badge}>
              <span className={styles.pulse} aria-hidden="true" />
              {content.badge}
            </p>
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
            <dl className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={styles.statLabel}>{stat.label}</dt>
                  <dd className={styles.statValue} dir="ltr">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroFocusArea className={styles.focus} />
        </Container>

        <a href={`#${sectionIds.work}`} className={styles.scrollCue}>
          <span className={styles.mouse} aria-hidden="true">
            <span className={styles.wheel} />
          </span>
          <span>{content.scrollCue}</span>
        </a>
      </HeroStage>
    </section>
  );
}
