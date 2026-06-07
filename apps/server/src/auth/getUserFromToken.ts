import type { FastifyRequest } from "fastify";
import { getSupabaseAdminClient } from "../db/supabaseAdmin";
import { seasonLobbyService } from "../services/season/seasonLobbyService";

export type RequestUser = {
  id: string;
  baseUserId: string;
  email?: string;
  displayName: string;
  activeSeasonId?: string;
};

function resolveScopedUserId(userId: string, seasonLobbyId?: string) {
  return seasonLobbyId ? `season:${seasonLobbyId}:${userId}` : userId;
}

function resolveSeasonLobbyId(request: FastifyRequest) {
  const header = request.headers["x-season-id"];
  return typeof header === "string" && header.trim() ? header.trim() : undefined;
}

export async function getUserFromToken(request: FastifyRequest): Promise<RequestUser | null> {
  const seasonLobbyId = resolveSeasonLobbyId(request);

  if (seasonLobbyId) {
    seasonLobbyService.getActiveOrThrow(seasonLobbyId);
  }

  const header = request.headers.authorization;
  const demoUser = request.headers["x-demo-user"];

  if (typeof demoUser === "string" && demoUser.length > 0) {
    return {
      id: resolveScopedUserId(demoUser, seasonLobbyId),
      baseUserId: demoUser,
      email: `${demoUser}@sdg.local`,
      displayName: demoUser,
      activeSeasonId: seasonLobbyId
    };
  }

  if (!header?.startsWith("Bearer ")) {
    return null;
  }

  const token = header.replace("Bearer ", "");
  const client = getSupabaseAdminClient();
  if (!client) {
    return null;
  }

  const result = await client.auth.getUser(token);
  if (!result.data.user) {
    return null;
  }

  const userId = result.data.user.id;
  const displayName = String(result.data.user.user_metadata.display_name ?? result.data.user.email ?? result.data.user.id);

  return {
    id: resolveScopedUserId(userId, seasonLobbyId),
    baseUserId: userId,
    email: result.data.user.email,
    displayName,
    activeSeasonId: seasonLobbyId
  };
}

