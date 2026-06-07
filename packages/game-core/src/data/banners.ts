import type { BannerDefinition } from "@sdg/shared";

const rates = {
  R: 0.55,
  SR: 0.3,
  SSR: 0.12,
  UR: 0.03
};

export const banners: BannerDefinition[] = [
  {
    id: "enchanted_blades",
    name: "Зачарованные клинки",
    description: "Базовый баннер персонажей для сезонных лобби SDG.",
    themePackId: "core",
    type: "character",
    rates,
    pitySr: 10,
    pitySsr: 50,
    pityUr: 90,
    featuredCharacterIds: ["chihiro_enten", "sojo_kuregumo", "uruha_kumeyuri", "samura_tobimune"]
  },
  {
    id: "weapon_forge",
    name: "Кузница клинков",
    description: "Базовый баннер оружия для сезонных лобби SDG.",
    themePackId: "core",
    type: "weapon",
    rates,
    pitySr: 10,
    pitySsr: 50,
    pityUr: 90,
    featuredWeaponIds: ["cloud_cutter", "flame_bone_fang", "enchanted_black_blade"]
  }
];
