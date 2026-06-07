import { matchHistory } from "./demoData";
import { saveDemoState } from "./demo/demoStores";

export const matchRepository = {
  getHistory(userId: string) {
    return matchHistory.get(userId) ?? [];
  },
  add(userId: string, match: Record<string, unknown>) {
    const current = matchHistory.get(userId) ?? [];
    matchHistory.set(userId, [match, ...current]);
    saveDemoState();
  }
};
