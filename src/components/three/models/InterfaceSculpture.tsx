"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { createInterfaceTexture, INTERFACE_TEXTURE_ASPECT } from "../textures/createInterfaceTexture";
import { sceneTheme } from "../theme";

interface InterfaceSculptureProps {
  animate?: boolean;
}

const DISPLAY = { width: 3.6, height: 3.6 / INTERFACE_TEXTURE_ASPECT + 0.1, depth: 0.12, bezel: 0.1 };

/**
 * Hero centerpiece: a floating aluminium display with a live-looking interface,
 * orbited by a glass card, a chrome sphere and an accent pill. Built from primitives,
 * so it can later be swapped for a GLTF model without touching the scene setup.
 */
export function InterfaceSculpture({ animate = true }: InterfaceSculptureProps) {
  const screenTexture = useMemo(() => createInterfaceTexture(), []);
  useEffect(() => () => screenTexture.dispose(), [screenTexture]);

  const floatIntensity = animate ? 1 : 0;
  const screenWidth = DISPLAY.width - DISPLAY.bezel * 2;
  const screenHeight = screenWidth / INTERFACE_TEXTURE_ASPECT;

  return (
    <group>
      {/* Display */}
      <Float speed={1.2} rotationIntensity={0.15 * floatIntensity} floatIntensity={0.35 * floatIntensity}>
        <RoundedBox args={[DISPLAY.width, DISPLAY.height, DISPLAY.depth]} radius={0.08} smoothness={6} castShadow>
          <meshPhysicalMaterial
            color={sceneTheme.aluminium}
            metalness={0.9}
            roughness={0.3}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>
        <mesh position={[0, 0, DISPLAY.depth / 2 + 0.002]}>
          <planeGeometry args={[screenWidth, screenHeight]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>
      </Float>

      {/* Glass card */}
      <Float speed={1.6} rotationIntensity={0.3 * floatIntensity} floatIntensity={0.6 * floatIntensity}>
        <RoundedBox
          args={[1.7, 1.08, 0.06]}
          radius={0.05}
          smoothness={6}
          position={[1.45, -0.95, 0.85]}
          rotation={[0.05, -0.22, 0.04]}
        >
          <meshPhysicalMaterial
            color={sceneTheme.glassTint}
            transmission={1}
            thickness={0.45}
            roughness={0.2}
            ior={1.45}
            clearcoat={1}
            attenuationColor={sceneTheme.glassAttenuation}
            attenuationDistance={2.5}
          />
        </RoundedBox>
      </Float>

      {/* Chrome sphere */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.8 * floatIntensity}>
        <mesh position={[-2.05, 1.2, 0.5]}>
          <sphereGeometry args={[0.32, 64, 64]} />
          <meshPhysicalMaterial
            color={sceneTheme.chrome}
            metalness={0.75}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Accent pill */}
      <Float speed={1.8} rotationIntensity={0.4 * floatIntensity} floatIntensity={0.5 * floatIntensity}>
        <mesh position={[-1.6, -1.3, 0.65]} rotation={[0.2, 0.3, Math.PI / 2]}>
          <capsuleGeometry args={[0.13, 0.46, 12, 32]} />
          <meshPhysicalMaterial
            color={sceneTheme.accent}
            emissive={sceneTheme.accent}
            emissiveIntensity={0.25}
            metalness={0.2}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>
      </Float>
    </group>
  );
}
