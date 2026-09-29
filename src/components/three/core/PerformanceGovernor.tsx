"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface PerformanceGovernorProps {
  onDecline: () => void;
  onIncline: () => void;
  /** Frames per second below which a sample window counts as slow. */
  lowFps?: number;
  /** Frames per second above which a sample window counts as smooth. */
  highFps?: number;
  /** After this many tier changes the governor settles on the lower tier. */
  maxFlips?: number;
}

const WINDOW_SECONDS = 1;
/** Frames longer than this are pauses (tab switch, offscreen), not slowness. */
const MAX_FRAME_SECONDS = 0.25;

/**
 * Samples the frame rate in one-second windows and reports sustained drops or
 * recoveries. Hysteresis (2 slow windows down, 4 smooth windows up) and a flip
 * limit prevent quality from oscillating.
 */
export function PerformanceGovernor({
  onDecline,
  onIncline,
  lowFps = 42,
  highFps = 57,
  maxFlips = 3,
}: PerformanceGovernorProps) {
  const sample = useRef({ time: 0, frames: 0, slow: 0, smooth: 0, flips: 0, declined: false });

  useFrame((_, delta) => {
    const s = sample.current;
    if (delta > MAX_FRAME_SECONDS) {
      s.time = 0;
      s.frames = 0;
      return;
    }
    s.time += delta;
    s.frames += 1;
    if (s.time < WINDOW_SECONDS) return;

    const fps = s.frames / s.time;
    s.time = 0;
    s.frames = 0;
    s.slow = fps < lowFps ? s.slow + 1 : 0;
    s.smooth = fps > highFps ? s.smooth + 1 : 0;

    if (!s.declined && s.slow >= 2) {
      s.declined = true;
      s.flips += 1;
      s.slow = 0;
      onDecline();
    } else if (s.declined && s.smooth >= 4 && s.flips < maxFlips) {
      s.declined = false;
      s.flips += 1;
      s.smooth = 0;
      onIncline();
    }
  });

  return null;
}
