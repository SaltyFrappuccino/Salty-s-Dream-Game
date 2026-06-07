import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { SeasonLobby } from "@sdg/shared";

const seasonLobbyFilePath = resolve(process.cwd(), "data", "season-lobbies.json");

type SeasonLobbyRecord = {
  lobbies: SeasonLobby[];
};

function ensureDirectory() {
  mkdirSync(dirname(seasonLobbyFilePath), { recursive: true });
}

function readStore(): SeasonLobbyRecord {
  ensureDirectory();

  if (!existsSync(seasonLobbyFilePath)) {
    return { lobbies: [] };
  }

  try {
    const raw = readFileSync(seasonLobbyFilePath, "utf8");
    const parsed = JSON.parse(raw) as SeasonLobbyRecord;
    return {
      lobbies: Array.isArray(parsed.lobbies) ? parsed.lobbies : []
    };
  } catch {
    return { lobbies: [] };
  }
}

function writeStore(store: SeasonLobbyRecord) {
  ensureDirectory();
  writeFileSync(seasonLobbyFilePath, JSON.stringify(store, null, 2), "utf8");
}

export const seasonLobbyStore = {
  list() {
    return readStore().lobbies;
  },
  save(lobbies: SeasonLobby[]) {
    writeStore({ lobbies });
  }
};

