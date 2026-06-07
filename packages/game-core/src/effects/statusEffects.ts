import type { MatchState } from "@sdg/shared";
import { addStatus, removeStatus } from "../engine/resolveStatus";
import { updateCharacter, updateOpposingTeam, updateTeamByPlayer } from "./effectState";

export function applyStatusEffect(
  state: MatchState,
  effectId: string,
  playerId: string,
  targetCharacterId?: string
): MatchState | undefined {
  if (effectId === "all_allies_shield_2") {
    return updateTeamByPlayer(state, playerId, (target) => addStatus(target, "Shield", 2));
  }
  if (effectId === "all_enemies_mark_1_wound_1") {
    return updateOpposingTeam(state, playerId, (target) => addStatus(addStatus(target, "Mark", 1), "Wound", 1));
  }
  if (!targetCharacterId) {
    return undefined;
  }

  switch (effectId) {
    case "shield_1":
      return updateCharacter(state, targetCharacterId, (target) => addStatus(target, "Shield", 1));
    case "shield_2":
      return updateCharacter(state, targetCharacterId, (target) => addStatus(target, "Shield", 2));
    case "shield_3":
      return updateCharacter(state, targetCharacterId, (target) => addStatus(target, "Shield", 3));
    case "mark_1":
      return updateCharacter(state, targetCharacterId, (target) => addStatus(target, "Mark", 1));
    case "remove_seal":
      return updateCharacter(state, targetCharacterId, (target) => removeStatus(target, "Seal"));
    case "remove_wound":
      return updateCharacter(state, targetCharacterId, (target) => removeStatus(target, "Wound"));
    case "mark_1_wound_1":
      return updateCharacter(state, targetCharacterId, (target) => addStatus(addStatus(target, "Mark", 1), "Wound", 1));
    case "target_debuff_1":
      return updateCharacter(state, targetCharacterId, (target) => addStatus(target, "Debuff", 1));
    default:
      return undefined;
  }
}

