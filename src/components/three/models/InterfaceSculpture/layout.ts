import { INTERFACE_TEXTURE_ASPECT } from "../../textures/createInterfaceTexture";

type Vec3 = [number, number, number];

const displayWidth = 3.6;
const bezel = 0.1;
const screenWidth = displayWidth - bezel * 2;
const screenHeight = screenWidth / INTERFACE_TEXTURE_ASPECT;

/** Resting placement of every part. Motion is layered on top of these values. */
export const sculptureLayout = {
  display: {
    width: displayWidth,
    height: screenHeight + bezel * 2,
    depth: 0.12,
    radius: 0.09,
    screen: { width: screenWidth, height: screenHeight, radius: 0.035 },
    position: [0, 0.05, 0] as Vec3,
  },
  glassCard: {
    size: [1.7, 1.08, 0.06] as Vec3,
    position: [1.3, -0.5, 0.85] as Vec3,
    rotation: [0.04, -0.2, 0.05] as Vec3,
  },
  orb: {
    radius: 0.32,
    position: [-2.05, 1.18, 0.45] as Vec3,
  },
  /** Tilted ring the satellites travel on, centered on the display. */
  orbit: {
    radius: 2.55,
    tilt: [0.32, 0, -0.14] as Vec3,
    position: [0, 0.05, 0] as Vec3,
  },
  pill: {
    radius: 0.13,
    length: 0.46,
    position: [-1.62, -1.12, 0.62] as Vec3,
    rotation: [0.2, 0.3, Math.PI / 2] as Vec3,
  },
} as const;
