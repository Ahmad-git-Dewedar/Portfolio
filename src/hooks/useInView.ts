"use client";

import { useEffect, useState, type RefObject } from "react";

/** Tracks whether an element intersects the viewport. Used to pause offscreen rendering. */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "0px"): boolean {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isInView;
}
