import { env } from "./config/env";
import { createApp } from "./app";
import { createSocketServer } from "./socket/socketServer";
import { logger } from "./utils/logger";

const app = await createApp();
createSocketServer(app.server);

await app.listen({
  port: env.PORT,
  host: "0.0.0.0"
});

logger.info(`Сервер запущен на порту ${env.PORT}.`);
