import type { MatchCardInstance, PlayerDeck } from "@sdg/shared";
import { cardDefinitions } from "../../data/cards";
import { createId } from "./idFactory";

export function materializeDeck(deck: PlayerDeck): MatchCardInstance[] {
  const instances: MatchCardInstance[] = [];
  let index = 0;

  for (const card of deck.cards) {
    const definition = cardDefinitions.find((item) => item.id === card.cardId);
    if (!definition) {
      continue;
    }

    for (let i = 0; i < card.quantity; i += 1) {
      instances.push({
        instanceId: createId("card", index),
        cardId: definition.id,
        ownerCharacterVersionId: definition.ownerCharacterVersionId
      });
      index += 1;
    }
  }

  return instances;
}

export function drawCards(deck: MatchCardInstance[], count: number) {
  return {
    hand: deck.slice(0, count),
    remaining: deck.slice(count)
  };
}

