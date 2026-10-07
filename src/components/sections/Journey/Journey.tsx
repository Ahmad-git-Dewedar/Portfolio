import type { ReactNode } from "react";
import { JourneyStage } from "@/components/three";
import styles from "./Journey.module.css";

interface JourneyProps {
  /** Accessible description of the 3D content. */
  label: string;
  direction: "ltr" | "rtl";
  /** Statement rendered as 3D type in the bridge between Hero and About. */
  typeText: string;
  children: ReactNode;
}

/**
 * The opening of the page as one continuous scene: a single pinned 3D layer
 * behind the sections it wraps. The sections scroll over it while the scroll
 * position moves the model and camera, so Hero, bridge and About read as one
 * shot instead of separate blocks.
 */
export function Journey({ label, direction, typeText, children }: JourneyProps) {
  return (
    <div className={styles.journey}>
      <JourneyStage label={label} direction={direction} typeText={typeText} />
      {children}
    </div>
  );
}
