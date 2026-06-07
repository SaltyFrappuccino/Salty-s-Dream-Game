import type { MatchCharacterState } from "@sdg/shared";

export function resolveHealing(target: MatchCharacterState, amount: number): MatchCharacterState {
  return {
    ...target,
    hp: Math.min(target.maxHp, target.hp + amount)
  };
}


