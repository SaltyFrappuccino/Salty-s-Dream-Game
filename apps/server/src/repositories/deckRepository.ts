import type { PlayerDeck } from "@sdg/shared";
import { ensureDemoPlayer, decks } from "./demoData";
import { saveDemoState } from "./demo/demoStores";

export const deckRepository = {
  getByUserId(userId: string, displayName: string): PlayerDeck[] {
    ensureDemoPlayer(userId, displayName);
    return decks.get(userId) ?? [];
  },
  upsert(userId: string, deck: PlayerDeck): PlayerDeck {
    const current = decks.get(userId) ?? [];
    const withoutCurrent = current.filter((item) => item.id !== deck.id);
    const next = [...withoutCurrent, deck];
    decks.set(userId, next);
    saveDemoState();
    return deck;
  },
  remove(userId: string, deckId: string): void {
    const current = decks.get(userId) ?? [];
    decks.set(
      userId,
      current.filter((item) => item.id !== deckId)
    );
    saveDemoState();
  }
};

