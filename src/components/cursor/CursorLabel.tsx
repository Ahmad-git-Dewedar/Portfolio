"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CursorLabel.module.css";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Contextual cursor: over any element with `data-cursor="Label"` the pointer
 * becomes a small glass pill carrying that label (e.g. VIEW PROJECT). Elsewhere
 * it stays out of the way and the native cursor is untouched. Only active for
 * mouse and trackpad users; keyboard focus and touch are unaffected.
 */
export function CursorLabel() {
  const pill = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(FINE_POINTER);
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    root.dataset.cursorUi = "on";

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;
    let lastLabel = "";

    const render = () => {
      frame = 0;
      const follow = reduce.matches ? 1 : 0.22;
      current.x += (target.x - current.x) * follow;
      current.y += (target.y - current.y) * follow;
      if (pill.current) pill.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (Math.abs(target.x - current.x) > 0.3 || Math.abs(target.y - current.y) > 0.3) {
        frame = requestAnimationFrame(render);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      target.x = event.clientX;
      target.y = event.clientY;
      const zone = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const next = zone?.dataset.cursor ?? "";
      if (next !== lastLabel) {
        // Snap into place when entering a zone so the pill never flies across the screen.
        if (!lastLabel) {
          current.x = target.x;
          current.y = target.y;
        }
        lastLabel = next;
        setLabel(next);
      }
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onLeave = () => {
      lastLabel = "";
      setLabel("");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onLeave);
      delete root.dataset.cursorUi;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={pill} className={styles.cursor} aria-hidden="true">
      <span className={styles.pill} data-visible={label ? "true" : undefined}>
        <span className={styles.dot} />
        <span className={styles.text}>{label}</span>
      </span>
    </div>
  );
}
