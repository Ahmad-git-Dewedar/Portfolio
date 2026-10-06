"use client";

import { useEffect } from "react";
import { SCROLL_ATTRIBUTE } from "@/lib/motion";

type SceneMode = "sticky" | "view";

interface SceneState {
  current: number;
  written: number;
}

const SELECTOR = "[data-scene]";
/** Higher is snappier; this gives a short, cinematic ease behind the native scroll. */
const SMOOTHING = 11;
const EPSILON = 0.0004;

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

/** Raw progress of a scene, from its geometry. */
function measure(element: HTMLElement, mode: SceneMode, viewport: number): number {
  const rect = element.getBoundingClientRect();
  if (mode === "view") {
    // 0 when the element's top enters the bottom edge, 1 when its bottom leaves the top edge.
    return clamp01((viewport - rect.top) / (viewport + rect.height));
  }
  // Pinned scenes: 0 when the track reaches the top, 1 when its stage is about to unpin.
  const distance = rect.height - viewport;
  if (distance <= 0) return rect.top <= 0 ? 1 : 0;
  return clamp01(-rect.top / distance);
}

/**
 * The single scroll loop behind every cinematic scene. Each `[data-scene]`
 * element receives `--p`, a smoothed 0..1 progress; CSS turns it into motion.
 * Reads all geometry first, then writes, once per frame, and only while
 * something is still moving. Mount once, in the root layout.
 */
export function ScrollEngine() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const states = new WeakMap<HTMLElement, SceneState>();
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      frame = 0;
      if (!root.hasAttribute(SCROLL_ATTRIBUTE)) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const ease = 1 - Math.exp(-dt * SMOOTHING);
      const viewport = window.innerHeight;
      const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

      // Read phase.
      const targets = elements.map((element) =>
        measure(element, element.dataset.scene === "view" ? "view" : "sticky", viewport),
      );

      // Write phase.
      let moving = false;
      elements.forEach((element, index) => {
        const target = targets[index];
        let state = states.get(element);
        if (!state) {
          state = { current: target, written: Number.NaN };
          states.set(element, state);
        }
        state.current += (target - state.current) * ease;
        if (Math.abs(target - state.current) < EPSILON) state.current = target;
        else moving = true;
        if (Math.abs(state.current - state.written) >= EPSILON || Number.isNaN(state.written)) {
          state.written = state.current;
          element.style.setProperty("--p", state.current.toFixed(4));
        }
      });

      if (moving) request();
    };

    const request = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const apply = () => {
      if (reduce.matches) {
        root.removeAttribute(SCROLL_ATTRIBUTE);
        return;
      }
      root.setAttribute(SCROLL_ATTRIBUTE, "on");
      request();
    };

    apply();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduce.addEventListener("change", apply);
    // Content swaps (e.g. switching language) bring new scenes; give them a value.
    const observer = new MutationObserver(request);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduce.removeEventListener("change", apply);
      observer.disconnect();
    };
  }, []);

  return null;
}
