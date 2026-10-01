import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/ui";
import { sectionIds, sectionNumbers } from "@/config/navigation";
import { roadmap } from "@/content/roadmap";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { pick } from "@/i18n/localized";
import { cn } from "@/lib/cn";
import styles from "./RoadmapSection.module.css";

interface RoadmapSectionProps {
  locale: Locale;
  content: Dictionary["roadmap"];
}

/** Learning journey as a vertical timeline whose rail fills in as you scroll. */
export function RoadmapSection({ locale, content }: RoadmapSectionProps) {
  return (
    <Section id={sectionIds.roadmap} tone="raised" containerSize="wide" aria-labelledby="roadmap-title">
      <Reveal>
        <SectionHeading
          id="roadmap-title"
          index={sectionNumbers.roadmap}
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
          align="center"
        />
      </Reveal>

      <div className={styles.timeline}>
        <span className={styles.rail} aria-hidden="true">
          <span className={styles.railFill} />
        </span>
        <ol className={styles.list}>
          {roadmap.map((milestone, index) => (
            <li
              key={milestone.year}
              className={cn(styles.item, index % 2 === 1 && styles.end, milestone.current && styles.current)}
            >
              <span className={styles.node} aria-hidden="true" />
              <Reveal delay={80} className={styles.cardWrap}>
                <article className={styles.card} data-spotlight>
                  <p className={styles.meta}>
                    <span className={styles.year} dir="ltr">
                      {milestone.year}
                    </span>
                    {milestone.current && <span className={styles.now}>{content.now}</span>}
                  </p>
                  <h3 className={styles.title}>{pick(milestone.title, locale)}</h3>
                  <p className={styles.description}>{pick(milestone.description, locale)}</p>
                  <ul role="list" className={styles.skills}>
                    {milestone.skills.map((skill) => (
                      <li key={skill} dir="ltr">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
