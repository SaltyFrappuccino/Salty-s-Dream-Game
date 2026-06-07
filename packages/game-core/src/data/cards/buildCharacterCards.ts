import type { CardDefinition } from "@sdg/shared";
import { characterUnits } from "../characters";
import { roleTemplates } from "./roleTemplates";

export function buildCharacterCards(): CardDefinition[] {
  return characterUnits.flatMap((character) =>
    roleTemplates[character.role].map((template) => ({
      id: `${character.id}_${template.suffix}`,
      name: template.name,
      description: template.description,
      themePackId: character.themePackId,
      type: template.type,
      rarity: template.rarity,
      ownerCharacterVersionId: character.id,
      isCommon: false,
      cost: {
        spiritualEnergy: template.spiritualEnergy,
        stamina: template.stamina
      },
      effectId: template.effectId,
      targetMode: template.targetMode,
      tags: template.tags,
      assetKey: `${character.id}_${template.suffix}`
    }))
  );
}
