import { TAU, wave, windowedProgress } from "../../core/loop";
import { sculptureLayout } from "./layout";

/**
 * Loop choreography for every part, as pure functions of the loop phase (0..1).
 * All terms are integer-harmonic waves (or effects invisible at the wrap), so
 * each function returns identical values at phase 0 and phase 1: the loop is seamless.
 */

export interface PartPose {
  position: [number, number, number];
  rotation: [number, number, number];
}

const { display, glassCard, orb, pill } = sculptureLayout;

export function displayPose(phase: number): PartPose {
  return {
    position: [display.position[0], display.position[1] + 0.07 * wave(phase, 1, 0), display.position[2]],
    rotation: [0.025 * wave(phase, 1, 1.2), 0.05 * wave(phase, 1, 0.4), 0.012 * wave(phase, 2, 0.3)],
  };
}

export function glassCardPose(phase: number): PartPose {
  return {
    position: [
      glassCard.position[0] + 0.05 * wave(phase, 1, 2.1),
      glassCard.position[1] + 0.12 * wave(phase, 1, 1.6),
      glassCard.position[2] + 0.04 * wave(phase, 2, 0.5),
    ],
    rotation: [
      glassCard.rotation[0] + 0.04 * wave(phase, 1, 0.2),
      glassCard.rotation[1] + 0.08 * wave(phase, 1, 2.4),
      glassCard.rotation[2] + 0.05 * wave(phase, 1, 0.9),
    ],
  };
}

/** Slow figure-eight around the orb's resting point. */
export function orbPose(phase: number): PartPose {
  const angle = TAU * phase;
  return {
    position: [
      orb.position[0] + 0.14 * Math.cos(angle),
      orb.position[1] + 0.09 * Math.sin(angle * 2),
      orb.position[2] + 0.12 * Math.sin(angle),
    ],
    rotation: [0, 0, 0],
  };
}

export function pillPose(phase: number): PartPose {
  return {
    position: [pill.position[0], pill.position[1] + 0.12 * wave(phase, 1, 3.4), pill.position[2]],
    rotation: [pill.rotation[0] + 0.3 * wave(phase, 1, 2), pill.rotation[1], pill.rotation[2] + 0.2 * wave(phase, 1, 1)],
  };
}

/** Loop window in which a light sheen sweeps across the display. */
export const SHEEN_WINDOW = [0.1, 0.42] as const;

/**
 * Texture offset for the screen sheen. The band is fully off-screen at both
 * ends of its sweep, so the reset outside the window is never visible.
 */
export function sheenOffset(phase: number): number {
  return 0.8 - windowedProgress(phase, SHEEN_WINDOW[0], SHEEN_WINDOW[1]) * 1.6;
}

/** Opacity of the display's live status dot: eight soft pulses per loop. */
export function statusPulse(phase: number): number {
  return 0.65 + 0.35 * wave(phase, 8, 0);
}
