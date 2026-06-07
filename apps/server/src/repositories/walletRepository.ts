import { ensureDemoPlayer, wallets } from "./demoData";
import { saveDemoState } from "./demo/demoStores";

export const walletRepository = {
  getByUserId(userId: string, displayName: string) {
    ensureDemoPlayer(userId, displayName);
    return wallets.get(userId) ?? null;
  },
  update(userId: string, yen: number, summonTickets: number) {
    const next = {
      userId,
      yen,
      summonTickets,
      updatedAt: new Date().toISOString()
    };
    wallets.set(userId, next);
    saveDemoState();
    return next;
  }
};
