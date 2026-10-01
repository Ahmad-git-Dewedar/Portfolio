"use client";

import dynamic from "next/dynamic";
import { useCallback, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { useTheme } from "@/hooks/useTheme";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { cn } from "@/lib/cn";
import { FULL_FOCUS_AREA, isSameFocusArea, type FocusArea } from "../core/framing";
import { usePointerTarget } from "../interaction/usePointerTarget";
import { HeroFocusContext } from "./HeroFocusArea";
import styles from "./HeroStage.module.css";

// Three.js is heavy and browser-only: load it after hydration, never on the server.
const HeroScene = dynamic(() => import("../scene/HeroScene"), { ssr: false });

interface HeroStageProps {
  /** Accessible description of the 3D content. */
  label: string;
  /** Page content layered over the canvas. Mark the model's slot with <HeroFocusArea />. */
  children: ReactNode;
  className?: string;
  /** Class for the content layer, e.g. to lay out the copy around the focus area. */
  contentClassName?: string;
  /** Mirror the model's resting angle so it faces copy placed on its right (RTL layouts). */
  mirrored?: boolean;
}

/**
 * Full-bleed 3D stage with content layered on top. The canvas spans the whole
 * hero so the model can be large, and the camera frames it inside the element
 * marked with <HeroFocusArea />. A CSS poster covers loading and no-WebGL cases.
 */
export function HeroStage({ label, children, className, contentClassName, mirrored = false }: HeroStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [focusElement, setFocusElement] = useState<HTMLElement | null>(null);
  const [focusArea, setFocusArea] = useState<FocusArea>(FULL_FOCUS_AREA);
  const [isReady, setIsReady] = useState(false);

  const isInView = useInView(stageRef, "120px");
  const reducedMotion = usePrefersReducedMotion();
  const supportsWebGL = useWebGLSupport();
  const theme = useTheme();
  const pointer = usePointerTarget(stageRef, !reducedMotion);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !focusElement) return;

    const measure = () => {
      const outer = stage.getBoundingClientRect();
      const inner = focusElement.getBoundingClientRect();
      if (!outer.width || !outer.height) return;
      const next: FocusArea = {
        top: (inner.top - outer.top) / outer.height,
        bottom: (inner.bottom - outer.top) / outer.height,
        left: (inner.left - outer.left) / outer.width,
        right: (inner.right - outer.left) / outer.width,
      };
      setFocusArea((previous) => (isSameFocusArea(previous, next) ? previous : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(focusElement);
    return () => observer.disconnect();
  }, [focusElement]);

  const registerFocus = useCallback((element: HTMLElement | null) => setFocusElement(element), []);
  const focusContext = useMemo(() => ({ register: registerFocus }), [registerFocus]);

  const focusStyle = {
    "--focus-top": `${focusArea.top * 100}%`,
    "--focus-bottom": `${(1 - focusArea.bottom) * 100}%`,
    "--focus-left": `${focusArea.left * 100}%`,
    "--focus-right": `${(1 - focusArea.right) * 100}%`,
  } as CSSProperties;

  return (
    <div ref={stageRef} className={cn(styles.stage, className)} style={focusStyle}>
      <div className={styles.backdrop} role="img" aria-label={label}>
        <div className={cn(styles.poster, isReady && styles.posterHidden)} aria-hidden="true">
          <div className={styles.posterDevice} />
        </div>
        {supportsWebGL && (
          <div className={cn(styles.canvas, isReady && styles.canvasVisible)} aria-hidden="true">
            <HeroScene
              active={isInView}
              reducedMotion={reducedMotion}
              pointer={pointer}
              focusArea={focusArea}
              mirrored={mirrored}
              theme={theme}
              onReady={() => setIsReady(true)}
            />
          </div>
        )}
        {/* Darkens the edges and fades the bottom into the next section. */}
        <div className={styles.vignette} aria-hidden="true" />
      </div>

      <HeroFocusContext.Provider value={focusContext}>
        <div className={cn(styles.content, contentClassName)}>{children}</div>
      </HeroFocusContext.Provider>
    </div>
  );
}
