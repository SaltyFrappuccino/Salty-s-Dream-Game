import type { MatchAction, MatchState } from "@sdg/shared";
import { validateAction } from "../validators/validateAction";
import { applyAction } from "../engine/applyAction";

export function matchReducer(state: MatchState, action: MatchAction): MatchState {
  const errors = validateAction(state, action);
  if (errors.length > 0) {
    return {
      ...state,
      eventLog: [
        ...state.eventLog,
        {
          id: `event_${state.eventLog.length + 1}`,
          type: "action_error",
          timestamp: new Date().toISOString(),
          text: errors.join(" ")
        }
      ]
    };
  }

  return applyAction(state, action);
}


