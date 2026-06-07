import { createStarterDeckCards } from "@sdg/game-core";
import { decks, now } from "./demoStores";

export function ensureDemoDeck(userId: string): void {
  if (decks.has(userId)) {
    return;
  }

  decks.set(userId, [
    {
      id: `${userId}_starter_deck`,
      userId,
      name: "РЎС‚Р°СЂС‚РѕРІР°СЏ РєРѕР»РѕРґР°",
      characterIds: ["hinao", "shiba", "uruha"],
      isActive: true,
      cards: createStarterDeckCards(),
      createdAt: now(),
      updatedAt: now()
    }
  ]);
}

