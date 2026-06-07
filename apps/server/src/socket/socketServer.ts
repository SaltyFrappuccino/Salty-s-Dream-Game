import { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { resolveSocketCorsOrigin } from "../config/cors";
import { socketAuth } from "./middleware/socketAuth";
import { registerRoomHandlers } from "./handlers/room.handlers";
import { registerMatchHandlers } from "./handlers/match.handlers";

export function createSocketServer(server: HttpServer): Server {
  const io = new Server(server, {
    cors: {
      origin: resolveSocketCorsOrigin,
      credentials: true
    }
  });

  io.use(socketAuth);
  io.on("connection", (socket) => {
    registerRoomHandlers(io, socket);
    registerMatchHandlers(io, socket);
  });

  return io;
}
