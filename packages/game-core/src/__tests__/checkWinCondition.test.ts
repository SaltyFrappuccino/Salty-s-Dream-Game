import { describe, expect, it } from "vitest";
import type { MatchState } from "@sdg/shared";
import { checkWinCondition } from "../engine/checkWinCondition";

const baseState: MatchState = {
  id: "m1",
  players: [
    {
      userId: "p1",
      deckId: "d1",
      team: [{
        instanceId: "a",
        characterVersionId: "hinao",
        displayName: "РҐРёРЅР°Рѕ",
        role: "Support",
        rarity: "R",
        maxHp: 1,
        hp: 1,
        maxSpiritualEnergy: 1,
        spiritualEnergy: 1,
        maxStamina: 1,
        stamina: 1,
        defeated: false,
        statuses: [],
        focusUsedThisTurn: false,
        restUsedThisTurn: false
      }],
      deck: [],
      hand: [],
      discard: [],
      bonusCards: [],
      actionsTaken: 0
    },
    {
      userId: "p2",
      deckId: "d2",
      team: [{
        instanceId: "b",
        characterVersionId: "shiba",
        displayName: "РЁРёР±Р°",
        role: "Support",
        rarity: "SR",
        maxHp: 1,
        hp: 0,
        maxSpiritualEnergy: 1,
        spiritualEnergy: 1,
        maxStamina: 1,
        stamina: 1,
        defeated: true,
        statuses: [],
        focusUsedThisTurn: false,
        restUsedThisTurn: false
      }],
      deck: [],
      hand: [],
      discard: [],
      bonusCards: [],
      actionsTaken: 0
    }
  ],
  turn: {
    number: 1,
    activePlayerId: "p1",
    phase: "Main"
  },
  normalizedPvP: true,
  eventLog: []
};

describe("checkWinCondition", () => {
  it("РїРѕР±РµРґР° РЅР°СЃС‚СѓРїР°РµС‚ РїРѕСЃР»Рµ СЃРјРµСЂС‚Рё РІСЃРµС… РїРµСЂСЃРѕРЅР°Р¶РµР№ РїСЂРѕС‚РёРІРЅРёРєР°", () => {
    expect(checkWinCondition(baseState)).toBe("p1");
  });
});


