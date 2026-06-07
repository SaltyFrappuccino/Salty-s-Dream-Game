import { MATCH_REWARDS } from "@sdg/shared";

export const rewardService = {
  resolveMatchReward(result: "win" | "loss" | "draw") {
    if (result === "win") {
      return MATCH_REWARDS.win;
    }
    if (result === "loss") {
      return MATCH_REWARDS.loss;
    }
    return MATCH_REWARDS.draw;
  }
};


