import type { MatchState } from "@sdg/shared";
import { RESOURCE_RESTORE } from "../../rules/resources";
import { buildInitiativeQueue, findCharacterOwner } from "../initiative";

function restoreActiveCharacter(state: MatchState, activeCharacterId?: string): MatchState {
  if (!activeCharacterId) {
    return state;
  }

  return {
    ...state,
    players: state.players.map((player) => ({
      ...player,
      team: player.team.map((character) => {
        if (character.instanceId !== activeCharacterId || character.defeated) {
          return {
            ...character,
            focusUsedThisTurn: false,
            restUsedThisTurn: false
          };
        }

        const woundDamage = character.statuses
          .filter((status) => status.type === "Wound")
          .reduce((sum, status) => sum + status.value, 0);
        const nextHp = Math.max(0, character.hp - woundDamage);

        return {
          ...character,
          hp: nextHp,
          defeated: nextHp <= 0,
          spiritualEnergy: Math.min(character.maxSpiritualEnergy, character.spiritualEnergy + RESOURCE_RESTORE.spiritualEnergy),
          stamina: Math.min(character.maxStamina, character.stamina + RESOURCE_RESTORE.stamina),
          statuses: character.statuses.filter((status) => status.type !== "Seal"),
          focusUsedThisTurn: false,
          restUsedThisTurn: false
        };
      })
    }))
  };
}

export function startNextTurn(state: MatchState): MatchState {
  const hasExistingQueue = Array.isArray(state.turn.initiativeQueue);
  let queue = (state.turn.initiativeQueue ?? buildInitiativeQueue(state)).filter((characterId) =>
    state.players.some((player) => player.team.some((character) => character.instanceId === characterId && !character.defeated))
  );
  let nextIndex = hasExistingQueue ? state.turn.initiativeIndex + 1 : 0;
  let nextTurnNumber = state.turn.number + 1;

  if (nextIndex >= queue.length) {
    queue = buildInitiativeQueue(state);
    nextIndex = 0;
  }

  const activeCharacterInstanceId = queue[nextIndex];
  const activePlayerId = findCharacterOwner(state, activeCharacterInstanceId) ?? state.turn.activePlayerId;
  const restoredState = restoreActiveCharacter(state, activeCharacterInstanceId);

  return {
    ...restoredState,
    players: restoredState.players.map((player) => ({
      ...player,
      hand: player.userId === activePlayerId ? [...player.hand, ...player.deck.slice(0, 1)] : player.hand,
      deck: player.userId === activePlayerId ? player.deck.slice(1) : player.deck
    })),
    turn: {
      number: nextTurnNumber,
      activePlayerId,
      activeCharacterInstanceId,
      initiativeQueue: queue,
      initiativeIndex: nextIndex,
      phase: "Main"
    }
  };
}

