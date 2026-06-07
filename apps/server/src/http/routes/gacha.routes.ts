import type { FastifyInstance } from "fastify";
import { gachaRollSchema } from "@sdg/shared";
import { requireAuth } from "../../auth/requireAuth";
import { gachaService } from "../../services/gachaService";

export async function registerGachaRoutes(app: FastifyInstance): Promise<void> {
  app.post("/api/gacha/roll", { preHandler: requireAuth }, async (request) => {
    const body = gachaRollSchema.parse(request.body);
    return gachaService.roll(
      request.user!.id,
      request.user!.displayName,
      body.bannerId,
      body.count,
      body.currency
    );
  });
}


