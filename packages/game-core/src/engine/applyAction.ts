import type { MatchAction, MatchState } from "@sdg/shared";
import { checkWinCondition } from "./checkWinCondition";
import { resolveCard } from "./resolveCard";
import { applyBasicAttack, applyDefend, applyFocus, applyRest } from "./actions/basicActions";
import { discardDeadCard } from "./actions/discardDeadCard";
import { finishWithWinner } from "./actions/finishMatch";
import { startNextTurn } from "./actions/startNextTurn";

function applyActionByType(state: MatchState, action: MatchAction): MatchState {
  switch (action.type) {
    case "PLAY_CARD":
      return resolveCard(state, action);
    case "BASIC_ATTACK":
      return applyBasicAttack(state, action);
    case "DEFEND":
      return applyDefend(state, action);
    case "FOCUS":
      return applyFocus(state, action);
    case "REST":
      return applyRest(state, action);
    case "DISCARD_DEAD_CARD":
      return discardDeadCard(state, action);
    case "END_TURN":
      return startNextTurn(state);
    case "CONCEDE":
      return finishWithWinner(state, state.players.find((player) => player.userId !== action.playerId)?.userId);
  }
}

export function applyAction(state: MatchState, action: MatchAction): MatchState {
  const nextState = applyActionByType(state, action);
  if (nextState.turn.phase === "Finished") {
    return nextState;
  }

  const winner = checkWinCondition(nextState);
  return winner ? finishWithWinner(nextState, winner === "draw" ? undefined : winner) : nextState;
}

