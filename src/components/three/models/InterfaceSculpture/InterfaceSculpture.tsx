"use client";

import { useRef } from "react";
import { applyPose } from "../../core/applyPose";
import { useLoopFrame } from "../../core/LoopClock";
import type { Group, Mesh } from "three";
import { BackGlow } from "../../effects/BackGlow";
import { Dust } from "../../effects/Dust";
import { FloorGlow } from "../../effects/FloorGlow";
import { SoftShadow } from "../../effects/SoftShadow";
import { sceneTheme } from "../../theme";
import { AccentPill } from "./AccentPill";
import { Display } from "./Display";
import { GlassCard } from "./GlassCard";
import { Orb } from "./Orb";
import { Satellites } from "./Satellites";
import { sculptureLayout } from "./layout";
import { useSculptureMaterials } from "./materials";
import { sculpturePose } from "./motion";

interface InterfaceSculptureProps {
  /** World-space floor height for contact shadows. */
  floorY: number;
  /** Multiplier on shadow opacity (lighter page backgrounds need less). */
  shadowStrength?: number;
}

/**
 * The hero model: a swaying display with a glass card, a satin orb, an accent
 * pill and three satellites on a tilted orbit. Procedural, so it ships without model files; each part owns its
 * own loop motion and can be swapped (e.g. for a GLTF) independently.
 */
export function InterfaceSculpture({ floorY, shadowStrength = 1 }: InterfaceSculptureProps) {
  const materials = useSculptureMaterials();
  const display = useRef<Group>(null);
  const card = useRef<Group>(null);
  const orb = useRef<Mesh>(null);
  const pill = useRef<Mesh>(null);
  const sway = useRef<Group>(null);

  useLoopFrame((phase) => {
    if (sway.current) applyPose(sway.current, sculpturePose(phase));
  });

  const restHeight = (y: number) => y - floorY;

  return (
    <>
      <BackGlow color={sceneTheme.halo} position={[0.2, 0.3, -1.2]} scale={[9, 6]} intensity={0.2} />
      <FloorGlow color={sceneTheme.halo} floorY={floorY} intensity={0.14} />
      <Dust color={sceneTheme.accentSoft} />

      <group ref={sway}>
        <Display ref={display} materials={materials} />
        <GlassCard ref={card} materials={materials} />
        <Orb ref={orb} materials={materials} />
        <AccentPill ref={pill} materials={materials} />
        <Satellites materials={materials} />
      </group>

      <SoftShadow
        target={display}
        floorY={floorY}
        size={[4.6, 1.3]}
        opacity={0.6 * shadowStrength}
        restHeight={restHeight(sculptureLayout.display.position[1])}
      />
      <SoftShadow
        target={card}
        floorY={floorY}
        size={[2.2, 0.9]}
        opacity={0.4 * shadowStrength}
        restHeight={restHeight(sculptureLayout.glassCard.position[1])}
      />
      <SoftShadow
        target={orb}
        floorY={floorY}
        size={[0.9, 0.9]}
        opacity={0.3 * shadowStrength}
        restHeight={restHeight(sculptureLayout.orb.position[1])}
      />
      <SoftShadow
        target={pill}
        floorY={floorY}
        size={[0.9, 0.45]}
        opacity={0.4 * shadowStrength}
        restHeight={restHeight(sculptureLayout.pill.position[1])}
      />
    </>
  );
}
