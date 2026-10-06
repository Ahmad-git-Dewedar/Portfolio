export type { ProjectView } from "@/content/projects";

/** UI copy the project components need, resolved on the server per locale. */
export interface ProjectLabels {
  featured: string;
  visit: string;
  highlights: string;
  externalLink: string;
  /** Contextual cursor label over the visual, e.g. "View project". */
  cursor: string;
}
