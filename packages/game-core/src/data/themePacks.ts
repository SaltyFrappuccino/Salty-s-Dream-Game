import type { BannerDefinition, CardDefinition, CharacterUnit, SeasonThemePack, WeaponDefinition } from "@sdg/shared";
import { banners } from "./banners";
import { cardDefinitions } from "./cards";
import { characterUnits } from "./characters";
import { weaponDefinitions } from "./weapons";

export type ThemePackCatalog = SeasonThemePack & {
  banners: BannerDefinition[];
  cards: CardDefinition[];
  characters: CharacterUnit[];
  starterCharacterIds: string[];
  weapons: WeaponDefinition[];
};

export const coreThemePack: ThemePackCatalog = {
  id: "core",
  name: "Базовый сезонный набор",
  description: "Стартовый контент SDG для сезонных лобби, локальных профилей и тестовых дуэлей.",
  banners: banners.filter((banner) => (banner.themePackId ?? "core") === "core"),
  cards: cardDefinitions.filter((card) => (card.themePackId ?? "core") === "core"),
  characters: characterUnits.filter((character) => (character.themePackId ?? "core") === "core"),
  starterCharacterIds: ["hinao", "shiba", "uruha"],
  weapons: weaponDefinitions.filter((weapon) => (weapon.themePackId ?? "core") === "core")
};

export const themePacks: ThemePackCatalog[] = [coreThemePack];

export function getThemePackById(themePackId: string): ThemePackCatalog | undefined {
  return themePacks.find((pack) => pack.id === themePackId);
}
