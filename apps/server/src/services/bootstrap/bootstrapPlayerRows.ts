import { STARTER_CHARACTER_IDS, STARTER_WALLET } from "@sdg/shared";

export function getStarterWalletRow(userId: string) {
  return {
    user_id: userId,
    yen: STARTER_WALLET.yen,
    summon_tickets: STARTER_WALLET.summonTickets,
    updated_at: new Date().toISOString()
  };
}

export function getStarterCharacterRows(userId: string) {
  return STARTER_CHARACTER_IDS.map((characterId) => ({
    user_id: userId,
    character_version_id: characterId,
    stars: 0
  }));
}

export function getStarterShardRows(userId: string) {
  return STARTER_CHARACTER_IDS.map((characterId) => ({
    user_id: userId,
    character_version_id: characterId,
    shards: 0
  }));
}

