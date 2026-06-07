import type { MatchState, RoomState } from "@sdg/shared";

export const activeRooms = new Map<string, RoomState>();
export const activeMatches = new Map<string, MatchState>();

