import type { CharacterRole, CharacterUnit, Rarity, WeaponDefinition } from "@sdg/shared";

export type OwnershipFilter = "owned" | "locked";

export type CollectionFilters = {
  ownership: OwnershipFilter[];
  rarities: Rarity[];
  roles: CharacterRole[];
};

export type CollectionFilterGroup<T extends string> = {
  id: keyof CollectionFilters;
  label: string;
  options: {
    id: T;
    label: string;
  }[];
};

export const rarityFilterGroup: CollectionFilterGroup<Rarity> = {
  id: "rarities",
  label: "Редкость",
  options: [
    { id: "R", label: "R" },
    { id: "SR", label: "SR" },
    { id: "SSR", label: "SSR" },
    { id: "UR", label: "UR" }
  ]
};

export const roleFilterGroup: CollectionFilterGroup<CharacterRole> = {
  id: "roles",
  label: "Роль",
  options: [
    { id: "DPS", label: "DPS" },
    { id: "Support", label: "Support" },
    { id: "Tank", label: "Tank" },
    { id: "Specialist", label: "Specialist" }
  ]
};

export const ownershipFilterGroup: CollectionFilterGroup<OwnershipFilter> = {
  id: "ownership",
  label: "Статус",
  options: [
    { id: "owned", label: "Открытые" },
    { id: "locked", label: "Неоткрытые" }
  ]
};

export const emptyCollectionFilters: CollectionFilters = {
  ownership: [],
  rarities: [],
  roles: []
};

export function matchesCollectionFilters(
  character: CharacterUnit,
  filters: CollectionFilters,
  owned: boolean
): boolean {
  const ownershipMatches =
    filters.ownership.length === 0 ||
    filters.ownership.some((filter) => filter === "owned" ? owned : !owned);
  const rarityMatches = filters.rarities.length === 0 || filters.rarities.includes(character.rarity);
  const roleMatches = filters.roles.length === 0 || filters.roles.includes(character.role);

  return ownershipMatches && rarityMatches && roleMatches;
}

export function matchesWeaponFilters(
  weapon: WeaponDefinition,
  filters: CollectionFilters,
  owned: boolean
): boolean {
  const ownershipMatches =
    filters.ownership.length === 0 ||
    filters.ownership.some((filter) => filter === "owned" ? owned : !owned);
  const rarityMatches = filters.rarities.length === 0 || filters.rarities.includes(weapon.rarity);

  return ownershipMatches && rarityMatches;
}
