import type { MatchState } from "@sdg/shared";

export function createEffectState(): MatchState {
  return {
    id: "effects",
    players: [
      {
        userId: "p1",
        deckId: "d1",
        team: [
          {
            instanceId: "source",
            characterVersionId: "uruha",
            displayName: "РЈСЂСѓС…Р°",
            role: "DPS",
            rarity: "SR",
            maxHp: 10,
            hp: 10,
            maxSpiritualEnergy: 5,
            spiritualEnergy: 5,
            maxStamina: 5,
            stamina: 5,
            defeated: false,
            statuses: [],
            focusUsedThisTurn: false,
            restUsedThisTurn: false
          }
        ],
        deck: [],
        hand: [],
        discard: [],
        bonusCards: [],
        actionsTaken: 0
      },
      {
        userId: "p2",
        deckId: "d2",
        team: [
          {
            instanceId: "target",
            characterVersionId: "shiba",
            displayName: "РЁРёР±Р°",
            role: "Support",
            rarity: "SR",
            maxHp: 10,
            hp: 10,
            maxSpiritualEnergy: 5,
            spiritualEnergy: 5,
            maxStamina: 5,
            stamina: 5,
            defeated: false,
            statuses: [],
            focusUsedThisTurn: false,
            restUsedThisTurn: false
          }
        ],
        deck: [],
        hand: [],
        discard: [],
        bonusCards: [],
        actionsTaken: 0
      }
    ],
    turn: { number: 1, activePlayerId: "p1", phase: "Main" },
    normalizedPvP: true,
    eventLog: []
  };
}

