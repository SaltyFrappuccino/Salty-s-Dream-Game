import Fastify from "fastify";
import sensible from "@fastify/sensible";
import cors from "@fastify/cors";
import { corsOptions } from "./config/cors";
import { registerHealthRoutes } from "./http/routes/health.routes";
import { registerMeRoutes } from "./http/routes/me.routes";
import { registerPlayerRoutes } from "./http/routes/player.routes";
import { registerCatalogRoutes } from "./http/routes/catalog.routes";
import { registerDeckRoutes } from "./http/routes/decks.routes";
import { registerGachaRoutes } from "./http/routes/gacha.routes";
import { registerMatchRoutes } from "./http/routes/matches.routes";
import { registerSeasonRoutes } from "./http/routes/season.routes";

export async function createApp() {
  const app = Fastify({
    logger: false
  });

  await app.register(sensible);
  await app.register(cors, corsOptions);
  await registerHealthRoutes(app);
  await registerMeRoutes(app);
  await registerPlayerRoutes(app);
  await registerCatalogRoutes(app);
  await registerDeckRoutes(app);
  await registerGachaRoutes(app);
  await registerMatchRoutes(app);
  await registerSeasonRoutes(app);

  return app;
}
