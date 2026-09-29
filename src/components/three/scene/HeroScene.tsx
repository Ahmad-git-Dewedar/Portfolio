"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { InterfaceSculpture } from "../models/InterfaceSculpture";
import { PointerRig } from "./PointerRig";
import { StudioLighting } from "./StudioLighting";

export interface HeroSceneProps {
  /** Pauses the render loop when false, e.g. while the hero is offscreen. */
  active?: boolean;
  reducedMotion?: boolean;
  onReady?: () => void;
}

export function HeroScene({ active = true, reducedMotion = false, onReady }: HeroSceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.6], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
    >
      <Suspense fallback={null}>
        <StudioLighting />
        <PointerRig interactive={!reducedMotion}>
          <InterfaceSculpture animate={!reducedMotion} />
        </PointerRig>
        <ContactShadows position={[0, -1.95, 0]} opacity={0.55} scale={12} blur={2.6} far={4} resolution={512} />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
