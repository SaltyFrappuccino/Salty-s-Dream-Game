import type { RoomState } from "@sdg/shared";
import { activeRooms } from "./activeMatchState";
import { createRoomId } from "./matchIds";
import { getRoomOrThrow } from "./roomGuards";
import { addGuest, updatePlayerDeck, updatePlayerReady } from "./roomMutations";
import { seasonLobbyService } from "../season/seasonLobbyService";

export const roomStateService = {
  create(hostUserId: string, socketId: string, seasonLobbyId?: string): RoomState {
    const season = seasonLobbyId ? seasonLobbyService.getActiveOrThrow(seasonLobbyId) : null;
    const room: RoomState = {
      roomId: createRoomId(),
      hostUserId,
      status: "Waiting",
      season: season
        ? {
            id: season.id,
            joinCode: season.joinCode,
            name: season.name,
            endsAt: season.endsAt
          }
        : undefined,
      settings: { normalizedPvP: true, turnTimerSeconds: 90 },
      players: [{ userId: hostUserId, socketId, ready: false }]
    };
    activeRooms.set(room.roomId, room);
    return room;
  },
  get(roomId: string) {
    return activeRooms.get(roomId) ?? null;
  },
  join(roomId: string, userId: string, socketId: string, activeSeasonId?: string): RoomState {
    const room = getRoomOrThrow(roomId);

    if (room.season?.id && room.season.id !== activeSeasonId) {
      throw new Error("Р”Р»СЏ РІС…РѕРґР° РІ СЌС‚Сѓ РєРѕРјРЅР°С‚Сѓ РЅСѓР¶РЅРѕ Р°РєС‚РёРІРёСЂРѕРІР°С‚СЊ С‚Рѕ Р¶Рµ СЃРµР·РѕРЅРЅРѕРµ Р»РѕР±Р±Рё.");
    }

    if (!room.season?.id && activeSeasonId) {
      throw new Error("Р­С‚Р° РєРѕРјРЅР°С‚Р° СЃРѕР·РґР°РЅР° РІРЅРµ СЃРµР·РѕРЅРЅРѕРіРѕ Р»РѕР±Р±Рё.");
    }

    return addGuest(room, userId, socketId);
  },
  updateSettings(roomId: string, normalizedPvP: boolean, turnTimerSeconds: 60 | 90 | 120): RoomState {
    const room = getRoomOrThrow(roomId);
    room.settings = { normalizedPvP, turnTimerSeconds };
    return room;
  },
  selectDeck(roomId: string, userId: string, deckId: string): RoomState {
    return updatePlayerDeck(getRoomOrThrow(roomId), userId, deckId);
  },
  setReady(roomId: string, userId: string, ready: boolean): RoomState {
    return updatePlayerReady(getRoomOrThrow(roomId), userId, ready);
  }
};

