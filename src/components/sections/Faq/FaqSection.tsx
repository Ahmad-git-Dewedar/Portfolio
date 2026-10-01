import { Reveal } from "@/components/motion";
import { Button, Icon, Section, SectionHeading } from "@/components/ui";
import { sectionIds, sectionNumbers } from "@/config/navigation";
import { faq } from "@/content/faq";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { pick } from "@/i18n/localized";
import styles from "./FaqSection.module.css";

interface FaqSectionProps {
  locale: Locale;
  content: Dictionary["faq"];
}

/**
 * Accordion built on native <details>: keyboard and screen-reader support come
 * from the platform, and the shared `name` keeps one answer open at a time.
 */
export function FaqSection({ locale, content }: FaqSectionProps) {
  return (
    <Section id={sectionIds.faq} tone="raised" containerSize="wide" aria-labelledby="faq-title">
      <div className={styles.layout}>
        <Reveal className={styles.intro}>
          <SectionHeading
            id="faq-title"
            index={sectionNumbers.faq}
            eyebrow={content.eyebrow}
            title={content.title}
            lead={content.lead}
          />
          <Button href={`#${sectionIds.contact}`} variant="secondary" icon="arrow-right">
            {content.cta}
          </Button>
        </Reveal>

        <Reveal delay={100} className={styles.list}>
          {faq.map((item, index) => (
            <details key={item.id} name="faq" className={styles.item} open={index === 0} data-spotlight>
              <summary className={styles.question}>
                <span>{pick(item.question, locale)}</span>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name="plus" size={18} />
                </span>
              </summary>
              <div className={styles.answer}>
                <p>{pick(item.answer, locale)}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
