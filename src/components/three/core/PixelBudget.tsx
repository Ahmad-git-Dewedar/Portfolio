"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

interface PixelBudgetProps {
  /** Highest device pixel ratio allowed for the current quality tier. */
  maxDpr: number;
  /** Upper bound on rendered pixels (width x height x dpr^2). */
  budget: number;
  /** Receives the pixel ratio to render at; pass it to the Canvas `dpr` prop. */
  onChange: (dpr: number) => void;
}

/**
 * Keeps a full-bleed canvas affordable on large and high-density screens by
 * choosing the highest pixel ratio whose frame still fits the pixel budget.
 * Reports upward because <Canvas> re-applies its `dpr` prop on every render.
 */
export function PixelBudget({ maxDpr, budget, onChange }: PixelBudgetProps) {
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);

  useEffect(() => {
    if (!width || !height) return;
    const device = window.devicePixelRatio || 1;
    const fitted = Math.sqrt(budget / (width * height));
    onChange(Math.round(Math.max(1, Math.min(maxDpr, device, fitted)) * 100) / 100);
  }, [width, height, maxDpr, budget, onChange]);

  return null;
}
