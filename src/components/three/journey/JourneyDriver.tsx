"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, type RefObject } from "react";
import { MathUtils } from "three";
import { heroSceneConfig } from "../config";
import { useJourney } from "./JourneyContext";

interface JourneyDriverProps {
  /** The journey element whose scroll position drives the scene. */
  track: RefObject<HTMLElement | null>;
  /** Hold the opening pose (reduced motion). */
  still: boolean;
}

/** Portrait threshold (width / height) below which the narrow keyframes are used. */
const NARROW_ASPECT = 0.9;

/**
 * Reads how far the page has scrolled through the journey and eases the scene
 * toward it. Renders on demand: a frame is requested on scroll and kept going
 * only until the scene has caught up, so a still page costs nothing.
 */
export function JourneyDriver({ track, still }: JourneyDriverProps) {
  const journey = useJourney();
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const onScroll = () => {
      const element = track.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      // Only wake the renderer while the journey is on screen.
      if (rect.bottom > 0 && rect.top < window.innerHeight) invalidate();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [track, invalidate]);

  useFrame((state, delta) => {
    const element = track.current;
    if (!element) return;

    const viewport = window.innerHeight || 1;
    const rect = element.getBoundingClientRect();
    const span = Math.max(0, (rect.height - viewport) / viewport);
    const target = still ? 0 : MathUtils.clamp(-rect.top / viewport, 0, span);
    const narrow = state.size.width / Math.max(1, state.size.height) < NARROW_ASPECT;

    if (journey.advance(target, Math.min(delta, 0.05), heroSceneConfig.scrollDamping, narrow)) invalidate();
  }, -2);

  return null;
}
