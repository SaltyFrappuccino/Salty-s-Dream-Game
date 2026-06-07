import type { PlayerCharacter, PlayerDeck, PlayerProfile, PlayerWallet, PlayerWeapon } from "@sdg/shared";
import { hydrateDemoState, persistDemoState } from "./demoPersistence";

export const profiles = new Map<string, PlayerProfile>();
export const wallets = new Map<string, PlayerWallet>();
export const collections = new Map<string, PlayerCharacter[]>();
export const weapons = new Map<string, PlayerWeapon[]>();
export const decks = new Map<string, PlayerDeck[]>();
export const matchHistory = new Map<string, Record<string, unknown>[]>();

hydrateDemoState({
  profiles,
  wallets,
  collections,
  weapons,
  decks,
  matchHistory
});

export const now = () => new Date().toISOString();

export function saveDemoState() {
  persistDemoState({
    profiles,
    wallets,
    collections,
    weapons,
    decks,
    matchHistory
  });
}

