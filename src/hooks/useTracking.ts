import { createContext, useContext, type MouseEvent } from "react";
import type { CtaOrigem } from "@/content/cta";

export type TrackingState = {
  marcados: number;
  setMarcados: (n: number) => void;
  onCtaClick: (event: MouseEvent<HTMLAnchorElement>, origem: CtaOrigem) => void;
};

export const TrackingContext = createContext<TrackingState | null>(null);

export function useTracking(): TrackingState {
  const ctx = useContext(TrackingContext);
  if (!ctx) {
    throw new Error("useTracking deve ser usado dentro de TrackingProvider");
  }
  return ctx;
}
