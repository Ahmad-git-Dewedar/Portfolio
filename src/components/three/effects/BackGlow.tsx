"use client";

import { useMemo, useRef } from "react";
import { AdditiveBlending, type MeshBasicMaterial } from "three";
import { useLoopFrame } from "../core/LoopClock";
import { wave } from "../core/loop";
import { getRadialTexture } from "../textures/createRadialTexture";

interface BackGlowProps {
  color: string;
  position?: [number, number, number];
  scale?: [number, number];
  intensity?: number;
}

/**
 * Additive halo behind the model: gives the soft light-bloom of a product shot
 * without a post-processing pass. Breathes once per loop.
 */
export function BackGlow({ color, position = [0, 0, -1], scale = [8, 5], intensity = 0.55 }: BackGlowProps) {
  const material = useRef<MeshBasicMaterial>(null);
  const texture = useMemo(() => getRadialTexture(color), [color]);

  useLoopFrame((phase) => {
    if (material.current) material.current.opacity = intensity * (0.85 + 0.15 * wave(phase, 1, 0.5));
  });

  return (
    <mesh position={position} scale={[scale[0], scale[1], 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={material}
        map={texture}
        transparent
        opacity={intensity}
        blending={AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
