"use client";

import type { RefObject } from "react";
import type { Group } from "three";
import { useLoopFrame } from "../../core/LoopClock";
import { applyPose } from "../../core/applyPose";
import { useDisposable } from "../../core/useDisposable";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { createRoundedRectGeometry } from "../../geometry/roundedRect";
import { sceneTheme } from "../../theme";
import { sculptureLayout } from "./layout";
import type { SculptureMaterials } from "./materials";
import { glassCardPose } from "./motion";

const { glassCard } = sculptureLayout;

interface GlassCardProps {
  ref: RefObject<Group | null>;
  materials: SculptureMaterials;
}

/** Frosted glass panel carrying a minimal profile widget, floating in front of the display. */
export function GlassCard({ ref, materials }: GlassCardProps) {
  const [width, height, depth] = glassCard.size;
  const bar = useDisposable(() => createRoundedRectGeometry(1, 1, 0.5));
  const shellGeometry = useDisposable(() => new RoundedBoxGeometry(width, height, depth, 6, 0.05));

  useLoopFrame((phase) => {
    if (ref.current) applyPose(ref.current, glassCardPose(phase));
  });

  const face = depth / 2 + 0.004;
  const left = -width / 2 + 0.2;

  return (
    <group ref={ref} position={glassCard.position} rotation={glassCard.rotation}>
      <mesh geometry={shellGeometry}>
        <primitive object={materials.glass} attach="material" />
      </mesh>

      <mesh position={[left + 0.1, height / 2 - 0.26, face]}>
        <circleGeometry args={[0.1, 32]} />
        <meshBasicMaterial color={sceneTheme.accent} toneMapped={false} />
      </mesh>
      <mesh geometry={bar} position={[left + 0.62, height / 2 - 0.22, face]} scale={[0.64, 0.05, 1]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} toneMapped={false} />
      </mesh>
      <mesh geometry={bar} position={[left + 0.52, height / 2 - 0.31, face]} scale={[0.44, 0.035, 1]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh geometry={bar} position={[0, -height / 2 + 0.24, face]} scale={[width - 0.4, 0.12, 1]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} toneMapped={false} />
      </mesh>
    </group>
  );
}
