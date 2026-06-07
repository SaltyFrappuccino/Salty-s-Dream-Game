export const STARTER_CHARACTER_IDS = [
  "hinao",
  "shiba",
  "uruha",
  "char"
] as const;

export const STARTER_WALLET = {
  yen: 12_000,
  summonTickets: 3
} as const;

export const MATCH_REWARDS = {
  win: 1200,
  loss: 500,
  draw: 200
} as const;

export const DEFAULT_SEASON_DURATION_DAYS = 7 as const;
