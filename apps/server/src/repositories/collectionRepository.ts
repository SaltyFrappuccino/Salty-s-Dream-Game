import { ensureDemoPlayer, collections } from "./demoData";
import { saveDemoState } from "./demo/demoStores";

export const collectionRepository = {
  getByUserId(userId: string, displayName: string) {
    ensureDemoPlayer(userId, displayName);
    return collections.get(userId) ?? [];
  },
  save(userId: string, items: ReturnType<typeof collections.get>) {
    if (items) {
      collections.set(userId, items);
      saveDemoState();
    }
  },
  updateCharacter(userId: string, characterVersionId: string, updater: (character: NonNullable<ReturnType<typeof collections.get>>[number]) => NonNullable<ReturnType<typeof collections.get>>[number]) {
    const current = collections.get(userId) ?? [];
    const next = current.map((character) =>
      character.characterVersionId === characterVersionId ? updater(character) : character
    );
    collections.set(userId, next);
    saveDemoState();
    return next.find((character) => character.characterVersionId === characterVersionId) ?? null;
  }
};
