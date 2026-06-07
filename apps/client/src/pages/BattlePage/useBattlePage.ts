import { useCollectionStore } from "../../stores/collectionStore";
import { useSocketStore } from "../../stores/socketStore";

export function useBattlePage() {
  const match = useSocketStore((state) => state.match);
  const cards = useCollectionStore((state) => state.cards);
  const playerId = localStorage.getItem("sdg_demo_user") ?? "demo-player";
  const activePlayer = match?.players.find((player) => player.userId === playerId);
  const enemy = match?.players.find((player) => player.userId !== playerId);
  const source = activePlayer?.team.find((character) => !character.defeated);
  const target = enemy?.team.find((character) => !character.defeated);
  const isActiveTurn = match?.turn.activePlayerId === playerId;
  const cardsById = new Map(cards.map((card) => [card.id, card]));

  return { activePlayer, cardsById, enemy, isActiveTurn, match, playerId, source, target };
}

