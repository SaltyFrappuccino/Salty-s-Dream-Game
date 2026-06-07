import { z } from "zod";

export const createDeckSchema = z.object({
  name: z.string().min(1).max(64),
  characterIds: z.tuple([z.string(), z.string(), z.string()]),
  cards: z.array(
    z.object({
      cardId: z.string(),
      quantity: z.number().int().min(1).max(2)
    })
  )
});

export const updateRoomSettingsSchema = z.object({
  normalizedPvP: z.boolean(),
  turnTimerSeconds: z.union([z.literal(60), z.literal(90), z.literal(120)])
});

export const gachaRollSchema = z.object({
  bannerId: z.string(),
  count: z.union([z.literal(1), z.literal(10)]),
  currency: z.union([z.literal("YEN"), z.literal("SUMMON_TICKET")])
});

export const bootstrapPlayerSchema = z.object({
  username: z.string().min(2).max(32).optional(),
  displayName: z.string().min(2).max(64).optional()
});

export const upgradeCharacterSchema = z.object({
  characterVersionId: z.string()
});

export const equipWeaponSchema = z.object({
  weaponDefinitionId: z.string().optional()
});

export const createSeasonLobbySchema = z.object({
  name: z.string().min(2).max(64),
  durationDays: z.number().int().min(1).max(30).default(7)
});

export const joinSeasonLobbySchema = z.object({
  joinCode: z.string().min(4).max(16)
});

export const importLocalProfileSchema = z.object({
  code: z.string().min(16)
});
