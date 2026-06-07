import type { CardDefinition, MatchCharacterState } from "@sdg/shared";
import { getStatusValue } from "../rules/statuses";

export function getEffectiveCardCost(character: MatchCharacterState, card: CardDefinition) {
  const stunTax = getStatusValue(character.statuses, "Stun");
  return {
    spiritualEnergy: card.cost.spiritualEnergy ?? 0,
    stamina: (card.cost.stamina ?? 0) + stunTax
  };
}

export function canPayCardCost(character: MatchCharacterState, card: CardDefinition): boolean {
  const cost = getEffectiveCardCost(character, card);
  return character.spiritualEnergy >= cost.spiritualEnergy && character.stamina >= cost.stamina;
}

