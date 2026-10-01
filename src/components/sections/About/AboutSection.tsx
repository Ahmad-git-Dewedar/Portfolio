import { Reveal } from "@/components/motion";
import { Eyebrow, Icon, Section, type IconName } from "@/components/ui";
import { sectionIds, sectionNumbers } from "@/config/navigation";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./AboutSection.module.css";

type PrincipleKey = keyof Dictionary["about"]["principles"];

/** Visual pairing for each principle; the copy lives in the dictionaries. */
const principleIcons: Record<PrincipleKey, IconName> = {
  product: "target",
  motion: "cube",
  bilingual: "globe",
  performance: "zap",
};

interface AboutSectionProps {
  content: Dictionary["about"];
}

export function AboutSection({ content }: AboutSectionProps) {
  const principles = Object.entries(content.principles) as [PrincipleKey, { title: string; text: string }][];

  return (
    <Section id={sectionIds.about} tone="raised" containerSize="wide" aria-labelledby="about-title">
      <div className={styles.intro}>
        <Reveal className={styles.lede}>
          <Eyebrow index={sectionNumbers.about}>{content.eyebrow}</Eyebrow>
          <h2 id="about-title" className={styles.title}>
            {content.title}
          </h2>
          <p className={styles.availability}>
            <span className={styles.pulse} aria-hidden="true" />
            {content.availability}
          </p>
        </Reveal>

        <Reveal delay={120} className={styles.story}>
          <p className={styles.statement}>{content.statement}</p>
          {content.body.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>

      <ul role="list" className={styles.principles}>
        {principles.map(([key, principle], index) => (
          <li key={key}>
            <Reveal delay={index * 90} className={styles.principleWrap}>
              <div className={styles.principle} data-spotlight>
                <span className={styles.iconWrap}>
                  <Icon name={principleIcons[key]} size={22} />
                </span>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleText}>{principle.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
