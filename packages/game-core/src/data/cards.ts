import type { CardDefinition } from "@sdg/shared";
import { buildCharacterCards } from "./cards/buildCharacterCards";
import { commonCards } from "./cards/commonCards";
import { characterUnits } from "./characters";

const characterCards = buildCharacterCards();

for (const character of characterUnits) {
  character.cardPool = characterCards
    .filter((card) => card.ownerCharacterVersionId === character.id)
    .map((card) => card.id);
}

export const cardDefinitions: CardDefinition[] = [...characterCards, ...commonCards];
