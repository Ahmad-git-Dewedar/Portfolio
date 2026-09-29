"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | undefined;

function detect(): boolean {
  if (cached !== undefined) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
}

const noopSubscribe = () => () => {};

/** False during SSR and on devices without WebGL, so callers can render a static fallback. */
export function useWebGLSupport(): boolean {
  return useSyncExternalStore(noopSubscribe, detect, () => false);
}
