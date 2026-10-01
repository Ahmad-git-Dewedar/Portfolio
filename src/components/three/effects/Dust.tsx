"use client";

import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, type Points } from "three";
import { useLoopFrame } from "../core/LoopClock";
import { wave } from "../core/loop";
import { useDisposable } from "../core/useDisposable";
import { getRadialTexture } from "../textures/createRadialTexture";

interface DustProps {
  count?: number;
  /** Half-extents of the box the motes fill. */
  spread?: [number, number, number];
  color?: string;
  size?: number;
}

/** Deterministic pseudo-random numbers so the field is identical on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Soft light motes floating around the model, like dust in a studio beam.
 * One draw call; the whole field sways on the shared loop so it stays seamless.
 */
export function Dust({ count = 260, spread = [5, 3, 3], color = "#9fd0ff", size = 0.05 }: DustProps) {
  const points = useRef<Points>(null);
  const texture = useMemo(() => getRadialTexture("#ffffff", 64), []);
  const geometry = useDisposable(() => {
    const random = mulberry32(17);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (random() * 2 - 1) * spread[0];
      positions[i * 3 + 1] = (random() * 2 - 1) * spread[1];
      positions[i * 3 + 2] = (random() * 2 - 1) * spread[2] - 0.5;
    }
    const buffer = new BufferGeometry();
    buffer.setAttribute("position", new BufferAttribute(positions, 3));
    return buffer;
  });

  useLoopFrame((phase) => {
    const field = points.current;
    if (!field) return;
    field.rotation.y = 0.32 * wave(phase, 1, 0);
    field.rotation.x = 0.06 * wave(phase, 2, 1.1);
    field.position.y = 0.15 * wave(phase, 1, 2.3);
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        map={texture}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
