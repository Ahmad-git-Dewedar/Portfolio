"use client";

import { useEffect, useMemo } from "react";
import { MeshPhysicalMaterial } from "three";
import { sceneTheme } from "../../theme";

export interface SculptureMaterials {
  aluminium: MeshPhysicalMaterial;
  frontGlass: MeshPhysicalMaterial;
  /**
   * Translucent frosted glass. Deliberately not refractive: real transmission
   * costs an extra full-scene render every frame and reads noisier at this size.
   */
  glass: MeshPhysicalMaterial;
  satin: MeshPhysicalMaterial;
  accent: MeshPhysicalMaterial;
}

/** Shared materials, created once per sculpture and disposed on unmount. */
export function useSculptureMaterials(): SculptureMaterials {
  const materials = useMemo<SculptureMaterials>(
    () => ({
      aluminium: new MeshPhysicalMaterial({
        color: sceneTheme.aluminium,
        metalness: 1,
        roughness: 0.34,
        clearcoat: 0.4,
        clearcoatRoughness: 0.25,
        envMapIntensity: 1.15,
      }),
      frontGlass: new MeshPhysicalMaterial({
        color: "#030304",
        metalness: 0.2,
        roughness: 0.06,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
      }),
      glass: new MeshPhysicalMaterial({
        color: sceneTheme.glassTint,
        transparent: true,
        opacity: 0.18,
        roughness: 0.25,
        clearcoat: 1,
        envMapIntensity: 0.5,
        depthWrite: false,
      }),
      satin: new MeshPhysicalMaterial({
        color: sceneTheme.chrome,
        metalness: 0.8,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
      accent: new MeshPhysicalMaterial({
        color: sceneTheme.accent,
        emissive: sceneTheme.accent,
        emissiveIntensity: 0.28,
        metalness: 0.15,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
      }),
    }),
    [],
  );

  useEffect(() => () => Object.values(materials).forEach((material) => material.dispose()), [materials]);
  return materials;
}
