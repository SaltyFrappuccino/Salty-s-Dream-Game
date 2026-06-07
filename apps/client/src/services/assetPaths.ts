import type { CardDefinition, CharacterUnit, WeaponDefinition } from "@sdg/shared";

const coreThemePackId = "core";

function getThemePackId(entity: { themePackId?: string }): string {
  return entity.themePackId ?? coreThemePackId;
}

function getCharacterLegacyBasePath(character: CharacterUnit): string {
  return `/assets/characters/${character.assetKey}`;
}

function getCharacterThemePackBasePath(character: CharacterUnit): string {
  return `/assets/theme-packs/${getThemePackId(character)}/roster/${character.assetKey}`;
}

function getCardLegacyBasePath(card: CardDefinition): string {
  const folder = card.isCommon ? "common" : card.ownerCharacterVersionId ?? "common";
  return `/assets/cards/${folder}`;
}

function getCardThemePackBasePath(card: CardDefinition): string {
  const folder = card.isCommon ? "common" : card.ownerCharacterVersionId ?? "common";
  return `/assets/theme-packs/${getThemePackId(card)}/cards/${folder}`;
}

export function getCharacterPortraitPath(character: CharacterUnit): string {
  if (getThemePackId(character) === coreThemePackId) {
    return `${getCharacterLegacyBasePath(character)}/portrait.svg`;
  }

  return `${getCharacterThemePackBasePath(character)}/portrait.svg`;
}

export function getCharacterFullPath(character: CharacterUnit): string {
  if (getThemePackId(character) === coreThemePackId) {
    return `${getCharacterLegacyBasePath(character)}/full.svg`;
  }

  return `${getCharacterThemePackBasePath(character)}/full.svg`;
}

export function getCharacterFallbackPath(): string {
  return "/assets/characters/chihiro_enten/portrait.svg";
}

export function getCardArtPath(card: CardDefinition): string {
  if (getThemePackId(card) === coreThemePackId) {
    return `${getCardLegacyBasePath(card)}/${card.assetKey ?? card.id}.svg`;
  }

  return `${getCardThemePackBasePath(card)}/${card.assetKey ?? card.id}.svg`;
}

export function getCardFallbackPath(): string {
  return "/assets/cards/common/common_precise_strike.svg";
}

export function getWeaponArtPath(weapon?: Pick<WeaponDefinition, "assetKey" | "themePackId">): string {
  if (!weapon) {
    return "/assets/weapons/training_katana.svg";
  }

  if (getThemePackId(weapon) === coreThemePackId) {
    return `/assets/weapons/${weapon.assetKey}.svg`;
  }

  return `/assets/theme-packs/${getThemePackId(weapon)}/weapons/${weapon.assetKey}.svg`;
}

export function getWeaponFallbackPath(): string {
  return "/assets/weapons/training_katana.svg";
}
