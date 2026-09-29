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
