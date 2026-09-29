import { Button, Icon, Section, SectionHeading } from "@/components/ui";
import { sectionIds } from "@/config/navigation";
import { siteConfig, socialLinks } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  content: Dictionary["contact"];
  externalLinkLabel: string;
}

export function ContactSection({ content, externalLinkLabel }: ContactSectionProps) {
  const mailto = `mailto:${siteConfig.email}`;

  return (
    <Section id={sectionIds.contact} tone="raised" containerSize="narrow" aria-labelledby="contact-title">
      <div className={styles.panel}>
        <SectionHeading
          id="contact-title"
          align="center"
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
        />

        <div className={styles.email}>
          <Button href={mailto} size="lg" icon="mail" iconPosition="start">
            {content.emailCta}
          </Button>
          <a href={mailto} className={styles.address} dir="ltr">
            {siteConfig.email}
          </a>
        </div>

        <div className={styles.socials}>
          <p className={styles.socialsTitle}>{content.socialsTitle}</p>
          <ul role="list" className={styles.socialList}>
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                  <Icon name={social.id} size={18} />
                  <span>{social.label}</span>
                  <span className="visually-hidden"> ({externalLinkLabel})</span>
                  <Icon name="arrow-up-right" size={14} className={styles.socialArrow} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
