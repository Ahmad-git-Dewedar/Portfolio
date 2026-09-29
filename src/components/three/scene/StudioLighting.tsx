"use client";

import { sceneTheme } from "../theme";
import { StudioEnvironment, type StudioLight } from "./StudioEnvironment";

/**
 * Product-photography rig: a large overhead softbox, side strips for long
 * highlights on the aluminium edges, a soft front fill and a cool brand rim.
 */
const studioLights: readonly StudioLight[] = [
  { form: "rect", intensity: 3, position: [0, 6, 2], rotation: [Math.PI / 2, 0, 0], scale: [10, 4] },
  { form: "rect", intensity: 2.2, position: [-6, 1, 1], rotation: [0, Math.PI / 2, 0], scale: [8, 0.6] },
  { form: "rect", intensity: 2.2, position: [6, 0, 1], rotation: [0, -Math.PI / 2, 0], scale: [8, 0.6] },
  { form: "circle", intensity: 0.8, position: [0, 0, 8], scale: 4 },
  { form: "ring", intensity: 5, color: sceneTheme.accent, position: [-4, 3, -6], scale: 5 },
  { form: "rect", intensity: 2, color: sceneTheme.accentAlt, position: [5, -2, -6], scale: [6, 2] },
];

export function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 6]} intensity={1.2} />
      <directionalLight position={[-6, 2, -4]} intensity={0.9} color={sceneTheme.accent} />
      <StudioEnvironment lights={studioLights} />
    </>
  );
}
