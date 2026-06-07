import type { FastifyInstance } from "fastify";
import { bootstrapPlayerSchema, equipWeaponSchema, importLocalProfileSchema, upgradeCharacterSchema } from "@sdg/shared";
import { requireAuth } from "../../auth/requireAuth";
import { playerService } from "../../services/playerService";

export async function registerPlayerRoutes(app: FastifyInstance): Promise<void> {
  app.post("/api/player/bootstrap", { preHandler: requireAuth }, async (request) => {
    const body = bootstrapPlayerSchema.parse(request.body ?? {});
    return playerService.bootstrap(
      request.user!.id,
      body.displayName ?? request.user!.displayName,
      body.username,
      {
        mode: request.user!.activeSeasonId ? "SEASON" : "LOCAL",
        seasonLobbyId: request.user!.activeSeasonId
      }
    );
  });

  app.get("/api/player/profile", { preHandler: requireAuth }, async (request) => {
    return playerService.getProfile(request.user!.id, request.user!.displayName);
  });

  app.get("/api/player/wallet", { preHandler: requireAuth }, async (request) => {
    return playerService.getWallet(request.user!.id, request.user!.displayName);
  });

  app.get("/api/player/collection", { preHandler: requireAuth }, async (request) => {
    return playerService.getCollection(request.user!.id, request.user!.displayName);
  });

  app.get("/api/player/weapons", { preHandler: requireAuth }, async (request) => {
    return playerService.getWeapons(request.user!.id, request.user!.displayName);
  });

  app.get("/api/player/local-export", { preHandler: requireAuth }, async (request) => {
    return playerService.exportLocalProfile(request.user!.baseUserId, request.user!.displayName);
  });

  app.post("/api/player/local-import", { preHandler: requireAuth }, async (request) => {
    const body = importLocalProfileSchema.parse(request.body ?? {});
    const imported = playerService.decodeLocalProfile(body.code);
    return playerService.importLocalProfile(
      request.user!.baseUserId,
      request.user!.displayName,
      imported
    );
  });

  app.put("/api/player/characters/:characterId/weapon", { preHandler: requireAuth }, async (request) => {
    const params = request.params as { characterId: string };
    const body = equipWeaponSchema.parse(request.body ?? {});
    return playerService.equipWeapon(
      request.user!.id,
      request.user!.displayName,
      params.characterId,
      body.weaponDefinitionId
    );
  });

  app.post("/api/player/characters/upgrade", { preHandler: requireAuth }, async (request) => {
    const body = upgradeCharacterSchema.parse(request.body ?? {});
    return playerService.upgradeCharacter(
      request.user!.id,
      request.user!.displayName,
      body.characterVersionId
    );
  });
}

