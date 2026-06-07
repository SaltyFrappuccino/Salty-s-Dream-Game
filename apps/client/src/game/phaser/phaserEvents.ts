import type { MatchState } from "@sdg/shared";

export const phaserEvents = new EventTarget();

export function publishMatchState(match: MatchState | null): void {
  phaserEvents.dispatchEvent(new CustomEvent<MatchState | null>("match:state", { detail: match }));
}

