import { describe, expect, it } from "vitest";
import { validateDeck } from "../validators/validateDeck";

describe("validateDeck", () => {
  it("принимает валидную стартовую колоду", () => {
    const result = validateDeck({
      characterIds: ["hinao", "shiba", "uruha"],
      cards: [
        { cardId: "hinao_gentle_light", quantity: 2 },
        { cardId: "hinao_ward", quantity: 2 },
        { cardId: "hinao_seal_break", quantity: 2 },
        { cardId: "hinao_focus_prayer", quantity: 1 },
        { cardId: "shiba_gentle_light", quantity: 2 },
        { cardId: "shiba_ward", quantity: 2 },
        { cardId: "shiba_seal_break", quantity: 2 },
        { cardId: "shiba_focus_prayer", quantity: 1 },
        { cardId: "uruha_quick_slash", quantity: 2 },
        { cardId: "uruha_spirit_cut", quantity: 2 },
        { cardId: "uruha_marked_strike", quantity: 2 },
        { cardId: "uruha_adrenaline", quantity: 2 },
        { cardId: "quick_bandage", quantity: 1 },
        { cardId: "combat_barrier", quantity: 1 },
        { cardId: "evasion", quantity: 1 },
        { cardId: "concentration", quantity: 1 },
        { cardId: "tactical_breath", quantity: 1 },
        { cardId: "precise_strike", quantity: 1 },
        { cardId: "remove_seal", quantity: 1 },
        { cardId: "remove_wound", quantity: 1 }
      ]
    });

    expect(result.isValid).toBe(true);
  });
});
