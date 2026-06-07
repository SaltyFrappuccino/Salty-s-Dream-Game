import type { MatchAction } from "@sdg/shared";
import { cardDefinitions } from "../data/cards";
import type { ActionValidationPlayer } from "./actionValidationTypes";

export function validateDiscardDeadCardAction(
  player: ActionValidationPlayer,
  action: Extract<MatchAction, { type: "DISCARD_DEAD_CARD" }>,
  errors: string[]
): void {
  const cardInstance = player.hand.find((card) => card.instanceId === action.cardInstanceId);
  const card = cardInstance ? cardDefinitions.find((item) => item.id === cardInstance.cardId) : undefined;

  if (!card || !card.ownerCharacterVersionId) {
    errors.push("РњРѕР¶РЅРѕ СЃР±СЂР°СЃС‹РІР°С‚СЊ С‚РѕР»СЊРєРѕ РєР°СЂС‚Сѓ РїРµСЂСЃРѕРЅР°Р¶Р°.");
    return;
  }

  const owner = player.team.find((character) => character.characterVersionId === card.ownerCharacterVersionId);
  if (!owner?.defeated) {
    errors.push("РЎР±СЂРѕСЃ СЂР°РґРё РґРѕР±РѕСЂР° РґРѕСЃС‚СѓРїРµРЅ С‚РѕР»СЊРєРѕ РґР»СЏ РєР°СЂС‚С‹ РїРѕРіРёР±С€РµРіРѕ РїРµСЂСЃРѕРЅР°Р¶Р°.");
  }
}

