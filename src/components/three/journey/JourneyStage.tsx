"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTheme } from "@/hooks/useTheme";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { cn } from "@/lib/cn";
import type { PointerTarget } from "./JourneyRig";
import styles from "./JourneyStage.module.css";

// Three.js is heavy and browser-only: load it after hydration, never on the server.
const JourneyScene = dynamic(() => import("./JourneyScene"), { ssr: false });

/** Attribute on <html> once the 3D scene is live (the HTML fallbacks step aside). */
export const STAGE_READY_ATTRIBUTE = "data-stage3d";

interface JourneyStageProps {
  /** Accessible description of the 3D content. */
  label: string;
  direction: "ltr" | "rtl";
  /** The bridge statement, rendered as 3D type. */
  typeText: string;
}

/**
 * The pinned 3D layer behind the opening sections. Place it as the first child
 * of the journey element: it sticks to the viewport for the journey's whole
 * length while the sections scroll over it, then leaves with the journey.
 */
export function JourneyStage({ label, direction, typeText }: JourneyStageProps) {
  const layer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLElement | null>(null);
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);
  const isInView = useInView(layer, "120px");
  const reducedMotion = usePrefersReducedMotion();
  const supportsWebGL = useWebGLSupport();
  const theme = useTheme();

  useEffect(() => {
    track.current = layer.current?.parentElement ?? null;
  }, []);

  // Mouse and pen only: a subtle parallax toward the pointer.
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const reset = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!isReady) return;
    const root = document.documentElement;
    root.setAttribute(STAGE_READY_ATTRIBUTE, "ready");
    return () => root.removeAttribute(STAGE_READY_ATTRIBUTE);
  }, [isReady]);

  return (
    <div ref={layer} className={styles.layer} role="img" aria-label={label}>
      {supportsWebGL && (
        <div className={cn(styles.canvas, isReady && styles.canvasVisible)} aria-hidden="true">
          <JourneyScene
            track={track}
            active={isInView}
            reducedMotion={reducedMotion}
            pointer={pointer}
            direction={direction}
            typeText={typeText}
            theme={theme}
            onReady={() => setIsReady(true)}
          />
        </div>
      )}
    </div>
  );
}
