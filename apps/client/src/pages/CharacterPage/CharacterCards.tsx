import type { CardDefinition } from "@sdg/shared";
import { GameCard } from "../../components/game/GameCard/GameCard";
import styles from "./CharacterPage.module.scss";

export function CharacterCards({ cards }: { cards: CardDefinition[] }) {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <GameCard card={card} key={card.id} />
      ))}
    </div>
  );
}

