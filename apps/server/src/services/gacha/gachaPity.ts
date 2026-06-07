import type { Rarity } from "@sdg/shared";

export type PityState = {
  total: number;
  sinceSr: number;
  sinceSsr: number;
  sinceUr: number;
};

export const pityByUser = new Map<string, PityState>();

export function createEmptyPity(): PityState {
  return { total: 0, sinceSr: 0, sinceSsr: 0, sinceUr: 0 };
}

export function getForcedRarity(state: PityState): Rarity | undefined {
  if ((state.total + 1) % 90 === 0) {
    return "UR";
  }
  if ((state.total + 1) % 50 === 0) {
    return "SSR";
  }
  if ((state.total + 1) % 10 === 0) {
    return "SR";
  }
  return undefined;
}

export function advancePity(state: PityState, rarity: Rarity): void {
  state.total += 1;
  state.sinceSr += 1;
  state.sinceSsr += 1;
  state.sinceUr += 1;

  if (rarity === "SR" || rarity === "SSR" || rarity === "UR") {
    state.sinceSr = 0;
  }
  if (rarity === "SSR" || rarity === "UR") {
    state.sinceSsr = 0;
  }
  if (rarity === "UR") {
    state.sinceUr = 0;
  }
}

