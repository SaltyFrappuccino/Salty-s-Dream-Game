import type { MatchCharacterState, StatusEffectType } from "@sdg/shared";

export function addStatus(
  target: MatchCharacterState,
  type: StatusEffectType,
  value: number
): MatchCharacterState {
  return {
    ...target,
    statuses: [...target.statuses, { type, value }]
  };
}

export function removeStatus(target: MatchCharacterState, type: StatusEffectType): MatchCharacterState {
  return {
    ...target,
    statuses: target.statuses.filter((status) => status.type !== type)
  };
}


