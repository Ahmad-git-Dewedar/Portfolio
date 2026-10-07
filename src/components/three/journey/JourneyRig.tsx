"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, type ReactNode, type RefObject } from "react";
import { MathUtils, type Group, type PerspectiveCamera } from "three";
import { heroSceneConfig } from "../config";
import { useJourney } from "./JourneyContext";

export interface PointerTarget {
  x: number;
  y: number;
}

interface JourneyRigProps {
  pointer: RefObject<PointerTarget>;
  interactive: boolean;
  children: ReactNode;
}

const { camera: cameraConfig, modelBounds, pointer: pointerConfig } = heroSceneConfig;
const EPSILON = 0.0005;

/** Distance at which `frameHeight` world units fill the view vertically. */
export function baseDistance(fov: number, frameHeight = cameraConfig.frameHeight): number {
  return frameHeight / 2 / Math.tan(MathUtils.degToRad(fov) / 2);
}

/**
 * Turns the current journey pose into a placement for the model (position,
 * size, rotation) and the camera (dolly, orbit), plus a subtle pointer
 * parallax. Positions are fractions of the visible frame, so the composition
 * holds on every screen size; horizontal motion mirrors for right-to-left.
 */
export function JourneyRig({ pointer, interactive, children }: JourneyRigProps) {
  const group = useRef<Group>(null);
  const journey = useJourney();
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const invalidate = useThree((state) => state.invalidate);
  const tilt = useRef({ x: 0, y: 0 });
  // One short settle-in on first paint; everything after it follows the scroll.
  const intro = useRef(1);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { pose, dir } = journey;
    const aspect = state.size.width / Math.max(1, state.size.height);
    const frameHeight = cameraConfig.frameHeight;
    const frameWidth = frameHeight * aspect;
    const step = Math.min(delta, 0.05);
    let moving = false;

    // Pointer parallax, eased.
    const px = interactive ? pointer.current.x : 0;
    const py = interactive ? pointer.current.y : 0;
    tilt.current.x = MathUtils.damp(tilt.current.x, px, pointerConfig.damping, step);
    tilt.current.y = MathUtils.damp(tilt.current.y, py, pointerConfig.damping, step);
    if (Math.abs(tilt.current.x - px) > EPSILON || Math.abs(tilt.current.y - py) > EPSILON) moving = true;

    if (interactive) {
      intro.current = MathUtils.damp(intro.current, 0, 2.6, step);
      if (intro.current < EPSILON) intro.current = 0;
      else moving = true;
    } else {
      intro.current = 0;
    }

    // Model: placed and sized in frame fractions.
    const fitWidth = (pose.size * frameWidth) / modelBounds.width;
    const fitHeight = (0.8 * frameHeight) / modelBounds.height;
    g.scale.setScalar(Math.min(fitWidth, fitHeight));
    g.position.set(dir * pose.x * (frameWidth / 2), pose.y * (frameHeight / 2) - intro.current * 0.35, 0);
    g.rotation.set(
      pose.rx - tilt.current.y * pointerConfig.rotate.x,
      dir * (pose.ry - intro.current * 0.45) + tilt.current.x * pointerConfig.rotate.y,
      dir * pose.rz,
    );

    // Camera: dolly and orbit around the scene, looking at the frame center.
    const distance = baseDistance(camera.fov) * pose.dolly;
    const orbit = dir * pose.orbit;
    camera.position.set(
      Math.sin(orbit) * distance + tilt.current.x * pointerConfig.parallax.x,
      cameraConfig.elevation + tilt.current.y * pointerConfig.parallax.y,
      Math.cos(orbit) * distance,
    );
    camera.lookAt(0, 0, 0);

    if (moving) invalidate();
  }, -1);

  return <group ref={group}>{children}</group>;
}
