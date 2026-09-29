"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion";
import { ProjectCard } from "../ProjectCard";
import { ProjectPreviewDialog } from "../ProjectPreviewDialog";
import type { ProjectLabels, ProjectView } from "../types";
import styles from "./ProjectShowcase.module.css";

interface ProjectShowcaseProps {
  projects: readonly ProjectView[];
  labels: ProjectLabels;
}

/** Featured project first at full width, the rest in a grid, sharing one quick-view dialog. */
export function ProjectShowcase({ projects, labels }: ProjectShowcaseProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  return (
    <>
      <ul role="list" className={styles.grid}>
        {projects.map((project, index) => (
          <li key={project.slug} className={project.featured ? styles.featured : undefined}>
            <Reveal delay={project.featured ? 0 : (index % 3) * 90} className={styles.item}>
              <ProjectCard project={project} labels={labels} onPreview={() => setPreviewIndex(index)} />
            </Reveal>
          </li>
        ))}
      </ul>
      <ProjectPreviewDialog
        projects={projects}
        index={previewIndex}
        labels={labels}
        onNavigate={setPreviewIndex}
        onClose={() => setPreviewIndex(null)}
      />
    </>
  );
}
