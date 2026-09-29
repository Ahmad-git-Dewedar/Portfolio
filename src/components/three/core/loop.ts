export const TAU = Math.PI * 2;

/**
 * A periodic wave over the loop. Because `harmonic` is an integer, the value at
 * phase 0 equals the value at phase 1, so motion built from it never jumps on repeat.
 */
export function wave(phase: number, harmonic = 1, offset = 0): number {
  return Math.sin(TAU * harmonic * phase + offset);
}

/** Hermite smoothstep between edges a and b. */
export function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/**
 * Eased 0 -> 1 progress inside [start, end] of the loop, and 0 everywhere else.
 * Drive one-shot effects (like a sheen) that are invisible at both ends of their
 * travel: the reset then happens off-screen and the loop stays seamless.
 */
export function windowedProgress(phase: number, start: number, end: number): number {
  if (phase <= start || phase >= end) return 0;
  return smoothstep(start, end, phase);
}
