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

const { display, glassCard, orb, pill, orbit } = sculptureLayout;

/** Whole-composition sway: a slow turntable swing with a gentle rise and fall. */
export function sculpturePose(phase: number): PartPose {
  return {
    position: [0, 0.06 * wave(phase, 2, 0.4), 0],
    rotation: [0.05 * wave(phase, 1, 1.7), 0.26 * wave(phase, 1, 0) + 0.05 * wave(phase, 2, 1.1), 0.02 * wave(phase, 1, 2.6)],
  };
}

export function displayPose(phase: number): PartPose {
  return {
    position: [display.position[0], display.position[1] + 0.11 * wave(phase, 1, 0), display.position[2]],
    rotation: [0.045 * wave(phase, 1, 1.2), 0.08 * wave(phase, 2, 0.4), 0.02 * wave(phase, 2, 0.3)],
  };
}

export function glassCardPose(phase: number): PartPose {
  return {
    position: [
      glassCard.position[0] + 0.12 * wave(phase, 1, 2.1),
      glassCard.position[1] + 0.2 * wave(phase, 2, 1.6),
      glassCard.position[2] + 0.12 * wave(phase, 1, 0.5),
    ],
    rotation: [
      glassCard.rotation[0] + 0.08 * wave(phase, 1, 0.2),
      glassCard.rotation[1] + 0.18 * wave(phase, 1, 2.4),
      glassCard.rotation[2] + 0.08 * wave(phase, 2, 0.9),
    ],
  };
}

/** Figure-eight around the orb's resting point. */
export function orbPose(phase: number): PartPose {
  const angle = TAU * phase;
  return {
    position: [
      orb.position[0] + 0.3 * Math.cos(angle),
      orb.position[1] + 0.2 * Math.sin(angle * 2),
      orb.position[2] + 0.25 * Math.sin(angle),
    ],
    rotation: [0, 0, 0],
  };
}

/** Bobs, rocks and makes one full turn per loop. */
export function pillPose(phase: number): PartPose {
  return {
    position: [pill.position[0], pill.position[1] + 0.2 * wave(phase, 2, 3.4), pill.position[2]],
    rotation: [
      pill.rotation[0] + 0.35 * wave(phase, 1, 2),
      pill.rotation[1] + TAU * phase,
      pill.rotation[2] + 0.25 * wave(phase, 1, 1),
    ],
  };
}

/**
 * Small bodies circling the display on a tilted ring. Each completes exactly one
 * orbit per loop and spins a whole number of turns, so the wrap is invisible.
 */
export function satellitePose(phase: number, index: number, count: number): PartPose {
  const angle = TAU * (phase + index / count);
  return {
    position: [
      orbit.radius * Math.cos(angle),
      0.18 * Math.sin(angle * 2),
      orbit.radius * Math.sin(angle),
    ],
    rotation: [TAU * phase * 2, TAU * phase * (index + 1), 0],
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
