import type { MatchAction, MatchState, PlayerDeck, RoomState } from "@sdg/shared";
import { createMatch, matchReducer } from "@sdg/game-core";
import { activeMatches, activeRooms } from "./match/activeMatchState";
import { createMatchId } from "./match/matchIds";
import { finalizeMatch } from "./match/matchRewards";
import { roomStateService } from "./match/roomStateService";
import { collectionRepository } from "../repositories/collectionRepository";

export { activeMatches, activeRooms };

export const matchService = {
  createRoom(hostUserId: string, socketId: string, seasonLobbyId?: string): RoomState {
    return roomStateService.create(hostUserId, socketId, seasonLobbyId);
  },
  getRoom(roomId: string) {
    return roomStateService.get(roomId);
  },
  joinRoom(roomId: string, userId: string, socketId: string, activeSeasonId?: string): RoomState {
    return roomStateService.join(roomId, userId, socketId, activeSeasonId);
  },
  updateSettings(roomId: string, normalizedPvP: boolean, turnTimerSeconds: 60 | 90 | 120): RoomState {
    return roomStateService.updateSettings(roomId, normalizedPvP, turnTimerSeconds);
  },
  selectDeck(roomId: string, userId: string, deckId: string): RoomState {
    return roomStateService.selectDeck(roomId, userId, deckId);
  },
  setReady(roomId: string, userId: string, ready: boolean): RoomState {
    return roomStateService.setReady(roomId, userId, ready);
  },
  startMatch(roomId: string, decks: [PlayerDeck, PlayerDeck]): MatchState {
    const room = activeRooms.get(roomId);
    if (!room) {
      throw new Error("РљРѕРјРЅР°С‚Р° РЅРµ РЅР°Р№РґРµРЅР°.");
    }

    const equippedWeapons = decks.map((deck) => {
      const collection = collectionRepository.getByUserId(deck.userId, deck.userId);
      return Object.fromEntries(
        collection.map((character) => [character.characterVersionId, character.equippedWeaponId])
      );
    }) as [Record<string, string | undefined>, Record<string, string | undefined>];
    const match = createMatch(createMatchId(), roomId, decks, room.settings.normalizedPvP, equippedWeapons);
    activeMatches.set(match.id, match);
    room.status = "InMatch";
    return match;
  },
  applyMatchAction(matchId: string, action: MatchAction): MatchState {
    const match = activeMatches.get(matchId);
    if (!match) {
      throw new Error("РњР°С‚С‡ РЅРµ РЅР°Р№РґРµРЅ.");
    }

    const next = matchReducer(match, action);
    if (match.turn.phase !== "Finished" && next.turn.phase === "Finished") {
      finalizeMatch(next);
    }
    activeMatches.set(matchId, next);
    return next;
  }
};

