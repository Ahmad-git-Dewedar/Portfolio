"use client";

import { createContext, useContext } from "react";
import { MathUtils } from "three";
import { createPose, narrowJourney, sampleJourney, wideJourney, type Pose } from "./keyframes";

const EPSILON = 0.0005;

/**
 * Mutable per-frame state of the scroll journey, shared by the scene's parts.
 * Updated through methods inside frame callbacks; never read during render.
 */
export class JourneyStore {
  /** Smoothed scroll distance into the journey, in viewport heights. */
  distance = 0;
  /** The current eased pose (model, camera, typography). */
  readonly pose: Pose = createPose();
  /** True on portrait screens, which use the narrow keyframes. */
  narrow = false;
  /** 1 for left-to-right pages, -1 for right-to-left (mirrors horizontal motion). */
  dir: 1 | -1 = 1;

  setDirection(direction: "ltr" | "rtl"): void {
    this.dir = direction === "rtl" ? -1 : 1;
  }

  /** Eases toward the scroll target and resamples the pose. Returns true while still moving. */
  advance(target: number, dt: number, damping: number, narrow: boolean): boolean {
    this.distance = MathUtils.damp(this.distance, target, damping, dt);
    const settled = Math.abs(this.distance - target) < EPSILON;
    if (settled) this.distance = target;
    this.narrow = narrow;
    sampleJourney(narrow ? narrowJourney : wideJourney, this.distance, this.pose);
    return !settled;
  }
}

export const JourneyContext = createContext<JourneyStore | null>(null);

export function useJourney(): JourneyStore {
  const journey = useContext(JourneyContext);
  if (!journey) throw new Error("useJourney must be used inside <JourneyScene>");
  return journey;
}
