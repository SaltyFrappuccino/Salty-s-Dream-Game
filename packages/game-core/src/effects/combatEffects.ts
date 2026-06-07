import type { MatchState } from "@sdg/shared";
import { addStatus } from "../engine/resolveStatus";
import { damageTarget } from "./combatDamage";
import { updateCharacter } from "./effectState";

export function applyCombatEffect(
  state: MatchState,
  effectId: string,
  targetCharacterId?: string,
  sourceCharacterId?: string
): MatchState | undefined {
  if (!targetCharacterId) {
    return undefined;
  }

  switch (effectId) {
    case "damage_1":
      return damageTarget(state, targetCharacterId, 1, sourceCharacterId);
    case "damage_2":
      return damageTarget(state, targetCharacterId, 2, sourceCharacterId);
    case "damage_3":
      return damageTarget(state, targetCharacterId, 3, sourceCharacterId);
    case "damage_5":
      return damageTarget(state, targetCharacterId, 5, sourceCharacterId);
    case "conditional_mark_damage":
      return applyConditionalMarkDamage(state, targetCharacterId, sourceCharacterId);
    case "damage_1_mark_1":
      return addStatusAfterDamage(state, targetCharacterId, 1, "Mark", sourceCharacterId);
    case "damage_1_seal_1":
      return addStatusAfterDamage(state, targetCharacterId, 1, "Seal", sourceCharacterId);
    case "damage_2_debuff_1":
      return addStatusAfterDamage(state, targetCharacterId, 2, "Debuff", sourceCharacterId);
    case "damage_2_seal_1":
      return addStatusAfterDamage(state, targetCharacterId, 2, "Seal", sourceCharacterId);
    default:
      return undefined;
  }
}

function applyConditionalMarkDamage(state: MatchState, targetCharacterId: string, sourceCharacterId?: string): MatchState {
  const target = state.players.flatMap((player) => player.team).find((character) => character.instanceId === targetCharacterId);
  return damageTarget(state, targetCharacterId, target?.statuses.some((status) => status.type === "Mark") ? 2 : 1, sourceCharacterId);
}

function addStatusAfterDamage(
  state: MatchState,
  targetCharacterId: string,
  damage: number,
  status: "Mark" | "Seal" | "Debuff",
  sourceCharacterId?: string
): MatchState {
  return updateCharacter(damageTarget(state, targetCharacterId, damage, sourceCharacterId), targetCharacterId, (target) => addStatus(target, status, 1));
}

