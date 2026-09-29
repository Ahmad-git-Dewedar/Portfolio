"use client";

import type { RefObject } from "react";
import type { Mesh } from "three";
import { useLoopFrame } from "../../core/LoopClock";
import { applyPose } from "../../core/applyPose";
import { sculptureLayout } from "./layout";
import type { SculptureMaterials } from "./materials";
import { orbPose } from "./motion";

const { orb } = sculptureLayout;

interface OrbProps {
  ref: RefObject<Mesh | null>;
  materials: SculptureMaterials;
}

/** Satin metal sphere tracing a slow figure-eight around its resting point. */
export function Orb({ ref, materials }: OrbProps) {
  useLoopFrame((phase) => {
    if (ref.current) applyPose(ref.current, orbPose(phase));
  });

  return (
    <mesh ref={ref} position={orb.position}>
      <sphereGeometry args={[orb.radius, 64, 48]} />
      <primitive object={materials.satin} attach="material" />
    </mesh>
  );
}
