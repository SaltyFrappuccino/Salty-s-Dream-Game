export type ProgressMode = "LOCAL" | "SEASON";

export type ProgressContext = {
  mode: ProgressMode;
  seasonLobbyId?: string;
};

export type ExportedLocalProfile = {
  version: 1;
  profile: {
    id: string;
    username: string;
    displayName: string;
  };
  wallet: {
    yen: number;
    summonTickets: number;
  };
  collection: {
    characterVersionId: string;
    stars: number;
    shards: number;
    equippedWeaponId?: string;
  }[];
  weapons: {
    weaponDefinitionId: string;
    shards: number;
  }[];
  decks: {
    id: string;
    name: string;
    characterIds: [string, string, string];
    cards: {
      cardId: string;
      quantity: number;
    }[];
  }[];
};
