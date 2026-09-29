export type { ProjectView } from "@/content/projects";

/** UI copy the project components need, resolved on the server per locale. */
export interface ProjectLabels {
  featured: string;
  visit: string;
  preview: string;
  close: string;
  previous: string;
  next: string;
  highlights: string;
  externalLink: string;
  /** Template with a {current} and {total} placeholder, e.g. "{current} of {total}". */
  position: string;
}
