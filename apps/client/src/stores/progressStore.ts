import { create } from "zustand";
import type { ProgressMode, SeasonLobby } from "@sdg/shared";
import { apiClient } from "../services/apiClient";

const modeStorageKey = "sdg_progress_mode";
const seasonStorageKey = "sdg_active_season";

type ProgressState = {
  initialized: boolean;
  mode: ProgressMode;
  activeSeason: SeasonLobby | null;
  seasons: SeasonLobby[];
  init: () => void;
  setLocalMode: () => void;
  activateSeason: (season: SeasonLobby) => void;
  loadSeasons: () => Promise<void>;
  createSeason: (name: string, durationDays: number) => Promise<SeasonLobby>;
  joinSeason: (joinCode: string) => Promise<SeasonLobby>;
  exportLocalProfile: () => Promise<string>;
  importLocalProfile: (code: string) => Promise<void>;
};

function persist(mode: ProgressMode, activeSeason: SeasonLobby | null) {
  localStorage.setItem(modeStorageKey, mode);

  if (activeSeason) {
    localStorage.setItem(seasonStorageKey, JSON.stringify(activeSeason));
    return;
  }

  localStorage.removeItem(seasonStorageKey);
}

function readSeason() {
  const raw = localStorage.getItem(seasonStorageKey);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as SeasonLobby;
  } catch {
    return null;
  }
}

export const useProgressStore = create<ProgressState>((set) => ({
  initialized: false,
  mode: "LOCAL",
  activeSeason: null,
  seasons: [],
  init: () => {
    const mode = localStorage.getItem(modeStorageKey) === "SEASON" ? "SEASON" : "LOCAL";
    const activeSeason = readSeason();

    set({
      initialized: true,
      mode: activeSeason ? mode : "LOCAL",
      activeSeason: activeSeason && mode === "SEASON" ? activeSeason : null
    });
  },
  setLocalMode: () => {
    persist("LOCAL", null);
    set({ mode: "LOCAL", activeSeason: null });
  },
  activateSeason: (season) => {
    persist("SEASON", season);
    set({ mode: "SEASON", activeSeason: season });
  },
  loadSeasons: async () => {
    const seasons = await apiClient.get<SeasonLobby[]>("/api/seasons", {
      headers: {
        "x-progress-mode": "LOCAL"
      }
    });
    const activeSeason = readSeason();
    const hasActiveSeason = Boolean(activeSeason && seasons.some((season) => season.id === activeSeason.id));

    if (!hasActiveSeason && localStorage.getItem(modeStorageKey) === "SEASON") {
      persist("LOCAL", null);
    }

    set((state) => ({
      seasons,
      activeSeason: hasActiveSeason
        ? seasons.find((season) => season.id === activeSeason?.id) ?? state.activeSeason
        : null,
      mode:
        state.mode === "SEASON" && !hasActiveSeason
          ? "LOCAL"
          : state.mode
    }));
  },
  createSeason: async (name, durationDays) => {
    const season = await apiClient.post<SeasonLobby>("/api/seasons", { name, durationDays }, {
      headers: {
        "x-progress-mode": "LOCAL"
      }
    });
    persist("SEASON", season);
    set((state) => ({
      mode: "SEASON",
      activeSeason: season,
      seasons: [season, ...state.seasons.filter((item) => item.id !== season.id)]
    }));
    return season;
  },
  joinSeason: async (joinCode) => {
    const season = await apiClient.post<SeasonLobby>("/api/seasons/join", { joinCode }, {
      headers: {
        "x-progress-mode": "LOCAL"
      }
    });
    persist("SEASON", season);
    set((state) => ({
      mode: "SEASON",
      activeSeason: season,
      seasons: [season, ...state.seasons.filter((item) => item.id !== season.id)]
    }));
    return season;
  },
  exportLocalProfile: async () => {
    const response = await apiClient.get<{ code: string }>("/api/player/local-export", {
      headers: {
        "x-progress-mode": "LOCAL"
      }
    });
    return response.code;
  },
  importLocalProfile: async (code) => {
    await apiClient.post("/api/player/local-import", { code }, {
      headers: {
        "x-progress-mode": "LOCAL"
      }
    });
  }
}));

