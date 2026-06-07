import type { FastifyInstance } from "fastify";
import { createSeasonLobbySchema, joinSeasonLobbySchema } from "@sdg/shared";
import { requireAuth } from "../../auth/requireAuth";
import { seasonLobbyService } from "../../services/season/seasonLobbyService";

export async function registerSeasonRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/seasons", { preHandler: requireAuth }, async () => {
    return seasonLobbyService.listActive();
  });

  app.post("/api/seasons", { preHandler: requireAuth }, async (request, reply) => {
    const body = createSeasonLobbySchema.parse(request.body ?? {});
    const season = seasonLobbyService.create(request.user!.baseUserId, body.name, body.durationDays);
    reply.status(201).send(season);
  });

  app.post("/api/seasons/join", { preHandler: requireAuth }, async (request) => {
    const body = joinSeasonLobbySchema.parse(request.body ?? {});
    return seasonLobbyService.joinByCode(body.joinCode);
  });
}

