import type { CardTemplate } from "./cardTemplate";

export const tankTemplates: CardTemplate[] = [
  { suffix: "body_block", name: "Стальной блок", description: "Источник получает Щит 3.", type: "Defense", rarity: "R", effectId: "shield_3", stamina: 1, targetMode: "Self", tags: ["shield"] },
  { suffix: "taunting_blow", name: "Тяжёлый удар", description: "Наносит 2 урона и Ослабление 1.", type: "Attack", rarity: "SR", effectId: "damage_2_debuff_1", stamina: 2, targetMode: "EnemyCharacter", tags: ["damage", "debuff"] },
  { suffix: "anchor", name: "Якорь боя", description: "Источник получает +1 ВЫН и Щит 1.", type: "Support", rarity: "R", effectId: "self_stamina_1_shield_1", targetMode: "Self", tags: ["shield", "resource"] },
  { suffix: "seal_slam", name: "Сокрушающая печать", description: "Наносит 1 урон и накладывает Печать.", type: "Technique", rarity: "SR", effectId: "damage_1_seal_1", spiritualEnergy: 2, targetMode: "EnemyCharacter", tags: ["seal"] },
  { suffix: "last_wall", name: "Последняя стена", description: "Reaction: даёт Щит 3 союзнику.", type: "Reaction", rarity: "SR", effectId: "shield_3", spiritualEnergy: 1, targetMode: "AllyCharacter", tags: ["reaction", "shield"] },
  { suffix: "ultimate_guard", name: "Непробиваемый рубеж", description: "Все союзники получают Щит 2.", type: "Ultimate", rarity: "SSR", effectId: "all_allies_shield_2", spiritualEnergy: 4, targetMode: "AllAllies", tags: ["ultimate", "shield"] }
];
