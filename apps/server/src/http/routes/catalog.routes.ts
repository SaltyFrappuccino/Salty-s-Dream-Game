import type { FastifyInstance } from "fastify";
import { banners, cardDefinitions, characterUnits, weaponDefinitions } from "@sdg/game-core";

export async function registerCatalogRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/catalog/characters", async () => characterUnits);
  app.get("/api/catalog/cards", async () => cardDefinitions);
  app.get("/api/catalog/weapons", async () => weaponDefinitions);
  app.get("/api/catalog/banners", async () => banners);
}
