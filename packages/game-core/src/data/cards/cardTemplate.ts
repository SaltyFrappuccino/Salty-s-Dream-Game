import type { CardDefinition, CardType, Rarity } from "@sdg/shared";

export type CardTemplate = {
  suffix: string;
  name: string;
  description: string;
  type: CardType;
  rarity: Rarity;
  effectId: string;
  spiritualEnergy?: number;
  stamina?: number;
  targetMode: CardDefinition["targetMode"];
  tags: string[];
};

export type CommonCardSeed = [
  id: string,
  name: string,
  description: string,
  type: CardType,
  effectId: string,
  targetMode: CardDefinition["targetMode"]
];

