import { Reveal } from "@/components/motion";
import { Icon, Section, SectionHeading } from "@/components/ui";
import { sectionIds } from "@/config/navigation";
import { skillGroups } from "@/content/skills";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { pick } from "@/i18n/localized";
import styles from "./SkillsSection.module.css";

interface SkillsSectionProps {
  locale: Locale;
  content: Dictionary["skills"];
}

export function SkillsSection({ locale, content }: SkillsSectionProps) {
  return (
    <Section id={sectionIds.skills} containerSize="wide" aria-labelledby="skills-title">
      <Reveal>
        <SectionHeading
          id="skills-title"
          index="03"
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
        />
      </Reveal>

      <ul role="list" className={styles.grid}>
        {skillGroups.map((group, index) => (
          <li key={group.id} className={styles.cell}>
            <Reveal delay={index * 80} className={styles.cardWrap}>
              <div className={styles.card} data-spotlight>
                <div className={styles.head}>
                  <span className={styles.icon}>
                    <Icon name={group.icon} size={22} />
                  </span>
                  <h3 className={styles.title}>{pick(group.title, locale)}</h3>
                </div>
                <p className={styles.description}>{pick(group.description, locale)}</p>
                <ul role="list" className={styles.items}>
                  {group.items.map((item) => {
                    const label = typeof item === "string" ? item : pick(item, locale);
                    // Technology names stay Latin and left-to-right inside Arabic text.
                    return (
                      <li key={label} className={styles.item} dir={typeof item === "string" ? "ltr" : undefined}>
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
