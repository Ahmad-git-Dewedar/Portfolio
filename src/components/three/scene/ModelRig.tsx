"use client";

import { useRef, useState, type ReactNode, type RefObject } from "react";
import { MathUtils, type Group } from "three";
import { useLoopFrame, useLoopRunning } from "../core/LoopClock";
import { heroSceneConfig } from "../config";
import type { PointerTarget } from "../interaction/types";

interface ModelRigProps {
  pointer: RefObject<PointerTarget>;
  interactive: boolean;
  /** Flips the resting yaw so the model faces copy on its right. */
  mirrored?: boolean;
  children: ReactNode;
}

const { baseRotation, pointer: pointerConfig, intro } = heroSceneConfig;

/**
 * Orients the model: a settle-in entrance, then a damped tilt toward the pointer.
 * Loop motion lives in the parts themselves, so the two never fight.
 */
export function ModelRig({ pointer, interactive, mirrored = false, children }: ModelRigProps) {
  const group = useRef<Group>(null);
  const animated = useLoopRunning();
  const side = mirrored ? -1 : 1;
  const restYaw = baseRotation.y * side;
  // Captured once so re-renders never reset the animated transform.
  const [initial] = useState(() =>
    animated
      ? { rotation: [baseRotation.x, restYaw + intro.yaw * side, 0] as const, y: intro.y }
      : { rotation: [baseRotation.x, restYaw, 0] as const, y: 0 },
  );

  useLoopFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const px = interactive ? pointer.current.x : 0;
    const py = interactive ? pointer.current.y : 0;
    const targetX = baseRotation.x - py * pointerConfig.rotate.x;
    const targetY = restYaw + px * pointerConfig.rotate.y;

    if (!animated) {
      g.rotation.set(targetX, targetY, 0);
      g.position.y = 0;
      return;
    }
    g.rotation.x = MathUtils.damp(g.rotation.x, targetX, pointerConfig.damping, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, targetY, pointerConfig.damping, delta);
    g.position.y = MathUtils.damp(g.position.y, 0, 2.2, delta);
  }, -0.5);

  return (
    <group ref={group} rotation={initial.rotation} position={[0, initial.y, 0]}>
      {children}
    </group>
  );
}
