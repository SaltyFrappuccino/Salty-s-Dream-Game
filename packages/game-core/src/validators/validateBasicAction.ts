import type { MatchAction } from "@sdg/shared";
import type { ActionValidationPlayer } from "./actionValidationTypes";

type BasicAction = Extract<MatchAction, { type: "BASIC_ATTACK" | "DEFEND" | "FOCUS" | "REST" }>;

export function validateBasicAction(player: ActionValidationPlayer, action: BasicAction, errors: string[]): void {
  const source = player.team.find((character) => character.instanceId === action.sourceCharacterId);
  if (!source) {
    errors.push("РСЃС‚РѕС‡РЅРёРє РґРµР№СЃС‚РІРёСЏ РЅРµ РЅР°Р№РґРµРЅ.");
    return;
  }

  if (source.defeated) {
    errors.push("РџРѕРіРёР±С€РёР№ РїРµСЂСЃРѕРЅР°Р¶ РЅРµ РјРѕР¶РµС‚ РІС‹РїРѕР»РЅСЏС‚СЊ РґРµР№СЃС‚РІРёРµ.");
    return;
  }

  if ((action.type === "BASIC_ATTACK" || action.type === "DEFEND") && source.stamina < 1) {
    errors.push("РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ Р’Р«Рќ РґР»СЏ РґРµР№СЃС‚РІРёСЏ.");
  }
  if (action.type === "FOCUS" && source.focusUsedThisTurn) {
    errors.push("Р¤РѕРєСѓСЃ СѓР¶Рµ РёСЃРїРѕР»СЊР·РѕРІР°РЅ СЌС‚РёРј РїРµСЂСЃРѕРЅР°Р¶РµРј РІ С‚РµРєСѓС‰РµРј С…РѕРґСѓ.");
  }
  if (action.type === "REST" && source.restUsedThisTurn) {
    errors.push("РћС‚РґС‹С… СѓР¶Рµ РёСЃРїРѕР»СЊР·РѕРІР°РЅ СЌС‚РёРј РїРµСЂСЃРѕРЅР°Р¶РµРј РІ С‚РµРєСѓС‰РµРј С…РѕРґСѓ.");
  }
}

