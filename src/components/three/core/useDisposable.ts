"use client";

import { useEffect, useState } from "react";

/**
 * Creates a Three.js resource once per component instance and disposes of it on
 * unmount. A disposed resource is re-uploaded automatically if it renders again,
 * so this stays safe under React Strict Mode's double effects.
 */
export function useDisposable<T extends { dispose: () => void }>(factory: () => T): T {
  const [value] = useState(factory);
  useEffect(() => () => value.dispose(), [value]);
  return value;
}
