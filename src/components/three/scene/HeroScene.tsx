"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, type RefObject } from "react";
import { ACESFilmicToneMapping } from "three";
import { heroSceneConfig } from "../config";
import { LoopClock } from "../core/LoopClock";
import type { FocusArea } from "../core/framing";
import type { PointerTarget } from "../interaction/types";
import { InterfaceSculpture } from "../models/InterfaceSculpture";
import { CameraRig } from "./CameraRig";
import { ModelRig } from "./ModelRig";
import { StudioLighting } from "./StudioLighting";

export interface HeroSceneProps {
  /** Pauses rendering entirely when false, e.g. while the hero is offscreen. */
  active: boolean;
  /** Holds a still pose and renders only on demand. */
  reducedMotion: boolean;
  pointer: RefObject<PointerTarget>;
  focusArea: FocusArea;
  onReady?: () => void;
}

const { loopDuration, restPhase, camera, dpr, floorY } = heroSceneConfig;

/** "low" is chosen automatically when the frame rate drops, and lowers the pixel ratio. */
type Quality = "high" | "low";

export function HeroScene({ active, reducedMotion, pointer, focusArea, onReady }: HeroSceneProps) {
  const [quality, setQuality] = useState<Quality>("high");
  const interactive = !reducedMotion;
  const frameloop = !active ? "never" : reducedMotion ? "demand" : "always";

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, quality === "high" ? dpr.high : dpr.low]}
      camera={{ fov: camera.fov, near: 1, far: 40, position: [0, 0, 10] }}
      gl={{
        antialias: true,
        alpha: true,
        stencil: false,
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      onCreated={() => onReady?.()}
    >
      {/* Steps quality down when the frame rate can't keep up, and back up when it recovers. */}
      <PerformanceMonitor
        onDecline={() => setQuality("low")}
        onIncline={() => setQuality("high")}
        onFallback={() => setQuality("low")}
        flipflops={3}
      />
      <LoopClock duration={loopDuration} running={!reducedMotion} restPhase={restPhase}>
        <CameraRig focusArea={focusArea} pointer={pointer} interactive={interactive} />
        <Suspense fallback={null}>
          <StudioLighting />
          <ModelRig pointer={pointer} interactive={interactive}>
            <InterfaceSculpture floorY={floorY} />
          </ModelRig>
        </Suspense>
      </LoopClock>
    </Canvas>
  );
}

export default HeroScene;
