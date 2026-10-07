"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, type RefObject } from "react";
import { ACESFilmicToneMapping } from "three";
import type { Theme } from "@/lib/theme";
import { heroSceneConfig } from "../config";
import { LoopClock } from "../core/LoopClock";
import { PerformanceGovernor } from "../core/PerformanceGovernor";
import { PixelBudget } from "../core/PixelBudget";
import { InterfaceSculpture } from "../models/InterfaceSculpture";
import { StudioLighting } from "../scene/StudioLighting";
import { DepthType } from "./DepthType";
import { JourneyContext, JourneyStore } from "./JourneyContext";
import { JourneyDriver } from "./JourneyDriver";
import { JourneyRig, type PointerTarget } from "./JourneyRig";

export interface JourneySceneProps {
  /** The journey element whose scroll position drives the scene. */
  track: RefObject<HTMLElement | null>;
  /** Pauses rendering entirely when false (journey off screen). */
  active: boolean;
  /** Holds the opening pose and disables pointer motion. */
  reducedMotion: boolean;
  pointer: RefObject<PointerTarget>;
  direction: "ltr" | "rtl";
  /** The bridge statement rendered as 3D type. */
  typeText: string;
  theme: Theme;
  onReady?: () => void;
}

const { camera, dpr, pixelBudget, floorY } = heroSceneConfig;

/** "low" is chosen automatically when the frame rate drops, and lowers the pixel ratio. */
type Quality = "high" | "low";

/**
 * One continuous 3D scene for the opening of the page. Rendered on demand:
 * scrolling (or the pointer) requests frames, and the scene stops drawing as
 * soon as it has caught up.
 */
export function JourneyScene({
  track,
  active,
  reducedMotion,
  pointer,
  direction,
  typeText,
  theme,
  onReady,
}: JourneySceneProps) {
  const [quality, setQuality] = useState<Quality>("high");
  const [pixelRatio, setPixelRatio] = useState(1);
  const [journey] = useState(() => new JourneyStore());

  useEffect(() => journey.setDirection(direction), [journey, direction]);

  const light = theme === "light";

  return (
    <Canvas
      frameloop={active ? "demand" : "never"}
      dpr={pixelRatio}
      // Measure layout size, not the visual box, so CSS transforms never resize the canvas.
      resize={{ offsetSize: true }}
      camera={{ fov: camera.fov, near: 1, far: 40, position: [0, camera.elevation, 12] }}
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
      <JourneyContext.Provider value={journey}>
        <PerformanceGovernor onDecline={() => setQuality("low")} onIncline={() => setQuality("high")} />
        <PixelBudget maxDpr={dpr[quality]} budget={pixelBudget[quality]} onChange={setPixelRatio} />
        <JourneyDriver track={track} still={reducedMotion} />
        <LoopClock getPhase={() => (reducedMotion ? heroSceneConfig.restPhase : journey.pose.phase)}>
          <Suspense fallback={null}>
            <StudioLighting />
            <JourneyRig pointer={pointer} interactive={!reducedMotion}>
              <InterfaceSculpture floorY={floorY} shadowStrength={light ? 0.4 : 1} />
            </JourneyRig>
            {!reducedMotion && (
              <DepthType
                text={typeText}
                direction={direction}
                color={light ? "#1d1d1f" : "#ffffff"}
                shade={light ? "#55555b" : "#a1a1a6"}
                halo={light ? "rgb(245 245 247 / 0.95)" : "rgb(0 0 0 / 0.8)"}
              />
            )}
          </Suspense>
        </LoopClock>
      </JourneyContext.Provider>
    </Canvas>
  );
}

export default JourneyScene;
