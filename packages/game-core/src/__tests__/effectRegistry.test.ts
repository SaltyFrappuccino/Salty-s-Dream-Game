import { describe, expect, it } from "vitest";
import { applyEffect } from "../effects/effectRegistry";
import { createEffectState } from "./fixtures/effectState";

describe("effectRegistry", () => {
  it("усиление увеличивает следующий урон и снимается", () => {
    const state = createEffectState();
    state.players[0]!.team[0]!.statuses = [{ type: "Buff", value: 2 }];

    const result = applyEffect(state, "damage_2", "p1", "target", "source");

    expect(result.players[1]?.team[0]?.hp).toBe(6);
    expect(result.players[0]?.team[0]?.statuses.some((status) => status.type === "Buff")).toBe(false);
  });

  it("ослабление уменьшает следующий урон и снимается", () => {
    const state = createEffectState();
    state.players[0]!.team[0]!.statuses = [{ type: "Debuff", value: 1 }];

    const result = applyEffect(state, "damage_2", "p1", "target", "source");

    expect(result.players[1]?.team[0]?.hp).toBe(9);
    expect(result.players[0]?.team[0]?.statuses.some((status) => status.type === "Debuff")).toBe(false);
  });

  it("массовый эффект по врагам работает без выбранной цели", () => {
    const result = applyEffect(createEffectState(), "all_enemies_mark_1_wound_1", "p1");
    const statuses = result.players[1]?.team[0]?.statuses.map((status) => status.type);

    expect(statuses).toContain("Mark");
    expect(statuses).toContain("Wound");
  });
});
