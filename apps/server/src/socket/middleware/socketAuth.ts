import type { Socket } from "socket.io";
import { getSupabaseAdminClient } from "../../db/supabaseAdmin";
import { seasonLobbyService } from "../../services/season/seasonLobbyService";

export type SocketUser = {
  id: string;
  baseUserId: string;
  displayName: string;
  activeSeasonId?: string;
};

declare module "socket.io" {
  interface Socket {
    user?: SocketUser;
  }
}

function resolveScopedUserId(userId: string, seasonLobbyId?: string) {
  return seasonLobbyId ? `season:${seasonLobbyId}:${userId}` : userId;
}

export async function socketAuth(socket: Socket, next: (error?: Error) => void): Promise<void> {
  try {
    const seasonLobbyId =
      typeof socket.handshake.auth.seasonLobbyId === "string" && socket.handshake.auth.seasonLobbyId
        ? socket.handshake.auth.seasonLobbyId
        : undefined;

    if (seasonLobbyId) {
      seasonLobbyService.getActiveOrThrow(seasonLobbyId);
    }

    const token = typeof socket.handshake.auth.token === "string" ? socket.handshake.auth.token : "";
    const client = getSupabaseAdminClient();

    if (token && client) {
      const result = await client.auth.getUser(token);
      if (result.data.user) {
        const userId = result.data.user.id;
        socket.user = {
          id: resolveScopedUserId(userId, seasonLobbyId),
          baseUserId: userId,
          displayName: String(result.data.user.user_metadata.display_name ?? result.data.user.email ?? result.data.user.id),
          activeSeasonId: seasonLobbyId
        };
        next();
        return;
      }
    }

    const userId = String(socket.handshake.auth.userId ?? socket.handshake.headers["x-demo-user"] ?? "");
    if (!userId) {
      next(new Error("UNAUTHORIZED"));
      return;
    }

    socket.user = {
      id: resolveScopedUserId(userId, seasonLobbyId),
      baseUserId: userId,
      displayName: String(socket.handshake.auth.displayName ?? userId),
      activeSeasonId: seasonLobbyId
    };
    next();
  } catch (error) {
    next(error instanceof Error ? error : new Error("INVALID_PROGRESS_CONTEXT"));
  }
}
