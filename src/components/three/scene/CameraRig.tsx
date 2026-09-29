"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { MathUtils, type PerspectiveCamera } from "three";
import { useLoopFrame, useLoopRunning } from "../core/LoopClock";
import { wave } from "../core/loop";
import { heroSceneConfig } from "../config";
import type { FocusArea } from "../core/framing";
import type { PointerTarget } from "../interaction/types";

interface CameraRigProps {
  focusArea: FocusArea;
  pointer: RefObject<PointerTarget>;
  interactive: boolean;
}

const { camera: cameraConfig, modelBounds, fill, pointer: pointerConfig } = heroSceneConfig;

/**
 * Frames the model inside the page's focus area (the free space between the hero
 * copy), for any canvas size. Adds subtle pointer parallax and a looped dolly.
 */
export function CameraRig({ focusArea, pointer, interactive }: CameraRigProps) {
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const invalidate = useThree((state) => state.invalidate);
  const animated = useLoopRunning();
  const parallax = useRef({ x: 0, y: 0 });

  // In on-demand mode (reduced motion) a new focus area needs an explicit frame.
  useEffect(() => invalidate(), [focusArea, invalidate]);

  useLoopFrame((phase, delta, state) => {
    const { width, height } = state.size;
    if (!width || !height) return;
    const aspect = width / height;
    const tanHalf = Math.tan(MathUtils.degToRad(camera.fov) / 2);

    const areaWidth = Math.max(0.1, focusArea.right - focusArea.left);
    const areaHeight = Math.max(0.1, focusArea.bottom - focusArea.top);
    const distanceForHeight = modelBounds.height / (areaHeight * fill.height * 2 * tanHalf);
    const distanceForWidth = modelBounds.width / (areaWidth * fill.width * 2 * tanHalf * aspect);
    const distance = Math.max(distanceForHeight, distanceForWidth);

    // Shift the view so the model's center lands on the focus area's center.
    const visibleHeight = 2 * distance * tanHalf;
    const visibleWidth = visibleHeight * aspect;
    const lookX = -((focusArea.left + focusArea.right) / 2 - 0.5) * visibleWidth;
    const lookY = ((focusArea.top + focusArea.bottom) / 2 - 0.5) * visibleHeight;

    const px = interactive ? pointer.current.x : 0;
    const py = interactive ? pointer.current.y : 0;
    if (animated) {
      parallax.current.x = MathUtils.damp(parallax.current.x, px, pointerConfig.damping, delta);
      parallax.current.y = MathUtils.damp(parallax.current.y, py, pointerConfig.damping, delta);
    } else {
      parallax.current.x = 0;
      parallax.current.y = 0;
    }

    const breathe = animated ? cameraConfig.breathe * wave(phase, 1, 1.3) : 0;
    camera.position.set(
      lookX + parallax.current.x * pointerConfig.parallax.x,
      lookY + cameraConfig.elevation + parallax.current.y * pointerConfig.parallax.y,
      distance + breathe,
    );
    camera.lookAt(lookX, lookY, 0);
  }, -0.5);

  return null;
}
