"use client";

import { useFrame, type RootState } from "@react-three/fiber";
import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";

interface LoopContextValue {
  /** Current phase in [0, 1). Read inside frame callbacks, never during render. */
  phase: RefObject<number>;
  running: boolean;
}

const LoopContext = createContext<LoopContextValue | null>(null);

/** Longest step the clock will take, so resuming after a pause never skips ahead. */
const MAX_STEP = 1 / 20;

interface LoopClockProps {
  duration: number;
  /** When false the clock holds `restPhase` (reduced motion). */
  running: boolean;
  restPhase: number;
  children: ReactNode;
}

/**
 * Single source of time for the scene. Everything animated reads one shared,
 * wrapping phase, so the whole composition repeats as one seamless cycle.
 */
export function LoopClock({ duration, running, restPhase, children }: LoopClockProps) {
  const time = useRef(restPhase * duration);
  const phase = useRef(restPhase);

  // Negative priority: advance the clock before any consumer reads it this frame.
  useFrame((_, delta) => {
    if (!running) {
      phase.current = restPhase;
      return;
    }
    time.current = (time.current + Math.min(delta, MAX_STEP)) % duration;
    phase.current = time.current / duration;
  }, -1);

  return <LoopContext.Provider value={{ phase, running }}>{children}</LoopContext.Provider>;
}

export type LoopFrameCallback = (phase: number, delta: number, state: RootState) => void;

/**
 * Like `useFrame`, but receives the shared loop phase. Keep `priority` <= 0:
 * positive priorities switch off React Three Fiber's automatic rendering.
 */
export function useLoopFrame(callback: LoopFrameCallback, priority = 0): void {
  const context = useContext(LoopContext);
  if (!context) throw new Error("useLoopFrame must be used inside <LoopClock>");
  const { phase } = context;
  useFrame((state, delta) => callback(phase.current, delta, state), priority);
}

/** Whether the loop is animating (false under reduced motion). */
export function useLoopRunning(): boolean {
  return useContext(LoopContext)?.running ?? false;
}
