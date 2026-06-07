import { describe, expect, it } from "vitest";
import { matchReducer } from "../reducers/matchReducer";
import { createEffectState } from "./fixtures/effectState";

describe("статусы при игре карт", () => {
  it("печать блокирует Technique карты", () => {
    const state = createEffectState();
    state.players[0]!.team[0]!.statuses = [{ type: "Seal", value: 1 }];
    state.players[0]!.hand = [{ instanceId: "technique", cardId: "uruha_spirit_cut", ownerCharacterVersionId: "uruha" }];

    const result = matchReducer(state, {
      type: "PLAY_CARD",
      playerId: "p1",
      cardInstanceId: "technique",
      targetCharacterId: "target"
    });

    expect(result.eventLog.at(-1)?.text).toContain("Печатью");
  });

  it("оглушение повышает стоимость и снимается после оплаты", () => {
    const state = createEffectState();
    state.players[0]!.team[0]!.stamina = 2;
    state.players[0]!.team[0]!.statuses = [{ type: "Stun", value: 1 }];
    state.players[0]!.hand = [{ instanceId: "attack", cardId: "uruha_quick_slash", ownerCharacterVersionId: "uruha" }];

    const result = matchReducer(state, {
      type: "PLAY_CARD",
      playerId: "p1",
      cardInstanceId: "attack",
      targetCharacterId: "target"
    });

    expect(result.players[0]?.team[0]?.stamina).toBe(0);
    expect(result.players[0]?.team[0]?.statuses.some((status) => status.type === "Stun")).toBe(false);
  });
});
