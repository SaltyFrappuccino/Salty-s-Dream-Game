import { useMemo, useState } from "react";
import type { CollectionFilters } from "./collectionFilters";
import { emptyCollectionFilters, matchesCollectionFilters, matchesWeaponFilters } from "./collectionFilters";
import { useCollectionStore } from "../../stores/collectionStore";
import { usePlayerStore } from "../../stores/playerStore";

export type CollectionView = "characters" | "weapons";

export function useCollectionPage() {
  const characters = useCollectionStore((state) => state.characters);
  const weapons = useCollectionStore((state) => state.weapons);
  const collection = usePlayerStore((state) => state.collection);
  const ownedWeapons = usePlayerStore((state) => state.weapons);
  const [filters, setFilters] = useState<CollectionFilters>(emptyCollectionFilters);
  const [view, setView] = useState<CollectionView>("characters");

  const ownedById = useMemo(
    () => new Map(collection.map((item) => [item.characterVersionId, item])),
    [collection]
  );
  const ownedWeaponsById = useMemo(
    () => new Map(ownedWeapons.map((item) => [item.weaponDefinitionId, item])),
    [ownedWeapons]
  );

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) =>
      matchesCollectionFilters(character, filters, ownedById.has(character.id))
    );
  }, [characters, filters, ownedById]);

  const filteredWeapons = useMemo(() => {
    return weapons.filter((weapon) =>
      matchesWeaponFilters(weapon, filters, ownedWeaponsById.has(weapon.id))
    );
  }, [filters, ownedWeaponsById, weapons]);

  function clearFilters() {
    setFilters(emptyCollectionFilters);
  }

  function toggleFilter<T extends keyof CollectionFilters>(group: T, value: CollectionFilters[T][number]) {
    setFilters((current) => {
      const values = current[group];
      const nextValues = values.includes(value as never)
        ? values.filter((item) => item !== value)
        : [...values, value];

      return { ...current, [group]: nextValues };
    });
  }

  return {
    clearFilters,
    filteredCharacters,
    filteredWeapons,
    filters,
    ownedById,
    ownedWeaponsById,
    setView,
    toggleFilter,
    view
  };
}
