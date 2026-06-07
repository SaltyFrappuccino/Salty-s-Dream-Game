import { create } from "zustand";
import type {
  CharacterUpgradeResult,
  PlayerCharacter,
  PlayerProfile,
  PlayerSnapshot,
  PlayerWallet,
  PlayerWeapon
} from "@sdg/shared";
import { apiClient } from "../services/apiClient";

type PlayerState = {
  profile: PlayerProfile | null;
  wallet: PlayerWallet | null;
  collection: PlayerCharacter[];
  weapons: PlayerWeapon[];
  loading: boolean;
  error?: string;
  bootstrap: (displayName?: string) => Promise<void>;
  equipWeapon: (characterVersionId: string, weaponDefinitionId?: string) => Promise<PlayerCharacter>;
  upgradeCharacter: (characterVersionId: string) => Promise<CharacterUpgradeResult>;
  setWalletCollectionAndWeapons: (wallet: PlayerWallet, collection: PlayerCharacter[], weapons: PlayerWeapon[]) => void;
  load: () => Promise<void>;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  profile: null,
  wallet: null,
  collection: [],
  weapons: [],
  loading: false,
  setWalletCollectionAndWeapons(wallet, collection, weapons) {
    set({ wallet, collection, weapons });
  },
  async bootstrap(displayName) {
    set({ loading: true, error: undefined });
    try {
      const snapshot = await apiClient.post<PlayerSnapshot>("/api/player/bootstrap", { displayName });
      set({
        profile: snapshot.profile,
        wallet: snapshot.wallet,
        collection: snapshot.collection,
        weapons: snapshot.weapons,
        loading: false
      });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "РћС€РёР±РєР° РёРЅРёС†РёР°Р»РёР·Р°С†РёРё РёРіСЂРѕРєР°." });
    }
  },
  async equipWeapon(characterVersionId, weaponDefinitionId) {
    const character = await apiClient.put<PlayerCharacter>(`/api/player/characters/${characterVersionId}/weapon`, {
      weaponDefinitionId
    });
    set((state) => ({
      collection: state.collection.map((item) =>
        item.characterVersionId === characterVersionId ? character : item
      )
    }));
    return character;
  },
  async upgradeCharacter(characterVersionId) {
    const result = await apiClient.post<CharacterUpgradeResult>("/api/player/characters/upgrade", {
      characterVersionId
    });
    set((state) => ({
      collection: state.collection.map((character) =>
        character.characterVersionId === characterVersionId ? result.character : character
      )
    }));
    return result;
  },
  async load() {
    set({ loading: true, error: undefined });
    try {
      const [profile, wallet, collection, weapons] = await Promise.all([
        apiClient.get<PlayerProfile>("/api/player/profile"),
        apiClient.get<PlayerWallet>("/api/player/wallet"),
        apiClient.get<PlayerCharacter[]>("/api/player/collection"),
        apiClient.get<PlayerWeapon[]>("/api/player/weapons")
      ]);
      set({ profile, wallet, collection, weapons, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё РёРіСЂРѕРєР°." });
    }
  }
}));

