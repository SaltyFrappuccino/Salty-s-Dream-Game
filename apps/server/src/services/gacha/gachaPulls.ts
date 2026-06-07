import type { BannerDefinition, GachaRollItem, PlayerCharacter, PlayerWeapon } from "@sdg/shared";
import { characterUnits, weaponDefinitions } from "@sdg/game-core";
import type { PityState } from "./gachaPity";
import { advancePity, getForcedRarity } from "./gachaPity";
import { getDuplicateShardAmount, randomRarity } from "./gachaRandom";

export function createCharacterPull(userId: string, owned: PlayerCharacter[], pity: PityState): GachaRollItem {
  const rarity = randomRarity(getForcedRarity(pity));
  const pool = characterUnits.filter((character) => character.rarity === rarity);
  const selected = pool[Math.floor(Math.random() * pool.length)] ?? characterUnits[0];
  const existing = owned.find((item) => item.characterVersionId === selected.id);
  const duplicate = Boolean(existing);
  const shardsGranted = duplicate ? getDuplicateShardAmount(rarity) : 0;

  if (existing) {
    existing.shards += shardsGranted;
  } else {
    owned.push({
      id: `${userId}_${selected.id}`,
      userId,
      characterVersionId: selected.id,
      stars: 0,
      shards: 0,
      obtainedAt: new Date().toISOString()
    });
  }

  advancePity(pity, rarity);
  return {
    type: "character",
    characterVersionId: selected.id,
    name: selected.displayName,
    rarity,
    duplicate,
    shardsGranted
  };
}

export function createWeaponPull(userId: string, owned: PlayerWeapon[], pity: PityState): GachaRollItem {
  const rarity = randomRarity(getForcedRarity(pity));
  const pool = weaponDefinitions.filter((weapon) => weapon.rarity === rarity);
  const selected = pool[Math.floor(Math.random() * pool.length)] ?? weaponDefinitions[0];
  const existing = owned.find((item) => item.weaponDefinitionId === selected.id);
  const duplicate = Boolean(existing);
  const shardsGranted = duplicate ? getDuplicateShardAmount(rarity) : 0;

  if (existing) {
    existing.shards += shardsGranted;
  } else {
    owned.push({
      id: `${userId}_${selected.id}`,
      userId,
      weaponDefinitionId: selected.id,
      shards: 0,
      obtainedAt: new Date().toISOString()
    });
  }

  advancePity(pity, rarity);
  return {
    type: "weapon",
    weaponDefinitionId: selected.id,
    name: selected.name,
    rarity,
    duplicate,
    shardsGranted
  };
}

export function createGachaPull(
  userId: string,
  banner: BannerDefinition,
  ownedCharacters: PlayerCharacter[],
  ownedWeapons: PlayerWeapon[],
  pity: PityState
): GachaRollItem {
  return banner.type === "weapon"
    ? createWeaponPull(userId, ownedWeapons, pity)
    : createCharacterPull(userId, ownedCharacters, pity);
}
