import { create } from "zustand";
import type { ApiError, MatchState, RoomState } from "@sdg/shared";
import { socketClient } from "../services/socketClient";

type SocketState = {
  connected: boolean;
  error: ApiError | null;
  room: RoomState | null;
  match: MatchState | null;
  clearError: () => void;
  clearMatch: () => void;
  connect: () => void;
};

const defaultDisplayName = "Гость";

function resolveSeasonLobbyId() {
  const raw = localStorage.getItem("sdg_active_season");

  if (!raw || localStorage.getItem("sdg_progress_mode") !== "SEASON") {
    return undefined;
  }

  try {
    const season = JSON.parse(raw) as { id?: string };
    return season.id;
  } catch {
    return undefined;
  }
}

export const useSocketStore = create<SocketState>((set) => ({
  connected: false,
  error: null,
  room: null,
  match: null,
  clearError: () => set({ error: null }),
  clearMatch: () => set({ match: null }),
  connect() {
    socketClient.auth = {
      userId: localStorage.getItem("sdg_demo_user") ?? "guest",
      displayName: localStorage.getItem("sdg_demo_name") ?? defaultDisplayName,
      token: undefined,
      seasonLobbyId: resolveSeasonLobbyId()
    };

    if (!socketClient.connected) {
      socketClient.connect();
    }

    socketClient.off("connect");
    socketClient.off("disconnect");
    socketClient.off("room:state");
    socketClient.off("match:state");
    socketClient.off("match:start");
    socketClient.off("match:finished");
    socketClient.off("room:error");
    socketClient.off("match:error");

    socketClient.on("connect", () => set({ connected: true }));
    socketClient.on("disconnect", () => set({ connected: false }));
    socketClient.on("room:state", (room: RoomState) => set({ room, error: null }));
    socketClient.on("match:state", (match: MatchState) => set({ match, error: null }));
    socketClient.on("match:start", (match: MatchState) => set({ match, error: null }));
    socketClient.on("match:finished", (match: MatchState) => set({ match, error: null }));
    socketClient.on("room:error", (error: ApiError) => set({ error }));
    socketClient.on("match:error", (error: ApiError) => set({ error }));
  }
}));
