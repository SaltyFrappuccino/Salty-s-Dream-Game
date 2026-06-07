import type { CharacterStats, StatBonuses } from "@sdg/shared";

export function applyStatBonuses(base: CharacterStats, bonuses?: StatBonuses): CharacterStats {
  return {
    hp: base.hp + (bonuses?.hp ?? 0),
    attack: base.attack + (bonuses?.attack ?? 0),
    defense: base.defense + (bonuses?.defense ?? 0),
    speed: base.speed + (bonuses?.speed ?? 0),
    critChance: base.critChance + (bonuses?.critChance ?? 0),
    critDamage: base.critDamage + (bonuses?.critDamage ?? 0)
  };
}

export function resolveStatDamage(baseAmount: number, source?: CharacterStats, target?: CharacterStats): number {
  const attackBonus = source ? Math.floor(source.attack * 0.25) : 0;
  const defenseReduction = target ? Math.floor(target.defense * 0.2) : 0;
  const preCrit = Math.max(0, baseAmount + attackBonus - defenseReduction);
  if (!source || source.critChance <= 0) {
    return preCrit;
  }

  const crit = source.critChance >= 1 || Math.random() < source.critChance;
  return crit ? Math.ceil(preCrit * source.critDamage) : preCrit;
}

