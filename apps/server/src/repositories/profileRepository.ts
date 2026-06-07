import { ensureDemoPlayer, profiles } from "./demoData";

export const profileRepository = {
  getByUserId(userId: string, displayName: string) {
    ensureDemoPlayer(userId, displayName);
    return profiles.get(userId) ?? null;
  }
};

