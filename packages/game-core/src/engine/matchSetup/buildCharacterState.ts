import type { MatchCharacterState } from "@sdg/shared";
import { characterUnits } from "../../data/characters";
import { weaponDefinitions } from "../../data/weapons";
import { applyStatBonuses } from "../../rules/stats";
import { createId } from "./idFactory";

export function buildCharacterState(characterVersionId: string, index: number, weaponId?: string): MatchCharacterState {
  const character = characterUnits.find((item) => item.id === characterVersionId);
  if (!character) {
    throw new Error(`Неизвестный персонаж: ${characterVersionId}`);
  }

  const weapon = weaponId ? weaponDefinitions.find((item) => item.id === weaponId) : undefined;
  const stats = applyStatBonuses(character.baseStats, weapon?.statBonuses);

  return {
    instanceId: createId("char", index),
    characterVersionId: character.id,
    displayName: character.displayName,
    role: character.role,
    rarity: character.rarity,
    stats,
    maxHp: stats.hp,
    hp: stats.hp,
    maxSpiritualEnergy: character.maxSpiritualEnergy,
    spiritualEnergy: character.startingSpiritualEnergy,
    maxStamina: character.maxStamina,
    stamina: character.startingStamina,
    defeated: false,
    statuses: [],
    focusUsedThisTurn: false,
    restUsedThisTurn: false
  };
}
