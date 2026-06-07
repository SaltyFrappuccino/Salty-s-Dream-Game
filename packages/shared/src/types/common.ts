export type CharacterRole = "DPS" | "Support" | "Tank" | "Specialist";
export type Rarity = "R" | "SR" | "SSR" | "UR";
export type CurrencyCode = "YEN" | "SUMMON_TICKET";

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};
