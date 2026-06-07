import { create } from "zustand";
import type { PlayerDeck } from "@sdg/shared";
import { apiClient } from "../services/apiClient";

type DeckState = {
  decks: PlayerDeck[];
  loading: boolean;
  load: () => Promise<void>;
  save: (deck: Pick<PlayerDeck, "name" | "characterIds" | "cards">) => Promise<PlayerDeck>;
};

export const useDeckStore = create<DeckState>((set) => ({
  decks: [],
  loading: false,
  async load() {
    set({ loading: true });
    const decks = await apiClient.get<PlayerDeck[]>("/api/player/decks");
    set({ decks, loading: false });
  },
  async save(deck) {
    set({ loading: true });
    const saved = await apiClient.post<PlayerDeck>("/api/player/decks", deck);
    set((state) => ({
      decks: [...state.decks.filter((item) => item.id !== saved.id), saved],
      loading: false
    }));
    return saved;
  }
}));

