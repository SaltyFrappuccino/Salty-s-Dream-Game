import type { MatchState } from "@sdg/shared";

export function finishWithWinner(state: MatchState, winnerUserId?: string): MatchState {
  return {
    ...state,
    winnerUserId,
    finishedAt: new Date().toISOString(),
    turn: {
      ...state.turn,
      phase: "Finished"
    }
  };
}

