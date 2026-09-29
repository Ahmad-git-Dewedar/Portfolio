"use client";

import { createContext, useContext } from "react";

interface HeroFocusContextValue {
  register: (element: HTMLElement | null) => void;
}

export const HeroFocusContext = createContext<HeroFocusContextValue | null>(null);

interface HeroFocusAreaProps {
  className?: string;
}

/**
 * Empty layout slot inside <HeroStage>. Its box is where the camera frames the
 * model, so the 3D composition always sits in the space the page layout reserves.
 */
export function HeroFocusArea({ className }: HeroFocusAreaProps) {
  const context = useContext(HeroFocusContext);
  return <div ref={context?.register} className={className} aria-hidden="true" />;
}
