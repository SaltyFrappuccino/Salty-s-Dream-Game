import type { Server, Socket } from "socket.io";
import { updateRoomSettingsSchema } from "@sdg/shared";
import { deckService } from "../../services/deckService";
import { matchService } from "../../services/matchService";
import { emitSocketError } from "../socketErrors";

export function registerRoomHandlers(io: Server, socket: Socket): void {
  socket.on("room:create", (payload?: { seasonLobbyId?: string }) => safely(socket, () => {
    const room = matchService.createRoom(socket.user!.id, socket.id, payload?.seasonLobbyId);
    socket.join(room.roomId);
    io.to(room.roomId).emit("room:state", room);
  }));

  socket.on("room:join", (payload: { roomId: string }) => safely(socket, () => {
    const room = matchService.joinRoom(payload.roomId, socket.user!.id, socket.id, socket.user!.activeSeasonId);
    socket.join(room.roomId);
    io.to(room.roomId).emit("room:state", room);
  }));

  socket.on("room:leave", (payload: { roomId: string }) => socket.leave(payload.roomId));
  socket.on("room:select-deck", (payload: { roomId: string; deckId: string }) => safely(socket, () => {
    const room = matchService.selectDeck(payload.roomId, socket.user!.id, payload.deckId);
    io.to(room.roomId).emit("room:state", room);
  }));

  socket.on("room:update-settings", (payload: { roomId: string; normalizedPvP: boolean; turnTimerSeconds: 60 | 90 | 120 }) => safely(socket, () => {
    const data = updateRoomSettingsSchema.parse(payload);
    const room = matchService.updateSettings(payload.roomId, data.normalizedPvP, data.turnTimerSeconds);
    io.to(room.roomId).emit("room:state", room);
  }));

  socket.on("room:ready", (payload: { roomId: string; ready: boolean }) => safely(socket, () => {
    const room = matchService.setReady(payload.roomId, socket.user!.id, payload.ready);
    io.to(room.roomId).emit("room:state", room);
    startMatchIfReady(io, room);
  }));
}

type RoomForStart = ReturnType<typeof matchService.setReady>;

function startMatchIfReady(io: Server, room: RoomForStart): void {
  const readyPlayers = room.players.filter((player) => player.ready && player.selectedDeckId);
  if (readyPlayers.length !== 2) {
    return;
  }

  const hostDeck = deckService.list(room.players[0]!.userId, room.players[0]!.userId).find((deck) => deck.id === room.players[0]!.selectedDeckId);
  const guestDeck = deckService.list(room.players[1]!.userId, room.players[1]!.userId).find((deck) => deck.id === room.players[1]!.selectedDeckId);
  if (!hostDeck || !guestDeck) {
    return;
  }

  const match = matchService.startMatch(room.roomId, [hostDeck, guestDeck]);
  io.in(room.roomId).socketsJoin(match.id);
  io.to(room.roomId).emit("match:start", match);
  io.to(room.roomId).emit("match:state", match);
}

function safely(socket: Socket, fn: () => void): void {
  try {
    fn();
  } catch (error) {
    emitSocketError(socket, "room:error", "ROOM_ACTION_FAILED", error);
  }
}

