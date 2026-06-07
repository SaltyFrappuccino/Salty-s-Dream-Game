import type { MatchAction, MatchState } from "@sdg/shared";
import { validateBasicAction } from "./validateBasicAction";
import { validateDiscardDeadCardAction } from "./validateDiscardDeadCardAction";
import { validatePlayCardAction } from "./validatePlayCardAction";

export function validateAction(state: MatchState, action: MatchAction): string[] {
  const errors: string[] = [];
  if (state.turn.activePlayerId !== action.playerId && action.type !== "CONCEDE") {
    errors.push("РЎРµР№С‡Р°СЃ РЅРµ С…РѕРґ СЌС‚РѕРіРѕ РёРіСЂРѕРєР°.");
  }

  const player = state.players.find((item) => item.userId === action.playerId);
  if (!player) {
    errors.push("РРіСЂРѕРє РЅРµ РЅР°Р№РґРµРЅ.");
    return errors;
  }

  switch (action.type) {
    case "PLAY_CARD":
      appendActiveCharacterError(state, action.sourceCharacterId, errors);
      validatePlayCardAction(player, action, errors);
      break;
    case "BASIC_ATTACK":
    case "DEFEND":
    case "FOCUS":
    case "REST":
      appendActiveCharacterError(state, action.sourceCharacterId, errors);
      validateBasicAction(player, action, errors);
      break;
    case "DISCARD_DEAD_CARD":
      validateDiscardDeadCardAction(player, action, errors);
      break;
  }

  return errors;
}

function appendActiveCharacterError(state: MatchState, sourceCharacterId: string | undefined, errors: string[]): void {
  if (!state.turn.activeCharacterInstanceId || !sourceCharacterId) {
    return;
  }

  if (sourceCharacterId !== state.turn.activeCharacterInstanceId) {
    errors.push("РЎРµР№С‡Р°СЃ С…РѕРґ РґСЂСѓРіРѕРіРѕ РїРµСЂСЃРѕРЅР°Р¶Р°.");
  }
}

