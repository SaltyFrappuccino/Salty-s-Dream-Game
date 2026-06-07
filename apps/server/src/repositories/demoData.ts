import { STARTER_WALLET, type ExportedLocalProfile } from "@sdg/shared";
import { ensureDemoCollection } from "./demo/ensureDemoCollection";
import { ensureDemoDeck } from "./demo/ensureDemoDeck";
import { collections, decks, matchHistory, now, profiles, saveDemoState, wallets, weapons } from "./demo/demoStores";

export { collections, decks, matchHistory, profiles, wallets, weapons };

export function ensureDemoPlayer(userId: string, displayName: string, username = userId): void {
  const current = profiles.get(userId);
  profiles.set(userId, {
    id: userId,
    username: username || current?.username || userId,
    displayName: displayName || current?.displayName || "Р”РµРјРѕ-РёРіСЂРѕРє",
    createdAt: current?.createdAt ?? now(),
    updatedAt: now()
  });

  if (!wallets.has(userId)) {
    wallets.set(userId, {
      userId,
      yen: STARTER_WALLET.yen,
      summonTickets: STARTER_WALLET.summonTickets,
      updatedAt: now()
    });
  }

  ensureDemoCollection(userId);

  if (!weapons.has(userId)) {
    weapons.set(userId, [
      {
        id: `${userId}_weapon_training_katana`,
        userId,
        weaponDefinitionId: "training_katana",
        shards: 0,
        obtainedAt: now()
      },
      {
        id: `${userId}_weapon_sealed_tanto`,
        userId,
        weaponDefinitionId: "sealed_tanto",
        shards: 0,
        obtainedAt: now()
      }
    ]);
  }

  ensureDemoDeck(userId);

  if (!matchHistory.has(userId)) {
    matchHistory.set(userId, []);
  }

  saveDemoState();
}

export function getPlayerSnapshot(userId: string, displayName: string, username?: string) {
  ensureDemoPlayer(userId, displayName, username);

  return {
    profile: profiles.get(userId)!,
    wallet: wallets.get(userId)!,
    collection: collections.get(userId) ?? [],
    weapons: weapons.get(userId) ?? [],
    decks: decks.get(userId) ?? [],
    matchHistory: matchHistory.get(userId) ?? []
  };
}

export function replaceLocalPlayerSnapshot(userId: string, displayName: string, username: string, data: ExportedLocalProfile) {
  profiles.set(userId, {
    id: userId,
    username,
    displayName,
    createdAt: profiles.get(userId)?.createdAt ?? now(),
    updatedAt: now()
  });

  wallets.set(userId, {
    userId,
    yen: data.wallet.yen,
    summonTickets: data.wallet.summonTickets,
    updatedAt: now()
  });

  collections.set(
    userId,
    data.collection.map((character) => ({
      id: `${userId}_${character.characterVersionId}`,
      userId,
      characterVersionId: character.characterVersionId,
      stars: character.stars,
      shards: character.shards,
      obtainedAt: now(),
      equippedWeaponId: character.equippedWeaponId
    }))
  );

  weapons.set(
    userId,
    data.weapons.map((weapon) => ({
      id: `${userId}_weapon_${weapon.weaponDefinitionId}`,
      userId,
      weaponDefinitionId: weapon.weaponDefinitionId,
      shards: weapon.shards,
      obtainedAt: now()
    }))
  );

  decks.set(
    userId,
    data.decks.map((deck) => ({
      id: deck.id,
      userId,
      name: deck.name,
      characterIds: deck.characterIds,
      isActive: false,
      cards: deck.cards,
      createdAt: now(),
      updatedAt: now()
    }))
  );

  if (!matchHistory.has(userId)) {
    matchHistory.set(userId, []);
  }

  saveDemoState();
}

