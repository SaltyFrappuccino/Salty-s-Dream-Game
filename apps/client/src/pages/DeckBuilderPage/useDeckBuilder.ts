import { useMemo, useState } from "react";
import { validateDeck } from "@sdg/game-core";
import { useCollectionStore } from "../../stores/collectionStore";
import { useDeckStore } from "../../stores/deckStore";
import type { DeckBuilderFilter } from "./deckBuilder.types";
import { isCardAvailableForTeam, matchesDeckBuilderFilter } from "./deckBuilder.utils";
import { useDeckBuilderActions } from "./useDeckBuilderActions";

export function useDeckBuilder() {
  const cards = useCollectionStore((state) => state.cards);
  const characters = useCollectionStore((state) => state.characters);
  const saveDeck = useDeckStore((state) => state.save);
  const [deckName, setDeckName] = useState("РќРѕРІР°СЏ РєРѕР»РѕРґР°");
  const [filter, setFilter] = useState<DeckBuilderFilter>("All");
  const actions = useDeckBuilderActions(cards);
  const totalCards = actions.selectedCards.reduce((sum, card) => sum + card.quantity, 0);
  const validation = validateDeck({ characterIds: actions.team, cards: actions.selectedCards });

  const filteredCards = useMemo(() => {
    return cards.filter((card) =>
      isCardAvailableForTeam(card, actions.team) && matchesDeckBuilderFilter(card, filter)
    );
  }, [cards, filter, actions.team]);

  async function save() {
    if (!validation.isValid) {
      actions.setSaveMessage("РЎРЅР°С‡Р°Р»Р° РёСЃРїСЂР°РІСЊС‚Рµ РѕС€РёР±РєРё РєРѕР»РѕРґС‹.");
      return;
    }

    await saveDeck({ name: deckName, characterIds: actions.team, cards: actions.selectedCards });
    actions.setSaveMessage("РљРѕР»РѕРґР° СЃРѕС…СЂР°РЅРµРЅР°.");
  }

  return {
    ...actions,
    cards,
    characters,
    deckName,
    filter,
    filteredCards,
    save,
    setDeckName,
    setFilter,
    totalCards,
    validation
  };
}

