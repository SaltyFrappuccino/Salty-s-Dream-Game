import type { CurrencyCode, Rarity } from "./common";
import type { PlayerCharacter, PlayerWallet, PlayerWeapon } from "./player";

export type BannerDefinition = {
  id: string;
  name: string;
  description?: string;
  themePackId?: string;
  type: "character" | "weapon";
  rates: Record<Rarity, number>;
  pitySr: number;
  pitySsr: number;
  pityUr: number;
  featuredCharacterIds?: string[];
  featuredWeaponIds?: string[];
};

export type GachaRollItem = {
  type: "character" | "weapon";
  characterVersionId?: string;
  weaponDefinitionId?: string;
  name: string;
  rarity: Rarity;
  duplicate: boolean;
  shardsGranted: number;
};

export type GachaRollResult = {
  bannerId: string;
  spentCurrency: CurrencyCode;
  spentAmount: number;
  spentSummonTickets: number;
  spentYen: number;
  pulls: GachaRollItem[];
  pityAfter: {
    total: number;
    sinceSr: number;
    sinceSsr: number;
    sinceUr: number;
  };
};

export type GachaRollResponse = {
  result: GachaRollResult;
  wallet: PlayerWallet;
  collection: PlayerCharacter[];
  weapons: PlayerWeapon[];
};
