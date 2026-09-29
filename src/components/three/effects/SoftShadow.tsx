"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { Euler, Quaternion, Vector3, type Mesh, type Object3D } from "three";
import { getRadialTexture } from "../textures/createRadialTexture";

interface SoftShadowProps {
  /** Object whose footprint this shadow follows. */
  target: RefObject<Object3D | null>;
  /** World-space floor height. */
  floorY: number;
  /** Footprint size (width, depth) when the target rests at `restHeight`. */
  size: [number, number];
  opacity?: number;
  /** Height above the floor at which the shadow has its nominal size and opacity. */
  restHeight: number;
}

const worldPosition = new Vector3();
const worldQuaternion = new Quaternion();
const euler = new Euler();
const flatQuaternion = new Quaternion();
const flatScale = new Vector3();
const LIE_FLAT = new Euler(-Math.PI / 2, 0, 0);

/**
 * A cheap, blurred contact shadow anchored in world space: it stays flat on the
 * floor whatever its parent does, follows the target's footprint and yaw, and
 * softens as the target floats higher. Costs one textured quad, no shadow maps.
 */
export function SoftShadow({ target, floorY, size, opacity = 0.5, restHeight }: SoftShadowProps) {
  const mesh = useRef<Mesh>(null);
  const texture = useMemo(() => getRadialTexture("#000000"), []);

  useLayoutEffect(() => {
    // The world matrix is written by hand each frame.
    if (mesh.current) mesh.current.matrixWorldAutoUpdate = false;
  }, []);

  useFrame(() => {
    const shadow = mesh.current;
    const object = target.current;
    if (!shadow || !object) return;

    object.updateWorldMatrix(true, false);
    object.matrixWorld.decompose(worldPosition, worldQuaternion, flatScale);
    euler.setFromQuaternion(worldQuaternion, "YXZ");

    const lift = worldPosition.y - floorY - restHeight;
    const spread = 1 + lift * 0.18;
    flatQuaternion.setFromEuler(LIE_FLAT);
    flatQuaternion.premultiply(worldQuaternion.setFromEuler(euler.set(0, euler.y, 0)));

    worldPosition.y = floorY;
    flatScale.set(size[0] * spread, size[1] * spread, 1);
    shadow.matrixWorld.compose(worldPosition, flatQuaternion, flatScale);

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
