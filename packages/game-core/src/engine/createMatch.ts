import type { MatchEvent, MatchPlayerState, MatchState, PlayerDeck } from "@sdg/shared";
import { STARTING_HAND_SIZE } from "../rules/constants";
import { buildInitiativeQueue, findCharacterOwner } from "./initiative";
import { buildCharacterState } from "./matchSetup/buildCharacterState";
import { createId } from "./matchSetup/idFactory";
import { drawCards, materializeDeck } from "./matchSetup/materializeDeck";

export function createMatch(
  matchId: string,
  roomId: string,
  decks: [PlayerDeck, PlayerDeck],
  normalizedPvP: boolean,
  equippedWeapons: [Record<string, string | undefined>, Record<string, string | undefined>] = [{}, {}]
): MatchState {
  const players: MatchPlayerState[] = decks.map((deck, deckIndex) => {
    const builtDeck = materializeDeck(deck);
    const drawn = drawCards(builtDeck, STARTING_HAND_SIZE + 1);
    return {
      userId: deck.userId,
      deckId: deck.id,
      team: deck.characterIds.map((characterId, index) =>
        buildCharacterState(characterId, deckIndex * 10 + index, equippedWeapons[deckIndex][characterId])
      ),
      deck: drawn.remaining,
      hand: drawn.hand,
      discard: [],
      bonusCards: [],
      actionsTaken: 0
    };
  });

  const eventLog: MatchEvent[] = [{
    id: createId("event", 0),
    type: "match_started",
    timestamp: new Date().toISOString(),
    text: "РњР°С‚С‡ РЅР°С‡Р°Р»СЃСЏ."
  }];

  const queue = buildInitiativeQueue({ players });
  const activeCharacterInstanceId = queue[0];
  const activePlayerId = findCharacterOwner({ players } as MatchState, activeCharacterInstanceId) ?? players[0].userId;

  return {
    id: matchId,
    roomId,
    players,
    turn: {
      number: 1,
      activePlayerId,
      activeCharacterInstanceId,
      initiativeQueue: queue,
      initiativeIndex: 0,
      phase: "Main"
    },
    normalizedPvP,
    eventLog
  };
}

