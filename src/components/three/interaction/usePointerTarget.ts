"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { PointerTarget } from "./types";

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

/** Share of the element width a finger must travel for a full-strength turn. */
const TOUCH_TRAVEL = 0.45;

/**
 * Feeds a mutable pointer target without re-rendering React:
 * - Mouse and pen: position relative to the element's center, tracked across the
 *   whole window so the model reacts even when the cursor is over the text.
 * - Touch: a horizontal drag turns the model and it springs back on release.
 *   Vertical gestures are left to the browser (pair with `touch-action: pan-y`),
 *   so scrolling past the hero is never blocked.
 */
export function usePointerTarget(elementRef: RefObject<HTMLElement | null>, enabled: boolean) {
  const target = useRef<PointerTarget>({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;
    const current = target.current;
    const reset = () => {
      current.x = 0;
      current.y = 0;
    };

    if (!enabled || !element) {
      reset();
      return;
    }

    let touchId: number | null = null;
    let touchStartX = 0;

    const onWindowPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      current.x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
      current.y = clamp(-(event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || touchId !== null) return;
      touchId = event.pointerId;
      touchStartX = event.clientX;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== touchId) return;
      const width = element.clientWidth || 1;
      current.x = clamp((event.clientX - touchStartX) / (width * TOUCH_TRAVEL));
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== touchId) return;
      touchId = null;
      reset();
    };

    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    element.addEventListener("pointerdown", onPointerDown, { passive: true });
    element.addEventListener("pointermove", onPointerMove, { passive: true });
    element.addEventListener("pointerup", onPointerEnd);
    element.addEventListener("pointercancel", onPointerEnd);

    return () => {
      window.removeEventListener("pointermove", onWindowPointerMove);
      document.documentElement.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", onPointerEnd);
      element.removeEventListener("pointercancel", onPointerEnd);
      reset();
    };
  }, [elementRef, enabled]);

  return target;
}
