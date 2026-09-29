"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { sceneTheme } from "../theme";

/**
 * Softbox-style studio lighting built from Lightformers, so reflections look
 * premium without downloading an HDR file.
 */
export function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          <Lightformer
            form="ring"
            color={sceneTheme.accent}
            intensity={6}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[10, 10, 0]}
            scale={10}
          />
        </group>
      </Environment>
    </>
  );
}
