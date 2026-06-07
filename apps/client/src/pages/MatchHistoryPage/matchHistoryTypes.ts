export type MatchHistoryItem = {
  matchId?: string;
  result?: string;
  winnerUserId?: string;
  turnCount?: number;
  rewards?: {
    yen?: number;
  };
  eligibleForRewards?: boolean;
  finishedAt?: string;
};
