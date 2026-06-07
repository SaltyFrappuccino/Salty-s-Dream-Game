import { create } from "zustand";

type MatchUiState = {
  selectedCharacterId?: string;
  setSelectedCharacterId: (id?: string) => void;
};

export const useMatchStore = create<MatchUiState>((set) => ({
  selectedCharacterId: undefined,
  setSelectedCharacterId: (id) => set({ selectedCharacterId: id })
}));

