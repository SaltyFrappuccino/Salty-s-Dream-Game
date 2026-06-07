import type { Rarity } from "@sdg/shared";

export function getDuplicateShardAmount(rarity: Rarity): number {
  switch (rarity) {
    case "UR":
      return 100;
    case "SSR":
      return 50;
    case "SR":
      return 25;
    case "R":
    default:
      return 10;
  }
}

export function randomRarity(forced: Rarity | undefined): Rarity {
  if (forced) {
    return forced;
  }

  const roll = Math.random();
  if (roll < 0.03) {
    return "UR";
  }
  if (roll < 0.15) {
    return "SSR";
  }
  if (roll < 0.45) {
    return "SR";
  }
  return "R";
}

