/**
 * Tunables for the 3D scene. Adjust here rather than inside components.
 */
export const heroSceneConfig = {
  /** Phase (0..1) of the model's choreography shown when motion is reduced. */
  restPhase: 0.18,

  camera: {
    fov: 30,
    /** World height visible at the model's depth (z = 0). Positions and sizes derive from it. */
    frameHeight: 6.2,
    /** Slight elevation so the camera looks down onto the model. */
    elevation: 0.35,
  },

  /** Approximate world-space bounds of the whole composition, used for sizing. */
  modelBounds: { width: 5.6, height: 3.7 },

  pointer: {
    /** Max rotation (radians) the pointer adds on each axis. */
    rotate: { x: 0.05, y: 0.1 },
    /** Max camera translation (world units) for parallax. */
    parallax: { x: 0.14, y: 0.08 },
    /** Damping rate; higher is snappier. */
    damping: 3,
  },

  /** How quickly the scene catches up with the scroll position (higher is snappier). */
  scrollDamping: 5,

  /** Local height of the floor that receives soft shadows, under the model. */
  floorY: -1.95,

  /** Device pixel ratio caps per quality tier. */
  dpr: { high: 1.5, low: 1 },
  /** Max rendered pixels per frame per tier; large screens lower their DPR to fit. */
  pixelBudget: { high: 3_200_000, low: 1_600_000 },
} as const;

export type HeroSceneConfig = typeof heroSceneConfig;
