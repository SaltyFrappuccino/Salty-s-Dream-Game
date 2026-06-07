import type { FastifyInstance } from "fastify";
import { requireAuth } from "../../auth/requireAuth";

export async function registerMeRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/me", { preHandler: requireAuth }, async (request) => ({
    user: request.user
  }));
}

