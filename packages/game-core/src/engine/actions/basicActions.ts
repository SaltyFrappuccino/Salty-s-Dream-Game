import type { MatchAction, MatchState } from "@sdg/shared";
import { BASE_ACTION_COSTS } from "../../rules/resources";
import { damageTarget } from "../../effects/combatDamage";
import { addStatus } from "../resolveStatus";
import { updatePlayerCharacter } from "./actionState";

export function applyBasicAttack(state: MatchState, action: Extract<MatchAction, { type: "BASIC_ATTACK" }>): MatchState {
  const paidState = updatePlayerCharacter(state, action.playerId, action.sourceCharacterId, (character) => ({
    ...character,
    stamina: Math.max(0, character.stamina - BASE_ACTION_COSTS.basicAttackStamina)
  }));

  return damageTarget(paidState, action.targetCharacterId, 1, action.sourceCharacterId);
}

export function applyDefend(state: MatchState, action: Extract<MatchAction, { type: "DEFEND" }>): MatchState {
  return updatePlayerCharacter(state, action.playerId, action.sourceCharacterId, (character) => ({
    ...addStatus(character, "Shield", 2),
    stamina: Math.max(0, character.stamina - BASE_ACTION_COSTS.defendStamina)
  }));
}

export function applyFocus(state: MatchState, action: Extract<MatchAction, { type: "FOCUS" }>): MatchState {
  return updatePlayerCharacter(state, action.playerId, action.sourceCharacterId, (character) => ({
    ...character,
    spiritualEnergy: Math.min(character.maxSpiritualEnergy, character.spiritualEnergy + 1),
    focusUsedThisTurn: true
  }));
}

export function applyRest(state: MatchState, action: Extract<MatchAction, { type: "REST" }>): MatchState {
  return updatePlayerCharacter(state, action.playerId, action.sourceCharacterId, (character) => ({
    ...character,
    stamina: Math.min(character.maxStamina, character.stamina + 1),
    restUsedThisTurn: true
  }));
}

