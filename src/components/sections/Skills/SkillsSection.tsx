import type { CSSProperties } from "react";
import { ScrollScene } from "@/components/scroll";
import { Container, Icon, SectionHeading } from "@/components/ui";
import { sectionIds, sectionNumbers } from "@/config/navigation";
import { skillGroups } from "@/content/skills";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { pick } from "@/i18n/localized";
import styles from "./SkillsSection.module.css";

interface SkillsSectionProps {
  locale: Locale;
  content: Dictionary["skills"];
  cursorLabel: string;
}

/**
 * Scrolling down travels sideways through the toolkit: each discipline slides
 * into focus and its technologies cascade in one by one.
 */
export function SkillsSection({ locale, content, cursorLabel }: SkillsSectionProps) {
  const count = skillGroups.length;

  return (
    <ScrollScene
      id={sectionIds.skills}
      length={3.2}
      lengthSm={3.6}
      className={styles.skills}
      stageClassName={styles.stage}
      style={{ "--count": count } as CSSProperties}
      aria-labelledby="skills-title"
    >
      <Container size="wide" className={styles.header}>
        <SectionHeading
          id="skills-title"
          index={sectionNumbers.skills}
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
        />
        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressBar}>
            <span className={styles.progressFill} />
          </span>
          <span className={styles.progressCount} dir="ltr">
            {String(count).padStart(2, "0")}
          </span>
        </div>
      </Container>

      <div className={styles.viewport} data-cursor={cursorLabel}>
        <ol className={styles.track}>
          {skillGroups.map((group, index) => (
            <li
              key={group.id}
              className={styles.card}
              style={{ "--i": index, "--m": group.items.length } as CSSProperties}
              data-spotlight
            >
              <span className={styles.number} aria-hidden="true" dir="ltr">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.head}>
                <span className={styles.icon}>
                  <Icon name={group.icon} size={22} />
                </span>
                <h3 className={styles.title}>{pick(group.title, locale)}</h3>
              </div>
              <p className={styles.description}>{pick(group.description, locale)}</p>
              <ul role="list" className={styles.items}>
                {group.items.map((item, itemIndex) => {
                  const label = typeof item === "string" ? item : pick(item, locale);
                  // Technology names stay Latin and left-to-right inside Arabic text.
                  return (
                    <li
                      key={label}
                      className={styles.item}
                      style={{ "--j": itemIndex } as CSSProperties}
                      dir={typeof item === "string" ? "ltr" : undefined}
                    >
                      {label}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </ScrollScene>
  );
}
