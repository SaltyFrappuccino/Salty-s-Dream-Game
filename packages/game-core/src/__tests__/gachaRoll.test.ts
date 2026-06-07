import { describe, expect, it } from "vitest";
import type { Rarity } from "@sdg/shared";

function resolveGuaranteedRarity(totalPulls: number): Rarity {
  if (totalPulls % 90 === 0) {
    return "UR";
  }

  if (totalPulls % 50 === 0) {
    return "SSR";
  }

  if (totalPulls % 10 === 0) {
    return "SR";
  }

  return "R";
}

describe("gacha pity", () => {
  it("РіР°СЂР°РЅС‚РёСЂСѓРµС‚ РЅСѓР¶РЅСѓСЋ СЂРµРґРєРѕСЃС‚СЊ РїРѕ pity", () => {
    expect(resolveGuaranteedRarity(10)).toBe("SR");
    expect(resolveGuaranteedRarity(50)).toBe("SSR");
    expect(resolveGuaranteedRarity(90)).toBe("UR");
  });
});


