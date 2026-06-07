export type PlayerProfile = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type PlayerWallet = {
  userId: string;
  yen: number;
  summonTickets: number;
  updatedAt: string;
};

export type PlayerCharacter = {
  id: string;
  userId: string;
  characterVersionId: string;
  stars: number;
  shards: number;
  obtainedAt: string;
  equippedWeaponId?: string;
};

export type PlayerWeapon = {
  id: string;
  userId: string;
  weaponDefinitionId: string;
  shards: number;
  obtainedAt: string;
};

export type CharacterUpgradeResult = {
  character: PlayerCharacter;
  shardsSpent: number;
  nextRequirement?: number;
};

export type PlayerDeckCard = {
  cardId: string;
  quantity: number;
};

export type PlayerDeck = {
  id: string;
  userId: string;
  name: string;
  characterIds: [string, string, string];
  isActive: boolean;
  cards: PlayerDeckCard[];
  createdAt: string;
  updatedAt: string;
};

export type PlayerSnapshot = {
  profile: PlayerProfile;
  wallet: PlayerWallet;
  collection: PlayerCharacter[];
  weapons: PlayerWeapon[];
  decks: PlayerDeck[];
  matchHistory: Record<string, unknown>[];
  progressContext?: {
    mode: "LOCAL" | "SEASON";
    seasonLobbyId?: string;
  };
};
