"use client";

import { useRef, type ReactNode } from "react";
import type { Group } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { applyPose } from "../../core/applyPose";
import { useLoopFrame } from "../../core/LoopClock";
import { useDisposable } from "../../core/useDisposable";
import { sceneTheme } from "../../theme";
import { sculptureLayout } from "./layout";
import type { SculptureMaterials } from "./materials";
import { satellitePose } from "./motion";

const { orbit } = sculptureLayout;
const COUNT = 3;

/** One body on the orbit; `index` spaces the bodies evenly around the ring. */
function Satellite({ index, children }: { index: number; children: ReactNode }) {
  const body = useRef<Group>(null);
  useLoopFrame((phase) => {
    if (body.current) applyPose(body.current, satellitePose(phase, index, COUNT));
  });
  return <group ref={body}>{children}</group>;
}

interface SatellitesProps {
  materials: SculptureMaterials;
}

/**
 * An accent cube, a satin bead and an aluminium chip orbiting the display on a
 * faint tilted ring. They pass behind the screen, which sells the depth.
 */
export function Satellites({ materials }: SatellitesProps) {
  const cube = useDisposable(() => new RoundedBoxGeometry(0.26, 0.26, 0.26, 4, 0.05));
  const chip = useDisposable(() => new RoundedBoxGeometry(0.42, 0.28, 0.05, 4, 0.03));

  return (
    <group position={orbit.position} rotation={orbit.tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbit.radius, 0.005, 6, 160]} />
        <meshBasicMaterial color={sceneTheme.accent} transparent opacity={0.35} toneMapped={false} depthWrite={false} />
      </mesh>

      <Satellite index={0}>
        <mesh geometry={cube}>
          <primitive object={materials.accent} attach="material" />
        </mesh>
      </Satellite>
      <Satellite index={1}>
        <mesh>
          <sphereGeometry args={[0.13, 32, 24]} />
          <primitive object={materials.satin} attach="material" />
        </mesh>
      </Satellite>
      <Satellite index={2}>
        <mesh geometry={chip}>
          <primitive object={materials.aluminium} attach="material" />
        </mesh>
      </Satellite>
    </group>
  );
}
