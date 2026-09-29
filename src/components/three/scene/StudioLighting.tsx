"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { sceneTheme } from "../theme";

/**
 * Product-photography lighting: a large overhead softbox, side strip lights for
 * crisp edge reflections and a cool brand-blue rim. The environment is rendered
 * once from Lightformers, so there is no HDR download and no per-frame cost.
 */
export function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 6]} intensity={1.2} />
      <directionalLight position={[-6, 2, -4]} intensity={0.9} color={sceneTheme.accent} />

      <Environment resolution={256} frames={1}>
        {/* Key softbox */}
        <Lightformer form="rect" intensity={3} position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
        {/* Strip lights for long, clean highlights on the aluminium edges */}
        <Lightformer form="rect" intensity={2.2} position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[8, 0.6, 1]} />
        <Lightformer form="rect" intensity={2.2} position={[6, 0, 1]} rotation-y={-Math.PI / 2} scale={[8, 0.6, 1]} />
        {/* Front fill */}
        <Lightformer form="circle" intensity={0.8} position={[0, 0, 8]} scale={4} />
        {/* Brand-tinted rim from behind */}
        <Lightformer form="ring" color={sceneTheme.accent} intensity={5} position={[-4, 3, -6]} scale={5} />
        <Lightformer form="rect" color={sceneTheme.accentAlt} intensity={2} position={[5, -2, -6]} scale={[6, 2, 1]} />
      </Environment>
    </>
  );
}
