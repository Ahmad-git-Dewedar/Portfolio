/**
 * Where the model should sit inside the canvas, as fractions (0..1) of the
 * canvas size measured from its top-left corner.
 */
export interface FocusArea {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const FULL_FOCUS_AREA: FocusArea = { top: 0, right: 1, bottom: 1, left: 0 };

export function isSameFocusArea(a: FocusArea, b: FocusArea, epsilon = 0.002): boolean {
  return (
    Math.abs(a.top - b.top) < epsilon &&
    Math.abs(a.right - b.right) < epsilon &&
    Math.abs(a.bottom - b.bottom) < epsilon &&
    Math.abs(a.left - b.left) < epsilon
  );
}
