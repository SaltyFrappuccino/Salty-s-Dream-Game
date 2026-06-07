import type { MatchState } from "@sdg/shared";
import { applyCombatEffect } from "./combatEffects";
import { applyResourceEffect } from "./resourceEffects";
import { applyStatusEffect } from "./statusEffects";

export function applyEffect(
  state: MatchState,
  effectId: string,
  playerId: string,
  targetCharacterId?: string,
  sourceCharacterId?: string
): MatchState {
  return applyCombatEffect(state, effectId, targetCharacterId, sourceCharacterId)
    ?? applyStatusEffect(state, effectId, playerId, targetCharacterId)
    ?? applyResourceEffect(state, effectId, playerId, targetCharacterId)
    ?? state;
}

