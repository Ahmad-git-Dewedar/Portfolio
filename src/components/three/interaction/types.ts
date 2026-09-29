/**
 * Normalized interaction target, written by DOM listeners and read by the scene
 * every frame. Both axes are in [-1, 1]; the scene applies its own damping.
 */
export interface PointerTarget {
  x: number;
  y: number;
}
