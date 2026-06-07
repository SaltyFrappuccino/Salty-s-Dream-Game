import type { WeaponDefinition } from "@sdg/shared";

export const weaponDefinitions: WeaponDefinition[] = [
  {
    id: "training_katana",
    name: "Тренировочная катана",
    description: "Простой клинок для стабильного урона.",
    themePackId: "core",
    rarity: "R",
    statBonuses: { attack: 4 },
    assetKey: "training_katana"
  },
  {
    id: "sealed_tanto",
    name: "Запечатанный танто",
    description: "Лёгкое оружие с бонусом скорости.",
    themePackId: "core",
    rarity: "R",
    statBonuses: { attack: 2, speed: 2 },
    assetKey: "sealed_tanto"
  },
  {
    id: "iron_guard_blade",
    name: "Клинок железной гарды",
    description: "Баланс атаки и защиты.",
    themePackId: "core",
    rarity: "SR",
    statBonuses: { attack: 5, defense: 3 },
    assetKey: "iron_guard_blade"
  },
  {
    id: "bloodline_edge",
    name: "Родовой клинок",
    description: "Повышает шанс критического удара.",
    themePackId: "core",
    rarity: "SR",
    statBonuses: { attack: 6, critChance: 0.04 },
    assetKey: "bloodline_edge"
  },
  {
    id: "cloud_cutter",
    name: "Рассекатель облаков",
    description: "Оружие для быстрых техник.",
    themePackId: "core",
    rarity: "SSR",
    statBonuses: { attack: 8, speed: 3, critDamage: 0.12 },
    assetKey: "cloud_cutter"
  },
  {
    id: "flame_bone_fang",
    name: "Клык Пламенной Кости",
    description: "Тяжёлое оружие для танков.",
    themePackId: "core",
    rarity: "SSR",
    statBonuses: { hp: 10, attack: 6, defense: 5 },
    assetKey: "flame_bone_fang"
  },
  {
    id: "enchanted_black_blade",
    name: "Чёрный зачарованный клинок",
    description: "UR-оружие с высоким уроном и критом.",
    themePackId: "core",
    rarity: "UR",
    statBonuses: { attack: 12, speed: 4, critChance: 0.06, critDamage: 0.18 },
    assetKey: "enchanted_black_blade"
  }
];
