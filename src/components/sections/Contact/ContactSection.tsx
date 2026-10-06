import { SplitText } from "@/components/scroll";
import { Button, Container, Eyebrow, Icon, type IconName } from "@/components/ui";
import { sectionIds, sectionNumbers } from "@/config/navigation";
import { siteConfig, socialLinks } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { CopyEmailButton } from "./CopyEmailButton";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  content: Dictionary["contact"];
  externalLinkLabel: string;
  cursorLabel: string;
}

interface Channel {
  id: keyof Dictionary["contact"]["channels"];
  icon: IconName;
  label: string;
  href: string;
  description: string;
}

/**
 * Closing scene: the headline rises word by word out of masked lines as the
 * section arrives, then the address and one clear call to action settle in.
 */
export function ContactSection({ content, externalLinkLabel, cursorLabel }: ContactSectionProps) {
  const mailto = `mailto:${siteConfig.email}`;
  const channels: Channel[] = socialLinks.map((social) => ({
    id: social.id,
    icon: social.id,
    label: social.label,
    href: social.href,
    description: content.channels[social.id],
  }));

  return (
    <section id={sectionIds.contact} data-scene="view" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.halo} aria-hidden="true" />
      <Container size="wide" className={styles.inner}>
        <Eyebrow index={sectionNumbers.contact}>{content.eyebrow}</Eyebrow>
        <SplitText as="h2" id="contact-title" text={content.title} variant="mask" from={0.1} to={0.42} className={styles.title} />
        <p className={styles.lead}>{content.lead}</p>

        <a href={mailto} className={styles.email} dir="ltr" data-cursor={cursorLabel}>
          <span>{siteConfig.email}</span>
          <Icon name="arrow-up-right" size={28} className={styles.emailArrow} />
        </a>

        <div className={styles.actions}>
          <Button href={mailto} size="lg" icon="mail" iconPosition="start">
            {content.emailCta}
          </Button>
          <CopyEmailButton email={siteConfig.email} label={content.copyEmail} copiedLabel={content.copied} />
        </div>

        <div className={styles.channels}>
          <p className={styles.channelsTitle}>{content.channelsTitle}</p>
          <ul role="list" className={styles.channelList}>
            {channels.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channel}
                  title={channel.description}
                >
                  <Icon name={channel.icon} size={18} />
                  <span>{channel.label}</span>
                  <span className="visually-hidden">
                    {" "}
                    {channel.description} ({externalLinkLabel})
                  </span>
                  <Icon name="arrow-up-right" size={14} className={styles.channelArrow} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
