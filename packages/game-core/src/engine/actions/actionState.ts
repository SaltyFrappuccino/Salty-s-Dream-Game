import type { MatchState } from "@sdg/shared";

export type MatchCharacter = MatchState["players"][number]["team"][number];

export function updatePlayerCharacter(
  state: MatchState,
  playerId: string,
  instanceId: string,
  updater: (current: MatchCharacter) => MatchCharacter
): MatchState {
  return {
    ...state,
    players: state.players.map((player) =>
      player.userId === playerId
        ? {
            ...player,
            team: player.team.map((character) =>
              character.instanceId === instanceId ? updater(character) : character
            ),
            actionsTaken: player.actionsTaken + 1
          }
        : player
    )
  };
}

export function updateAnyCharacter(
  state: MatchState,
  instanceId: string,
  updater: (current: MatchCharacter) => MatchCharacter
): MatchState {
  return {
    ...state,
    players: state.players.map((player) => ({
      ...player,
      team: player.team.map((character) =>
        character.instanceId === instanceId ? updater(character) : character
      )
    }))
  };
}

