import { describe, expect, it } from "vitest";
import type { MatchCharacterState } from "@sdg/shared";
import { resolveDamage } from "../engine/resolveDamage";

const target: MatchCharacterState = {
  instanceId: "c1",
  characterVersionId: "hinao",
  displayName: "РҐРёРЅР°Рѕ",
  role: "Support",
  rarity: "R",
  maxHp: 10,
  hp: 10,
  maxSpiritualEnergy: 5,
  spiritualEnergy: 2,
  maxStamina: 5,
  stamina: 2,
  defeated: false,
  statuses: [{ type: "Shield", value: 2 }],
  focusUsedThisTurn: false,
  restUsedThisTurn: false
};

describe("resolveDamage", () => {
  it("С‰РёС‚ Р±Р»РѕРєРёСЂСѓРµС‚ СѓСЂРѕРЅ", () => {
    const result = resolveDamage(target, 3);
    expect(result.hp).toBe(9);
    expect(result.statuses.some((status) => status.type === "Shield")).toBe(false);
  });
});

