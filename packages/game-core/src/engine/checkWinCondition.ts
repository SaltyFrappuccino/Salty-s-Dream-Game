import type { MatchState } from "@sdg/shared";

export function checkWinCondition(state: MatchState): string | undefined {
  const alivePlayers = state.players.filter((player) => player.team.some((character) => !character.defeated));
  if (alivePlayers.length === 1) {
    return alivePlayers[0]?.userId;
  }

  if (alivePlayers.length === 0) {
    return "draw";
  }

  return undefined;
}


