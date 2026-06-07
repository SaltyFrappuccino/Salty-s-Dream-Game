import type { RoomState } from "@sdg/shared";
import { activeRooms } from "./activeMatchState";

export function getRoomOrThrow(roomId: string): RoomState {
  const room = activeRooms.get(roomId);
  if (!room) {
    throw new Error("РљРѕРјРЅР°С‚Р° РЅРµ РЅР°Р№РґРµРЅР°.");
  }
  return room;
}

