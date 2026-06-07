import type { CharacterRole, Rarity } from "./common";

export type CardType =
  | "Attack"
  | "Technique"
  | "Support"
  | "Defense"
  | "Reaction"
  | "Ultimate";

export type TargetMode =
  | "EnemyCharacter"
  | "AllyCharacter"
  | "AnyCharacter"
  | "Self"
  | "AllEnemies"
  | "AllAllies"
  | "None";

export type ResourceCost = {
  spiritualEnergy?: number;
  stamina?: number;
  yen?: number;
};

export type CharacterStats = {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  critChance: number;
  critDamage: number;
};

export type StatBonuses = Partial<CharacterStats>;

export type CharacterDefinition = {
  id: string;
  name: string;
  displayName: string;
  themePackId?: string;
  role: CharacterRole;
  rarity: Rarity;
  baseStats: CharacterStats;
  startingSpiritualEnergy: number;
  maxSpiritualEnergy: number;
  startingStamina: number;
  maxStamina: number;
  passiveId: string;
  cardPool: string[];
  assetKey: string;
};

export type CharacterUnit = CharacterDefinition;
export type CharacterVersion = CharacterDefinition;

export type WeaponDefinition = {
  id: string;
  name: string;
  description: string;
  themePackId?: string;
  rarity: Rarity;
  statBonuses: StatBonuses;
  assetKey: string;
};

export type CardDefinition = {
  id: string;
  name: string;
  description: string;
  themePackId?: string;
  type: CardType;
  rarity: Rarity;
  ownerCharacterVersionId?: string;
  isCommon: boolean;
  cost: ResourceCost;
  effectId: string;
  targetMode: TargetMode;
  tags: string[];
  assetKey?: string;
};
