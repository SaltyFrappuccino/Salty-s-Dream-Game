import { describe, expect, it } from "vitest";
import type { MatchState } from "@sdg/shared";
import { matchReducer } from "../reducers/matchReducer";
import { deadCardState } from "./fixtures/deadCardState";

describe("applyAction: валидация", () => {
  it("нельзя играть карту без ресурсов", () => {
    const state: MatchState = {
      ...deadCardState,
      players: [
        {
          ...deadCardState.players[0]!,
          team: [{ ...deadCardState.players[0]!.team[0]!, hp: 10, defeated: false, spiritualEnergy: 0, stamina: 0 }],
          hand: [{ instanceId: "cost_card", cardId: "hinao_gentle_light", ownerCharacterVersionId: "hinao" }]
        },
        deadCardState.players[1]!
      ]
    };

    const result = matchReducer(state, {
      type: "PLAY_CARD",
      playerId: "p1",
      cardInstanceId: "cost_card",
      targetCharacterId: "char_dead"
    });

    expect(result.eventLog.at(-1)?.text).toContain("Недостаточно ресурсов");
  });

  it("нельзя играть карту погибшего персонажа", () => {
    const result = matchReducer(deadCardState, {
      type: "PLAY_CARD",
      playerId: "p1",
      cardInstanceId: "dead_card",
      targetCharacterId: "char_dead"
    });

    expect(result.eventLog.at(-1)?.text).toContain("Нельзя играть карту погибшего персонажа");
  });
});
