"use client";

import { useFrame, type RootState } from "@react-three/fiber";
import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";

interface LoopContextValue {
  /** Current phase in [0, 1]. Read inside frame callbacks, never during render. */
  phase: RefObject<number>;
}

const LoopContext = createContext<LoopContextValue | null>(null);

interface LoopClockProps {
  /**
   * Where the phase comes from each frame. The hero passes the scroll journey's
   * phase, so every part of the model moves with the scrollbar, not with time:
   * nothing floats or spins on its own while the page is still.
   */
  getPhase: () => number;
  children: ReactNode;
}

/** Single phase shared by every animated part of the model. */
export function LoopClock({ getPhase, children }: LoopClockProps) {
  const phase = useRef(0);

  // Negative priority: update the phase before any consumer reads it this frame.
  useFrame(() => {
    phase.current = getPhase();
  }, -1);

  return <LoopContext.Provider value={{ phase }}>{children}</LoopContext.Provider>;
}

export type LoopFrameCallback = (phase: number, delta: number, state: RootState) => void;

/**
 * Like `useFrame`, but receives the shared phase. Keep `priority` <= 0:
 * positive priorities switch off React Three Fiber's automatic rendering.
 */
export function useLoopFrame(callback: LoopFrameCallback, priority = 0): void {
  const context = useContext(LoopContext);
  if (!context) throw new Error("useLoopFrame must be used inside <LoopClock>");
  const { phase } = context;
  useFrame((state, delta) => callback(phase.current, delta, state), priority);
}
