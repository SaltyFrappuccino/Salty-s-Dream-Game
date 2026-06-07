import type { CardDefinition, Rarity } from "@sdg/shared";
import type { CommonCardSeed } from "./cardTemplate";

const commonCardSeeds: CommonCardSeed[] = [
  ["quick_bandage", "Быстрая перевязка", "Лечит союзника на 2 HP.", "Support", "heal_2", "AllyCharacter"],
  ["combat_barrier", "Боевой заслон", "Даёт союзнику Щит 2.", "Defense", "shield_2", "AllyCharacter"],
  ["evasion", "Уклонение", "Reaction: источник получает Щит 1.", "Reaction", "shield_1", "Self"],
  ["concentration", "Концентрация", "Источник получает +2 ДЭ.", "Support", "self_sp_2", "Self"],
  ["tactical_breath", "Тактический вдох", "Источник получает +2 ВЫН.", "Support", "self_stamina_2", "Self"],
  ["precise_strike", "Прицельный удар", "Наносит 2 урона выбранному врагу.", "Attack", "damage_2", "EnemyCharacter"],
  ["remove_seal", "Снять печать", "Снимает Печать с союзника.", "Support", "remove_seal", "AllyCharacter"],
  ["remove_wound", "Снять рану", "Снимает Рану с союзника.", "Support", "remove_wound", "AllyCharacter"],
  ["temporary_shield", "Временный щит", "Источник получает Щит 1.", "Defense", "shield_1", "Self"],
  ["distracting_maneuver", "Отвлекающий манёвр", "Накладывает Метку на врага.", "Support", "mark_1", "EnemyCharacter"],
  ["draw", "Добор", "Доберите 2 карты.", "Support", "draw_2", "None"],
  ["regroup", "Перегруппировка", "Все союзники получают +1 ВЫН.", "Support", "all_allies_stamina_1", "AllAllies"],
  ["risky_lunge", "Рискованный выпад", "Наносит 3 урона врагу.", "Attack", "damage_3", "EnemyCharacter"],
  ["defensive_stance", "Защитная стойка", "Источник получает Щит 2 и +1 ВЫН.", "Defense", "self_stamina_1_shield_2", "Self"],
  ["technique_setup", "Подготовка техники", "Источник получает +2 ДЭ.", "Support", "self_sp_2", "Self"],
  ["last_dash", "Последний рывок", "Источник получает Усиление 2.", "Support", "self_buff_2", "Self"]
];

export const commonCards: CardDefinition[] = commonCardSeeds.map(([id, name, description, type, effectId, targetMode]) => ({
  id,
  name,
  description,
  themePackId: "core",
  type,
  rarity: "R" as Rarity,
  isCommon: true,
  cost: {},
  effectId,
  targetMode,
  tags: ["common"],
  assetKey: `common_${id}`
}));
