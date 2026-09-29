"use client";

import type { RefObject } from "react";
import type { Mesh } from "three";
import { useLoopFrame } from "../../core/LoopClock";
import { applyPose } from "../../core/applyPose";
import { sculptureLayout } from "./layout";
import type { SculptureMaterials } from "./materials";
import { pillPose } from "./motion";

const { pill } = sculptureLayout;

interface AccentPillProps {
  ref: RefObject<Mesh | null>;
  materials: SculptureMaterials;
}

/** Glossy brand-blue capsule that bobs and rocks, echoing a UI toggle. */
export function AccentPill({ ref, materials }: AccentPillProps) {
  useLoopFrame((phase) => {
    if (ref.current) applyPose(ref.current, pillPose(phase));
  });

  return (
    <mesh ref={ref} position={pill.position} rotation={pill.rotation}>
      <capsuleGeometry args={[pill.radius, pill.length, 12, 32]} />
      <primitive object={materials.accent} attach="material" />
    </mesh>
  );
}
