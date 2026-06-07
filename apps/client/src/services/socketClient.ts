import { io, type Socket } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

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

export const socketClient: Socket = io(socketUrl, {
  autoConnect: false,
  auth: {
    userId: localStorage.getItem("sdg_demo_user") ?? "guest",
    displayName: localStorage.getItem("sdg_demo_name") ?? "Р“РѕСЃС‚СЊ",
    token: undefined,
    seasonLobbyId: resolveSeasonLobbyId()
  }
});

