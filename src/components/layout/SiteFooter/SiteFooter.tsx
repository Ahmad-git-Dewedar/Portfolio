import { Container, Icon } from "@/components/ui";
import { socialLinks } from "@/config/site";
import { BrandMark } from "../BrandMark";
import styles from "./SiteFooter.module.css";

interface FooterLink {
  label: string;
  href: string;
}

interface SiteFooterProps {
  name: string;
  role: string;
  homeHref: string;
  homeLabel: string;
  links: readonly FooterLink[];
  labels: {
    rights: string;
    backToTop: string;
    externalLink: string;
    primaryNav: string;
  };
}

export function SiteFooter({ name, role, homeHref, homeLabel, links, labels }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container size="wide">
        <div className={styles.top}>
          <div className={styles.brand}>
            <BrandMark href={homeHref} name={name} ariaLabel={homeLabel} />
            <p className={styles.role}>{role}</p>
          </div>

          <nav aria-label={labels.primaryNav}>
            <ul role="list" className={styles.links}>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.end}>
            <ul role="list" className={styles.socials}>
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.social}
                    aria-label={`${social.label} (${labels.externalLink})`}
                  >
                    <Icon name={social.id} size={18} />
                  </a>
                </li>
              ))}
            </ul>
            <a href={homeHref} className={styles.toTop}>
              <span>{labels.backToTop}</span>
              <Icon name="arrow-up" size={16} />
            </a>
          </div>
        </div>

        {/* Oversized signature, purely decorative. */}
        <p className={styles.wordmark} aria-hidden="true">
          {name}
        </p>

        <p className={styles.legal}>
          <span>
            &copy; {year} {name}
          </span>
          <span className={styles.divider} aria-hidden="true" />
          <span>{labels.rights}</span>
        </p>
      </Container>
    </footer>
  );
}
