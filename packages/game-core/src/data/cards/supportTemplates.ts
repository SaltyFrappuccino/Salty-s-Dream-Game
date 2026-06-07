import type { CardTemplate } from "./cardTemplate";

export const supportTemplates: CardTemplate[] = [
  { suffix: "gentle_light", name: "Мягкий свет", description: "Лечит союзника на 2 HP.", type: "Support", rarity: "R", effectId: "heal_2", spiritualEnergy: 1, targetMode: "AllyCharacter", tags: ["heal"] },
  { suffix: "ward", name: "Оберег", description: "Даёт союзнику Щит 2.", type: "Defense", rarity: "R", effectId: "shield_2", spiritualEnergy: 1, targetMode: "AllyCharacter", tags: ["shield"] },
  { suffix: "seal_break", name: "Снятие печати", description: "Снимает Печать с союзника и даёт +1 ДЭ.", type: "Support", rarity: "SR", effectId: "remove_seal_gain_sp_1", spiritualEnergy: 1, targetMode: "AllyCharacter", tags: ["cleanse"] },
  { suffix: "focus_prayer", name: "Молитва фокуса", description: "Все союзники получают +1 ДЭ.", type: "Support", rarity: "SR", effectId: "all_allies_sp_1", spiritualEnergy: 2, targetMode: "AllAllies", tags: ["resource"] },
  { suffix: "reaction_guard", name: "Мгновенная защита", description: "Reaction: даёт союзнику Щит 2.", type: "Reaction", rarity: "SR", effectId: "shield_2", spiritualEnergy: 1, targetMode: "AllyCharacter", tags: ["reaction", "shield"] },
  { suffix: "ultimate_revival", name: "Песнь поддержки", description: "Все союзники лечатся на 2 HP.", type: "Ultimate", rarity: "SSR", effectId: "all_allies_heal_2", spiritualEnergy: 4, targetMode: "AllAllies", tags: ["ultimate", "heal"] }
];
