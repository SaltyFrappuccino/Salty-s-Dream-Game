import type { CharacterRole, Rarity } from "./common";
import type { CharacterStats } from "./catalog";
import type { StatusEffect } from "./status";

export type MatchCharacterState = {
  instanceId: string;
  characterVersionId: string;
  displayName: string;
  role: CharacterRole;
  rarity: Rarity;
  stats: CharacterStats;
  maxHp: number;
  hp: number;
  maxSpiritualEnergy: number;
  spiritualEnergy: number;
  maxStamina: number;
  stamina: number;
  defeated: boolean;
  statuses: StatusEffect[];
  focusUsedThisTurn: boolean;
  restUsedThisTurn: boolean;
};

export type MatchCardInstance = {
  instanceId: string;
  cardId: string;
  ownerCharacterVersionId?: string;
};

export type MatchPlayerState = {
  userId: string;
  deckId: string;
  team: MatchCharacterState[];
  deck: MatchCardInstance[];
  hand: MatchCardInstance[];
  discard: MatchCardInstance[];
  bonusCards: MatchCardInstance[];
  actionsTaken: number;
};

export type MatchTurn = {
  number: number;
  activePlayerId: string;
  activeCharacterInstanceId?: string;
  initiativeQueue: string[];
  initiativeIndex: number;
  phase:
    | "StartTurn"
    | "RestoreResources"
    | "Draw"
    | "Main"
    | "ReactionWindows"
    | "EndTurn"
    | "Finished";
};

export type MatchEvent = {
  id: string;
  type: string;
  timestamp: string;
  text: string;
  payload?: Record<string, unknown>;
};

export type MatchState = {
  id: string;
  roomId?: string;
  players: MatchPlayerState[];
  turn: MatchTurn;
  winnerUserId?: string;
  finishedAt?: string;
  normalizedPvP: boolean;
  eventLog: MatchEvent[];
};
