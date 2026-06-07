import type { CardType } from "@sdg/shared";

export type DeckBuilderFilter = CardType | "All" | "Common";

export type DeckCardEntry = {
  cardId: string;
  quantity: number;
};

