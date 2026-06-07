import { describe, expect, it } from "vitest";
import type { MatchState } from "@sdg/shared";
import { matchReducer } from "../reducers/matchReducer";
import { deadCardState } from "./fixtures/deadCardState";

describe("applyAction: С…РѕРґ Рё СЃР±СЂРѕСЃ", () => {
  it("РјРѕР¶РЅРѕ СЃР±СЂРѕСЃРёС‚СЊ РєР°СЂС‚Сѓ РїРѕРіРёР±С€РµРіРѕ РїРµСЂСЃРѕРЅР°Р¶Р° СЂР°РґРё РґРѕР±РѕСЂР°", () => {
    const result = matchReducer(deadCardState, {
      type: "DISCARD_DEAD_CARD",
      playerId: "p1",
      cardInstanceId: "dead_card"
    });

    expect(result.players[0]?.hand.some((card) => card.instanceId === "drawn")).toBe(true);
    expect(result.players[0]?.discard.some((card) => card.instanceId === "dead_card")).toBe(true);
  });

  it("СЂР°РЅР° РЅР°РЅРѕСЃРёС‚ СѓСЂРѕРЅ РІ РЅР°С‡Р°Р»Рµ С…РѕРґР°", () => {
    const state: MatchState = {
      ...deadCardState,
      players: [
        {
          ...deadCardState.players[0]!,
          team: [{ ...deadCardState.players[0]!.team[0]!, hp: 10, defeated: false, statuses: [{ type: "Wound", value: 2 }], stamina: 1 }]
        },
        {
          ...deadCardState.players[1]!,
          team: [{ ...deadCardState.players[0]!.team[0]!, instanceId: "enemy", characterVersionId: "shiba", displayName: "РЁРёР±Р°", hp: 10, defeated: false, statuses: [] }]
        }
      ],
      turn: {
        number: 1,
        activePlayerId: "p2",
        phase: "Main"
      }
    };

    const result = matchReducer(state, {
      type: "END_TURN",
      playerId: "p2"
    });

    expect(result.players[0]?.team[0]?.hp).toBe(8);
  });
});

