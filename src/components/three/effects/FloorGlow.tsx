"use client";

import { useMemo, useRef } from "react";
import { AdditiveBlending, type MeshBasicMaterial } from "three";
import { useLoopFrame } from "../core/LoopClock";
import { wave } from "../core/loop";
import { getRadialTexture } from "../textures/createRadialTexture";

interface FloorGlowProps {
  color: string;
  floorY: number;
  scale?: [number, number];
  intensity?: number;
}

/** A soft pool of stage light on the floor under the model, like a product-shot spotlight. */
export function FloorGlow({ color, floorY, scale = [7, 3], intensity = 0.22 }: FloorGlowProps) {
  const material = useRef<MeshBasicMaterial>(null);
  const texture = useMemo(() => getRadialTexture(color), [color]);

  useLoopFrame((phase) => {
    if (material.current) material.current.opacity = intensity * (0.9 + 0.1 * wave(phase, 1, 2.2));
  });

  return (
    <mesh position={[0, floorY - 0.01, 0.2]} rotation={[-Math.PI / 2, 0, 0]} scale={[scale[0], scale[1], 1]} renderOrder={-2}>
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
