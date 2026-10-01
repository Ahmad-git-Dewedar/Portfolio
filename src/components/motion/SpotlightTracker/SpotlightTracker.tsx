"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for the whole page: any element marked
 * `data-spotlight` receives `--spot-x` / `--spot-y` (pointer position inside
 * it), which the global spotlight styles turn into a glow that follows the
 * cursor along the card's border. Mount once, in the root layout.
 */
export function SpotlightTracker() {
  useEffect(() => {
    let frame = 0;
    let event: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!event) return;
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    const onPointerMove = (next: PointerEvent) => {
      if (next.pointerType === "touch") return;
      event = next;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
