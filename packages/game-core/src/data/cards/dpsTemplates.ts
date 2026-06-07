import type { CardTemplate } from "./cardTemplate";

export const dpsTemplates: CardTemplate[] = [
  { suffix: "quick_slash", name: "Быстрый разрез", description: "Наносит 2 урона выбранному врагу.", type: "Attack", rarity: "R", effectId: "damage_2", stamina: 1, targetMode: "EnemyCharacter", tags: ["damage"] },
  { suffix: "spirit_cut", name: "Духовный разрез", description: "Наносит 3 урона выбранному врагу.", type: "Technique", rarity: "SR", effectId: "damage_3", spiritualEnergy: 2, targetMode: "EnemyCharacter", tags: ["damage", "technique"] },
  { suffix: "marked_strike", name: "Меченый удар", description: "Наносит 1 урон и накладывает Метку.", type: "Attack", rarity: "R", effectId: "damage_1_mark_1", stamina: 1, targetMode: "EnemyCharacter", tags: ["damage", "mark"] },
  { suffix: "adrenaline", name: "Боевой драйв", description: "Источник получает +1 ВЫН и Усиление 1.", type: "Support", rarity: "SR", effectId: "self_stamina_1_buff_1", targetMode: "Self", tags: ["buff"] },
  { suffix: "counter_stance", name: "Контрстойка", description: "Источник получает Щит 2.", type: "Defense", rarity: "R", effectId: "shield_2", stamina: 1, targetMode: "Self", tags: ["shield"] },
  { suffix: "ultimate_blade", name: "Предел клинка", description: "Наносит 5 урона выбранному врагу.", type: "Ultimate", rarity: "SSR", effectId: "damage_5", spiritualEnergy: 4, targetMode: "EnemyCharacter", tags: ["ultimate", "damage"] }
];
