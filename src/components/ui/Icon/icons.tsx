import type { ReactNode } from "react";

interface IconDefinition {
  viewBox: string;
  /** Stroke icons inherit `currentColor` as stroke; filled icons use it as fill. */
  kind: "stroke" | "fill";
  /** Directional icons are mirrored automatically in RTL layouts. */
  directional?: boolean;
  body: ReactNode;
}

export const icons = {
  "arrow-right": {
    viewBox: "0 0 24 24",
    kind: "stroke",
    directional: true,
    body: <path d="M5 12h14M13 6l6 6-6 6" />,
  },
  "arrow-up-right": {
    viewBox: "0 0 24 24",
    kind: "stroke",
    directional: true,
    body: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  },
  "arrow-up": {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M12 19V5M6 11l6-6 6 6" />,
  },
  "arrow-down": {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M12 5v14M6 13l6 6 6-6" />,
  },
  mail: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7.5 8 5.5 8-5.5" />
      </>
    ),
  },
  "chevron-left": {
    viewBox: "0 0 24 24",
    kind: "stroke",
    directional: true,
    body: <path d="m15 5-7 7 7 7" />,
  },
  "chevron-right": {
    viewBox: "0 0 24 24",
    kind: "stroke",
    directional: true,
    body: <path d="m9 5 7 7-7 7" />,
  },
  eye: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  copy: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
        <path d="M15.5 8.5V6A2.5 2.5 0 0 0 13 3.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
      </>
    ),
  },
  check: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  },
  code: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />,
  },
  layers: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="m12 3.5 9 4.75-9 4.75-9-4.75 9-4.75ZM3 12.25 12 17l9-4.75M3 16.25 12 21l9-4.75" />,
  },
  cube: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4l8-4.6ZM4 7.4l8 4.6 8-4.6M12 12v9.2" />,
  },
  sparkle: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M12 3c.6 4.6 3.4 7.4 8 8-4.6.6-7.4 3.4-8 8-.6-4.6-3.4-7.4-8-8 4.6-.6 7.4-3.4 8-8ZM19 2.5v3M17.5 4h3" />,
  },
  rocket: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <path d="M14.5 4.5c2.5-1.3 4.8-1.3 6-1 .3 1.2.3 3.5-1 6L13 16l-5-5 6.5-6.5ZM8 11l-3.5-.5L7 7.5l4 .5M13 16l.5 3.5 3-2.5-.5-4M7.5 16.5 4 20" />
        <circle cx="16" cy="8" r="1.4" />
      </>
    ),
  },
  zap: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12l1-8Z" />,
  },
  accessibility: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="7.6" r="0.9" fill="currentColor" />
        <path d="M7.5 10.2 12 11l4.5-.8M12 11v3.2l-2.2 3.8M12 14.2l2.2 3.8" />
      </>
    ),
  },
  target: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </>
    ),
  },
  sun: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </>
    ),
  },
  moon: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  },
  youtube: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="4.5" />
        <path d="m10 9.2 5 2.8-5 2.8V9.2Z" fill="currentColor" />
      </>
    ),
  },
  play: {
    viewBox: "0 0 24 24",
    kind: "fill",
    body: <path d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.4-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6Z" />,
  },
  plus: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M12 5v14M5 12h14" />,
  },
  flag: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  },
  globe: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.75 5.6 3.75 9S14.5 18.4 12 21c-2.5-2.6-3.75-5.6-3.75-9S9.5 5.6 12 3Z" />
      </>
    ),
  },
  menu: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M4 8.5h16M4 15.5h16" />,
  },
  close: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: <path d="M6 6l12 12M18 6 6 18" />,
  },
  github: {
    viewBox: "0 0 16 16",
    kind: "fill",
    body: (
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    ),
  },
  linkedin: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 10.5v6M12 16.5v-6M12 13.2c0-1.7 1-2.7 2.3-2.7 1.4 0 2.2 1 2.2 2.7v3.3" />
        <circle cx="8" cy="7.5" r="0.6" fill="currentColor" />
      </>
    ),
  },
  fiverr: {
    viewBox: "0 0 24 24",
    kind: "stroke",
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M13 7.5h-.6c-1.2 0-1.9.7-1.9 1.9V16.5M9 11h4.5M15.5 11v5.5" />
        <circle cx="15.5" cy="8.4" r="0.6" fill="currentColor" />
      </>
    ),
  },
} satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof icons;
