import { cardDefinitions } from "./cards";

export function createStarterDeckCards(): { cardId: string; quantity: number }[] {
  const starterCharacterCards = cardDefinitions
    .filter((card) => card.ownerCharacterVersionId && ["hinao", "shiba", "uruha"].includes(card.ownerCharacterVersionId))
    .slice(0, 18)
    .map((card) => ({ cardId: card.id, quantity: 1 }));

  const commonCards = cardDefinitions
    .filter((card) => card.isCommon)
    .slice(0, 8)
    .map((card) => ({ cardId: card.id, quantity: 1 }));

  const duplicates = starterCharacterCards.slice(0, 4).map((card) => ({
    cardId: card.cardId,
    quantity: 1
  }));

  const entries = [...starterCharacterCards, ...commonCards, ...duplicates];
  const merged = new Map<string, number>();

  for (const entry of entries) {
    merged.set(entry.cardId, (merged.get(entry.cardId) ?? 0) + entry.quantity);
  }

  return [...merged.entries()].map(([cardId, quantity]) => ({
    cardId,
    quantity
  }));
}
