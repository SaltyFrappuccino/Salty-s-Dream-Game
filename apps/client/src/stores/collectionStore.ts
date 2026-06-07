import { create } from "zustand";
import type { CardDefinition, CharacterUnit, WeaponDefinition } from "@sdg/shared";
import { apiClient } from "../services/apiClient";

type CollectionState = {
  characters: CharacterUnit[];
  cards: CardDefinition[];
  weapons: WeaponDefinition[];
  loading: boolean;
  loadCatalog: () => Promise<void>;
};

export const useCollectionStore = create<CollectionState>((set) => ({
  characters: [],
  cards: [],
  weapons: [],
  loading: false,
  async loadCatalog() {
    set({ loading: true });
    const [characters, cards, weapons] = await Promise.all([
      apiClient.get<CharacterUnit[]>("/api/catalog/characters"),
      apiClient.get<CardDefinition[]>("/api/catalog/cards"),
      apiClient.get<WeaponDefinition[]>("/api/catalog/weapons")
    ]);
    set({ characters, cards, weapons, loading: false });
  }
}));
