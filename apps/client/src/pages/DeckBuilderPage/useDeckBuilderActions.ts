import { useState } from "react";
import type { CardDefinition } from "@sdg/shared";
import { createStarterDeckCards } from "@sdg/game-core";
import { createDeckCardsForTeam, getCardQuantity } from "./deckBuilder.utils";

const defaultTeam: [string, string, string] = ["hinao", "shiba", "uruha"];

export function useDeckBuilderActions(cards: CardDefinition[]) {
  const [team, setTeam] = useState<[string, string, string]>(defaultTeam);
  const [selectedCards, setSelectedCards] = useState(() =>
    cards.length > 0 ? createDeckCardsForTeam(cards, defaultTeam) : createStarterDeckCards()
  );
  const [saveMessage, setSaveMessage] = useState<string | undefined>();

  function updateTeam(slot: 0 | 1 | 2, characterId: string) {
    setTeam((current) => {
      const next: [string, string, string] = [...current];
      next[slot] = characterId;
      setSelectedCards(cards.length > 0 ? createDeckCardsForTeam(cards, next) : []);
      return next;
    });
    setSaveMessage(undefined);
  }

  function addCard(card: CardDefinition) {
    setSelectedCards((current) => {
      const quantity = getCardQuantity(current, card.id);
      const currentTotal = current.reduce((sum, entry) => sum + entry.quantity, 0);
      if (quantity >= 2 || currentTotal >= 30 || (card.type === "Ultimate" && quantity >= 1)) {
        return current;
      }
      return quantity === 0
        ? [...current, { cardId: card.id, quantity: 1 }]
        : current.map((entry) => entry.cardId === card.id ? { ...entry, quantity: entry.quantity + 1 } : entry);
    });
    setSaveMessage(undefined);
  }

  function removeCard(cardId: string) {
    setSelectedCards((current) =>
      current
        .map((entry) => entry.cardId === cardId ? { ...entry, quantity: entry.quantity - 1 } : entry)
        .filter((entry) => entry.quantity > 0)
    );
    setSaveMessage(undefined);
  }

  return { addCard, removeCard, saveMessage, selectedCards, setSaveMessage, team, updateTeam };
}

