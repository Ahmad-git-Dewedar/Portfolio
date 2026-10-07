/**
 * The scroll journey as keyframes. `at` is scroll distance in viewport heights
 * from the top of the journey (hero = 0..1, bridge, then the About scene).
 * Values between keyframes are eased, so the model, camera and typography move
 * continuously with the scrollbar and stop the moment scrolling stops.
 */
export interface Pose {
  /** Horizontal position as a fraction of half the visible width (-1 left edge, 1 right edge, reading-start mirrored). */
  x: number;
  /** Vertical position as a fraction of half the visible height (1 = top edge). */
  y: number;
  /** Model width as a fraction of the visible width. */
  size: number;
  /** Rotation in radians (yaw is mirrored for right-to-left pages). */
  rx: number;
  ry: number;
  rz: number;
  /** Camera distance multiplier (< 1 moves closer). */
  dolly: number;
  /** Camera orbit around the model in radians (mirrored for right-to-left). */
  orbit: number;
  /** Opacity of the 3D typography (0..1). */
  type: number;
  /** Phase of the model's own choreography (floating parts, satellites, screen sheen). */
  phase: number;
}

export interface Keyframe extends Pose {
  at: number;
}

type Partial3 = Omit<Keyframe, "dolly" | "orbit" | "type" | "rz"> & Partial<Pick<Keyframe, "dolly" | "orbit" | "type" | "rz">>;

const frame = (k: Partial3): Keyframe => ({ dolly: 1, orbit: 0, type: 0, rz: 0, ...k });

/** Landscape screens: the model opens on the right, crosses through the typography, settles left of About, then rises away. */
export const wideJourney: readonly Keyframe[] = [
  frame({ at: 0, x: 0.46, y: -0.02, size: 0.44, rx: 0.06, ry: -0.42, phase: 0 }),
  frame({ at: 0.9, x: 0.2, y: 0.02, size: 0.4, rx: 0.1, ry: 0.1, dolly: 0.97, orbit: 0.06, phase: 0.18 }),
  frame({ at: 1.65, x: 0, y: 0, size: 0.34, rx: 0.14, ry: 0.62, rz: -0.03, dolly: 0.86, orbit: 0.12, type: 1, phase: 0.36 }),
  frame({ at: 2.3, x: -0.1, y: 0.02, size: 0.33, rx: 0.12, ry: 0.52, dolly: 0.88, orbit: 0.08, type: 1, phase: 0.5 }),
  frame({ at: 2.9, x: -0.47, y: -0.02, size: 0.34, rx: 0.06, ry: 0.44, phase: 0.64 }),
  frame({ at: 3.8, x: -0.49, y: 0.03, size: 0.32, rx: 0.04, ry: 0.16, phase: 0.86 }),
  frame({ at: 4.4, x: -0.42, y: 1.25, size: 0.26, rx: -0.1, ry: -0.18, phase: 1 }),
];

/** Portrait screens: the model leads from the top, passes between the lines of type, then rises away above About. */
export const narrowJourney: readonly Keyframe[] = [
  frame({ at: 0, x: 0, y: 0.42, size: 0.82, rx: 0.06, ry: -0.3, phase: 0 }),
  frame({ at: 0.9, x: 0, y: 0.26, size: 0.78, rx: 0.1, ry: 0.06, dolly: 0.97, phase: 0.18 }),
  frame({ at: 1.65, x: 0, y: 0.02, size: 0.68, rx: 0.14, ry: 0.55, rz: -0.03, dolly: 0.9, type: 1, phase: 0.36 }),
  frame({ at: 2.3, x: 0, y: 0.06, size: 0.66, rx: 0.12, ry: 0.45, dolly: 0.9, type: 1, phase: 0.5 }),
  frame({ at: 2.9, x: 0, y: 0.56, size: 0.6, rx: 0.06, ry: 0.32, phase: 0.64 }),
  frame({ at: 3.8, x: 0, y: 0.58, size: 0.58, rx: 0.04, ry: 0.12, phase: 0.86 }),
  frame({ at: 4.4, x: 0, y: 1.6, size: 0.5, rx: -0.1, ry: -0.18, phase: 1 }),
];

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const KEYS: (keyof Pose)[] = ["x", "y", "size", "rx", "ry", "rz", "dolly", "orbit", "type", "phase"];

/** The pose at a scroll distance, eased between the surrounding keyframes. */
export function sampleJourney(frames: readonly Keyframe[], at: number, out: Pose): Pose {
  const last = frames[frames.length - 1];
  if (at <= frames[0].at) return Object.assign(out, frames[0]);
  if (at >= last.at) return Object.assign(out, last);
  let index = 0;
  while (frames[index + 1].at < at) index++;
  const from = frames[index];
  const to = frames[index + 1];
  const t = smooth((at - from.at) / (to.at - from.at));
  for (const key of KEYS) out[key] = lerp(from[key], to[key], t);
  return out;
}

export const createPose = (): Pose => ({ ...wideJourney[0] });
