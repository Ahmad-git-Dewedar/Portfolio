"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, type RefObject } from "react";
import { ACESFilmicToneMapping } from "three";
import { heroSceneConfig } from "../config";
import { LoopClock } from "../core/LoopClock";
import { PerformanceGovernor } from "../core/PerformanceGovernor";
import { PixelBudget } from "../core/PixelBudget";
import type { FocusArea } from "../core/framing";
import type { PointerTarget } from "../interaction/types";
import type { Theme } from "@/lib/theme";
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
  /** Turns the model to face copy on its right instead of its left. */
  mirrored?: boolean;
  /** Page theme; light backgrounds get softer shadows and glows. */
  theme?: Theme;
  onReady?: () => void;
}

const { loopDuration, restPhase, camera, dpr, pixelBudget, floorY } = heroSceneConfig;

/** "low" is chosen automatically when the frame rate drops, and lowers the pixel ratio. */
type Quality = "high" | "low";

export function HeroScene({
  active,
  reducedMotion,
  pointer,
  focusArea,
  mirrored = false,
  theme = "dark",
  onReady,
}: HeroSceneProps) {
  const [quality, setQuality] = useState<Quality>("high");
  const [pixelRatio, setPixelRatio] = useState(1);
  const interactive = !reducedMotion;
  const frameloop = !active ? "never" : reducedMotion ? "demand" : "always";

  return (
    <Canvas
      frameloop={frameloop}
      // Measure layout size, not the visual box: scroll scenes scale this canvas with CSS transforms.
      resize={{ offsetSize: true }}
      dpr={pixelRatio}
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
      <PerformanceGovernor onDecline={() => setQuality("low")} onIncline={() => setQuality("high")} />
      <PixelBudget maxDpr={dpr[quality]} budget={pixelBudget[quality]} onChange={setPixelRatio} />
      <LoopClock duration={loopDuration} running={!reducedMotion} restPhase={restPhase}>
        <CameraRig focusArea={focusArea} pointer={pointer} interactive={interactive} />
        <Suspense fallback={null}>
          <StudioLighting />
          <ModelRig pointer={pointer} interactive={interactive} mirrored={mirrored}>
            <InterfaceSculpture floorY={floorY} shadowStrength={theme === "light" ? 0.4 : 1} />
          </ModelRig>
        </Suspense>
      </LoopClock>
    </Canvas>
  );
}

export default HeroScene;
