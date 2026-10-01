import { Reveal } from "@/components/motion";
import { Button, Eyebrow, Icon, Section, type IconName } from "@/components/ui";
import { sectionIds } from "@/config/navigation";
import { siteConfig, socialLinks } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { CopyEmailButton } from "./CopyEmailButton";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  content: Dictionary["contact"];
  externalLinkLabel: string;
}

interface Channel {
  id: keyof Dictionary["contact"]["channels"];
  icon: IconName;
  label: string;
  handle: string;
  href: string;
  external: boolean;
}

export function ContactSection({ content, externalLinkLabel }: ContactSectionProps) {
  const mailto = `mailto:${siteConfig.email}`;
  const channels: Channel[] = [
    { id: "email", icon: "mail", label: "Email", handle: siteConfig.email, href: mailto, external: false },
    ...socialLinks.map((social) => ({
      id: social.id,
      icon: social.id,
      label: social.label,
      handle: social.handle,
      href: social.href,
      external: true,
    })),
  ];

  return (
    <Section id={sectionIds.contact} tone="raised" containerSize="wide" aria-labelledby="contact-title">
      <div className={styles.panel}>
        <Reveal className={styles.pitch}>
          <Eyebrow index="04">{content.eyebrow}</Eyebrow>
          <h2 id="contact-title" className={styles.title}>
            {content.title}
          </h2>
          <p className={styles.lead}>{content.lead}</p>

          <div className={styles.emailRow}>
            <Button href={mailto} size="lg" icon="mail" iconPosition="start">
              {content.emailCta}
            </Button>
            <CopyEmailButton email={siteConfig.email} label={content.copyEmail} copiedLabel={content.copied} />
          </div>
        </Reveal>

        <Reveal delay={120} className={styles.channels}>
          <p className={styles.channelsTitle}>{content.channelsTitle}</p>
          <ul role="list" className={styles.channelList}>
            {channels.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  className={styles.channel}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                >
                  <span className={styles.channelIcon}>
                    <Icon name={channel.icon} size={20} />
                  </span>
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>{channel.label}</span>
                    <span className={styles.channelDescription}>{content.channels[channel.id]}</span>
                  </span>
                  <span className={styles.channelHandle} dir="ltr">
                    {channel.handle}
                  </span>
                  {channel.external && <span className="visually-hidden"> ({externalLinkLabel})</span>}
                  <Icon name={channel.external ? "arrow-up-right" : "arrow-right"} size={18} className={styles.channelArrow} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
