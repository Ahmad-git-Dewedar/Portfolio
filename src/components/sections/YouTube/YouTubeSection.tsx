import { Reveal } from "@/components/motion";
import { Button, Eyebrow, Icon, Section } from "@/components/ui";
import { sectionIds, sectionNumbers } from "@/config/navigation";
import { youtubeChannel } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/en";
import styles from "./YouTubeSection.module.css";

interface YouTubeSectionProps {
  name: string;
  content: Dictionary["youtube"];
  externalLinkLabel: string;
}

/** Channel spotlight: pitch and subscribe on one side, a player-style card on the other. */
export function YouTubeSection({ name, content, externalLinkLabel }: YouTubeSectionProps) {
  return (
    <Section id={sectionIds.youtube} containerSize="wide" aria-labelledby="youtube-title">
      <div className={styles.panel} data-spotlight>
        <Reveal className={styles.copy}>
          <Eyebrow index={sectionNumbers.youtube}>{content.eyebrow}</Eyebrow>
          <h2 id="youtube-title" className={styles.title}>
            {content.title}
          </h2>
          <p className={styles.lead}>{content.lead}</p>
          <div className={styles.actions}>
            <a href={youtubeChannel.subscribeUrl} target="_blank" rel="noopener noreferrer" className={styles.subscribe}>
              <Icon name="youtube" size={20} />
              <span>{content.subscribe}</span>
              <span className="visually-hidden"> ({externalLinkLabel})</span>
            </a>
            <Button href={youtubeChannel.url} external variant="secondary" size="lg" icon="arrow-up-right">
              {content.visit}
              <span className="visually-hidden"> ({externalLinkLabel})</span>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120} className={styles.playerWrap}>
          <a
            href={youtubeChannel.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.player}
            aria-label={`${content.playerLabel} ${youtubeChannel.handle} (${externalLinkLabel})`}
          >
            <span className={styles.screen} aria-hidden="true">
              <span className={styles.glow} />
              <span className={styles.play}>
                <span className={styles.ring} />
                <span className={styles.ring} />
                <Icon name="play" size={34} />
              </span>
            </span>
            <span className={styles.bar} aria-hidden="true">
              <span className={styles.avatar}>AD</span>
              <span className={styles.channel}>
                <span className={styles.channelName}>{name}</span>
                <span className={styles.channelMeta}>
                  <span dir="ltr">{youtubeChannel.handle}</span> · {content.tagline}
                </span>
              </span>
              <Icon name="youtube" size={22} className={styles.brand} />
            </span>
            <span className={styles.progress} aria-hidden="true">
              <span className={styles.progressFill} />
            </span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
