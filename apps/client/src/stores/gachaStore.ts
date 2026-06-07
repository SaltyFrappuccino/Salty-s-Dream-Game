import { create } from "zustand";
import type { BannerDefinition, CurrencyCode, GachaRollResponse, GachaRollResult } from "@sdg/shared";
import { apiClient } from "../services/apiClient";
import { usePlayerStore } from "./playerStore";

type GachaState = {
  banners: BannerDefinition[];
  lastRoll: GachaRollResult | null;
  loading: boolean;
  loadBanners: () => Promise<void>;
  roll: (count: 1 | 10, currency: CurrencyCode, bannerId?: string) => Promise<void>;
};

async function withGachaTimeout<T>(request: Promise<T>): Promise<T> {
  let timeoutId: number | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error("РЎРµСЂРІРµСЂ РїСЂРёР·С‹РІР° РЅРµ РѕС‚РІРµС‚РёР». РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р·.")), 9000);
  });

  try {
    return await Promise.race([request, timeout]);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export const useGachaStore = create<GachaState>((set) => ({
  banners: [],
  lastRoll: null,
  loading: false,
  async loadBanners() {
    const banners = await apiClient.get<BannerDefinition[]>("/api/catalog/banners");
    set({ banners });
  },
  async roll(count, currency, bannerId = "enchanted_blades") {
    set({ loading: true });
    try {
      const response = await withGachaTimeout(
        apiClient.post<GachaRollResponse>("/api/gacha/roll", {
          bannerId,
          count,
          currency
        })
      );
      usePlayerStore.getState().setWalletCollectionAndWeapons(response.wallet, response.collection, response.weapons);
      set({ lastRoll: response.result });
    } finally {
      set({ loading: false });
    }
  }
}));

