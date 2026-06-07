import type { RoomState } from "@sdg/shared";

export function addGuest(room: RoomState, userId: string, socketId: string): RoomState {
  const alreadyInRoom = room.players.some((player) => player.userId === userId);
  if (!alreadyInRoom && room.players.length >= 2) {
    throw new Error("РљРѕРјРЅР°С‚Р° СѓР¶Рµ Р·Р°РїРѕР»РЅРµРЅР°.");
  }

  if (!alreadyInRoom) {
    room.players.push({ userId, socketId, ready: false });
    room.guestUserId = userId;
    room.status = "ReadyCheck";
  }

  return room;
}

export function updatePlayerDeck(room: RoomState, userId: string, deckId: string): RoomState {
  room.players = room.players.map((player) => player.userId === userId ? { ...player, selectedDeckId: deckId } : player);
  return room;
}

export function updatePlayerReady(room: RoomState, userId: string, ready: boolean): RoomState {
  room.players = room.players.map((player) => player.userId === userId ? { ...player, ready } : player);
  return room;
}

