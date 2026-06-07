import type { FastifyReply, FastifyRequest } from "fastify";
import { getUserFromToken, type RequestUser } from "./getUserFromToken";

declare module "fastify" {
  interface FastifyRequest {
    user?: RequestUser;
  }
}

export async function requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      reply.status(401).send({
        code: "UNAUTHORIZED",
        message: "Требуется авторизация."
      });
      return;
    }

    request.user = user;
  } catch (error) {
    reply.status(400).send({
      code: "INVALID_PROGRESS_CONTEXT",
      message: error instanceof Error ? error.message : "Некорректный контекст прогресса."
    });
  }
}
