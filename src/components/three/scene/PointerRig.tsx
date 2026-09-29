"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, type ReactNode } from "react";
import { MathUtils, type Group } from "three";

interface PointerRigProps {
  children: ReactNode;
  /** Resting orientation, a flattering three-quarter view. */
  baseRotation?: [number, number, number];
  /** How far (radians) the pointer can turn the model. */
  strength?: number;
  interactive?: boolean;
  /** Width in world units the content is designed for; it scales down below this. */
  designWidth?: number;
}

/**
 * Eases its children toward the pointer and plays a short settle-in on mount.
 */
export function PointerRig({
  children,
  baseRotation = [0.08, -0.38, 0],
  strength = 0.22,
  interactive = true,
  designWidth = 5.6,
}: PointerRigProps) {
  const group = useRef<Group>(null);
  const viewportWidth = useThree((state) => state.viewport.width);
  const scale = Math.min(1, viewportWidth / designWidth);
  // Captured once so re-renders (e.g. on resize) never reset the animated transform.
  const [intro] = useState(() => ({
    rotation: [baseRotation[0], baseRotation[1] - 0.5, 0] as const,
    position: [0, -0.4, 0] as const,
  }));

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const px = interactive ? state.pointer.x : 0;
    const py = interactive ? state.pointer.y : 0;
    const lambda = 3.2;
    g.rotation.x = MathUtils.damp(g.rotation.x, baseRotation[0] - py * strength * 0.5, lambda, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, baseRotation[1] + px * strength, lambda, delta);
    g.position.y = MathUtils.damp(g.position.y, 0, 2.4, delta);
  });

  return (
    <group ref={group} scale={scale} rotation={intro.rotation} position={intro.position}>
      {children}
    </group>
  );
}
