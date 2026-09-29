"use client";

import { useRef, type RefObject } from "react";
import { AdditiveBlending, type Group, type MeshBasicMaterial, type Texture } from "three";
import { useLoopFrame } from "../../core/LoopClock";
import { applyPose } from "../../core/applyPose";
import { useDisposable } from "../../core/useDisposable";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { createRoundedFrameGeometry, createRoundedRectGeometry } from "../../geometry/roundedRect";
import { createInterfaceTexture } from "../../textures/createInterfaceTexture";
import { createSheenTexture } from "../../textures/createSheenTexture";
import { sceneTheme } from "../../theme";
import { sculptureLayout } from "./layout";
import { displayPose, sheenOffset, statusPulse } from "./motion";
import type { SculptureMaterials } from "./materials";

const { display } = sculptureLayout;
/** Stacking distances in front of the shell, wide enough to never z-fight. */
const LAYER = { face: 0.002, screen: 0.006, sheen: 0.01, status: 0.012 } as const;

interface DisplayProps {
  ref: RefObject<Group | null>;
  materials: SculptureMaterials;
}

/** Floating aluminium display with a black glass face, an interface and a passing sheen. */
export function Display({ ref, materials }: DisplayProps) {
  const screenTexture = useDisposable<Texture>(() => createInterfaceTexture());
  const sheenTexture = useDisposable<Texture>(() => createSheenTexture());
  const shellGeometry = useDisposable(
    () => new RoundedBoxGeometry(display.width, display.height, display.depth, 6, display.radius),
  );
  // Black glass bezel around (not behind) the screen, so the two never z-fight.
  const bezelGeometry = useDisposable(() =>
    createRoundedFrameGeometry(
      { width: display.width - 0.02, height: display.height - 0.02, radius: display.radius - 0.01 },
      display.screen,
    ),
  );
  const screenGeometry = useDisposable(() =>
    createRoundedRectGeometry(display.screen.width, display.screen.height, display.screen.radius),
  );

  const sheen = useRef<MeshBasicMaterial>(null);
  const statusDot = useRef<MeshBasicMaterial>(null);
  const front = display.depth / 2;

  useLoopFrame((phase) => {
    if (ref.current) applyPose(ref.current, displayPose(phase));
    if (sheen.current?.map) sheen.current.map.offset.x = sheenOffset(phase);
    if (statusDot.current) statusDot.current.opacity = statusPulse(phase);
  });

  return (
    <group ref={ref} position={display.position}>
      <mesh geometry={shellGeometry}>
        <primitive object={materials.aluminium} attach="material" />
      </mesh>

      <mesh geometry={bezelGeometry} position={[0, 0, front + LAYER.face]}>
        <primitive object={materials.frontGlass} attach="material" />
      </mesh>

      <mesh geometry={screenGeometry} position={[0, 0, front + LAYER.screen]}>
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      <mesh geometry={screenGeometry} position={[0, 0, front + LAYER.sheen]}>
        <meshBasicMaterial
          ref={sheen}
          map={sheenTexture}
          transparent
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Live status indicator in the screen's top-right corner */}
      <mesh position={[display.screen.width / 2 - 0.12, display.screen.height / 2 - 0.1, front + LAYER.status]}>
        <circleGeometry args={[0.028, 24]} />
        <meshBasicMaterial ref={statusDot} color={sceneTheme.success} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}
