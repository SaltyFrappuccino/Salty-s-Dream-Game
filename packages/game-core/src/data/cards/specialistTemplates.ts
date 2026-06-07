import type { CardTemplate } from "./cardTemplate";

export const specialistTemplates: CardTemplate[] = [
  { suffix: "hex_cut", name: "Разрез метки", description: "Наносит 2 урона по врагу с Меткой, иначе 1.", type: "Technique", rarity: "SR", effectId: "conditional_mark_damage", spiritualEnergy: 2, targetMode: "EnemyCharacter", tags: ["damage", "mark"] },
  { suffix: "shadow_tag", name: "Теневая метка", description: "Накладывает Метку и Рану 1.", type: "Support", rarity: "R", effectId: "mark_1_wound_1", spiritualEnergy: 1, targetMode: "EnemyCharacter", tags: ["mark", "wound"] },
  { suffix: "fracture", name: "Разлом", description: "Наносит 2 урона и Печать.", type: "Technique", rarity: "SR", effectId: "damage_2_seal_1", spiritualEnergy: 2, targetMode: "EnemyCharacter", tags: ["damage", "seal"] },
  { suffix: "scheming", name: "Тактический расчёт", description: "Доберите 2 карты.", type: "Support", rarity: "R", effectId: "draw_2", targetMode: "None", tags: ["draw"] },
  { suffix: "bait_reaction", name: "Ложная слабость", description: "Reaction: Ослабление 1 на атакующего.", type: "Reaction", rarity: "SR", effectId: "target_debuff_1", spiritualEnergy: 1, targetMode: "EnemyCharacter", tags: ["reaction", "debuff"] },
  { suffix: "ultimate_scheme", name: "Абсолютный замысел", description: "Все враги получают Метку и Рану 1.", type: "Ultimate", rarity: "SSR", effectId: "all_enemies_mark_1_wound_1", spiritualEnergy: 4, targetMode: "AllEnemies", tags: ["ultimate", "mark", "wound"] }
];
