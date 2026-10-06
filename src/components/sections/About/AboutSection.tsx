import { Reveal } from "@/components/motion";
import { ScrollScene, SplitText } from "@/components/scroll";
import { Container, Eyebrow, Icon, type IconName } from "@/components/ui";
import { sectionIds, sectionNumbers } from "@/config/navigation";
import { projects } from "@/content/projects";
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
  name: string;
  content: Dictionary["about"];
  stats: Dictionary["hero"]["stats"];
}

/**
 * A pinned reading scene (the statement lights up word by word over a drifting
 * glow and a giant watermark), followed by the story, proof points and principles.
 */
export function AboutSection({ name, content, stats }: AboutSectionProps) {
  const principles = Object.entries(content.principles) as [PrincipleKey, { title: string; text: string }][];
  // Values are language-neutral; labels come from the dictionary.
  const figures = [
    { value: String(projects.length).padStart(2, "0"), label: stats.projects },
    { value: "EN·AR", label: stats.languages },
    { value: "3D", label: stats.realtime },
  ];

  return (
    <section id={sectionIds.about} className={styles.about} aria-labelledby="about-title">
      <ScrollScene as="div" length={2.6} lengthSm={2.3} stageClassName={styles.scene}>
        <div className={styles.glow} aria-hidden="true" />
        <p className={styles.watermark} aria-hidden="true">
          {name}
        </p>
        <Container size="wide" className={styles.sceneInner}>
          <div className={styles.kicker}>
            <Eyebrow index={sectionNumbers.about}>{content.eyebrow}</Eyebrow>
            <h2 id="about-title" className={styles.title}>
              {content.title}
            </h2>
          </div>
          <SplitText text={content.statement} from={0.08} to={0.78} className={styles.statement} />
        </Container>
      </ScrollScene>

      <Container size="wide" className={styles.details}>
        <div className={styles.story}>
          <Reveal className={styles.storyAside}>
            <p className={styles.availability}>
              <span className={styles.pulse} aria-hidden="true" />
              {content.availability}
            </p>
            <dl className={styles.figures}>
              {figures.map((figure) => (
                <div key={figure.label} className={styles.figure}>
                  <dt className={styles.figureLabel}>{figure.label}</dt>
                  <dd className={styles.figureValue} dir="ltr">
                    {figure.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className={styles.paragraphs}>
            {content.body.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 120}>
                <p className={styles.paragraph}>{paragraph}</p>
              </Reveal>
            ))}
          </div>
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
      </Container>
    </section>
  );
}
