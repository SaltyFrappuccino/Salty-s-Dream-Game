import { STARTER_CHARACTER_IDS } from "@sdg/shared";
import { collections, now } from "./demoStores";

export function ensureDemoCollection(userId: string): void {
  if (collections.has(userId)) {
    return;
  }

  collections.set(
    userId,
    STARTER_CHARACTER_IDS.map((characterId, index) => ({
      id: `${userId}_char_${index}`,
      userId,
      characterVersionId: characterId,
      stars: 0,
      shards: 0,
      obtainedAt: now()
    }))
  );
}

