export type MatchAction =
  | {
      type: "PLAY_CARD";
      playerId: string;
      cardInstanceId: string;
      sourceCharacterId?: string;
      targetCharacterId?: string;
      resourceChoice?: "spiritualEnergy" | "stamina";
    }
  | {
      type: "BASIC_ATTACK";
      playerId: string;
      sourceCharacterId: string;
      targetCharacterId: string;
    }
  | {
      type: "DEFEND";
      playerId: string;
      sourceCharacterId: string;
    }
  | {
      type: "FOCUS";
      playerId: string;
      sourceCharacterId: string;
    }
  | {
      type: "REST";
      playerId: string;
      sourceCharacterId: string;
    }
  | {
      type: "DISCARD_DEAD_CARD";
      playerId: string;
      cardInstanceId: string;
    }
  | {
      type: "END_TURN";
      playerId: string;
    }
  | {
      type: "CONCEDE";
      playerId: string;
    };
