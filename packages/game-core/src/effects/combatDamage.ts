import type { MatchCharacterState, MatchState } from "@sdg/shared";
import { resolveDamage } from "../engine/resolveDamage";
import { resolveStatDamage } from "../rules/stats";
import { getStatusValue } from "../rules/statuses";
import { updateCharacter } from "./effectState";

export function resolveModifiedDamage(source: MatchCharacterState | undefined, baseAmount: number): number {
  const buff = source ? getStatusValue(source.statuses, "Buff") : 0;
  const debuff = source ? getStatusValue(source.statuses, "Debuff") : 0;
  return Math.max(0, baseAmount + buff - debuff);
}

export function consumeDamageModifiers(state: MatchState, sourceCharacterId?: string): MatchState {
  if (!sourceCharacterId) {
    return state;
  }

  return updateCharacter(state, sourceCharacterId, (source) => ({
    ...source,
    statuses: source.statuses.filter((status) => status.type !== "Buff" && status.type !== "Debuff")
  }));
}

export function damageTarget(
  state: MatchState,
  targetCharacterId: string,
  baseAmount: number,
  sourceCharacterId?: string
): MatchState {
  const source = state.players.flatMap((player) => player.team).find((character) => character.instanceId === sourceCharacterId);
  const target = state.players.flatMap((player) => player.team).find((character) => character.instanceId === targetCharacterId);
  const modifiedBase = resolveModifiedDamage(source, baseAmount);
  const amount = resolveStatDamage(modifiedBase, source?.stats, target?.stats);
  const damagedState = updateCharacter(state, targetCharacterId, (target) => resolveDamage(target, amount));
  return consumeDamageModifiers(damagedState, sourceCharacterId);
}

