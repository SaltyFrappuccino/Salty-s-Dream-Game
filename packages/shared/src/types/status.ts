export type StatusEffectType =
  | "Shield"
  | "Wound"
  | "Stun"
  | "Seal"
  | "Buff"
  | "Debuff"
  | "Mark";

export type StatusEffect = {
  type: StatusEffectType;
  value: number;
  expiresAtTurn?: number;
  sourceCharacterId?: string;
};
