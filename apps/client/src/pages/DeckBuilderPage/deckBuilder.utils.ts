import type { CardDefinition } from "@sdg/shared";
import type { DeckBuilderFilter, DeckCardEntry } from "./deckBuilder.types";

export function getCardQuantity(entries: DeckCardEntry[], cardId: string): number {
  return entries.find((entry) => entry.cardId === cardId)?.quantity ?? 0;
}

export function isCardAvailableForTeam(card: CardDefinition, team: [string, string, string]): boolean {
  return card.isCommon || Boolean(card.ownerCharacterVersionId && team.includes(card.ownerCharacterVersionId));
}

export function matchesDeckBuilderFilter(card: CardDefinition, filter: DeckBuilderFilter): boolean {
  if (filter === "All") {
    return true;
  }

  if (filter === "Common") {
    return card.isCommon;
  }

  return card.type === filter;
}

export function createDeckCardsForTeam(cards: CardDefinition[], team: [string, string, string]): DeckCardEntry[] {
  const entries = new Map<string, number>();

  function totalCards() {
    return Array.from(entries.values()).reduce((sum, quantity) => sum + quantity, 0);
  }

  function addCard(card: CardDefinition): boolean {
    const quantity = entries.get(card.id) ?? 0;
    const limit = card.type === "Ultimate" ? 1 : 2;
    if (quantity >= limit || totalCards() >= 30) {
      return false;
    }

    entries.set(card.id, quantity + 1);
    return true;
  }

  for (const characterId of team) {
    const characterCards = cards.filter((card) => card.ownerCharacterVersionId === characterId);
    let addedForCharacter = 0;

    for (const card of characterCards) {
      while (addedForCharacter < 6 && addCard(card)) {
        addedForCharacter += 1;
      }
      if (addedForCharacter >= 6) {
        break;
      }
    }
  }

  for (const card of cards.filter((item) => item.isCommon)) {
    if (totalCards() >= 26) {
      break;
    }
    addCard(card);
  }

  for (const card of cards.filter((item) => isCardAvailableForTeam(item, team) && !item.isCommon)) {
    if (totalCards() >= 30) {
      break;
    }
    addCard(card);
  }

  return Array.from(entries, ([cardId, quantity]) => ({ cardId, quantity }));
}

