"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Euler, Quaternion, Vector3, type Mesh, type Object3D } from "three";
import { getRadialTexture } from "../textures/createRadialTexture";

interface SoftShadowProps {
  /** Object whose footprint this shadow follows. */
  target: RefObject<Object3D | null>;
  /** Floor height in the shadow's parent space (the model's own space). */
  floorY: number;
  /** Footprint size (width, depth) when the target rests at `restHeight`. */
  size: [number, number];
  opacity?: number;
  /** Height above the floor at which the shadow has its nominal size and opacity. */
  restHeight: number;
}

const position = new Vector3();
const parentQuaternion = new Quaternion();
const targetQuaternion = new Quaternion();
const euler = new Euler();

/**
 * A cheap, blurred contact shadow on the model's own floor: it follows the
 * target's footprint and yaw and softens as the target lifts. Because it lives
 * in the model's space it travels, scales and turns with the model as the
 * scroll journey moves it. One textured quad, no shadow maps.
 */
export function SoftShadow({ target, floorY, size, opacity = 0.5, restHeight }: SoftShadowProps) {
  const mesh = useRef<Mesh>(null);
  const texture = useMemo(() => getRadialTexture("#000000"), []);
  const invalidate = useThree((state) => state.invalidate);

  // A new strength (e.g. after a theme switch) must repaint even in on-demand mode.
  useEffect(() => invalidate(), [opacity, invalidate]);

  useFrame(() => {
    const shadow = mesh.current;
    const object = target.current;
    const parent = shadow?.parent;
    if (!shadow || !object || !parent) return;

    object.getWorldPosition(position);
    parent.worldToLocal(position);
    parent.getWorldQuaternion(parentQuaternion);
    object.getWorldQuaternion(targetQuaternion);
    euler.setFromQuaternion(parentQuaternion.invert().multiply(targetQuaternion), "YXZ");

    const lift = position.y - floorY - restHeight;
    const spread = 1 + lift * 0.18;
    shadow.position.set(position.x, floorY, position.z);
    // Lie flat, then turn within the floor plane to match the target's yaw.
    shadow.rotation.set(-Math.PI / 2, 0, euler.y);
    shadow.scale.set(size[0] * spread, size[1] * spread, 1);

    const material = shadow.material as { opacity: number };
    material.opacity = opacity * Math.min(1, Math.max(0.25, 1 - lift * 0.35));
  });

  return (
    <mesh ref={mesh} renderOrder={-1}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}
