import type { MatchCharacterState } from "@sdg/shared";
import { getStatusValue } from "../rules/statuses";

export function resolveDamage(target: MatchCharacterState, amount: number): MatchCharacterState {
  let remainingDamage = amount + getStatusValue(target.statuses, "Mark");
  const nextStatuses = [...target.statuses];
  const shieldIndex = nextStatuses.findIndex((status) => status.type === "Shield");

  if (shieldIndex >= 0) {
    const shield = nextStatuses[shieldIndex];
    const blocked = Math.min(shield.value, remainingDamage);
    remainingDamage -= blocked;
    shield.value -= blocked;
    if (shield.value <= 0) {
      nextStatuses.splice(shieldIndex, 1);
    }
  }

  const cleanedStatuses = nextStatuses.filter((status) => status.type !== "Mark");
  const hp = Math.max(0, target.hp - remainingDamage);
  return {
    ...target,
    hp,
    statuses: cleanedStatuses,
    defeated: hp <= 0
  };
}


