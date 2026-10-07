"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh, MeshBasicMaterial } from "three";
import { heroSceneConfig } from "../config";
import { createTextTexture, wrapWords, type TextTexture } from "../textures/createTextTexture";
import { useJourney } from "./JourneyContext";
import { baseDistance } from "./JourneyRig";

interface DepthTypeProps {
  text: string;
  color: string;
  shade: string;
  /** Glow in the page color behind the glyphs (see createTextTexture). */
  halo?: string;
  direction: "ltr" | "rtl";
}

/** Depth of each line: the first passes behind the model, the next ones in front, so it occludes without hiding a whole word. */
const LINE_DEPTHS = [-1.7, 1.3, 1.3, -1.7];
/** Line height on screen, as a fraction of the frame height. */
const LINE_SIZE = { wide: 0.12, narrow: 0.07 };
/** Characters per line before wrapping. */
const LINE_CHARS = 13;
/** Where the type is centered in the journey (viewport heights), for its sideways drift. */
const DRIFT_CENTER = 1.95;

interface Line {
  text: string;
  depth: number;
  tex: TextTexture;
}

/**
 * The bridge statement as real 3D type: each line is a plane at its own depth,
 * so the model genuinely passes between them, hidden by the front line and
 * covering the back ones, with true parallax as the camera dollies and orbits.
 * Lines drift in opposite directions with the scroll; opacity follows the
 * journey. The readable HTML statement stays in the page for assistive tech.
 */
export function DepthType({ text, color, shade, halo, direction }: DepthTypeProps) {
  const journey = useJourney();
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const [fontFamily, setFontFamily] = useState<string | null>(null);
  const meshes = useRef<(Mesh | null)[]>([]);

  // Draw with the page's own display font once it has loaded.
  useEffect(() => {
    let cancelled = false;
    const family = getComputedStyle(document.body).fontFamily;
    document.fonts
      .load(`800 120px ${family}`, text)
      .catch(() => undefined)
      .then(() => {
        if (!cancelled) setFontFamily(family);
      });
    return () => {
      cancelled = true;
    };
  }, [text]);

  const lines = useMemo<Line[]>(() => {
    if (!fontFamily) return [];
    return wrapWords(text, LINE_CHARS).map((content, index) => ({
      text: content,
      depth: LINE_DEPTHS[index % LINE_DEPTHS.length],
      tex: createTextTexture({ text: content, fontFamily, color, shade, halo, direction }),
    }));
  }, [text, fontFamily, color, shade, halo, direction]);

  useEffect(() => {
    invalidate();
    return () => lines.forEach((line) => line.tex.texture.dispose());
  }, [lines, invalidate]);

  useFrame((state) => {
    const { pose, narrow, distance } = journey;
    const aspect = state.size.width / Math.max(1, state.size.height);
    const frameHeight = heroSceneConfig.camera.frameHeight;
    const frameWidth = frameHeight * aspect;
    const base = baseDistance((camera as { fov: number }).fov);
    const lineScreen = (narrow ? LINE_SIZE.narrow : LINE_SIZE.wide) * frameHeight;
    const drift = (distance - DRIFT_CENTER) * 0.16;
    const count = lines.length;

    lines.forEach((line, index) => {
      const mesh = meshes.current[index];
      if (!mesh) return;
      const visible = pose.type > 0.002;
      mesh.visible = visible;
      if (!visible) return;

      // Size each line so it reads the same on screen whatever its depth, and never overflows the width.
      const depthScale = (base - line.depth) / base;
      let height = lineScreen * depthScale;
      let width = height * line.tex.aspect;
      const maxWidth = 0.9 * frameWidth * depthScale;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      const y = ((count - 1) / 2 - index) * lineScreen * 1.18 * depthScale;
      const side = index % 2 === 0 ? -1 : 1;
      mesh.scale.set(width, height, 1);
      mesh.position.set(side * drift * frameWidth * 0.5 * depthScale, y, line.depth);
      (mesh.material as MeshBasicMaterial).opacity = pose.type;
    });
  });

  return (
    <group>
      {lines.map((line, index) => (
        <mesh
          key={`${line.text}-${index}`}
          ref={(node) => {
            meshes.current[index] = node;
          }}
          renderOrder={line.depth > 0 ? 2 : 1}
          visible={false}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={line.tex.texture} transparent depthWrite={false} toneMapped={false} opacity={0} />
        </mesh>
      ))}
    </group>
  );
}
