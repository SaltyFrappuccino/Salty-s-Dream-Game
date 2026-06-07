import { describe, expect, it } from "vitest";
import { createMatch } from "../engine/createMatch";
import { resolveStatDamage } from "../rules/stats";
import type { PlayerDeck } from "@sdg/shared";
import { startNextTurn } from "../engine/actions/startNextTurn";

function makeDeck(userId: string, characterIds: [string, string, string]): PlayerDeck {
  return {
    id: `${userId}_deck`,
    userId,
    name: "РўРµСЃС‚РѕРІР°СЏ РєРѕР»РѕРґР°",
    characterIds,
    isActive: true,
    cards: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

describe("СЃС‚Р°С‚С‹ Рё РёРЅРёС†РёР°С‚РёРІР°", () => {
  it("СѓСЂРѕРЅ СѓС‡РёС‚С‹РІР°РµС‚ Р°С‚Р°РєСѓ Рё Р·Р°С‰РёС‚Сѓ", () => {
    const damage = resolveStatDamage(
      2,
      { hp: 100, attack: 40, defense: 0, speed: 1, critChance: 0, critDamage: 1.5 },
      { hp: 100, attack: 0, defense: 20, speed: 1, critChance: 0, critDamage: 1.5 }
    );

    expect(damage).toBe(8);
  });

  it("РєСЂРёС‚ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚ РїСЂРё critChance = 1", () => {
    const damage = resolveStatDamage(
      2,
      { hp: 100, attack: 40, defense: 0, speed: 1, critChance: 1, critDamage: 2 },
      { hp: 100, attack: 0, defense: 20, speed: 1, critChance: 0, critDamage: 1.5 }
    );

    expect(damage).toBe(16);
  });

  it("РѕСЂСѓР¶РёРµ РјРµРЅСЏРµС‚ РёС‚РѕРіРѕРІС‹Рµ СЃС‚Р°С‚С‹ РїРµСЂСЃРѕРЅР°Р¶Р° РІ РјР°С‚С‡Рµ", () => {
    const match = createMatch(
      "match_stats",
      "room_stats",
      [
        makeDeck("p1", ["hinao", "shiba", "uruha"]),
        makeDeck("p2", ["tafuku", "char", "hakuri_storehouse"])
      ],
      true,
      [{ hinao: "training_katana" }, {}]
    );

    expect(match.players[0].team[0].stats.attack).toBe(22);
  });

  it("РѕС‡РµСЂРµРґСЊ С…РѕРґРѕРІ СЃРѕСЂС‚РёСЂСѓРµС‚СЃСЏ РїРѕ СЃРєРѕСЂРѕСЃС‚Рё Рё END_TURN РїРµСЂРµРІРѕРґРёС‚ С…РѕРґ", () => {
    const match = createMatch(
      "match_speed",
      "room_speed",
      [
        makeDeck("p1", ["tafuku", "hinao", "char"]),
        makeDeck("p2", ["samura_tobimune", "shiba", "uruha"])
      ],
      true
    );

    expect(match.turn.activeCharacterInstanceId?.startsWith("char_10")).toBe(true);
    const next = startNextTurn(match);
    expect(next.turn.activeCharacterInstanceId?.startsWith("char_11")).toBe(true);
  });
});

