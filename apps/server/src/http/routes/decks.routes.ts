import type { FastifyInstance } from "fastify";
import { createDeckSchema } from "@sdg/shared";
import { requireAuth } from "../../auth/requireAuth";
import { deckService } from "../../services/deckService";

export async function registerDeckRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/player/decks", { preHandler: requireAuth }, async (request) => {
    return deckService.list(request.user!.id, request.user!.displayName);
  });

  app.post("/api/player/decks", { preHandler: requireAuth }, async (request, reply) => {
    const body = createDeckSchema.parse(request.body);
    const deck = deckService.save(request.user!.id, {
      id: `deck_${Date.now()}`,
      userId: request.user!.id,
      name: body.name,
      characterIds: body.characterIds,
      isActive: false,
      cards: body.cards,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    reply.status(201).send(deck);
  });

  app.put("/api/player/decks/:deckId", { preHandler: requireAuth }, async (request) => {
    const body = createDeckSchema.parse(request.body);
    const deckId = String((request.params as { deckId: string }).deckId);
    return deckService.save(request.user!.id, {
      id: deckId,
      userId: request.user!.id,
      name: body.name,
      characterIds: body.characterIds,
      isActive: false,
      cards: body.cards,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  });

  app.delete("/api/player/decks/:deckId", { preHandler: requireAuth }, async (request, reply) => {
    const deckId = String((request.params as { deckId: string }).deckId);
    deckService.remove(request.user!.id, deckId);
    reply.status(204).send();
  });
}


