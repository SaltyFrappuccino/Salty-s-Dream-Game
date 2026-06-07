import type { PlayerWeapon } from "@sdg/shared";
import { ensureDemoPlayer, weapons } from "./demoData";
import { saveDemoState } from "./demo/demoStores";

export const weaponRepository = {
  getByUserId(userId: string, displayName: string): PlayerWeapon[] {
    ensureDemoPlayer(userId, displayName);
    return weapons.get(userId) ?? [];
  },
  save(userId: string, items: PlayerWeapon[]): void {
    weapons.set(userId, items);
    saveDemoState();
  }
};

