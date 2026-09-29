"use client";

import { useRef } from "react";
import type { Group, Mesh } from "three";
import { BackGlow } from "../../effects/BackGlow";
import { SoftShadow } from "../../effects/SoftShadow";
import { sceneTheme } from "../../theme";
import { AccentPill } from "./AccentPill";
import { Display } from "./Display";
import { GlassCard } from "./GlassCard";
import { Orb } from "./Orb";
import { sculptureLayout } from "./layout";
import { useSculptureMaterials } from "./materials";

interface InterfaceSculptureProps {
  /** World-space floor height for contact shadows. */
  floorY: number;
}

/**
 * The hero model: a floating display orbited by a glass card, a satin orb and an
 * accent pill. Procedural, so it ships without model files; each part owns its
 * own loop motion and can be swapped (e.g. for a GLTF) independently.
 */
export function InterfaceSculpture({ floorY }: InterfaceSculptureProps) {
  const materials = useSculptureMaterials();
  const display = useRef<Group>(null);
  const card = useRef<Group>(null);
  const orb = useRef<Mesh>(null);
  const pill = useRef<Mesh>(null);

  const restHeight = (y: number) => y - floorY;

  return (
    <>
      <BackGlow color={sceneTheme.accent} position={[0.2, 0.3, -1.2]} scale={[9, 6]} intensity={0.5} />

      <Display ref={display} materials={materials} />
      <GlassCard ref={card} materials={materials} />
      <Orb ref={orb} materials={materials} />
      <AccentPill ref={pill} materials={materials} />

      <SoftShadow
        target={display}
        floorY={floorY}
        size={[4.6, 1.3]}
        opacity={0.6}
        restHeight={restHeight(sculptureLayout.display.position[1])}
      />
      <SoftShadow
        target={card}
        floorY={floorY}
        size={[2.2, 0.9]}
        opacity={0.4}
        restHeight={restHeight(sculptureLayout.glassCard.position[1])}
      />
      <SoftShadow
        target={orb}
        floorY={floorY}
        size={[0.9, 0.9]}
        opacity={0.3}
        restHeight={restHeight(sculptureLayout.orb.position[1])}
      />
      <SoftShadow
        target={pill}
        floorY={floorY}
        size={[0.9, 0.45]}
        opacity={0.4}
        restHeight={restHeight(sculptureLayout.pill.position[1])}
      />
    </>
  );
}
