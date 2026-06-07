import type { MatchState } from "@sdg/shared";
import { matchRepository } from "../../repositories/matchRepository";
import { walletRepository } from "../../repositories/walletRepository";
import { rewardService } from "../rewardService";
import { activeRooms } from "./activeMatchState";

function canGrantRewards(match: MatchState): boolean {
  return match.turn.number >= 3 && match.players.every((player) => player.actionsTaken >= 2);
}

export function finalizeMatch(match: MatchState): void {
  const eligibleForRewards = canGrantRewards(match);

  for (const player of match.players) {
    const result = match.winnerUserId
      ? match.winnerUserId === player.userId ? "win" : "loss"
      : "draw";
    const yenReward = eligibleForRewards ? rewardService.resolveMatchReward(result) : 0;
    const wallet = walletRepository.getByUserId(player.userId, player.userId);

    if (wallet && yenReward > 0) {
      walletRepository.update(player.userId, wallet.yen + yenReward, wallet.summonTickets);
    }

    matchRepository.add(player.userId, {
      matchId: match.id,
      result,
      winnerUserId: match.winnerUserId,
      turnCount: match.turn.number,
      rewards: {
        yen: yenReward
      },
      eligibleForRewards,
      finishedAt: match.finishedAt ?? new Date().toISOString()
    });
  }

  if (!match.roomId) {
    return;
  }

  const room = activeRooms.get(match.roomId);
  if (room) {
    room.status = "Finished";
  }
}

