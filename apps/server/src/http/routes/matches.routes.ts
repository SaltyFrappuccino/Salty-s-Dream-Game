import type { FastifyInstance } from "fastify";
import { requireAuth } from "../../auth/requireAuth";
import { matchRepository } from "../../repositories/matchRepository";
import { activeMatches } from "../../services/matchService";

export async function registerMatchRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/matches/history", { preHandler: requireAuth }, async (request) => {
    return matchRepository.getHistory(request.user!.id);
  });

  app.get("/api/matches/:matchId", { preHandler: requireAuth }, async (request, reply) => {
    const matchId = String((request.params as { matchId: string }).matchId);
    const match = activeMatches.get(matchId);
    if (!match) {
      reply.status(404).send({
        code: "MATCH_NOT_FOUND",
        message: "Матч не найден."
      });
      return;
    }

    reply.send(match);
  });
}
