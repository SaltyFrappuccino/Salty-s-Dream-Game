import type { CharacterRole, CharacterStats, CharacterUnit, Rarity } from "@sdg/shared";

type CharacterSeed = {
  id: string;
  maxSpiritualEnergy: number;
  maxStamina: number;
  name: string;
  rarity: Rarity;
  role: CharacterRole;
  stats: CharacterStats;
};

const seeds: CharacterSeed[] = [
  { id: "chihiro_enten", name: "Чихиро", role: "DPS", rarity: "SSR", maxSpiritualEnergy: 6, maxStamina: 5, stats: { hp: 120, attack: 34, defense: 14, speed: 18, critChance: 0.18, critDamage: 1.6 } },
  { id: "sojo_kuregumo", name: "Соджо", role: "DPS", rarity: "SSR", maxSpiritualEnergy: 6, maxStamina: 5, stats: { hp: 112, attack: 36, defense: 12, speed: 17, critChance: 0.2, critDamage: 1.55 } },
  { id: "hakuri_storehouse", name: "Хакури", role: "Specialist", rarity: "SSR", maxSpiritualEnergy: 7, maxStamina: 4, stats: { hp: 104, attack: 26, defense: 13, speed: 16, critChance: 0.12, critDamage: 1.45 } },
  { id: "shiba", name: "Шиба", role: "Support", rarity: "SR", maxSpiritualEnergy: 6, maxStamina: 5, stats: { hp: 108, attack: 24, defense: 15, speed: 20, critChance: 0.1, critDamage: 1.4 } },
  { id: "hinao", name: "Хинао", role: "Support", rarity: "R", maxSpiritualEnergy: 5, maxStamina: 5, stats: { hp: 96, attack: 18, defense: 12, speed: 15, critChance: 0.08, critDamage: 1.35 } },
  { id: "char", name: "Чар", role: "Support", rarity: "SR", maxSpiritualEnergy: 6, maxStamina: 5, stats: { hp: 102, attack: 20, defense: 14, speed: 14, critChance: 0.08, critDamage: 1.35 } },
  { id: "hiyuki_flame_bone", name: "Хиюки", role: "Tank", rarity: "SSR", maxSpiritualEnergy: 4, maxStamina: 6, stats: { hp: 140, attack: 28, defense: 24, speed: 12, critChance: 0.1, critDamage: 1.45 } },
  { id: "tafuku", name: "Тафуку", role: "Tank", rarity: "SR", maxSpiritualEnergy: 4, maxStamina: 6, stats: { hp: 132, attack: 22, defense: 23, speed: 10, critChance: 0.06, critDamage: 1.35 } },
  { id: "uruha", name: "Уруха", role: "DPS", rarity: "SR", maxSpiritualEnergy: 5, maxStamina: 6, stats: { hp: 110, attack: 30, defense: 13, speed: 19, critChance: 0.16, critDamage: 1.5 } },
  { id: "uruha_kumeyuri", name: "Уруха Кумеюри", role: "DPS", rarity: "UR", maxSpiritualEnergy: 7, maxStamina: 5, stats: { hp: 122, attack: 40, defense: 15, speed: 21, critChance: 0.24, critDamage: 1.7 } },
  { id: "samura_tobimune", name: "Самура Тобимунэ", role: "Specialist", rarity: "UR", maxSpiritualEnergy: 7, maxStamina: 5, stats: { hp: 116, attack: 35, defense: 16, speed: 22, critChance: 0.22, critDamage: 1.65 } },
  { id: "hiruhiko", name: "Хирухико", role: "Specialist", rarity: "SSR", maxSpiritualEnergy: 7, maxStamina: 4, stats: { hp: 106, attack: 29, defense: 12, speed: 18, critChance: 0.18, critDamage: 1.55 } }
];

export const characterUnits: CharacterUnit[] = seeds.map((seed) => ({
  id: seed.id,
  name: seed.name,
  displayName: seed.name,
  themePackId: "core",
  role: seed.role,
  rarity: seed.rarity,
  baseStats: seed.stats,
  startingSpiritualEnergy: Math.min(2, seed.maxSpiritualEnergy),
  maxSpiritualEnergy: seed.maxSpiritualEnergy,
  startingStamina: Math.min(2, seed.maxStamina),
  maxStamina: seed.maxStamina,
  passiveId: `${seed.id}_passive`,
  cardPool: [],
  assetKey: seed.id
}));

export const characterVersions = characterUnits;
