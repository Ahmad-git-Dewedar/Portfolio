import type { Object3D } from "three";

interface Pose {
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
}

export function applyPose(object: Object3D, pose: Pose): void {
  object.position.set(pose.position[0], pose.position[1], pose.position[2]);
  object.rotation.set(pose.rotation[0], pose.rotation[1], pose.rotation[2]);
}
