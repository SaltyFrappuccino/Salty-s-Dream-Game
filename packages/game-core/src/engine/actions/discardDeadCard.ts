import type { MatchAction, MatchState } from "@sdg/shared";

export function discardDeadCard(state: MatchState, action: Extract<MatchAction, { type: "DISCARD_DEAD_CARD" }>): MatchState {
  return {
    ...state,
    players: state.players.map((player) => {
      if (player.userId !== action.playerId) {
        return player;
      }

      const discardedCard = player.hand.find((card) => card.instanceId === action.cardInstanceId);
      if (!discardedCard) {
        return player;
      }

      return {
        ...player,
        hand: [...player.hand.filter((card) => card.instanceId !== action.cardInstanceId), ...player.deck.slice(0, 1)],
        deck: player.deck.slice(1),
        discard: [...player.discard, discardedCard],
        actionsTaken: player.actionsTaken + 1
      };
    })
  };
}

