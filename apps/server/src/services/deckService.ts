import type { PlayerDeck } from "@sdg/shared";
import { validateDeck } from "@sdg/game-core";
import { deckRepository } from "../repositories/deckRepository";

export const deckService = {
  list(userId: string, displayName: string) {
    return deckRepository.getByUserId(userId, displayName);
  },
  save(userId: string, deck: PlayerDeck) {
    const validation = validateDeck({
      characterIds: deck.characterIds,
      cards: deck.cards
    });

    if (!validation.isValid) {
      throw new Error(validation.errors.join(" "));
    }

    return deckRepository.upsert(userId, deck);
  },
  remove(userId: string, deckId: string) {
    deckRepository.remove(userId, deckId);
  }
};


