import { DEFAULT_SEASON_DURATION_DAYS, type SeasonLobby } from "@sdg/shared";
import { seasonLobbyStore } from "./seasonLobbyStore";

function now() {
  return new Date();
}

function normalizeLobby(lobby: SeasonLobby): SeasonLobby {
  const expired = new Date(lobby.endsAt).getTime() <= now().getTime();

  if (!expired) {
    return lobby.status === "Active" ? lobby : { ...lobby, status: "Active" };
  }

  return lobby.status === "Expired" ? lobby : { ...lobby, status: "Expired" };
}

function persist(lobbies: SeasonLobby[]) {
  seasonLobbyStore.save(lobbies.map(normalizeLobby));
}

function resolveLobbies() {
  const lobbies = seasonLobbyStore.list().map(normalizeLobby);
  persist(lobbies);
  return lobbies;
}

function createId() {
  return `season_${Math.random().toString(36).slice(2, 10)}`;
}

function createJoinCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export const seasonLobbyService = {
  listActive(): SeasonLobby[] {
    return resolveLobbies().filter((lobby) => lobby.status === "Active");
  },
  getById(seasonLobbyId: string): SeasonLobby | null {
    return resolveLobbies().find((lobby) => lobby.id === seasonLobbyId) ?? null;
  },
  getActiveOrThrow(seasonLobbyId: string): SeasonLobby {
    const lobby = this.getById(seasonLobbyId);

    if (!lobby) {
      throw new Error("РЎРµР·РѕРЅРЅРѕРµ Р»РѕР±Р±Рё РЅРµ РЅР°Р№РґРµРЅРѕ.");
    }

    if (lobby.status !== "Active") {
      throw new Error("РЎРµР·РѕРЅРЅРѕРµ Р»РѕР±Р±Рё СѓР¶Рµ Р·Р°РІРµСЂС€РµРЅРѕ.");
    }

    return lobby;
  },
  create(createdByUserId: string, name: string, durationDays: number = DEFAULT_SEASON_DURATION_DAYS): SeasonLobby {
    const lobbies = resolveLobbies();
    const start = now();
    const next: SeasonLobby = {
      id: createId(),
      name,
      joinCode: createJoinCode(),
      createdAt: start.toISOString(),
      endsAt: new Date(start.getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString(),
      createdByUserId,
      status: "Active"
    };

    persist([...lobbies, next]);
    return next;
  },
  joinByCode(joinCode: string): SeasonLobby {
    const normalizedCode = joinCode.trim().toUpperCase();
    const lobby = resolveLobbies().find((item) => item.joinCode === normalizedCode);

    if (!lobby) {
      throw new Error("РЎРµР·РѕРЅРЅРѕРµ Р»РѕР±Р±Рё СЃ С‚Р°РєРёРј РєРѕРґРѕРј РЅРµ РЅР°Р№РґРµРЅРѕ.");
    }

    if (lobby.status !== "Active") {
      throw new Error("РЎРµР·РѕРЅРЅРѕРµ Р»РѕР±Р±Рё СѓР¶Рµ Р·Р°РІРµСЂС€РµРЅРѕ.");
    }

    return lobby;
  }
};

