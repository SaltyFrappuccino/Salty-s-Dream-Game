import type { MatchCharacterState, MatchPlayerState, MatchState } from "@sdg/shared";

export function updateCharacter(
  state: MatchState,
  targetInstanceId: string,
  updater: (character: MatchCharacterState) => MatchCharacterState
): MatchState {
  return {
    ...state,
    players: state.players.map((player) => ({
      ...player,
      team: player.team.map((character) =>
        character.instanceId === targetInstanceId ? updater(character) : character
      )
    }))
  };
}

export function updateMany(
  state: MatchState,
  predicate: (player: MatchPlayerState) => boolean,
  updater: (character: MatchCharacterState) => MatchCharacterState
): MatchState {
  return {
    ...state,
    players: state.players.map((player) => ({
      ...player,
      team: predicate(player) ? player.team.map(updater) : player.team
    }))
  };
}

export function drawCards(state: MatchState, playerId: string, count: number): MatchState {
  return {
    ...state,
    players: state.players.map((player) =>
      player.userId === playerId
        ? {
            ...player,
            hand: [...player.hand, ...player.deck.slice(0, count)],
            deck: player.deck.slice(count)
          }
        : player
    )
  };
}

export function updateTeamByPlayer(
  state: MatchState,
  playerId: string,
  updater: (character: MatchCharacterState) => MatchCharacterState
): MatchState {
  return updateMany(state, (player) => player.userId === playerId, updater);
}

export function updateOpposingTeam(
  state: MatchState,
  playerId: string,
  updater: (character: MatchCharacterState) => MatchCharacterState
): MatchState {
  return updateMany(state, (player) => player.userId !== playerId, updater);
}

