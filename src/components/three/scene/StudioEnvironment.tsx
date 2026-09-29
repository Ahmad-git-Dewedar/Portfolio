"use client";

import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import {
  CircleGeometry,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  PMREMGenerator,
  RingGeometry,
  Scene,
  type BufferGeometry,
} from "three";

type Vec3 = [number, number, number];

/** An emissive panel in the virtual studio. Only its reflection is ever seen. */
export interface StudioLight {
  form: "rect" | "circle" | "ring";
  position: Vec3;
  rotation?: Vec3;
  scale?: number | [number, number];
  color?: string;
  /** Multiplier on the color; values above 1 produce bright, HDR-like highlights. */
  intensity: number;
}

interface StudioEnvironmentProps {
  lights: readonly StudioLight[];
  /** Rotation applied to the whole light rig. */
  rotation?: Vec3;
  /** Blur of the resulting environment (0 = sharp reflections). */
  blur?: number;
}

/**
 * Bakes a set of light panels into a prefiltered environment map, once, with
 * three's PMREMGenerator. Gives studio reflections with no HDR download and no
 * per-frame cost, without pulling HDR/EXR loaders into the bundle.
 */
export function StudioEnvironment({ lights, rotation = [0, 0, 0], blur = 0.02 }: StudioEnvironmentProps) {
  const gl = useThree((state) => state.gl);
  // Read the scene through the store getter: it is a mutable three.js object.
  const getState = useThree((state) => state.get);
  const invalidate = useThree((state) => state.invalidate);

  useLayoutEffect(() => {
    const geometries: Record<StudioLight["form"], BufferGeometry> = {
      rect: new PlaneGeometry(1, 1),
      circle: new CircleGeometry(0.5, 48),
      ring: new RingGeometry(0.38, 0.5, 64),
    };
    const materials: MeshBasicMaterial[] = [];
    const studio = new Scene();
    const rig = new Group();
    rig.rotation.set(...rotation);
    studio.add(rig);

    for (const light of lights) {
      const material = new MeshBasicMaterial({
        color: new Color(light.color ?? "#ffffff").multiplyScalar(light.intensity),
        side: DoubleSide,
        toneMapped: false,
      });
      materials.push(material);
      const mesh = new Mesh(geometries[light.form], material);
      mesh.position.set(...light.position);
      if (light.rotation) mesh.rotation.set(...light.rotation);
      const scale = light.scale ?? 1;
      if (Array.isArray(scale)) mesh.scale.set(scale[0], scale[1], 1);
      else mesh.scale.setScalar(scale);
      rig.add(mesh);
    }

    const generator = new PMREMGenerator(gl);
    const target = generator.fromScene(studio, blur);
    generator.dispose();
    materials.forEach((material) => material.dispose());
    Object.values(geometries).forEach((geometry) => geometry.dispose());

    const { scene } = getState();
    const previous = scene.environment;
    scene.environment = target.texture;
    invalidate();

    return () => {
      scene.environment = previous;
      target.dispose();
    };
  }, [gl, getState, invalidate, lights, rotation, blur]);

  return null;
}
