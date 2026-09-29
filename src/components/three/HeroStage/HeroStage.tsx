"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { cn } from "@/lib/cn";
import styles from "./HeroStage.module.css";

// Three.js is heavy and browser-only: load it after hydration, never on the server.
const HeroScene = dynamic(() => import("../scene/HeroScene"), { ssr: false });

interface HeroStageProps {
  /** Accessible description of the 3D content. */
  label: string;
  className?: string;
}

/**
 * Frame for the hero 3D model. Shows a lightweight CSS poster while the scene loads,
 * and keeps it as the final state when WebGL is unavailable.
 */
export function HeroStage({ label, className }: HeroStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stageRef, "120px");
  const reducedMotion = usePrefersReducedMotion();
  const supportsWebGL = useWebGLSupport();
  const [isReady, setIsReady] = useState(false);

  return (
    <div ref={stageRef} className={cn(styles.stage, className)} role="img" aria-label={label}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={cn(styles.poster, isReady && styles.posterHidden)} aria-hidden="true">
        <div className={styles.posterDevice} />
      </div>
      {supportsWebGL && (
        <div className={cn(styles.canvas, isReady && styles.canvasVisible)} aria-hidden="true">
          <HeroScene active={isInView} reducedMotion={reducedMotion} onReady={() => setIsReady(true)} />
        </div>
      )}
    </div>
  );
}
