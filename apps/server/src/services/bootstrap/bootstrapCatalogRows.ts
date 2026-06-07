import { banners, cardDefinitions, characterUnits, weaponDefinitions } from "@sdg/game-core";

export function getCharacterVersionRows() {
  return characterUnits.map((character) => ({
    id: character.id,
    base_character_id: character.id,
    name: character.name,
    version_name: "База",
    display_name: character.displayName,
    role: character.role,
    rarity: character.rarity,
    max_hp: character.baseStats.hp,
    base_stats: character.baseStats,
    starting_spiritual_energy: character.startingSpiritualEnergy,
    max_spiritual_energy: character.maxSpiritualEnergy,
    starting_stamina: character.startingStamina,
    max_stamina: character.maxStamina,
    passive_id: character.passiveId,
    card_pool: character.cardPool,
    asset_key: character.assetKey
  }));
}

export function getCardDefinitionRows() {
  return cardDefinitions.map((card) => ({
    id: card.id,
    name: card.name,
    description: card.description,
    type: card.type,
    rarity: card.rarity,
    owner_character_version_id: card.ownerCharacterVersionId ?? null,
    is_common: card.isCommon,
    cost: card.cost,
    effect_id: card.effectId,
    target_mode: card.targetMode,
    tags: card.tags,
    asset_key: card.assetKey ?? null
  }));
}

export function getGachaBannerRows() {
  return banners.map((banner) => ({
    id: banner.id,
    name: banner.name,
    type: banner.type,
    rates: banner.rates,
    pity_sr: banner.pitySr,
    pity_ssr: banner.pitySsr,
    pity_ur: banner.pityUr
  }));
}

export function getWeaponDefinitionRows() {
  return weaponDefinitions.map((weapon) => ({
    id: weapon.id,
    name: weapon.name,
    description: weapon.description,
    rarity: weapon.rarity,
    stat_bonuses: weapon.statBonuses,
    asset_key: weapon.assetKey
  }));
}
