import { Container, Icon } from "@/components/ui";
import { socialLinks } from "@/config/site";
import styles from "./SiteFooter.module.css";

interface SiteFooterProps {
  name: string;
  role: string;
  rightsLabel: string;
  externalLinkLabel: string;
}

export function SiteFooter({ name, role, rightsLabel, externalLinkLabel }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container size="wide" className={styles.inner}>
        <p className={styles.legal}>
          <span>
            &copy; {year} {name}
          </span>
          <span className={styles.divider} aria-hidden="true" />
          <span>{role}</span>
          <span className={styles.divider} aria-hidden="true" />
          <span>{rightsLabel}</span>
        </p>
        <ul role="list" className={styles.socials}>
          {socialLinks.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label={`${social.label} (${externalLinkLabel})`}
              >
                <Icon name={social.id} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
