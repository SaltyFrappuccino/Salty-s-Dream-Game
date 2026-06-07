import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { PlayerCharacter, PlayerDeck, PlayerProfile, PlayerWallet, PlayerWeapon } from "@sdg/shared";

const demoStateFilePath = resolve(process.cwd(), "data", "demo-state.json");

type DemoStateRecord = {
  profiles: [string, PlayerProfile][];
  wallets: [string, PlayerWallet][];
  collections: [string, PlayerCharacter[]][];
  weapons: [string, PlayerWeapon[]][];
  decks: [string, PlayerDeck[]][];
  matchHistory: [string, Record<string, unknown>[]][];
};

function ensureDirectory() {
  mkdirSync(dirname(demoStateFilePath), { recursive: true });
}

function readStore(): DemoStateRecord | null {
  ensureDirectory();

  if (!existsSync(demoStateFilePath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(demoStateFilePath, "utf8")) as DemoStateRecord;
  } catch {
    return null;
  }
}

export function hydrateDemoState(target: {
  profiles: Map<string, PlayerProfile>;
  wallets: Map<string, PlayerWallet>;
  collections: Map<string, PlayerCharacter[]>;
  weapons: Map<string, PlayerWeapon[]>;
  decks: Map<string, PlayerDeck[]>;
  matchHistory: Map<string, Record<string, unknown>[]>;
}) {
  const state = readStore();

  if (!state) {
    return;
  }

  for (const [key, value] of state.profiles ?? []) {
    target.profiles.set(key, value);
  }

  for (const [key, value] of state.wallets ?? []) {
    target.wallets.set(key, value);
  }

  for (const [key, value] of state.collections ?? []) {
    target.collections.set(key, value);
  }

  for (const [key, value] of state.weapons ?? []) {
    target.weapons.set(key, value);
  }

  for (const [key, value] of state.decks ?? []) {
    target.decks.set(key, value);
  }

  for (const [key, value] of state.matchHistory ?? []) {
    target.matchHistory.set(key, value);
  }
}

export function persistDemoState(source: {
  profiles: Map<string, PlayerProfile>;
  wallets: Map<string, PlayerWallet>;
  collections: Map<string, PlayerCharacter[]>;
  weapons: Map<string, PlayerWeapon[]>;
  decks: Map<string, PlayerDeck[]>;
  matchHistory: Map<string, Record<string, unknown>[]>;
}) {
  ensureDirectory();

  const record: DemoStateRecord = {
    profiles: Array.from(source.profiles.entries()),
    wallets: Array.from(source.wallets.entries()),
    collections: Array.from(source.collections.entries()),
    weapons: Array.from(source.weapons.entries()),
    decks: Array.from(source.decks.entries()),
    matchHistory: Array.from(source.matchHistory.entries())
  };

  writeFileSync(demoStateFilePath, JSON.stringify(record, null, 2), "utf8");
}

