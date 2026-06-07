import type { MatchState } from "@sdg/shared";

export const deadCardState: MatchState = {
  id: "m1",
  players: [
    {
      userId: "p1",
      deckId: "d1",
      team: [
        {
          instanceId: "char_dead",
          characterVersionId: "hinao",
          displayName: "РҐРёРЅР°Рѕ",
          role: "Support",
          rarity: "R",
          maxHp: 10,
          hp: 0,
          maxSpiritualEnergy: 5,
          spiritualEnergy: 5,
          maxStamina: 5,
          stamina: 5,
          defeated: true,
          statuses: [],
          focusUsedThisTurn: false,
          restUsedThisTurn: false
        }
      ],
      deck: [{ instanceId: "drawn", cardId: "draw" }],
      hand: [{ instanceId: "dead_card", cardId: "hinao_gentle_light", ownerCharacterVersionId: "hinao" }],
      discard: [],
      bonusCards: [],
      actionsTaken: 0
    },
    {
      userId: "p2",
      deckId: "d2",
      team: [],
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

