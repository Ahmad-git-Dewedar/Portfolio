/**
 * Tunables for the hero scene. Adjust here rather than inside components.
 */
export const heroSceneConfig = {
  /** Seconds for one full animation cycle. Every looping motion completes an integer number of periods in it. */
  loopDuration: 16,
  /** Phase (0..1) shown when motion is reduced: a balanced, flattering pose. */
  restPhase: 0.18,

  camera: {
    fov: 30,
    /** Slight elevation so the camera looks down onto the model. */
    elevation: 0.35,
    /** Loop-driven dolly amplitude in world units. */
    breathe: 0.06,
  },

  /** Approximate world-space bounds of the whole composition, used for framing. */
  modelBounds: { width: 5.0, height: 3.3 },

  /**
   * How much of the focus area the model fills. Values above 1 let floating
   * accents bleed slightly past the area, which keeps the model large.
   */
  fill: { width: 0.95, height: 1.12 },

  /** Resting three-quarter orientation of the model (radians). */
  baseRotation: { x: 0.06, y: -0.34 },

  pointer: {
    /** Max rotation (radians) the pointer adds on each axis. */
    rotate: { x: 0.08, y: 0.18 },
    /** Max camera translation (world units) for parallax. */
    parallax: { x: 0.18, y: 0.1 },
    /** Damping rate; higher is snappier. */
    damping: 3,
  },

  /** Entrance: the model settles in from this offset. */
  intro: { yaw: -0.45, y: -0.35 },

  /** World-space height of the invisible floor that receives soft shadows. */
  floorY: -1.95,

  /** Device pixel ratio caps per quality tier. */
  dpr: { high: 1.5, low: 1 },
} as const;

export type HeroSceneConfig = typeof heroSceneConfig;
