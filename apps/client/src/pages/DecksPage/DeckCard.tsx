import type { PlayerDeck } from "@sdg/shared";
import { Panel } from "../../components/ui/Panel/Panel";

type Props = {
  deck: PlayerDeck;
};

export function DeckCard({ deck }: Props) {
  const cardCount = deck.cards.reduce((sum, card) => sum + card.quantity, 0);

  return (
    <Panel>
      <h2>{deck.name}</h2>
      <p>{deck.characterIds.join(" / ")}</p>
      <p>{cardCount} / 30 РєР°СЂС‚</p>
    </Panel>
  );
}

