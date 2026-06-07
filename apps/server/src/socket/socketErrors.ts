import type { Socket } from "socket.io";
import { apiError } from "../utils/errors";

export function emitSocketError(socket: Socket, eventName: "room:error" | "match:error", code: string, error: unknown): void {
  socket.emit(eventName, apiError(code, error instanceof Error ? error.message : "Неизвестная ошибка.", error));
}
